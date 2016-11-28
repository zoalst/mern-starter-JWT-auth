import User from '../models/user';
import secret from '../secret';

import crypto from 'crypto'; 
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';


const errors = {
    REGISTER_USERNAME_TAKEN: 'username unavailable',
    REGISTER_GENERAL_ERROR: 'an error has occured',
    LOGIN_INVALID: 'invalid username/password combo',
    LOGIN_GENERAL_ERROR: 'sorry, an error has occured. please try again later',
};

export function register(req, res) {
  if (!req.body.user.username || !req.body.user.password) {
    return res.status(403).end();
  }

  const newUser = new User(req.body.user);

  newUser.username = sanitizeHtml(newUser.username);

  newUser.save((err, saved) => {
    if (err) {
      if(err.message.indexOf('duplicate key error') !== -1) {
        return res.status(500).send({err: errors.REGISTER_USERNAME_TAKEN});
      }
      else {
        return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
      }
    }
    return res.json({
        user: {            
          username: saved.username,
        } 
    });
  });
}

export function login(req, res) {
  if (!req.body.user.username || !req.body.user.password) {
    return res.status(403).end();
  }

  const username = sanitizeHtml(req.body.user.username);

  User.findOne({ username: username }).exec((err, user) => {
    if (err) {
      return res.status(500).send({err: errors.LOGIN_GENERAL_ERROR});
    }
    else if(!user) {
      return res.json({err: errors.LOGIN_GENERAL_ERROR});
    }
    user.comparePassword(req.body.user.password, function(err, isMatch) {
      if (err) throw err;

      if(isMatch) {
        var token = jwt.sign({'id':user._id}, secret.secret, {
          expiresIn: 31536e3
        });
        return res.json({
           user: {
            username: user.username,
           },
          token: token,
        });
      }
      else {
        return res.json({err: errors.LOGIN_INVALID});
      }
    });
  });
}
export function updateUserInfo(req, res) {
    if (!req.body.password) {
      return res.status(403).end();
    }
    try {
      // TODO sanitize req.headers.authorization
      var decoded = jwt.verify(req.headers.authorization, secret.secret);
      User.findOne({ _id: decoded.id }).exec((err, user) => {
        if (err) {
          return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
        }

        if(req.body.password !== undefined){ 
          user.password = req.body.password; 
        }

        user.save((err, saved) => {
          if (err) {
              return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
          }
          return res.json({
            user: {
              username: saved.username
            } 
          });        
        });
      });
    } catch(err) {
      // error during JWT verify
      return res.status(500).send({err: errors.REGISTER_GENERAL_ERROR}); 
    }

}

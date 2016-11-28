import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

var Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
  username: { type: 'String', required: true, index: { unique: true }, maxlength: 25  },
  password: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

UserSchema.pre('save', function(next) {
  var user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) {
		return next();
	}
	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
      	return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
    	return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);

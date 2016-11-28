import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './LoginForm.css';

export class LoginForm extends Component {
  onLogin = () => {
    const usernameRef = this.refs.username;
    const passwordRef = this.refs.password;
    if (usernameRef.value && passwordRef.value) {
      this.props.login(usernameRef.value, passwordRef.value);
      passwordRef.value = '';
    }
  };

  render() {
    return (
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="loginTitle" /></h2>
        <input placeholder={this.props.intl.messages.username} className={styles['form-field']} ref="username" />
        <input placeholder={this.props.intl.messages.password} className={styles['form-field']} ref="password" type="password" />
        <a className={styles['submit-button']} onClick={this.onLogin}><FormattedMessage id="submit" /></a>
      </div>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(LoginForm);

import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './RegisterForm.css';

export class RegisterForm extends Component {
  onRegister = () => {
    const usernameRef = this.refs.username;
    const passwordRef = this.refs.password;
    if (usernameRef.value && passwordRef.value) {
      this.props.register(usernameRef.value, passwordRef.value);
      passwordRef.value = '';
    }
  };

  render() {
    return (
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}><FormattedMessage id="registerTitle" /></h2>
        <input placeholder={this.props.intl.messages.username} className={styles['form-field']} ref="username" />
        <input placeholder={this.props.intl.messages.password} className={styles['form-field']} ref="password" type="password" />
        <a className={styles['submit-button']} onClick={this.onRegister}><FormattedMessage id="submit" /></a>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(RegisterForm);

import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './ProfileForm.css';

export class ProfileForm extends Component {
  onUpdate = () => {
    const newPasswordRef = this.refs.newPassword;
    if (newPasswordRef.value) {
      this.props.updateInfo(newPasswordRef.value);
      newPasswordRef.value = '';
    }
  };

  render() {
    return (
      <div className={styles['form-content']}>
        <h2 className={styles['form-title']}>{this.props.user.username}<FormattedMessage id="profileTitle" /></h2>
        <input placeholder={this.props.intl.messages.newPassword} className={styles['form-field']} ref="newPassword" type="password" />
        <a className={styles['submit-button']} onClick={this.onUpdate}><FormattedMessage id="submit" /></a>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  updateInfo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ProfileForm);

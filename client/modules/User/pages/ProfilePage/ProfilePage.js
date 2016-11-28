import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

// Import Components
import ProfileForm from '../../components/ProfileForm/ProfileForm';

// Import Actions
import { updateUserInfoRequest } from '../../UserActions';

// Import Selectors
import { getUser } from '../../UserReducer';

class ProfilePage extends Component {
  handleUpdate = (password) => {
      this.props.dispatch(updateUserInfoRequest({ password }));
  };

  render() {
    return (
      <ProfileForm updateInfo={this.handleUpdate} user={this.props.user} />
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    user: getUser(state),
  };
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ProfilePage);

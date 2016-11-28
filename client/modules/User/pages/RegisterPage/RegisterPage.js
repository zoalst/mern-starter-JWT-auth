import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import RegisterForm from '../../components/RegisterForm/RegisterForm';

// Import Actions
import { registerRequest } from '../../UserActions';

class RegisterPage extends Component {
  handleRegister = (username, password) => {
      this.props.dispatch(registerRequest({ username, password }));
  };

  render() {
    return (
      <RegisterForm register={this.handleRegister} /> 
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state) {
  return state;
}

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RegisterPage);

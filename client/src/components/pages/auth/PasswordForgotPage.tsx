import * as React from 'react';
import { bindActionCreators } from 'redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

// import TextInput from '../common/TextInput';
// import * as userActions from '../../actions/userActions';

interface PasswordForgotPageProps extends RouteComponentProps<any>, React.Props<any> {
  actions: any;
}

interface PasswordForgotState {
  email: string;
  errors: any;
}

class PasswordForgotPage extends React.Component<PasswordForgotPageProps, PasswordForgotState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      errors: {}
    };

  }

  onChange = (field: any, value: any) => {
    return this.setState({ email: value });
  }

  forgotFormIsValid() {
    let errors: any = {};

    if (!this.state.email) {
      errors.email = 'Email field is required.';
    } else if (!this.isValidEmail(this.state.email)) {
      errors.email = 'Email is not valid.';
    }

    this.setState({ errors: errors });

    return Object.keys(errors).length === 0;
  }

  isValidEmail(email: string) {
    let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  async resetPassword() {
    if (!this.forgotFormIsValid()) return;

    await this.props.actions.forgotPassword(this.state.email);
  }

  render() {
    return (
      <div className="container">
        <div className="col-xs-12 col-sm-6 col-sm-offset-3">
          <h1>Reset Password</h1>

          <input
            value={this.state.email}
            // onChange={this.onChange}
            placeholder="Email"
            // error={this.state.errors.email}
          />

          <button className="btn btn-warning btn-lg" onClick={this.resetPassword}>
            Reset Password
          </button>

          <hr />

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}


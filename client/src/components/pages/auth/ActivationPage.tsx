import * as React from 'react';
import * as classnames from 'classnames';
import { Link, RouteComponentProps } from 'react-router-dom';
import authService from '../../../services/authService';
import { Metro } from '../../../helpers/metroHelper';

interface ActivationPageProps
    extends RouteComponentProps<any>,
        React.Props<any> {}

interface ActivationPageState {
    activationData: {
        message: string;
        status: string;
    };
}

export default class ActivationPage extends React.Component<
    ActivationPageProps,
    ActivationPageState
> {
    constructor(props: ActivationPageProps) {
        super(props);

        this.state = {
            activationData: {
                message: '',
                status: ''
            }
        };
    }

    componentWillMount() {
        this.activateUserAccount();
    }

    async activateUserAccount() {
        let token = this.props.match.params.token;
        let data = await authService.activateAccount(token);
        if (data) {
            this.setState({
                activationData: Object.assign({}, data)
            });
            const status: 'alert' | 'success' =
                this.state.activationData.status === 'error'
                    ? 'alert'
                    : (this.state.activationData.status as any);
            Metro.dialog(
                'Info',
                this.state.activationData.message,
                status,
                true,
                true
            );
        }
    }

    render() {
        let status = this.state.activationData.status;

        let alertClass = classnames({
            button: true,
            danger: status === 'error',
            success: status === 'success',
            warning: status === 'warning'
        });

        return (
            <div className="padding30 flex-grid">
                <div className="row cell-auto-size">
                    <div className="cell">
                        <h1>Активация аккаунта</h1>
                        <br />
                    </div>
                </div>

                <div className="row cell-auto-size">
                    <div className="cell">
                        {this.state.activationData.message && (
                            <button className={alertClass} disabled={true}>
                                {this.state.activationData.message}
                            </button>
                        )}
                    </div>
                </div>
                <hr />

                <div className="cell cell-auto-size">
                    <div className="row cell">
                        <p>
                            Перейти на главную: <Link to="/">Главная</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

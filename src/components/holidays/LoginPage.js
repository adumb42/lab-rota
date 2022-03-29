import React from 'react';
import { connect } from 'react-redux';
import { updateUser, fetchUser } from '../../actions';
 
class LoginPage extends React.Component {
    constructor(props) {
        super(props)
        props.fetchUser()
    }

    render() {
        if (!this.props.users[0]) {
            return <div />
        }
        return (
        <div className="ui raised very padded container segment">
            <div>
                <h2 className="ui center aligned icon header">
                    <i className="circular users icon"></i>
                    Wissington Day Crew Holidays & Rota
                </h2>
                <div className="ui one column stackable center aligned page grid">
                    <div className="column twelve wide">
                        <div className="ui simple dropdown labeled search icon button">
                            <i className="users icon"></i>
                            <span className="text">Select User</span>
                            <div className="menu">
                                <a className="item" onClick={() => {this.props.updateUser({ "userName": this.props.users[0].userName, "crewNumber": 1 })}}>
                                    {this.props.users[0].userName}
                                </a>
                                    <a className="item" onClick={() => { this.props.updateUser({ "userName": this.props.users[1].userName, "crewNumber": 2})}}>
                                    {this.props.users[1].userName}
                                </a>
                                    <a className="item" onClick={() => { this.props.updateUser({ "userName": this.props.users[2].userName, "crewNumber": 3 })}}>
                                    {this.props.users[2].userName}
                                </a>
                                    <a className="item" onClick={() => { this.props.updateUser({ "userName": this.props.users[3].userName, "crewNumber": 4 })}}>
                                    {this.props.users[3].userName}
                                </a>
                                    <a className="item" onClick={() => { this.props.updateUser({ "userName": this.props.users[4].userName, "crewNumber": 5 })}}>
                                    {this.props.users[4].userName}
                                </a>
                                    <a className="item" onClick={() => {this.props.updateUser({"userName": "Admin"})}}>
                                    Admin
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    };
};

const mapStateToProps = (state) => {
    return { 
        ...state.users[10],
        users: Object.values(state.users)   
    };
};

export default connect(
    mapStateToProps,
    { updateUser, fetchUser }
)(LoginPage);
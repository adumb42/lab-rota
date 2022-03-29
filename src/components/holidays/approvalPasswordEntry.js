import React from 'react';
import Modal from '../Modal';
import history from '../../history'
import { fetchHoliday, loginPassword, approvalToggle, fetchUser } from '../../actions';
import { connect } from 'react-redux';

class approvalPasswordEntry extends React.Component {
    state = { passwordAttempt: 0, input: null, passwordLoading: false }

    componentDidMount() {
        this.props.fetchHoliday(this.props.location.state.id);
        this.props.fetchUser();
    }

    handleChange = e => {
        this.setState({ input: e.target.value })
    }

    handleKeyDown = async (e) => {
        let _id = this.props.location.state.id
        let boolean = this.props.location.state.boolean
        let typedValue = this.state.input
        if (e.key === "Enter" || e.type === "click") {
            await this.setState({ passwordLoading: true })
            this.props.loginPassword({
                "name": "approve",
                "password": typedValue
            }).then(() => {
                if (boolean && this.props.crewNumber === 1) {
                    this.props.approvalToggle(_id, { "crewOneApproved": true })
                    this.props.approvalToggle(_id, { "crewOneUpdatedAt": new Date() })
                } if (!boolean && this.props.crewNumber === 1) {
                    this.props.approvalToggle(_id, { "crewOneApproved": false })
                } if (boolean && this.props.crewNumber === 2) {
                    this.props.approvalToggle(_id, { "crewTwoApproved": true })
                    this.props.approvalToggle(_id, { "crewTwoUpdatedAt": new Date() })
                } if (!boolean && this.props.crewNumber === 2) {
                    this.props.approvalToggle(_id, { "crewTwoApproved": false })
                } if (boolean && this.props.crewNumber === 3) {
                    this.props.approvalToggle(_id, { "crewThreeApproved": true })
                    this.props.approvalToggle(_id, { "crewThreeUpdatedAt": new Date() })
                } if (!boolean && this.props.crewNumber === 3) {
                    this.props.approvalToggle(_id, { "crewThreeApproved": false })
                } if (boolean && this.props.crewNumber === 4) {
                    this.props.approvalToggle(_id, { "crewFourApproved": true })
                    this.props.approvalToggle(_id, { "crewFourUpdatedAt": new Date() })
                } if (!boolean && this.props.crewNumber === 4) {
                    this.props.approvalToggle(_id, { "crewFourApproved": false })
                } if (boolean && this.props.crewNumber === 5) {
                    this.props.approvalToggle(_id, { "crewFiveApproved": true })
                    this.props.approvalToggle(_id, { "crewFiveUpdatedAt": new Date() })
                } if (!boolean && this.props.crewNumber === 5) {
                    this.props.approvalToggle(_id, { "crewFiveApproved": false })
                } 
            }).then(() => {
                this.setState({ passwordLoading: false })
            }).then(() => {
                this.props.fetchHoliday(this.props.location.state.id)
            }).then(() => {
                if (this.props.crewNumber === 1) {
                    history.push('/crewOne')
                } if (this.props.crewNumber === 2) {
                    history.push('/crewTwo')
                } if (this.props.crewNumber === 3) {
                    history.push('/crewThree')
                } if (this.props.crewNumber === 4) {
                    history.push('/crewFour')
                } if (this.props.crewNumber === 5) {
                    history.push('/crewFive')
                }
            }).catch(() => {
                this.setState({ passwordAttempt: this.state.passwordAttempt + 1 })
                this.setState({ passwordLoading: false })
            })
        }
    }

    render() {
        return (
        <Modal
            title="Enter Admin Password"
            content={this.state.passwordLoading === false ? <div className="ui input focus">
                <input style={{ "marginRight": "20px" }} type="password" placeholder="Enter password..." onChange={this.handleChange} onKeyDown={this.handleKeyDown}></input>
                <button type="submit" className="ui primary button" onClick={this.handleKeyDown}>Submit</button>
            </div> :
                <div className="ui input focus">
                    <input style={{ "marginRight": "20px" }} type="password" placeholder="Enter password..."></input>
                    <button type="submit" className="ui primary loading button">Submit</button>
                </div>
            }
            actions={this.state.passwordAttempt > 0 ? <div className="ui negative message">
                <div className="header">
                    Incorrect Password Attempt {this.state.passwordAttempt}
                </div>
                <p>Please try again</p>
            </div> : null}
            onDismiss={() => 
                {if (this.props.crewNumber === 1) {
                    history.push('/crewOne')
                } if (this.props.crewNumber === 2) {
                    history.push('/crewTwo')
                } if (this.props.crewNumber === 3) {
                    history.push('/crewThree')
                } if (this.props.crewNumber === 4) {
                    history.push('/crewFour')
                } if (this.props.crewNumber === 5) {
                    history.push('/crewFive')
                }
            }}
        />
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        holiday: state.holidays[ownProps.match.params.id],
        ...state.users[10]
    }
}

export default connect(
    mapStateToProps,
    { fetchHoliday, loginPassword, approvalToggle, fetchUser }
)(approvalPasswordEntry);

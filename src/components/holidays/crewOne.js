import React from 'react';
import moment from 'moment';
import { fetchHolidays, fetchUser, approvalToggle } from '../../actions';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class CrewOne extends React.Component {
    constructor(props) {
        super(props)
        this.state = {hidden: true}
        props.fetchUser()
    }
    
    componentDidMount() {
        this.props.fetchHolidays();
        setTimeout(() => {
            this.setState({ hidden: false })
        }, 1500)
    }

    componentDidUpdate() {
        this.props.fetchHolidays();
    }

    renderUnapprovedHolidays() {
        let checkCross
        let positiveNegative
        let approvedUnapproved
        let booleanButton
        let positiveNegativeButton
        let contentButton
        let checkCrossEmail
        let positiveNegativeEmail
        let emailSentOrNot
        let emailButton
        let emailMessage
        return this.props.holidays.map(holiday => {
            if (holiday.crewOneApproved === false) {
                checkCross = "attention icon"
                positiveNegative = "ui negative"
                approvedUnapproved = "Requires Approval"
                booleanButton = true
                positiveNegativeButton = "positive ui button"
                contentButton = "Approve"
            } if (holiday.crewOneApproved === true) {
                checkCross = "icon checkmark"
                positiveNegative = "ui positive"
                approvedUnapproved = "Approved"
                booleanButton = false
                positiveNegativeButton = "ui button"
                contentButton = "Reverse Approval"
            }
            if (holiday.crewOneEmail === false) {
                checkCrossEmail="attention icon"
                positiveNegativeEmail="ui negative"
                emailSentOrNot="Not Sent"
                emailButton="positive ui button"
                emailMessage="Confirm Email Sent"
            } if (holiday.crewOneEmail === true) {
                checkCrossEmail="icon checkmark"
                positiveNegativeEmail = "ui positive"
                emailSentOrNot="Sent"
                emailButton="ui button"
                emailMessage="Cancel Email"
            }
            let updatedAtDate = moment(holiday.crewOneUpdatedAt).format('DD-MM-YYYY')
            while (
                holiday.crewOne === false &&
                moment(holiday.date, 'DD-MM-YYYY').valueOf() >= moment()
            ) {
                return (
                    <tbody className="maintable" key={holiday.id}>
                        <tr>
                            <td>{holiday.date}</td>
                            <td>{holiday.day}</td>
                            <td className={positiveNegative}><i className={checkCross}></i>{approvedUnapproved}</td>
                            <td>
                            <Link to = {{
                                    pathname: '/approvalPasswordEntry',
                                    state: { 
                                        id: holiday._id,
                                        boolean: booleanButton
                                    }
                                }}
                                className={positiveNegativeButton}>
                                {contentButton}
                            </Link>
                            </td>
                            <td>{updatedAtDate}</td>
                            <td className={positiveNegativeEmail}><i className={checkCrossEmail}></i>{emailSentOrNot}</td>
                            <td> <button className={emailButton} onClick={() => this.props.approvalToggle(holiday._id, { "crewOneEmail": !holiday.crewOneEmail })}>{emailMessage}</button></td>
                        </tr>
                    </tbody>
                )
            }
        })
    }

    render() {

    const booked = this.props.holidays.filter(holiday => holiday.crewOne === false).length
    const swapsBooked = 113 - this.props.holidays.filter(holiday => holiday.crewOne === null).length 
    const remaining = 28.5 - booked

    return this.state.hidden ? (
        <div>
        <div className="ui raised card">
            <div className="ui raised card">
                <div className="content">
                    <div className="header"></div>
                    <div className="meta">
                        <span className="category"></span>
                    </div>
                    <div className="ui active centred inline loader">
                    </div>
                </div>
                <div className="extra content">
                    <div className="right floated author">
                    </div>
                </div>
            </div>
        </div>
    </div>
    ) :
    (
        <div>
            <div className="ui raised card">
                <div className="content">
                    <div className="header">{this.props.users[0].fullNameOne}</div>
                    <div className="meta">
                        <span className="category">Summary 21/22</span>
                    </div>
                    <div className="description">
                        <p>Holidays Booked: <b>{booked}</b></p>
                        <p>Holidays Remaining: <b>{remaining}</b></p>
                        <p>Swap Balance: <b>{swapsBooked}</b></p>
                    </div>
                </div>
                <div className="extra content">
                    <div className="right floated author">
                    </div>
                </div>
            </div>
                <h2 className="center aligned ui icon header">
                    <i className="clipboard list icon"></i>
                    <div className="content">
                        Upcoming 
                    </div>
                </h2>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Day</th>
                            <th>Status</th>
                            <th>Toggle Status</th>
                            <th>Date Approved</th>
                            <th>Email Status</th>
                            <th>Toggle Email</th>
                        </tr>
                    </thead>
                    {this.renderUnapprovedHolidays()}
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        holidays: Object.values(state.holidays),
        users: Object.values(state.users)
    };
};

export default connect(
    mapStateToProps,
    { fetchHolidays, fetchUser, approvalToggle }
)(CrewOne);



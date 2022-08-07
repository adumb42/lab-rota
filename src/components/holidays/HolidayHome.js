import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { Link } from 'react-router-dom';
import { fetchHolidays, fetchHoliday, createDay, dateToggle, fetchUser, nameToggle, fetchUserByCrew } from '../../actions';
import { connect } from 'react-redux';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';


class HolidayList extends React.Component {
    constructor(props) {
        super(props);
        this.toggleDayCount = this.toggleDayCount.bind(this)
        this.state = { startDate: null, endDate: null, filterCount: '' }
    }

    handleDateSubmit = () => {
        const { startDate, endDate } = this.state;
        moment(localStorage.setItem('startDate', startDate));
        moment(localStorage.setItem('endDate', endDate));
    };

    handleScrollPosition = () => {
        const scrollPosition = localStorage.getItem('scrollPosition2');
        const mainWindow = document.getElementById('div2ToPrint');
        if (scrollPosition) {
            mainWindow.scrollTop = parseInt(scrollPosition);
            mainWindow.scrollLeft = 0
        };
    };

    handleScroll = () => {
        const mainWindow = document.getElementById('div2ToPrint');
        localStorage.setItem('scrollPosition2', mainWindow.scrollTop);
    };

    conditionalSum = function(values) {
        let sum = 0
        values.forEach( function(value) {
            if(value === true && value !== "") {
                sum += 1
            }
        })
        return sum
    }
   
    componentDidMount() {
        this.props.fetchUser();
        this.props.fetchHolidays();
        if (!localStorage.getItem('startDate')) {
            localStorage.setItem('startDate', moment());
        }
        if (!localStorage.getItem('endDate')) {
            localStorage.setItem('endDate', moment().add(7, 'days'))
        }
        const startDate = moment(localStorage.getItem('startDate'));
        const endDate = moment(localStorage.getItem('endDate'));
        this.setState({ startDate, endDate });
    };

    componentDidUpdate() {
        if (!this.props.users[0]) {
            return 
        } else {
            this.handleScrollPosition();
            this.handleDateSubmit();
        }      
    };

    toggleDayCount(e) {
        const clickedButton = e.target.value
        if (clickedButton !== this.state.filterCount) {
            this.setState({ filterCount: clickedButton })
        } else {
            this.setState({ filterCount: '' })
        }
    }

    renderTableHeader() {
        return (
            <tr>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>Date</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>Day</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>{this.props.users[0].userName}</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>{this.props.users[1].userName}</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>{this.props.users[2].userName}</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>{this.props.users[3].userName}</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>{this.props.users[4].userName}</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>Count</th>
            </tr>
        )
    }

    renderHolidays() {
        return this.props.holidays.map(holiday => {
            while ( 
                    moment(holiday.date, 'DD-MM-YYYY').valueOf() >= moment(this.state.startDate - 86400000) &&
                    moment(holiday.date, 'DD-MM-YYYY').valueOf() <= moment(this.state.endDate) 
                ) {
            let count = this.conditionalSum([holiday.crewOne, holiday.crewTwo, holiday.crewThree, holiday.crewFour, holiday.crewFive])
            let countStyle
                if (count < 3 && holiday.day !== "Saturday" && holiday.day !== "Sunday") {
                    countStyle = { "background-color": "#FF7663" } 
                } else if (count < 4 && holiday.day !== "Saturday" && holiday.day !== "Sunday") {
                    countStyle = { "background-color": "#ED9B25" }
                } else {
                    countStyle = { "background-color": "#58E162" } 
                }
            let crewOneButton
            let crewTwoButton
            let crewThreeButton
            let crewFourButton
            let crewFiveButton
            let classNameOne
            let classNameTwo
            let classNameThree
            let classNameFour
            let classNameFive
            if (holiday.crewOne === undefined) {
                classNameOne = "calendar times icon"
            } else if (holiday.crewOne === false) {
                classNameOne = "suitcase icon"
            } else if (holiday.crewOne === true) {
                classNameOne = "calendar icon"
            } else {
                classNameOne = "calendar outline icon"
            }
            if (holiday.crewTwo === undefined) {
                classNameTwo = "calendar times icon"
            } else if (holiday.crewTwo === false) {
                classNameTwo = "suitcase icon"
            } else if (holiday.crewTwo === true) {
                classNameTwo = "calendar icon"
            } else {
                classNameTwo = "calendar outline icon"
            }
            if (holiday.crewThree === undefined) {
                classNameThree = "calendar times icon"
            } else if (holiday.crewThree === false) {
                classNameThree = "suitcase icon"
            } else if (holiday.crewThree === true) {
                classNameThree = "calendar icon"
            } else {
                classNameThree = "calendar outline icon"
            }
            if (holiday.crewFour === undefined) {
                classNameFour = "calendar times icon"
            } else if (holiday.crewFour === false) {
                classNameFour = "suitcase icon"
            } else if (holiday.crewFour === true) {
                classNameFour = "calendar icon"
            } else {
                classNameFour = "calendar outline icon"
            }
            if (holiday.crewFive === undefined) {
                classNameFive = "calendar times icon"
            } else if (holiday.crewFive === false) {
                classNameFive = "suitcase icon"
            } else if (holiday.crewFive === true) {
                classNameFive = "calendar icon"
            } else {
                classNameFive = "calendar outline icon"
            }
            if (holiday.day === "Saturday" || holiday.day === "Sunday") {
                crewOneButton =
                    <Link
                        to={{
                            pathname: `/swap/${holiday.id}`,
                            state: {
                                name: this.props.users[0].userName,
                                id: holiday._id
                            }
                        }}
                        className={this.props.userName !== this.props.users[0].userName || holiday.crewOne !== true ? `disabled white circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                        <i className={
                            holiday.crewOne === true ? "calendar icon" :
                                (holiday.crewOne === false ? "calendar sun outline icon" : (
                                    holiday.CrewOne === "" ? "calendar times icon" : "calendar outline icon"))}>
                        </i>
                    </Link>
                crewTwoButton = 
                    <Link 
                        to={{
                            pathname: `/swap/${holiday.id}`,
                            state: {
                                name: this.props.users[1].userName,
                                id: holiday._id
                            }
                        }}
                    className={this.props.userName !== this.props.users[1].userName || holiday.crewTwo !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                        <i className={
                            holiday.crewTwo === true ? "calendar icon" :
                                (holiday.crewTwo === false ? "calendar sun outline icon" : (
                                    holiday.crewTwo === "" ? "calendar times icon" : "calendar outline icon"))}>
                        </i>
                    </Link>
                crewThreeButton = 
                    <Link 
                        to={{
                            pathname: `/swap/${holiday.id}`,
                            state: {
                                name: this.props.users[2].userName,
                                id: holiday._id
                            }
                        }}
                    className={this.props.userName !== this.props.users[2].userName || holiday.crewThree !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                        <i className={
                            holiday.crewThree === true ? "calendar icon" :
                                (holiday.crewThree === false ? "calendar sun outline icon" : (
                                    holiday.crewThree === "" ? "calendar times icon" : "calendar outline icon"))}>
                        </i>
                    </Link>
                crewFourButton = 
                    <Link 
                        to={{
                            pathname: `/swap/${holiday.id}`,
                            state: {
                                name: this.props.users[3].userName,
                                id: holiday._id
                            }
                        }}
                    className={this.props.userName !== this.props.users[3].userName || holiday.crewFour !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                        <i className={
                            holiday.crewFour === true ? "calendar icon" :
                                (holiday.crewFour === false ? "calendar sun outline icon" : (
                                    holiday.crewFour === "" ? "calendar times icon" : "calendar outline icon"))}>
                        </i>
                    </Link>
                crewFiveButton = 
                    <Link
                        to={{
                            pathname: `/swap/${holiday.id}`,
                            state: {
                                name: this.props.users[4].userName,
                                id: holiday._id
                            }
                        }}
                    className={this.props.userName !== this.props.users[4].userName || holiday.crewFive !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                        <i className={
                            holiday.crewFive === true ? "calendar icon" :
                                (holiday.crewFive === false ? "calendar sun outline icon" : (
                                    holiday.crewFive === "" ? "calendar times icon" : "calendar outline icon"))}>
                        </i>
                    </Link>
                } else {
                crewOneButton = 
                    <button className="circular ui icon button"
                        disabled={holiday.crewOne === null || holiday.crewOne === undefined || this.props.userName !== this.props.users[0].userName}
                        onClick={() => this.props.nameToggle(holiday._id, { "crewOne": !holiday.crewOne })}>
                    <i className={classNameOne}>
                    </i>
                    </button>
                crewTwoButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewTwo === null || holiday.crewTwo === undefined || this.props.userName !== this.props.users[1].userName}
                        onClick={() => this.props.nameToggle(holiday._id, { "crewTwo": !holiday.crewTwo })}>
                    <i className={classNameTwo}>
                    </i>
                    </button>
                crewThreeButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewThree === null || holiday.crewThree === undefined || this.props.userName !== this.props.users[2].userName}
                        onClick={() => this.props.nameToggle(holiday._id, { "crewThree": !holiday.crewThree })}>
                    <i className={classNameThree}>
                    </i>
                    </button>
                crewFourButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewFour === null || holiday.crewFour === undefined || this.props.userName !== this.props.users[3].userName}
                        onClick={() => this.props.nameToggle(holiday._id, { "crewFour": !holiday.crewFour })}>
                    <i className={classNameFour}>
                    </i>
                    </button>
                crewFiveButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewFive === null || holiday.crewFive === undefined || this.props.userName !== this.props.users[4].userName}
                        onClick={() => this.props.nameToggle(holiday._id, { "crewFive": !holiday.crewFive })}>
                    <i className={classNameFive}>
                    </i>
                    </button>
                }
            return (
                <tbody className="maintable" key={holiday.id}>
                    <tr>
                        <td>{holiday.date}</td>
                        <td>{holiday.day}</td>
                        <td style={holiday.crewOne === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewOneButton}
                        </td>
                        <td style={holiday.crewTwo === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewTwoButton}
                        </td>
                        <td style={holiday.crewThree === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewThreeButton}
                        </td>
                        <td style={holiday.crewFour === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewFourButton}
                        </td>
                        <td style={holiday.crewFive === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewFiveButton}
                        </td>
                        <td style={countStyle}>{count}</td>
                    </tr>
                </tbody>
            );
            }
        });
    }

    renderFilteredHolidays() {

        return this.props.holidays.map(holiday => {
            let count = this.conditionalSum([holiday.crewOne, holiday.crewTwo, holiday.crewThree, holiday.crewFour, holiday.crewFive])
            while (
                moment(holiday.date, 'DD-MM-YYYY').valueOf() >= moment(this.state.startDate - 86400000) &&
                moment(holiday.date, 'DD-MM-YYYY').valueOf() <= moment(this.state.endDate) &&
                count < 3 && holiday.day !== "Saturday" && holiday.day !== "Sunday"
            ) {
                let count = this.conditionalSum([holiday.crewOne, holiday.crewTwo, holiday.crewThree, holiday.crewFour, holiday.crewFive])
                let countStyle
                if (count < 3 && holiday.day !== "Saturday" && holiday.day !== "Sunday") {
                    countStyle = { "background-color": "#FF7663" }
                } else if (count < 4 && holiday.day !== "Saturday" && holiday.day !== "Sunday") {
                    countStyle = { "background-color": "#FF7663" }
                } else {
                    countStyle = { "background-color": "#FF7663" }
                }
                let crewOneButton
                let crewTwoButton
                let crewThreeButton
                let crewFourButton
                let crewFiveButton
                let classNameOne
                let classNameTwo
                let classNameThree
                let classNameFour
                let classNameFive
                if (holiday.crewOne === undefined) {
                    classNameOne = "calendar times icon"
                } else if (holiday.crewOne === false) {
                    classNameOne = "suitcase icon"
                } else if (holiday.crewOne === true) {
                    classNameOne = "calendar icon"
                } else {
                    classNameOne = "calendar outline icon"
                }
                if (holiday.crewTwo === undefined) {
                    classNameTwo = "calendar times icon"
                } else if (holiday.crewTwo === false) {
                    classNameTwo = "suitcase icon"
                } else if (holiday.crewTwo === true) {
                    classNameTwo = "calendar icon"
                } else {
                    classNameTwo = "calendar outline icon"
                }
                if (holiday.crewThree === undefined) {
                    classNameThree = "calendar times icon"
                } else if (holiday.crewThree === false) {
                    classNameThree = "suitcase icon"
                } else if (holiday.crewThree === true) {
                    classNameThree = "calendar icon"
                } else {
                    classNameThree = "calendar outline icon"
                }
                if (holiday.crewFour === undefined) {
                    classNameFour = "calendar times icon"
                } else if (holiday.crewFour === false) {
                    classNameFour = "suitcase icon"
                } else if (holiday.crewFour === true) {
                    classNameFour = "calendar icon"
                } else {
                    classNameFour = "calendar outline icon"
                }
                if (holiday.crewFive === undefined) {
                    classNameFive = "calendar times icon"
                } else if (holiday.crewFive === false) {
                    classNameFive = "suitcase icon"
                } else if (holiday.crewFive === true) {
                    classNameFive = "calendar icon"
                } else {
                    classNameFive = "calendar outline icon"
                }
                if (holiday.day === "Saturday" || holiday.day === "Sunday") {
                    crewOneButton =
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: this.props.users[0].userName,
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== this.props.users[0].userName || holiday.crewOne !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewOne === true ? "calendar icon" :
                                    (holiday.crewOne === false ? "calendar sun outline icon" : "calendar outline icon")}>
                            </i>
                        </Link>
                    crewTwoButton =
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: this.props.users[1].userName,
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== this.props.users[1].userName || holiday.crewTwo !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewTwo === true ? "calendar icon" :
                                    (holiday.crewTwo === false ? "calendar sun outline icon" : "calendar outline icon")}>
                            </i>
                        </Link>
                    crewThreeButton =
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: this.props.users[2].userName,
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== this.props.users[2].userName || holiday.crewThree !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewThree === true ? "calendar icon" :
                                    (holiday.crewThree === false ? "calendar sun outline icon" : "calendar outline icon")}>
                            </i>
                        </Link>
                    crewFourButton =
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: this.props.users[3].userName,
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== this.props.users[3].userName || holiday.crewFour !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewFour === true ? "calendar icon" :
                                    (holiday.crewFour === false ? "calendar sun outline icon" : "calendar outline icon")}>
                            </i>
                        </Link>
                    crewFiveButton =
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: this.props.users[4].userName,
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== this.props.users[4].userName || holiday.crewFive !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewFive === true ? "calendar icon" :
                                    (holiday.crewFive === false ? "calendar sun outline icon" : "calendar outline icon")}>
                            </i>
                        </Link>
                } else {
                    crewOneButton =
                        <button className="circular ui icon button white"
                            disabled={holiday.crewOne === null || holiday.crewOne === undefined || this.props.userName !== this.props.users[0].userName}
                            onClick={() => this.props.nameToggle(holiday._id, { "crewOne": !holiday.crewOne })}>
                            <i className={classNameOne}></i>
                        </button>
                    crewTwoButton =
                        <button className="circular ui icon button white"
                            disabled={holiday.crewTwo === null || holiday.crewTwo === undefined || this.props.userName !== this.props.users[1].userName}
                            onClick={() => this.props.nameToggle(holiday._id, { "crewTwo": !holiday.crewTwo })}>
                            <i className={classNameTwo}></i>
                        </button>
                    crewThreeButton =
                        <button className="circular ui icon button"
                            disabled={holiday.crewThree === null || holiday.crewThree === undefined || this.props.userName !== this.props.users[2].userName}
                            onClick={() => this.props.nameToggle(holiday._id, { "crewThree": !holiday.crewThree })}>
                            <i className={classNameThree}></i>
                        </button>
                    crewFourButton =
                        <button className="circular ui icon button"
                            disabled={holiday.crewFour === null || holiday.crewFour === undefined || this.props.userName !== this.props.users[3].userName}
                            onClick={() => this.props.nameToggle(holiday._id, { "crewFour": !holiday.crewFour })}>
                            <i className={classNameFour}></i>
                        </button>
                    crewFiveButton =
                        <button className="circular ui icon button"
                            disabled={holiday.crewFive === null || holiday.crewFive === undefined || this.props.userName !== this.props.users[4].userName}
                            onClick={() => this.props.nameToggle(holiday._id, { "crewFive": !holiday.crewFive })}>
                            <i className={classNameFive}></i>
                        </button>
                }
                return (
                    <tbody className="maintable" key={holiday.id}>
                        <tr>
                            <td>{holiday.date}</td>
                            <td>{holiday.day}</td>
                            <td style={holiday.crewOne === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                                {crewOneButton}
                            </td>
                            <td style={holiday.crewTwo === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                                {crewTwoButton}
                            </td>
                            <td style={holiday.crewThree === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                                {crewThreeButton}
                            </td>
                            <td style={holiday.crewFour === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                                {crewFourButton}
                            </td>
                            <td style={holiday.crewFive === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                                {crewFiveButton}
                            </td>
                            <td style={countStyle}>{count}</td>
                        </tr>
                    </tbody>
                );
            }
        });
    }

    render() {
        if (!this.props.users[0]) {
            return <div />
        }
        return (
            <div className="search-bar ui segment">
                <div className="field">
                <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                        displayFormat={() => "DD-MM-YYYY"}
                        isOutsideRange={() => false}
                />
                    <button className="ui right floated toggle button" value={'1'} onClick={this.toggleDayCount}>
                        <i className="filter icon"></i>
                        Toggle by Too Few People In
                    </button>
                </div>
                <br></br>
                <div>
                    
                </div>
            <div 
                id='div2ToPrint'
                style={{
                    "borderRadius": "3px",
                    "border": "1px solid lightGrey",
                    "maxHeight": "75vh",
                    "overflowY": "scroll",
                    "width": "100%", 
                    "zIndex": 7 }}
                onScroll={this.handleScroll}>
                <table className="ui celled table" style={{border: "1px"}}>
                    <thead>
                        {this.renderTableHeader()}
                    </thead>
                        {this.state.filterCount === '' ? this.renderHolidays() : this.renderFilteredHolidays()}
                </table>
            </div>
        </div>
        );
    }
}


const mapStateToProps = (state) => {
    return { 
        holidays: Object.values(state.holidays),
        ...state.users[10],
        users: Object.values(state.users)
    };
};

export default connect(
    mapStateToProps, 
    { fetchHolidays, createDay, dateToggle, fetchHoliday, fetchUser, nameToggle, fetchUserByCrew }
)(HolidayList);

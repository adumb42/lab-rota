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
        this.toggleEditMode = this.toggleEditMode.bind(this)
        this.state = { startDate: null, endDate: null, filterCount: '', editModeValue: 'Edit Mode Off' };
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

    toggleEditMode = () => {
        if(this.state.editModeValue === 'Edit Mode Off') {
            this.setState(() => ({ editModeValue: 'Add Day' }))
        } else if (this.state.editModeValue === 'Add Day') {
            this.setState(() => ({ editModeValue: 'Remove Day' }))
        } else if (this.state.editModeValue === 'Remove Day') {
            this.setState(() => ({ editModeValue: 'Add Holiday' }))
        } else if (this.state.editModeValue === 'Add Holiday') {
            this.setState(() => ({ editModeValue: 'Add Support Day' }))
        } else if (this.state.editModeValue === 'Add Support Day') {
            this.setState(() => ({ editModeValue: 'Edit Mode Off' }))
        }
    }

    onClickFunction = (crewNumber, id) => {
        if (crewNumber === 1) {
            console.log('this has run')
            if (this.state.editModeValue === 'Add Day') {
                console.log('this has run')
                this.props.nameToggle(id, { "crewOne": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewOne": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewOne": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewOne": '' })
            }
        }
        if (crewNumber === 2) {
            if (this.state.editModeValue === 'Add Day') {
                this.props.nameToggle(id, { "crewTwo": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewTwo": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewTwo": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewTwo": '' })
            }
        }
        if (crewNumber === 3) {
            if (this.state.editModeValue === 'Add Day') {
                this.props.nameToggle(id, { "crewThree": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewThree": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewThree": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewThree": '' })
            }
        }
        if (crewNumber === 4) {
            if (this.state.editModeValue === 'Add Day') {
                this.props.nameToggle(id, { "crewFour": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewFour": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewFour": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewFour": '' })
            }
        }
        if (crewNumber === 5) {
            if (this.state.editModeValue === 'Add Day') {
                this.props.nameToggle(id, { "crewFive": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewFive": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewFive": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewFive": '' })
            }
        }
        if (crewNumber === 6) {
            if (this.state.editModeValue === 'Add Day') {
                this.props.nameToggle(id, { "crewSix": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewSix": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewSix": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewSix": '' })
            }
        }
        if (crewNumber === 7) {
            if (this.state.editModeValue === 'Add Day') {
                this.props.nameToggle(id, { "crewSeven": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewSeven": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewSeven": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewSeven": '' })
            }
        }
        if (crewNumber === 8) {
            if (this.state.editModeValue === 'Add Day') {
                this.props.nameToggle(id, { "crewEight": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewEight": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewEight": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewEight": '' })
            }
        }
        if (crewNumber === 9) {
            if (this.state.editModeValue === 'Add Day') {
                console.log('Attempting function')
                this.props.nameToggle(id, { "crewNine": true })
            } else if (this.state.editModeValue === 'Remove Day') {
                this.props.nameToggle(id, { "crewNine": null })
            } else if (this.state.editModeValue === 'Add Holiday') {
                this.props.nameToggle(id, { "crewNine": false })
            } else if (this.state.editModeValue === 'Add Support Day') {
                this.props.nameToggle(id, { "crewNine": '' })
            }
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
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>Joe</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>Daiva</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>Agnieszka</th>
                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 6 }}>Elaine</th>
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
            let count = this.conditionalSum([holiday.crewOne, holiday.crewTwo, holiday.crewThree, holiday.crewFour, holiday.crewFive, holiday.crewSix, holiday.crewSeven, holiday.crewEight, holiday.crewNine])
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
            let crewSixButton
            let crewSevenButton
            let crewEightButton
            let crewNineButton
            let classNameOne
            let classNameTwo
            let classNameThree
            let classNameFour
            let classNameFive
            let classNameSix
            let classNameSeven
            let classNameEight
            let classNameNine
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
            if (holiday.crewSix === undefined) {
                classNameSix = "calendar times icon"
            } else if (holiday.crewSix === false) {
                classNameSix = "suitcase icon"
            } else if (holiday.crewFive === true) {
                classNameSix = "calendar icon"
            } else {
                classNameSix = "calendar outline icon"
            }
            if (holiday.crewSeven === undefined) {
                classNameSeven = "calendar times icon"
            } else if (holiday.crewSeven === false) {
                classNameSeven = "suitcase icon"
            } else if (holiday.crewSeven === true) {
                classNameSeven = "calendar icon"
            } else {
                classNameSeven = "calendar outline icon"
            }
            if (holiday.crewEight === undefined) {
                classNameEight = "calendar times icon"
            } else if (holiday.crewEight === false) {
                classNameEight = "suitcase icon"
            } else if (holiday.crewEight === true) {
                classNameEight = "calendar icon"
            } else {
                classNameEight = "calendar outline icon"
            }
            if (holiday.crewNine === undefined) {
                classNameNine = "calendar times icon"
            } else if (holiday.crewNine === false) {
                classNameNine = "suitcase icon"
            } else if (holiday.crewNine === true) {
                classNameNine = "calendar icon"
            } else {
                classNameNine = "calendar outline icon"
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
                crewSixButton =
                    this.state.editModeValue === 'Edit Mode Off' ? 
                    <Link
                        to={{
                            pathname: `/swap/${holiday.id}`,
                            state: {
                                name: 'Joe',
                                id: holiday._id
                            }
                        }}
                        className={this.props.userName !== 'Admin'|| holiday.crewSix !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                        <i className={
                            holiday.crewSix === true ? "calendar icon" :
                                (holiday.crewSix === false ? "calendar suitcase icon" : (
                                    holiday.crewSix === "" ? "calendar times icon" : "calendar outline icon"))}>
                        </i>
                    </Link>
                    :
                    <button className="circular ui icon button"
                        disabled={holiday.crewSix === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewSix === undefined || this.props.userName !== 'Joe' && this.state.editModeValue === 'Edit Mode Off'}
                        onClick={() => {
                            if (this.state.editModeValue === 'Edit Mode Off') {
                                this.props.nameToggle(holiday._id, { "crewSix": !holiday.crewSix })
                            } else {
                                this.onClickFunction(6, holiday._id)
                            }
                        }}>
                        <i className={classNameSix}>
                        </i>
                    </button>
                crewSevenButton =
                    this.state.editModeValue === 'Edit Mode Off' ?
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: 'Daiva',
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== 'Admin' || holiday.crewSeven !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewSeven === true ? "calendar icon" :
                                    (holiday.crewSeven === false ? "calendar suitcase icon" : (
                                        holiday.crewSeven === "" ? "calendar times icon" : "calendar outline icon"))}>
                            </i>
                        </Link>
                        :
                        <button className="circular ui icon button"
                            disabled={holiday.crewSeven === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewSeven === undefined || this.props.userName !== 'Daiva' && this.state.editModeValue === 'Edit Mode Off'}
                            onClick={() => {
                                if (this.state.editModeValue === 'Edit Mode Off') {
                                    this.props.nameToggle(holiday._id, { "crewSeven": !holiday.crewSeven })
                                } else {
                                    this.onClickFunction(7, holiday._id)
                                }
                            }}>
                            <i className={classNameSeven}>
                            </i>
                        </button>
                crewEightButton =
                    this.state.editModeValue === 'Edit Mode Off' ?
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: 'Agnieszka',
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== 'Admin' || holiday.crewEight !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewEight === true ? "calendar icon" :
                                    (holiday.crewEight === false ? "calendar suitcase icon" : (
                                        holiday.crewEight === "" ? "calendar times icon" : "calendar outline icon"))}>
                            </i>
                        </Link>
                        :
                        <button className="circular ui icon button"
                            disabled={holiday.Eight === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewEight === undefined || this.props.userName !== 'Agnieszka' && this.state.editModeValue === 'Edit Mode Off'}
                            onClick={() => {
                                if (this.state.editModeValue === 'Edit Mode Off') {
                                    this.props.nameToggle(holiday._id, { "crewEight": !holiday.crewEight })
                                } else {
                                    this.onClickFunction(8, holiday._id)
                                }
                            }}>
                            <i className={classNameEight}>
                            </i>
                        </button>
                } else {
                crewOneButton = 
                    <button className="circular ui icon button"
                        disabled={holiday.crewOne === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewOne === undefined || this.props.userName !== this.props.users[0].userName && this.state.editModeValue === 'Edit Mode Off'}
                        onClick={() => { 
                            if (this.state.editModeValue === 'Edit Mode Off') {
                                this.props.nameToggle(holiday._id, { "crewOne": !holiday.crewOne })  
                            } else {
                                this.onClickFunction(1, holiday._id)
                            } 
                        }}>
                    <i className={classNameOne}>
                    </i>
                    </button>
                crewTwoButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewTwo === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewTwo === undefined || this.props.userName !== this.props.users[1].userName && this.state.editModeValue === 'Edit Mode Off'}
                        onClick={() => {
                            if (this.state.editModeValue === 'Edit Mode Off') {
                                this.props.nameToggle(holiday._id, { "crewTwo": !holiday.crewTwo })
                            } else {
                                this.onClickFunction(2, holiday._id)
                            }
                        }}>
                    <i className={classNameTwo}>
                    </i>
                    </button>
                crewThreeButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewThree === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewThree === undefined || this.props.userName !== this.props.users[2].userName && this.state.editModeValue === 'Edit Mode Off'}
                        onClick={() => {
                            if (this.state.editModeValue === 'Edit Mode Off') {
                                this.props.nameToggle(holiday._id, { "crewThree": !holiday.crewThree })
                            } else {
                                this.onClickFunction(3, holiday._id)
                            }
                        }}>
                    <i className={classNameThree}>
                    </i>
                    </button>
                crewFourButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewFour === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewFour === undefined || this.props.userName !== this.props.users[3].userName && this.state.editModeValue === 'Edit Mode Off'}
                        onClick={() => {
                            if (this.state.editModeValue === 'Edit Mode Off') {
                                this.props.nameToggle(holiday._id, { "crewFour": !holiday.crewFour })
                            } else {
                                this.onClickFunction(4, holiday._id)
                            }
                        }}>
                    <i className={classNameFour}>
                    </i>
                    </button>
                crewFiveButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewFive === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewFive === undefined || this.props.userName !== this.props.users[4].userName && this.state.editModeValue === 'Edit Mode Off'}
                        onClick={() => {
                            if (this.state.editModeValue === 'Edit Mode Off') {
                                this.props.nameToggle(holiday._id, { "crewFive": !holiday.crewFive })
                            } else {
                                this.onClickFunction(5, holiday._id)
                            }
                        }}>
                    <i className={classNameFive}>
                    </i>
                    </button>
                crewSixButton =
                    this.state.editModeValue === 'Edit Mode Off' ?
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: 'Joe',
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== 'Admin' || holiday.crewSix !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewSix === true ? "calendar icon" :
                                    (holiday.crewSix === false ? "calendar suitcase icon" : (
                                        holiday.crewSix === "" ? "calendar times icon" : "calendar outline icon"))}>
                            </i>
                        </Link>
                        :
                        <button className="circular ui icon button"
                            disabled={holiday.crewSix === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewSix === undefined || this.props.userName !== 'Joe' && this.state.editModeValue === 'Edit Mode Off'}
                            onClick={() => {
                                if (this.state.editModeValue === 'Edit Mode Off') {
                                    this.props.nameToggle(holiday._id, { "crewSix": !holiday.crewSix })
                                } else {
                                    this.onClickFunction(6, holiday._id)
                                }
                            }}>
                            <i className={classNameSix}>
                            </i>
                        </button>
                crewSevenButton =
                    this.state.editModeValue === 'Edit Mode Off' ?
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: 'Daiva',
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== 'Admin' || holiday.crewSeven !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewSeven === true ? "calendar icon" :
                                    (holiday.crewSeven === false ? "calendar suitcase icon" : (
                                        holiday.crewSeven === "" ? "calendar times icon" : "calendar outline icon"))}>
                            </i>
                        </Link>
                        :
                        <button className="circular ui icon button"
                            disabled={holiday.crewSeven === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewSeven === undefined || this.props.userName !== 'Daiva' && this.state.editModeValue === 'Edit Mode Off'}
                            onClick={() => {
                                if (this.state.editModeValue === 'Edit Mode Off') {
                                    this.props.nameToggle(holiday._id, { "crewSeven": !holiday.crewSeven })
                                } else {
                                    this.onClickFunction(7, holiday._id)
                                }
                            }}>
                            <i className={classNameSeven}>
                            </i>
                        </button>
                crewEightButton =
                    this.state.editModeValue === 'Edit Mode Off' ?
                        <Link
                            to={{
                                pathname: `/swap/${holiday.id}`,
                                state: {
                                    name: 'Agnieszka',
                                    id: holiday._id
                                }
                            }}
                            className={this.props.userName !== 'Admin' || holiday.crewEight !== true ? `disabled circular ui icon button` : `circular ui icon button restore-${holiday.id}`}>
                            <i className={
                                holiday.crewEight === true ? "calendar icon" :
                                    (holiday.crewEight === false ? "calendar suitcase icon" : (
                                        holiday.crewEight === "" ? "calendar times icon" : "calendar outline icon"))}>
                            </i>
                        </Link>
                        :
                        <button className="circular ui icon button"
                            disabled={holiday.Eight === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewEight === undefined || this.props.userName !== 'Agnieszka' && this.state.editModeValue === 'Edit Mode Off'}
                            onClick={() => {
                                if (this.state.editModeValue === 'Edit Mode Off') {
                                    this.props.nameToggle(holiday._id, { "crewEight": !holiday.crewEight })
                                } else {
                                    this.onClickFunction(8, holiday._id)
                                }
                            }}>
                            <i className={classNameEight}>
                            </i>
                        </button>
                crewNineButton =
                    <button className="circular ui icon button"
                        disabled={holiday.crewNine === null && this.state.editModeValue === 'Edit Mode Off' || holiday.crewNine === undefined || this.props.userName !== 'Elaine' && this.state.editModeValue === 'Edit Mode Off'}
                        onClick={() => {
                            if (this.state.editModeValue === 'Edit Mode Off') {
                                this.props.nameToggle(holiday._id, { "crewNine": !holiday.crewNine })
                            } else {
                                this.onClickFunction(9, holiday._id)
                            }
                        }}>
                        <i className={classNameNine}>
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
                        <td style={holiday.crewSix === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewSixButton}
                        </td>
                        <td style={holiday.crewSeven === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewSevenButton}
                        </td>
                        <td style={holiday.crewEight === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewEightButton}
                        </td>
                        <td style={holiday.crewNine === true ? { "background-color": "#58E162" } : { "background-color": "#FF7663" }}>
                            {crewNineButton}
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
                    <button className="ui right floated toggle button" value={'0'} onClick={this.toggleEditMode} disabled={this.props.userName !== 'Admin'}>
                        <i className="edit outline icon"></i>
                        {this.state.editModeValue}
                    </button>
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

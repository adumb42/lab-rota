import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { fetchHolidays, nameToggle, fetchHoliday, crewOneBench, crewTwoBench, crewThreeBench, crewFourBench, crewFiveBench, crewSixBench, crewSevenBench, crewEightBench, fetchUser } from '../../actions';
import { connect } from 'react-redux';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

class RotaHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = { startDate: null, endDate: null, active: null }
    }

    handleDateSubmit = () => {
        const { startDate, endDate } = this.state;
        moment(localStorage.setItem('startDate', startDate));
        moment(localStorage.setItem('endDate', endDate));
    };

    handleScrollPosition = () => {
        const scrollPosition = localStorage.getItem('scrollPosition');
        const mainWindow = document.getElementById('divToPrint');
        if (scrollPosition) {
            mainWindow.scrollTop = parseInt(scrollPosition);
            mainWindow.scrollLeft = 0
        };
    };

    onBenchChange = (e, i, id) => {
        const bArr = ["crewOneBench", "crewTwoBench", "crewThreeBench", "crewFourBench", "crewFiveBench", "crewSixBench", "crewSevenBench", "crewEightBench"]
        let selectedCrew = bArr[i]
        if (selectedCrew === "crewOneBench") {
            this.props.crewOneBench(id, { "crewOneBench": parseInt(e.target.value) })
        }
        if (selectedCrew === "crewTwoBench") {
            this.props.crewTwoBench(id, { "crewTwoBench": parseInt(e.target.value) })
        }
        if (selectedCrew === "crewThreeBench") {
            this.props.crewThreeBench(id, { "crewThreeBench": parseInt(e.target.value) })
        }
        if (selectedCrew === "crewFourBench") {
            this.props.crewFourBench(id, { "crewFourBench": parseInt(e.target.value) })
        }
        if (selectedCrew === "crewFiveBench") {
            this.props.crewFiveBench(id, { "crewFiveBench": parseInt(e.target.value) })
        }
        if (selectedCrew === "crewSixBench") {
            this.props.crewSixBench(id, { "crewSixBench": parseInt(e.target.value) })
        }
        if (selectedCrew === "crewSevenBench") {
            this.props.crewSevenBench(id, { "crewSevenBench": parseInt(e.target.value) })
        }
        else if (selectedCrew === "crewEightBench") {
            this.props.crewEightBench(id, { "crewEightBench": parseInt(e.target.value) })
        }
    }

    handleScroll = () => {
        const mainWindow = document.getElementById('divToPrint');
        localStorage.setItem('scrollPosition', mainWindow.scrollTop);
    };

    conditionalSum = function (values) {
        let sum = 0
        values.forEach(function (value) {
            if (value === true && value !== "") {
                sum += 1
            }
        })
        return sum
    }

    componentDidMount() {
        this.props.fetchHolidays();
        this.props.fetchUser();
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
            this.handleDateSubmit();
            this.handleScrollPosition();
        }        
    };

    printDocument(month) {
        const input = document.getElementById('divToPrint');
        html2canvas(input)
            .then((canvas) => {
                let imgWidth = 190;
                let imgHeight = canvas.height * imgWidth / canvas.width;
                const imgData = canvas.toDataURL('img/png');
                const imgData2 = new Image()
                imgData2.src = '/BritishSugarLogo_150318.png'
                const pdf = new jsPDF('p', 'mm', [297, 420]);
                pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
                pdf.text(215, 20, `Laboratory Day Crew Rota`)
                pdf.text(234, 30, `${month}`)
                pdf.addImage(imgData2, 'PNG', 210, 40)
                pdf.save(`Day Crew Rota ${month}.pdf`)
                this.pdfPrinted()
            })
    }

    clickMonthButton(month) {
        this.setState({ active: month })
    }

    pdfPrinted() {
        this.setState({ active: null })
    }

    renderHolidays() {
        return this.props.holidays.map(holiday => {
            let crewOneButton
            let crewTwoButton
            let crewThreeButton
            let crewFourButton
            let crewFiveButton
            let crewSixButton
            let crewSevenButton
            let crewEightButton
            const benchArr = [holiday.crewOneBench, holiday.crewTwoBench, holiday.crewThreeBench, holiday.crewFourBench, holiday.crewFiveBench, holiday.crewSixBench, holiday.crewSevenBench, holiday.crewEightBench]
            const crewArr = [holiday.crewOne, holiday.crewTwo, holiday.crewThree, holiday.crewFour, holiday.crewFive, holiday.crewSix, holiday.crewSeven, holiday.crewEight]
            const buttonArr = [crewOneButton, crewTwoButton, crewThreeButton, crewFourButton, crewFiveButton, crewSixButton, crewSevenButton, crewEightButton]
            const backgroundColorArr = [ {}, {}, {}, {}, {}, {}, {}, {}]
            const colourArray = ["silver", "salmon", "khaki", "paleturquoise", "palegreen", "#ffb6c1", "grey", "#b8e6bf", "#d4af37", "red"]
            const crewArrLength = crewArr.length
            const colourArrayLength = colourArray.length
            const buttonArrLength = buttonArr.length

            for (let i = 0; i < crewArrLength; i++) {
                if (crewArr[i]) {
                    for (let j = 0;  j < colourArrayLength; j++) {
                        if (benchArr[i] === j && crewArr[i] === true) {
                            backgroundColorArr[i] = { "backgroundColor": `${colourArray[j]}` }
                        }
                    }
                } else if (crewArr[i] === undefined) {
                    backgroundColorArr[i] = { "backgroundColor": "orange" }
                }
            }

            for (let i = 0; i < buttonArrLength; i++) {
                if (crewArr[i]) {
                    buttonArr[i] =
                        <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                            value={benchArr[i]}
                            onChange={(e) => this.onBenchChange(e, i, holiday._id)} style={{
                                "WebkitAppearance": "none",
                                "MozAppearance": "none",
                                "textIndent": "1px",
                                "textOverflow": '',
                                "border": "none",
                                "backgroundColor": "transparent"
                            }}>
                            <option value="0">LOTF</option>
                            <option value="1">PHX</option>
                            <option value="2">WS</option>
                            <option value="3">WWT</option>
                            <option value="4">UTI</option>
                            <option value="5">OSS</option>
                            <option value="7">WILM</option>
                            <option value="8">PROCM</option>
                            <option value="9">FLEX</option>
                        </select>
                    }
                else if (crewArr[i] === undefined) {
                    buttonArr[i] = 
                        <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                            value={benchArr[i]}
                            onChange={(e) => this.onBenchChange(e, i, holiday._id)} style={{
                                "WebkitAppearance": "none",
                                "MozAppearance": "none",
                                "textIndent": "1px",
                                "textOverflow": '',
                                "border": "none",
                                "backgroundColor": "transparent"
                            }}>
                            <option value="0">SPT</option>
                        </select>
                    }
                }
            
            let count = this.conditionalSum([holiday.crewOne, holiday.crewTwo, holiday.crewThree, holiday.crewFour, holiday.crewFive, holiday.crewSix, holiday.crewSeven, holiday.crewEight])

            while (
                moment(holiday.date, 'DD-MM-YYYY').valueOf() > moment(this.state.startDate - 86400000) &&
                moment(holiday.date, 'DD-MM-YYYY').valueOf() <= moment(this.state.endDate)
            )
                return (
                    <tbody className="maintable" id="maintable" key={holiday.id}>
                        <tr>
                            <td>{holiday.date}</td>
                            <td>{holiday.day}</td>
                            <td style={backgroundColorArr[0]}>
                                {buttonArr[0]}
                            </td>
                            <td style={backgroundColorArr[1]}>
                                {buttonArr[1]}
                            </td>
                            <td style={backgroundColorArr[2]}>
                                {buttonArr[2]}
                            </td>
                            <td style={backgroundColorArr[3]}>
                                {buttonArr[3]}
                            </td>
                            <td style={backgroundColorArr[4]}>
                                {buttonArr[4]}
                            </td>
                            <td style={backgroundColorArr[5]}>
                                {buttonArr[5]}
                            </td>
                            <td style={backgroundColorArr[6]}>
                                {buttonArr[6]}
                            </td>
                            <td style={backgroundColorArr[7]}>
                                {buttonArr[7]}
                            </td>
                            <td>{count}</td>
                        </tr>
                    </tbody>
                );
            }
        );
    }

    render() {
        if (!this.props.users[0]) { 
            return <div />
        } 
        return (
            <div className="search-bar ui segment">
                <h3>Click to print a pdf:</h3>
                <div className="ui buttons">
                    <button className={this.state.active === "September" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("September")
                        this.state.startDate =  moment('01-09-22', 'DD-MM-YY')
                        this.state.endDate = moment('30-09-22', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('September 2022')
                    }}>Sep</button>
                    <button className={this.state.active === "October" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("October")
                        this.state.startDate = moment('01-10-22', 'DD-MM-YY')
                        this.state.endDate = moment('31-10-22', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('October 2022')
                    }}>Oct</button>
                    <button className={this.state.active === "November" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("November")
                        this.state.startDate = moment('01-11-22', 'DD-MM-YY')
                        this.state.endDate = moment('30-11-22', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('November 2021')
                    }}>Nov</button>
                    <button className={this.state.active === "December" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("December")
                        this.state.startDate = moment('01-12-22', 'DD-MM-YY')
                        this.state.endDate = moment('31-12-22', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('December 2021')
                    }}>Dec</button>
                    <button className={this.state.active === "January" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("January")
                        this.state.startDate = moment('01-01-23', 'DD-MM-YY')
                        this.state.endDate = moment('31-01-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('January 2022')
                    }}>Jan</button>
                    <button className={this.state.active === "February" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("February")
                        this.state.startDate = moment('01-02-23', 'DD-MM-YY')
                        this.state.endDate = moment('28-02-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('February 2022')
                    }}>Feb</button>
                    <button className={this.state.active === "March" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("March")
                        this.state.startDate = moment('01-03-23', 'DD-MM-YY')
                        this.state.endDate = moment('31-03-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('March 2022')
                    }}>Mar</button>
                    <button className={this.state.active === "April" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("April")
                        this.state.startDate = moment('01-04-23', 'DD-MM-YY')
                        this.state.endDate = moment('30-04-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('April 2022')
                    }}>Apr</button>
                    <button className={this.state.active === "May" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("May")
                        this.state.startDate = moment('01-05-23', 'DD-MM-YY')
                        this.state.endDate = moment('31-05-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('May 2022')
                    }}>May</button>
                    <button className={this.state.active === "June" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("June")
                        this.state.startDate = moment('01-06-23', 'DD-MM-YY')
                        this.state.endDate = moment('30-06-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('June 2022')
                    }}>Jun</button>
                    <button className={this.state.active === "July" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("July")
                        this.state.startDate = moment('01-07-23', 'DD-MM-YY')
                        this.state.endDate = moment('31-07-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('July 2022')
                    }}>Jul</button>
                    <button className={this.state.active === "August" ? "ui basic loading button" : "ui button"} onClick={async (focusedInput) => {
                        this.clickMonthButton("August")
                        this.state.startDate = moment('01-08-23', 'DD-MM-YY')
                        this.state.endDate = moment('31-08-23', 'DD-MM-YY')
                        await this.setState({ focusedInput })
                        this.printDocument('August 2022')
                    }}>Aug</button>
                </div>
                <br></br>
                <br></br>
                <div className="App">
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
                </div>
                <br></br>
                <div id="divToPrint" 
                    style={{
                    "borderRadius": "3px",
                    "border": "1px solid lightGrey",
                    "maxHeight": "330vh",
                    "overflowY": "scroll",
                    "width": "100%"
                    }}
                    onScroll={this.handleScroll}>
                    <table className="ui celled table" style={{ border: "1px" }}>
                        <thead>
                            <tr>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 0 }}>Date</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 0 }}>Day</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>{this.props.users[0].userName}</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>{this.props.users[1].userName}</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>{this.props.users[2].userName}</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>{this.props.users[3].userName}</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>{this.props.users[4].userName}</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>Joe B</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>Daiva</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>A N Other</th>
                                <th style={{ "position": "webkitSticky", /* Safari */ "position": "sticky", "top": 0, "zIndex": 1 }}>Count</th>
                            </tr>
                        </thead>
                        {this.renderHolidays()}
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
    { fetchHolidays, nameToggle, fetchHoliday, crewOneBench, crewTwoBench, crewThreeBench, crewFourBench, crewFiveBench, crewSixBench, crewSevenBench, crewEightBench,fetchUser }
)(RotaHome);
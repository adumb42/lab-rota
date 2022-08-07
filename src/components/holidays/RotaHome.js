import React from 'react';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import { fetchHolidays, nameToggle, fetchHoliday, crewOneBench, crewTwoBench, crewThreeBench, crewFourBench, crewFiveBench, fetchUser } from '../../actions';
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
            let backgroundColorOne
            let backgroundColorTwo
            let backgroundColorThree
            let backgroundColorFour
            let backgroundColorFive

            if (holiday.crewOneBench === 0 && holiday.crewOne === true) {
                backgroundColorOne = { "backgroundColor": "silver" }
            } if (holiday.crewOneBench === 1 && holiday.crewOne === true) {
                backgroundColorOne = { "backgroundColor": "salmon" }
            } if (holiday.crewOneBench === 2 && holiday.crewOne === true) {
                backgroundColorOne = { "backgroundColor": "khaki" }
            } if (holiday.crewOneBench === 3 && holiday.crewOne === true) {
                backgroundColorOne = { "backgroundColor": "paleturquoise" }
            } if (holiday.crewOneBench === 4 && holiday.crewOne === true) {
                backgroundColorOne = { "backgroundColor": "palegreen" }
            } if (holiday.crewOneBench === 0 && holiday.crewOne === undefined) {
                backgroundColorOne = { "backgroundColor": "orange" }
            } if (holiday.crewOneBench === 7 && holiday.crewOne === true) {
                backgroundColorOne = { "backgroundColor": "orange" }
            }
            

            if (holiday.crewTwoBench === 0 && holiday.crewTwo === true) {
                backgroundColorTwo = { "backgroundColor": "silver" }
            } if (holiday.crewTwoBench === 1 && holiday.crewTwo === true) {
                backgroundColorTwo = { "backgroundColor": "salmon" }
            } if (holiday.crewTwoBench === 2 && holiday.crewTwo === true) {
                backgroundColorTwo = { "backgroundColor": "khaki" }
            } if (holiday.crewTwoBench === 3 && holiday.crewTwo === true) {
                backgroundColorTwo = { "backgroundColor": "paleturquoise" }
            } if (holiday.crewTwoBench === 4 && holiday.crewTwo === true) {
                backgroundColorTwo = { "backgroundColor": "palegreen" }
            } if (holiday.crewTwoBench === 0 && holiday.crewTwo === undefined) {
                backgroundColorTwo = { "backgroundColor": "orange" }
            } if (holiday.crewTwoBench === 7 && holiday.crewTwo === true) {
                backgroundColorTwo = { "backgroundColor": "orange" }
            }

            if (holiday.crewThreeBench === 0 && holiday.crewThree === true) {
                backgroundColorThree = { "backgroundColor": "silver" }
            } if (holiday.crewThreeBench === 1 && holiday.crewThree === true) {
                backgroundColorThree = { "backgroundColor": "salmon" }
            } if (holiday.crewThreeBench === 2 && holiday.crewThree === true) {
                backgroundColorThree = { "backgroundColor": "khaki" }
            } if (holiday.crewThreeBench === 3 && holiday.crewThree === true) {
                backgroundColorThree = { "backgroundColor": "paleturquoise" }
            } if (holiday.crewThreeBench === 4 && holiday.crewThree === true) {
                backgroundColorThree = { "backgroundColor": "palegreen" }
            } if (holiday.crewThreeBench === 0 && holiday.crewThree === undefined) {
                backgroundColorThree = { "backgroundColor": "orange" }
            } if (holiday.crewThreeBench === 7 && holiday.crewThree === true) {
                backgroundColorThree = { "backgroundColor": "orange" }
            }

            if (holiday.crewFourBench === 0 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "silver" }
            } if (holiday.crewFourBench === 1 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "salmon" }
            } if (holiday.crewFourBench === 2 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "khaki" }
            } if (holiday.crewFourBench === 3 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "paleturquoise" }
            } if (holiday.crewFourBench === 4 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "palegreen" }
            } if (holiday.crewFourBench === 0 && holiday.crewFour === undefined) {
                backgroundColorFour = { "backgroundColor": "orange" }
            } if (holiday.crewFourBench === 6 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "grey" }
            } if (holiday.crewFourBench === 7 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "orange" }
            } if (holiday.crewFourBench === 8 && holiday.crewFour === true) {
                backgroundColorFour = { "backgroundColor": "orange" }
            }

            if (holiday.crewFiveBench === 0 && holiday.crewFive === true) {
                backgroundColorFive = { "backgroundColor": "silver" }
            } if (holiday.crewFiveBench === 1 && holiday.crewFive === true) {
                backgroundColorFive = { "backgroundColor": "salmon" }
            } if (holiday.crewFiveBench === 2 && holiday.crewFive === true) {
                backgroundColorFive = { "backgroundColor": "khaki" }
            } if (holiday.crewFiveBench === 3 && holiday.crewFive === true) {
                backgroundColorFive = { "backgroundColor": "paleturquoise" }
            } if (holiday.crewFiveBench === 4 && holiday.crewFive === true) {
                backgroundColorFive = { "backgroundColor": "palegreen" }
            } if (holiday.crewFiveBench === 0 && holiday.crewFive === undefined) {
                backgroundColorFive = { "backgroundColor": "orange" }
            } if (holiday.crewFiveBench === 7 && holiday.crewFive === true) {
                backgroundColorFive = { "backgroundColor": "orange" }
            }
            
            switch (true) {
                case holiday.crewOne:
                    crewOneButton =
                        <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                            value={holiday.crewOneBench}
                            onChange={(e) => this.props.crewOneBench(holiday._id, { "crewOneBench": parseInt(e.target.value) })} style={{
                                "WebkitAppearance": "none",
                                "MozAppearance": "none",
                                "textIndent": "1px",
                                "textOverflow": '',
                                "border": "none",
                                "backgroundColor": "transparent"
                            }}>
                            <option value="0">NIR</option>
                            <option value="1">PHX</option>
                            <option value="2">WS</option>
                            <option value="3">WWT</option>
                            <option value="4">UTI</option>
                            <option value="7">BIOT</option>
                        </select>
            }

            if (holiday.crewOne === undefined) {
                crewOneButton =
                    <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                        value={holiday.crewOneBench}
                        onChange={(e) => this.props.crewOneBench(holiday._id, { "crewOneBench": parseInt(e.target.value) })} style={{
                            "WebkitAppearance": "none",
                            "MozAppearance": "none",
                            "textIndent": "1px",
                            "textOverflow": '',
                            "border": "none",
                            "backgroundColor": "transparent"
                        }}>
                        <option value="0">SPT</option>
                        <option value="1">SDO</option>
                    </select>
            }

            switch (true) {
                case holiday.crewTwo:
                    crewTwoButton =
                        <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                            value={holiday.crewTwoBench}
                            onChange={(e) => this.props.crewOneBench(holiday._id, { "crewTwoBench": parseInt(e.target.value) })} style={{
                                "WebkitAppearance": "none",
                                "MozAppearance": "none",
                                "textIndent": "1px",
                                "textOverflow": '',
                                "border": "none",
                                "backgroundColor": "transparent"
                            }}>
                            <option value="0">NIR</option>
                            <option value="1">PHX</option>
                            <option value="2">WS</option>
                            <option value="3">WWT</option>
                            <option value="4">UTI</option>
                            <option value="7">BIOT</option>
                        </select>  
            }

            if (holiday.crewTwo === undefined) {
                crewTwoButton =
                    <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                        value={holiday.crewTwoBench}
                        onChange={(e) => this.props.crewOneBench(holiday._id, { "crewTwoBench": parseInt(e.target.value) })} style={{
                            "WebkitAppearance": "none",
                            "MozAppearance": "none",
                            "textIndent": "1px",
                            "textOverflow": '',
                            "border": "none",
                            "backgroundColor": "transparent"
                        }}>
                        <option value="0">SPT</option>
                        <option value="1">SDO</option>
                    </select>
            }
                
            switch (true) {
                case holiday.crewThree:
                    crewThreeButton =
                        <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                            value={holiday.crewThreeBench}
                            onChange={(e) => this.props.crewOneBench(holiday._id, { "crewThreeBench": parseInt(e.target.value) })} style={{
                                "WebkitAppearance": "none",
                                "MozAppearance": "none",
                                "textIndent": "1px",
                                "textOverflow": '',
                                "border": "none",
                                "backgroundColor": "transparent"
                            }}>
                            <option value="0">NIR</option>
                            <option value="1">PHX</option>
                            <option value="2">WS</option>
                            <option value="3">WWT</option>
                            <option value="4">UTI</option>
                            <option value="7">BIOT</option>
                        </select>
            }

            if (holiday.crewThree === undefined) {
                crewThreeButton =
                    <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                        value={holiday.crewThreeBench}
                        onChange={(e) => this.props.crewOneBench(holiday._id, { "crewThreeBench": parseInt(e.target.value) })} style={{
                            "WebkitAppearance": "none",
                            "MozAppearance": "none",
                            "textIndent": "1px",
                            "textOverflow": '',
                            "border": "none",
                            "backgroundColor": "transparent"
                        }}>
                        <option value="0">SPT</option>
                        <option value="1">SDO</option>
                    </select>
            }
                
            switch (true) {
                case holiday.crewFour:
                    crewFourButton =
                        <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                            value={holiday.crewFourBench}
                            onChange={(e) => this.props.crewOneBench(holiday._id, { "crewFourBench": parseInt(e.target.value) })} style={{
                                "WebkitAppearance": "none",
                                "MozAppearance": "none",
                                "textIndent": "1px",
                                "textOverflow": '',
                                "border": "none",
                                "backgroundColor": "transparent"
                            }}>
                            <option value="0">NIR</option>
                            <option value="1">PHX</option>
                            <option value="2">WS</option>
                            <option value="3">WWT</option>
                            <option value="4">UTI</option>
                            <option value="7">TACT</option>
                            <option value="8">BIOT</option>
                        </select>
            }

            if (holiday.crewFour === undefined) {
                crewFourButton =
                    <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                        value={holiday.crewFourBench}
                        onChange={(e) => this.props.crewOneBench(holiday._id, { "crewFourBench": parseInt(e.target.value) })} style={{
                            "WebkitAppearance": "none",
                            "MozAppearance": "none",
                            "textIndent": "1px",
                            "textOverflow": '',
                            "border": "none",
                            "backgroundColor": "transparent"
                        }}>
                        <option value="0">SPT</option>
                        <option value="1">SDO</option>
                    </select>
            }
                
            switch (true) {
                case holiday.crewFive:
                    crewFiveButton =
                        <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                            value={holiday.crewFiveBench}
                            onChange={(e) => this.props.crewOneBench(holiday._id, { "crewFiveBench": parseInt(e.target.value) })} style={{
                                "WebkitAppearance": "none",
                                "MozAppearance": "none",
                                "textIndent": "1px",
                                "textOverflow": '',
                                "border": "none",
                                "backgroundColor": "transparent"
                            }}>
                            <option value="0">NIR</option>
                            <option value="1">PHX</option>
                            <option value="2">WS</option>
                            <option value="3">WWT</option>
                            <option value="4">UTI</option>
                            <option value="7">BIOT</option>
                        </select>
            }

            if (holiday.crewFive === undefined) {
                crewFiveButton =
                    <select className={this.props.userName !== "Admin" ? "disabled ui dropdown" : "ui dropdown"}
                        value={holiday.crewFiveBench}
                        onChange={(e) => this.props.crewOneBench(holiday._id, { "crewFiveBench": parseInt(e.target.value) })} style={{
                            "WebkitAppearance": "none",
                            "MozAppearance": "none",
                            "textIndent": "1px",
                            "textOverflow": '',
                            "border": "none",
                            "backgroundColor": "transparent"
                        }}>
                        <option value="0">SPT</option>
                        <option value="1">SDO</option>
                    </select>
            }
            
            let count = this.conditionalSum([holiday.crewOne, holiday.crewTwo, holiday.crewThree, holiday.crewFour, holiday.crewFive])

            while (
                moment(holiday.date, 'DD-MM-YYYY').valueOf() > moment(this.state.startDate - 86400000) &&
                moment(holiday.date, 'DD-MM-YYYY').valueOf() <= moment(this.state.endDate)
            )
                return (
                    <tbody className="maintable" id="maintable" key={holiday.id}>
                        <tr>
                            <td>{holiday.date}</td>
                            <td>{holiday.day}</td>
                            <td style={backgroundColorOne}>
                                {crewOneButton}
                            </td>
                            <td style={backgroundColorTwo}>
                                {crewTwoButton}
                            </td>
                            <td style={backgroundColorThree}>
                                {crewThreeButton}
                            </td>
                            <td style={backgroundColorFour}>
                                {crewFourButton}
                            </td>
                            <td style={backgroundColorFive}>
                                {crewFiveButton}
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
    { fetchHolidays, nameToggle, fetchHoliday, crewOneBench, crewTwoBench, crewThreeBench, crewFourBench, crewFiveBench, fetchUser }
)(RotaHome);
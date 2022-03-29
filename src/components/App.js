import React from 'react'
import Modal from './Modal'
import 'react-app-polyfill/stable'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import HolidayHome from './holidays/HolidayHome'
import HolidaySwap from './holidays/HolidaySwap'
import CrewOne from './holidays/crewOne'
import CrewTwo from './holidays/crewTwo'
import CrewThree from './holidays/crewThree'
import CrewFour from './holidays/crewFour'
import CrewFive from './holidays/crewFive'
import Header from './Header'
import history from '../history'
import RotaHome from './holidays/RotaHome'
import LoginPage from './holidays/LoginPage'
import PasswordEntry from './holidays/PasswordEntry'
import approvalPasswordEntry from './holidays/approvalPasswordEntry'
import { loginPassword } from '../actions'

class App extends React.Component {
    state = { passwordAttempt: 0, input: null, passwordLoading: false }

    handleChange = e => {
        this.setState({ input: e.target.value })
    }

    handleKeyDown = async (e) => {
        let typedValue = this.state.input
        if (e.key === "Enter" || e.type === "click") {
            await this.setState({ passwordLoading: true })
            this.props.loginPassword({
                "name": "laboratory",
                "password": typedValue
            }).then(() => {
                localStorage.setItem('password', this.props.password)
            }).then(() => {
                this.forceUpdate()
            }).then(() => {
                this.setState({ passwordLoading: false })
            }).catch(() => {
                this.setState({ passwordAttempt: this.state.passwordAttempt + 1 })
                this.setState({ passwordLoading: false })
            })
        }
    }

    render() {
        const password = localStorage.getItem('password')
        if (password === '$2a$08$evGZmvRc9HlT0hkxgfgnA.Eq10q5nkyQ0i3AvqJ/YEzpU07mOE7XO') {
            return (
                <div className="ui container">
                    <Router history={history}>
                        <div>
                            <Header />
                            <Route path="/" exact component={LoginPage} />
                            <Route path="/Holidays" exact component={HolidayHome} />
                            <Route path="/crewOne" exact component={CrewOne} />
                            <Route path="/crewTwo" exact component={CrewTwo} />
                            <Route path="/crewThree" exact component={CrewThree} />
                            <Route path="/crewFour" exact component={CrewFour} />
                            <Route path="/crewFive" exact component={CrewFive} />
                            <Route path="/rota" exact component={RotaHome} />
                            <Route path="/swap/:id" exact component={HolidaySwap} />
                            <Route path="/password" exact component={PasswordEntry} />
                            <Route path="/approvalPasswordEntry" exact component={approvalPasswordEntry} />
                        </div>
                    </Router>
                </div>
            )
        } else {
            return (
                <Modal
                    title="Enter Password"
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
                    onDismiss={() => history.push('/')}
                />
            )
        }
    }
}

const mapStateToProps = (state) => {
    return { ...state.passwords }
}

export default connect(
    mapStateToProps,
    { loginPassword }
)(App)

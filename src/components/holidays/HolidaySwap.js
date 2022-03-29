import React from 'react';
import Modal from '../Modal';
import history from '../../history';
import { connect } from 'react-redux';
import { fetchHoliday, nameToggle, fetchUser } from '../../actions';

class HolidaySwap extends React.Component {
    componentDidMount() {
        this.props.fetchHoliday(this.props.location.state.id);
        this.props.fetchUser();
    }

    renderActions() {
        const _id = this.props.location.state.id
        const crewOne = this.props.holiday.crewOne
        const crewTwo = this.props.holiday.crewTwo
        const crewThree = this.props.holiday.crewThree
        const crewFour = this.props.holiday.crewFour
        const crewFive = this.props.holiday.crewFive
        const getName = this.props.location.state.name
        const crewOneChange = () => this.props.nameToggle(_id, { "crewOne": null })
        const crewTwoChange = () => this.props.nameToggle(_id, { "crewTwo": null })
        const crewThreeChange = () => this.props.nameToggle(_id, { "crewThree": null })
        const crewFourChange = () => this.props.nameToggle(_id, { "crewFour": null })
        const crewFiveChange = () => this.props.nameToggle(_id, { "crewFive": null })
        
        let crewOneButton 
        let crewTwoButton 
        let crewThreeButton 
        let crewFourButton 
        let crewFiveButton 
        let nameChange

        if (getName === this.props.users[0].userName) {
            nameChange = crewOneChange
        } if (getName === this.props.users[1].userName) {
            nameChange = crewTwoChange
        } if (getName === this.props.users[2].userName) {
            nameChange = crewThreeChange
        } if (getName === this.props.users[3].userName) {
            nameChange = crewFourChange
        } if (getName === this.props.users[4].userName) {
            nameChange = crewFiveChange
        }

        if (crewOne === null && getName !== this.props.users[0].userName) {
            crewOneButton = <button className="ui button" onClick={() =>  { this.props.nameToggle(_id, { "crewOne": true });}}>{this.props.users[0].userName}</button>
        } if (crewTwo === null && getName !== this.props.users[1].userName) {
            crewTwoButton = <button className="ui button" onClick={() => { this.props.nameToggle(_id, { "crewTwo": true });}}>{this.props.users[1].userName}</button>
        } if (crewThree === null && getName !== this.props.users[2].userName) {
            crewThreeButton = <button className="ui button" onClick={() => { this.props.nameToggle(_id, { "crewThree": true });}}>{this.props.users[2].userName}</button>
        } if (crewFour === null && getName !== this.props.users[3].userName) {
            crewFourButton = <button className="ui button" onClick={() => { this.props.nameToggle(_id, { "crewFour": true });}}>{this.props.users[3].userName}</button>
        } if (crewFive === null && getName !== this.props.users[4].userName) {
            crewFiveButton = <button className="ui button" onClick={() => { this.props.nameToggle(_id, { "crewFive": true });}}>{this.props.users[4].userName}</button>
        } 

        return (
            <div onClick={nameChange}>
               {crewOneButton}
               {crewTwoButton}
               {crewThreeButton}
               {crewFourButton}
               {crewFiveButton}
            </div>
        );
    }

    render() {
        return (
            <Modal 
                title= {`Now that you have booked this ${this.props.holiday.day} off ${this.props.location.state.name}, you'll have to swap.`}
                content="Who would you like to swap with?"
                actions={this.renderActions()}
                onDismiss={() => history.push('/Holidays')}
            />
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return { 
        holiday: state.holidays[ownProps.match.params.id],
        users: Object.values(state.users)
    }
};

export default connect(mapStateToProps, { fetchHoliday, nameToggle, fetchUser })(HolidaySwap);

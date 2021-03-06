import React from 'react';
import PropTypes from 'prop-types';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';
// a = actions (shorthand)
import * as a from './../actions';

class TicketControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			//formVisibleOnPage: false,
			selectedTicket: null,
			editing: false
		};
	}

	componentDidMount() {
		this.waitTimeUpdateTimer = setInterval(
			() => this.updateTicketElapsedWaitTime(),
			60000
		);
	}

	componentWillUnmount() {
		console.log('component unmounted!');
		clearInterval(this.waitTimeUpdateTimer);
	}

	// this method will handle updating redux state
	updateTicketElapsedWaitTime = () => {
		// Start by deconstructing the dispatch function from this.props.
		const { dispatch } = this.props;
		// iterate over the values in the masterTicketList. For each ticket,
		// we determine the formattedWaitTime using the fromNow() method from Moment.js. You may wonder how we're able to use this method without importing Moment.js
		// we instantiated the Moment object in another component and the timeOpen property already has access to the fromNow() method.
		// Finally, we create and dispatch an action to update the time for a ticket.
		Object.values(this.props.masterTicketList).forEach((ticket) => {
			const newFormattedWaitTime = ticket.timeOpen.fromNow(true);
			const action = a.updateTime(ticket.id, newFormattedWaitTime);
			dispatch(action);
		});
	};

	handleClick = () => {
		if (this.state.selectedTicket != null) {
			this.setState({
				formVisibleOnPage: false,
				selectedTicket: null,
				editing: false
			});
		} else {
			const { dispatch } = this.props;
			// const action = {
			// 	type: 'TOGGLE_FORM'
			// };
			const action = a.toggleForm(); // new way after using action creators
			dispatch(action);
			// old way using local state below

			// this.setState((prevState) => ({
			// 	formVisibleOnPage: !prevState.formVisibleOnPage
			// }));
		}
	};

	handleAddingNewTicketToList = (newTicket) => {
		const { dispatch } = this.props;
		// Need to deconstruct values from newTicket so they
		// can be passed into reducer.
		// const { id, names, location, issue } = newTicket;
		// const action = {
		// 	type: 'ADD_TICKET',
		// 	id: id,
		// 	names: names,
		// 	location: location,
		// 	issue: issue
		// };

		// new way using action creators
		const action = a.addTicket(newTicket);
		dispatch(action);
		const action2 = a.toggleForm();
		dispatch(action2);

		// this dispatches the action and automatically updates the store.
		// dispatch(action);

		// const action2 = {
		// 	type: 'TOGGLE_FORM'
		// };
		// dispatch(action2);

		//this.setState({ formVisibleOnPage: false });

		// old, pre-redux way to handle ticketlist state.

		// const newMasterTicketList = this.state.masterTicketList.concat(newTicket);
		// this.setState({
		// 	masterTicketList: newMasterTicketList,
		// 	formVisibleOnPage: false
		// });
	};

	handleChangingSelectedTicket = (id) => {
		const selectedTicket = this.props.masterTicketList[id];
		this.setState({ selectedTicket: selectedTicket });
		// const selectedTicket = this.state.masterTicketList.filter(
		// 	(ticket) => ticket.id === id
		// )[0];
		// this.setState({ selectedTicket: selectedTicket });
	};

	handleDeletingTicket = (id) => {
		const { dispatch } = this.props;
		// const action = {
		// 	type: 'DELETE_TICKET',
		// 	id: id
		// };

		// using action creators
		const action = a.deleteTicket(id);
		dispatch(action);
		this.setState({ selectedTicket: null });

		// const newMasterTicketList = this.state.masterTicketList.filter(
		// 	(ticket) => ticket.id !== id
		// );
		// this.setState({
		// 	masterTicketList: newMasterTicketList,
		// 	selectedTicket: null
		// });
	};

	handleEditClick = () => {
		this.setState({ editing: true });
	};

	handleEditingTicketInList = (ticketToEdit) => {
		const { dispatch } = this.props;
		// const { id, names, location, issue } = ticketToEdit;
		// const action = {
		// 	type: 'ADD_TICKET',
		// 	id: id,
		// 	names: names,
		// 	location: location,
		// 	issue: issue
		// };

		// using action creators
		const action = a.addTicket(ticketToEdit);
		dispatch(action);
		this.setState({
			editing: false,
			selectedTicket: null
		});

		// const editedMasterTicketList = this.state.masterTicketList
		// 	.filter((ticket) => ticket.id !== this.state.selectedTicket.id)
		// 	.concat(ticketToEdit);
		// this.setState({
		// 	masterTicketList: editedMasterTicketList,
		// 	editing: false,
		// 	selectedTicket: null
		// });
	};

	render() {
		let currentlyVisibleState = null;
		let buttonText = null;
		if (this.state.editing) {
			currentlyVisibleState = (
				<EditTicketForm
					ticket={this.state.selectedTicket}
					onEditTicket={this.handleEditingTicketInList}
				/>
			);
			buttonText = 'Return to Ticket List';
		} else if (this.state.selectedTicket != null) {
			currentlyVisibleState = (
				<TicketDetail
					ticket={this.state.selectedTicket}
					onClickingDelete={this.handleDeletingTicket}
					onClickingEdit={this.handleEditClick}
				/>
			);
			buttonText = 'Return to Ticket List';
		} else if (this.props.formVisibleOnPage) {
			currentlyVisibleState = (
				<NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />
			);
			buttonText = 'Return to Ticket List';
		} else {
			currentlyVisibleState = (
				<TicketList
					ticketList={this.props.masterTicketList}
					onTicketSelection={this.handleChangingSelectedTicket}
				/>
			);
			buttonText = 'Add Ticket';
		}
		return (
			<React.Fragment>
				{currentlyVisibleState}
				<button onClick={this.handleClick}>{buttonText}</button>
			</React.Fragment>
		);
	}
}

TicketControl.propTypes = {
	masterTicketList: PropTypes.object
};

const mapStateToProps = (state) => {
	return {
		// Key-value pairs of state to be mapped from
		// Redux to React component go here.
		masterTicketList: state.masterTicketList,
		formVisibleOnPage: state.formVisibleOnPage
	};
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;

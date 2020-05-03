import React from 'react';
import PropTypes from 'prop-types';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';
import { connect } from 'react-redux';

class TicketControl extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			formVisibleOnPage: false,
			selectedTicket: null,
			editing: false
		};
	}

	handleClick = () => {
		if (this.state.selectedTicket != null) {
			this.setState({
				formVisibleOnPage: false,
				selectedTicket: null,
				editing: false
			});
		} else {
			this.setState((prevState) => ({
				formVisibleOnPage: !prevState.formVisibleOnPage
			}));
		}
	};

	handleAddingNewTicketToList = (newTicket) => {
		const { dispatch } = this.props;
		// Need to deconstruct values from newTicket so they
		// can be passed into reducer.
		const { id, names, location, issue } = newTicket;
		const action = {
			type: 'ADD_TICKET',
			id: id,
			names: names,
			location: location,
			issue: issue
		};
		// this dispatches the action and automatically updates the store.
		dispatch(action);
		this.setState({ formVisibleOnPage: false });

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
		const action = {
			type: 'DELETE_TICKET',
			id: id
		};
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
		const { id, names, location, issue } = ticketToEdit;
		const action = {
			type: 'ADD_TICKET',
			id: id,
			names: names,
			location: location,
			issue: issue
		};
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
		} else if (this.state.formVisibleOnPage) {
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
		masterTicketList: state
	};
};

TicketControl = connect(mapStateToProps)(TicketControl);

export default TicketControl;

import React from 'react';
import PropTypes from 'prop-types';
import Ticket from './Ticket';

function TicketList(props) {
	return (
		<React.Fragment>
			<hr />
			{/* We now need to map over the values of an object, not an array. */}
			{/* {props.ticketList.map((ticket) => */}
			{Object.values(props.ticketList).map((ticket) => {
				// Explicitly return the ticket object now
				return (
					<Ticket
						whenTicketClicked={props.onTicketSelection}
						names={ticket.names}
						location={ticket.location}
						issue={ticket.issue}
						id={ticket.id}
						key={ticket.id}
					/>
				);
			})}
		</React.Fragment>
	);
}

TicketList.propTypes = {
	ticketList: PropTypes.array,
	onTicketSelection: PropTypes.func
};

export default TicketList;

export const deleteTicket = (id) => ({
	type: 'DELETE_TICKET',
	id // shorthand for id: id
});

export const toggleForm = () => ({
	type: 'TOGGLE_FORM'
});

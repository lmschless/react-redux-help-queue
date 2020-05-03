export default (state = {}, action) => {
	switch (action.type) {
		case 'ADD_TICKET':
			const { names, location, issue, id } = action;
			return Object.assign({}, state, {
				[id]: {
					names: names,
					location: location,
					issue: issue,
					id: id
				}
			});
		default:
			return state;
	}
};

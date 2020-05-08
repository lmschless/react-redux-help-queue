import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	// state slice : REDUCER name that handles that slice
	formVisibleOnPage: formVisibleReducer,
	masterTicketList: ticketListReducer
});

export default rootReducer;

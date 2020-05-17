import formVisibleReducer from './form-visible-reducer';
import ticketListReducer from './ticket-list-reducer';
import { firestoreReducer } from 'redux-firestore';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	// state slice : REDUCER name that handles that slice
	formVisibleOnPage: formVisibleReducer,
	masterTicketList: ticketListReducer,
	firestore: firestoreReducer
});

export default rootReducer;

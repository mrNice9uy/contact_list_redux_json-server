import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ACTIONS } from './actions/actions';
import { setConnectionInProgressState } from './actions/contacts';
import { addContact, deleteContactById, editContactById, getContacts } from '../api/contacts';
import { openNotification } from '../utils/utils';

function* fetchContacts(action) {
	try {
		yield put(setConnectionInProgressState(true));
		const contacts = yield call(getContacts, action.payload);
		yield put({
			type: ACTIONS.GET_CONTACT_SUCCESS,
			payload: contacts,
		});
	} catch (e) {
		yield put({
			type: ACTIONS.GET_CONTACT_FAIL,
			payload: {
				message: e.message,
			},
		});
		openNotification('error', 'Error!', e.message);
	}
	yield put(setConnectionInProgressState(false));
}

function* addContactData(action) {
	const contactData = action.payload;
	try {
		yield put(setConnectionInProgressState(true));
		yield call(addContact, contactData);
		const reply = yield call(getContacts, action.payload);
		yield put({
			type: ACTIONS.GET_CONTACT_SUCCESS,
			payload: reply,
		});
		openNotification('success', 'Great!', 'Contact is added successfully.');
	} catch (e) {
		yield put({
			type: ACTIONS.GET_CONTACT_FAIL,
			payload: {
				message: e.message,
			},
		});
		openNotification('error', 'Error!', e.message);
	}
	yield put(setConnectionInProgressState(false));
}

function* deleteContact(action) {
	const contactId = action.payload;
	try {
		yield put(setConnectionInProgressState(true));
		yield call(deleteContactById, contactId);
		const reply = yield call(getContacts, {});
		yield put({
			type: ACTIONS.GET_CONTACT_SUCCESS,
			payload: reply,
		});
		openNotification('success', 'Great!', 'Contact is deleted successfully.');
	} catch (e) {
		yield put({
			type: ACTIONS.GET_CONTACT_FAIL,
			payload: {
				message: e.message,
			},
		});
		openNotification('error', 'Error!', e.message);
	}
	yield put(setConnectionInProgressState(false));
}

function* editContact(action) {
	const { contactId, name, email } = action.payload;
	const contactData = {
		name: name,
		email: email,
	};

	try {
		yield put(setConnectionInProgressState(true));
		yield call(editContactById, contactId, contactData);
		const reply = yield call(getContacts, {});
		yield put({
			type: ACTIONS.GET_CONTACT_SUCCESS,
			payload: reply,
		});
		openNotification('success', 'Great!', 'Contact is updated successfully.');
	} catch (e) {
		yield put({
			type: ACTIONS.GET_CONTACT_FAIL,
			payload: {
				message: e.message,
			},
		});
		openNotification('error', 'Error!', e.message);
	}
	yield put(setConnectionInProgressState(false));
}

export function* rootSaga() {
	yield all([
		takeEvery(ACTIONS.GET_CONTACT, fetchContacts),
		takeEvery(ACTIONS.ADD_CONTACT, addContactData),
		takeEvery(ACTIONS.DELETE_CONTACT, deleteContact),
		takeEvery(ACTIONS.UPDATE_CONTACT, editContact),
	]);
}

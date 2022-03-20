import { all, call, put, takeEvery } from "redux-saga/effects";
import { ACTIONS } from "./actions/actions";
import { getContacts } from "../api/contacts";

function* fetchContacts(action) {
  try {
    debugger;
    const contacts = yield call(getContacts, action.payload); //.id);
    yield put({
      type: ACTIONS.GET_CONTACT_SUCCESS,
      payload: contacts /* {
        data: contacts,
      },*/,
    });
  } catch (e) {
    yield put({
      type: ACTIONS.GET_CONTACT_FAIL,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* rootSaga() {
  yield all([takeEvery(ACTIONS.GET_CONTACT, fetchContacts)]);
}

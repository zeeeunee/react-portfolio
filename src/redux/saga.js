import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment, fetchHistory, fetchYoutube } from './api';
import * as types from './actionType';

//members
function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}

function* returnMembers() {
	try {
		const response = yield call(fetchDepartment);
		yield put({ type: types.MEMBERS.success, payload: response.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.fail, payload: err });
	}
}

//history
function* callHistory() {
	yield takeLatest(types.HISTORY.start, returnHistory);
}

function* returnHistory() {
	try {
		const response = yield call(fetchHistory);
		yield put({ type: types.HISTORY.success, payload: response.history });
	} catch (err) {
		yield put({ type: types.HISTORY.fail, payload: err });
	}
}

//youtube
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.youtube });
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory), fork(callYoutube)]);
}

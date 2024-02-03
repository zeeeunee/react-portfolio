import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment, fetchHistory, fetchYoutube, fetchFlickr, fetchBanner } from './api';
import * as types from './actionType';

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

function* callBanner() {
	yield takeLatest(types.BANNER.start, returnBanner);
}

function* returnBanner() {
	try {
		const response = yield call(fetchBanner);
		yield put({ type: types.BANNER.success, payload: response.banner });
	} catch (err) {
		yield put({ type: types.BANNER.fail, payload: err });
	}
}

function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}

function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: types.FLICKR.success, payload: response.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory), fork(callYoutube), fork(callFlickr), fork(callBanner)]);
}
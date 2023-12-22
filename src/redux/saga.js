import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment, fetchHistory, fetchYoutube, fetchFlickr } from './api';
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
		yield put({ type: types.YOUTUBE.success, payload: response.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

//flickr
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
//순서2 액션 객체파라미터 전달
function* returnFlickr(action) {
	try {
		//순서3 액션 객체에 같이 전달된 opt값을 call메서드의 두번째 인수로 전달
		//해당 두번째 인수값을 fetchFlickr함수에 전달
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: types.FLICKR.success, payload: response.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
	}
}

export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory), fork(callYoutube), fork(callFlickr)]);
}

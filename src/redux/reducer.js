import { combineReducers } from 'redux';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_HISTORY':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		case 'SET_YOUTUBE_ERR':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer });
export default reducers;

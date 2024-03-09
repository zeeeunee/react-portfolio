const path = process.env.PUBLIC_URL;

export const fetchDepartment = async () => {
	const data = await fetch(`${path}/DB/department.json`);
	const json = data.json();
	return json;
};

export const fetchHistory = async () => {
	const data = await fetch(`${path}/DB/history.json`);
	const json = data.json();
	return json;
};

export const fetchBanner = async () => {
	const data = await fetch(`${path}/DB/banner.json`);
	const json = data.json();
	return json;
};

export const fetchYoutube = async () => {
	const api_key = 'AIzaSyBQ0OBVJR5LwVP7O1wFRSbfMbLCLvWRLnE';
	const pid = 'PLM7Wu-2kzIQPISbXB5yK53ANqLA6I1IZs';
	const num = 8;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const data = await fetch(baseURL);
	const json = await data.json();
	return json;
};

export const fetchFlickr = async opt => {
	const num = 100;
	const flickr_api = '7973628e19035e31ccf3734cc641b14f';
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	const interestURL = `${baseURL}${method_interest}`;
	const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
	let url = '';
	const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;

	opt.type === 'user' && (url = userURL);
	opt.type === 'interest' && (url = interestURL);
	opt.type === 'search' && (url = searchURL);

	const data = await fetch(url);
	const json = await data.json();

	return json;
};

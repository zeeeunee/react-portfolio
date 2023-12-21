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

export const fetchYoutube = async () => {
	const api_key = 'AIzaSyBQ0OBVJR5LwVP7O1wFRSbfMbLCLvWRLnE';
	const pid = 'PLM7Wu-2kzIQNrTEyi14QDMjdugAx8sKNZ';
	const num = 6;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items;
};

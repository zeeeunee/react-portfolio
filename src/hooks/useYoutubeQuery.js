import { useQuery } from '@tanstack/react-query';

const fetchYoutube = async () => {
	const api_key = 'AIzaSyBQ0OBVJR5LwVP7O1wFRSbfMbLCLvWRLnE';
	const pid = 'PLM7Wu-2kzIQNrTEyi14QDMjdugAx8sKNZ';
	const num = 6;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
	try {
		const response = await fetch(baseURL);
		const data = await response.json();
		return data.items;
	} catch (err) {
		throw err;
	}
};

export const useYoutubeQuery = () => {
	return useQuery(['fetchYoutube'], fetchYoutube, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 100 * 60 * 60 * 24,
		retry: 3
	});
};

const fetchYoutubeById = async ({ queryKey }) => {
	const api_key = process.env.REACT_APP_YOUTUBE_API;
	const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${queryKey[1]}`;

	const data = await fetch(baseURL);
	const json = await data.json();
	return json.items[0].snippet;
};

export const useYoutubeQueryById = id => {
	return useQuery(['fetchYoutube', id], fetchYoutubeById, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3
	});
};

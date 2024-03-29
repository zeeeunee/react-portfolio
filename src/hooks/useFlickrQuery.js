import { useQuery } from '@tanstack/react-query';

const fetchFlickr = async ({ queryKey }) => {
	const num = 100;
	const flickr_api = '9a541cffc249a97f16605be38396de1c';
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';
	const interestURL = `${baseURL}${method_interest}`;
	const userURL = `${baseURL}${method_user}&user_id=${queryKey[1].id}`;
	const searchURL = `${baseURL}${method_search}&tags=${queryKey[1].keyword}`;
	let url = '';
	queryKey[1].type === 'user' && (url = userURL);
	queryKey[1].type === 'interest' && (url = interestURL);
	queryKey[1].type === 'search' && (url = searchURL);
	const data = await fetch(url);
	const json = await data.json();
	return json.photos.photo;
};

export const useFlickrQuery = opt => {
	return useQuery(['fetchFlickr', opt], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 100 * 60 * 60 * 24,
		retry: 3
	});
};

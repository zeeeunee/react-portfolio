import { useQuery } from '@tanstack/react-query';

const fetchFlickr = async ({ queryKey }) => {
	const num = 100;
	const flickr_api = '7973628e19035e31ccf3734cc641b14f';
	const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
	const method_interest = 'flickr.interestingness.getList';
	const method_user = 'flickr.people.getPhotos';
	const method_search = 'flickr.photos.search';

	const interestURL = `${baseURL}${method_interest}`;
	const userURL = `${baseURL}${method_user}&user_id=${queryKey[1].id}`;
	let url = '';
	const searchURL = `${baseURL}${method_search}&tags=${queryKey[1].keyword}`;

	queryKey[1].type === 'user' && (url = userURL);
	queryKey[1].type === 'interest' && (url = interestURL);
	queryKey[1].type === 'search' && (url = searchURL);

	const data = await fetch(url);
	const json = await data.json();

	return json.photos.photo;
};

export const useFlickrQuery = () => {
	return useQuery(['fetchFlickr'], fetchFlickr, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 100 * 60 * 60 * 24,
		retry: 3
	});
};

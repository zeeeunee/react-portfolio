import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchBanner = async () => {
	const response = await fetch(`${path}/DB/banner.json`);
	const data = await response.json();

	return data.banner;
};

export const useBannerQuery = () => {
	return useQuery(['fetchBanner'], fetchBanner, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 100 * 60 * 60 * 24,
		retry: 3
	});
};

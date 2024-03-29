export function useCookie() {
	const setCookie = (name, value, time) => {
		let now = new Date();
		let duedate = now.getTime() + 1000 * time;
		now.setTime(duedate);
		document.cookie = `${name}=${value}; path=/; expires=${now.toUTCString()}`;
		console.log(document.cookie);
	};

	const isCookie = cookieName => {
		if (document.cookie.indexOf(cookieName) < 0) return false;
		else return true;
	};

	const viewCookie = () => console.log(document.cookie);

	return { setCookie, isCookie, viewCookie };
}

export const fetchUser = () => {
	const userInfo =
		localStorage.getItem("user") !== "undefined"
			? JSON.parse(localStorage.getItem("user"))
			: localStorage.clear();

	return userInfo;
};

export const fetchRestUser = () => {
	const userInfo =
		localStorage.getItem("city:restuser") !== "undefined"
			? JSON.parse(localStorage.getItem("city:restuser"))
			: null;

	return userInfo;
};

export const fetchAdminUser = () => {
	const userInfo =
		localStorage.getItem("city:adminuser") !== "undefined"
			? JSON.parse(localStorage.getItem("city:adminuser"))
			: null;

	return userInfo;
};

export const setRestUser = (data = {}) => {
	localStorage.setItem("city:restuser", JSON.stringify(data));
};

export const setAdminUser = (data = {}) => {
	localStorage.setItem("city:adminuser", JSON.stringify(data));
};
export const delRestUser = () => {
	localStorage.removeItem("city:restuser");
};
export const delAdminUser = () => {
	localStorage.removeItem("city:adminuser");
};

export const fetchCart = () => {
	const cartInfo =
		localStorage.getItem("cartItems") !== "undefined"
			? JSON.parse(localStorage.getItem("cartItems"))
			: localStorage.clear();

	return cartInfo ? cartInfo : [];
};

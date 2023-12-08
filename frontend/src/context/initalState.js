import {
	fetchCart,
	fetchUser,
	fetchRestUser,
} from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const restUserInfo = fetchRestUser();
const cartInfo = fetchCart();

export const initialState = {
	user: userInfo,
	foodItems: null,
	cartShow: false,
	cartItems: cartInfo,
	restUser: restUserInfo,
};

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { motion } from "framer-motion";

import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import { insert_checkout_data } from "../schemas/checkout.schema";

import CartItem from "./CartItem";

const CartContainer = ({ cartItems, addToCart, removeFromCart, emptyCart }) => {
	const navigate = useNavigate();
	const [{ cartShow, user }, dispatch] = useStateValue();
	const [flag, setFlag] = useState(1);
	const [tot, setTot] = useState(0);
	const [isLoading, setisLoading] = useState(false);

	const { id: rest_doc_id } = useParams();

	const updateQty = (action = "remove", item) => {
		if (action === "remove") {
			removeFromCart(item);
		} else {
			addToCart(item);
		}
	};

	const showCart = () => {
		dispatch({
			type: actionType.SET_CART_SHOW,
			cartShow: !cartShow,
		});
	};

	useEffect(() => {
		let totalPrice = cartItems?.reduce(function (accumulator, item) {
		  return accumulator + parseFloat(item.qty) * parseFloat(item.price);
		}, 0);
		setTot(totalPrice);
	  }, [cartItems]);
	  

	const clearCart = () => {
		// emptyCart();
	};

	const checkout = async () => {
		setisLoading(true);
		const doc_id = await insert_checkout_data({
			rest_doc_id,
			uid: user.uid,
			cartItems,
		});
		navigate("/checkout/" + doc_id);
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: 200 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 200 }}
			className={`fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]`}>
			<div className="w-full flex items-center justify-between p-4 cursor-pointer">
				<motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
					<MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
				</motion.div>
				<p className="text-textColor text-lg font-semibold">Cart</p>
			</div>

			{/* bottom section */}
			{cartItems && cartItems.length > 0 ? (
				<div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
					{/* cart Items section */}
					<div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
						{/* cart Item */}
						{cartItems &&
							cartItems.length > 0 &&
							cartItems.map((item) => (
								<CartItem
									key={item.id}
									item={item}
									setFlag={setFlag}
									flag={flag}
									updateQty={updateQty}
								/>
							))}
					</div>

					{/* cart total section */}
					<div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Sub Total</p>
							<p className="text-gray-400 text-lg">£ {tot}</p>
						</div>
						<div className="w-full flex items-center justify-between">
							<p className="text-gray-400 text-lg">Delivery</p>
							<p className="text-gray-400 text-lg">£ 2.5</p>
						</div>

						<div className="w-full border-b border-gray-600 my-2"></div>

						<div className="w-full flex items-center justify-between">
							<p className="text-gray-200 text-xl font-semibold">Total</p>
							<p className="text-gray-200 text-xl font-semibold">
								£{tot + 2.5}
							</p>
						</div>

						{user ? (
							<motion.button
								whileTap={{ scale: 0.8 }}
								onClick={checkout}
								type="button"
								disabled={isLoading}
								className="w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg">
								{isLoading ? "Loading.." : "Checkout"}
							</motion.button>
						) : (
''
						)}
					</div>
				</div>
			) : (
				<div className="w-full h-full flex flex-col items-center justify-center gap-6">
					<img src={EmptyCart} className="w-300" alt="" />
					<p className="text-xl text-textColor font-semibold">
						Add some items to your cart
					</p>
				</div>
			)}
		</motion.div>
	);
};

export default CartContainer;

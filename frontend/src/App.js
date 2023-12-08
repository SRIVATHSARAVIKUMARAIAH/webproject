import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import RestaurantList from "./pages/RestaurantList";
import Checkout from "./pages/Checkout";
import RestDetails from "./pages/RestDetails";
import CustomerOrdersList from "./pages/OrderList";
import RestLogin from "./pages/RestLogin";
import Dashboard from "./pages/RestAdmin/Dashboard";
import FoodList from "./pages/RestAdmin/FoodList";
import AddFood from "./pages/RestAdmin/AddFood";
import EditFoodItem from "./pages/RestAdmin/EditFoodItem";
import ProfileDetails from "./pages/RestAdmin/ProfileDetails";
import OrdersList from "./pages/RestAdmin/OrdersList";
import PromoCodesList from "./pages/RestAdmin/PromoCodes";
import AdminLogin from "./pages/Admin/Login";
import AdminDash from "./pages/Admin/Dashboard";
import AdminRestList from "./pages/Admin/RestList";
import AdminOrdersList from "./pages/Admin/OrdersList";
import AdminUserList from "./pages/Admin/UserList";
import AdminUserOrderList from "./pages/Admin/UserOrderList";
import OrderDeatils from "./pages/OrderDeatils";
import { checkAuthAsync, selectLoggedInUser, selectisAuthChecked } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';


import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";

import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import {Protected} from './features/auth/components/Protected'
import { useDispatch, useSelector } from "react-redux";



const App = () => {
	const [{}, dispatch] = useStateValue();


	const reduxDispatch=useDispatch()

	const fetchData = async () => {
		await getAllFoodItems().then((data) => {
			dispatch({
				type: actionType.SET_FOOD_ITEMS,
				foodItems: data,
			});
		});
	};

	const loggedInUser=useSelector(selectLoggedInUser)
	const isAuthChecked=useSelector(selectisAuthChecked)
  
	useEffect(()=>{
	  reduxDispatch(checkAuthAsync())
	},[])
  
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<AnimatePresence exitBeforeEnter>
			<div className="w-screen h-auto flex flex-col bg-primary">

				{
				isAuthChecked && 
				<Routes>
					<Route path="/login" element={<LoginPage/>}></Route>
					<Route path="/signup" element={<SignupPage/>}></Route>
					<Route path="/logout" element={<Logout/>}></Route>
					<Route path="/" element={<Protected><RestaurantList /></Protected>}/>
					<Route path="/restaurant/:id" element={<Protected><RestDetails /></Protected>}/>
					{/* <Route path="/checkout/:id" element={
						<Protected>
							<Checkout/>
						</Protected>
						}
					/> */}
					<Route path="/orders"
						element={
							<Protected>
								<CustomerOrdersList />
							</Protected>
						}
					/>
					<Route path="/restaurant-login" element={<Protected><RestLogin /></Protected>}/>
					<Route path="/rest-admin"
						element={
							<Protected>
								<Dashboard />
							</Protected>

						}
					/>
					<Route path="/rest-food-list"
						element={
							<Protected>
								<FoodList />
							</Protected>
						}
					/>
					<Route
						path="/rest-add-food"
						element={
							<Protected>
								<AddFood />
							</Protected>
						}
					/>
					<Route
						path="/rest-food-item/:id/edit"
						element={
							<Protected>
								<EditFoodItem />
							</Protected>
						}
					/>
					<Route
						path="/rest-order-list"
						element={
							<Protected>
								<OrdersList />
							</Protected>
						}
					/>
					<Route
						path="/rest-codes-list"
						element={
							<Protected>
								<PromoCodesList />
							</Protected>
						}
					/>
					<Route
						path="/rest-profile-details"
						element={
							<Protected>
								<ProfileDetails />
							</Protected>
						}
					/>
					<Route path="/admin-login" element={<AdminLogin />} />
					<Route
						path="/admin"
						element={
							<Protected>
								<AdminDash />
							</Protected>
						}
					/>
					<Route
						path="/admin-rest-list"
						element={
							<Protected>
								<AdminRestList />
							</Protected>
						}
					/>
					<Route
						path="/admin-orders-list"
						element={
							<Protected>
								<AdminOrdersList />
							</Protected>
						}
					/>
					<Route
						path="/admin-users-list"
						element={
							<Protected>
								<AdminUserList />
							</Protected>
						}
					/>
					<Route
						path="/admin-user-order-list/:id"
						element={
							<Protected>
								<AdminUserOrderList />
							</Protected>
						}
					/>
					<Route path="/order-details/:id" element={<OrderDeatils />} />
				</Routes>
}
			</div>
			{/* <Footer /> */}
		</AnimatePresence>
	);
};

export default App;

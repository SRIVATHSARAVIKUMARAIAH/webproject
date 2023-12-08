import React from "react";
import {
	FaPlusCircle,
	FaChevronRight,
	FaRegCalendar,
	FaRegSun,
	FaTachometerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { delRestUser } from "../utils/fetchLocalStorageData";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const Sidebar = () => {
	const navigate = useNavigate();
	const [{}, dispatch] = useStateValue();

	const logout = () => {
		delRestUser();
		dispatch({
			type: actionType.SET_REST_USER,
			restUser: null,
		});

		navigate("/");
	};

	return (
		<div className="bg-orange-500 h-screen px-[25px]">
			<div className="px-[12px] py-[25px] flex items-center justify-center border-b-[2px] border-[#EDEDED]/[0.3]">
				<h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
					Dashboard
				</h1>
			</div>

			<div className="flex items-center gap-[15px] py-[15px] border-b-[2px] border-[#EDEDED]/[0.3] text-white">
				<FaTachometerAlt />
				<Link to={"/rest-admin"}>
					<p className="text-[14px] font-bold leading-[20px] text-white">
						Dashboard
					</p>
				</Link>
			</div>

			<div className="pt-[15px] border-b-[2px] border-[#EDEDED]/[0.3]">
				<p className="text-[14px] font-extrabold leading-[16px] text-white/[0.4]">
					Food
				</p>

				<Link
					to="/rest-food-list"
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaRegCalendar />
						<p className="text-[14px] leading-7 font-normal">Food Items</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
				<Link
					to={"/rest-add-food"}
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaPlusCircle />
						<p className="text-[14px] leading-7 font-normal">Add Items</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
			</div>
			<div className="pt-[15px] border-b-[2px] border-[#EDEDED]/[0.3]">
				<p className="text-[14px] font-extrabold leading-[16px] text-white/[0.4]">
					Orders
				</p>

				<Link
					to="/rest-order-list"
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaRegCalendar />
						<p className="text-[14px] leading-7 font-normal">Orders</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
				<Link
					to="/rest-codes-list"
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaRegCalendar />
						<p className="text-[14px] leading-7 font-normal">Promo Codes</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
			</div>
			<div className="pt-[15px] border-b-[2px] border-[#EDEDED]/[0.3]">
				<p className="text-[14px] font-extrabold leading-[16px] text-white/[0.4]">
					Profile
				</p>

				<Link
					to="/rest-profile-details"
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaRegSun />
						<p className="text-[14px] leading-7 font-normal">Profile Details</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
				<button
					onClick={logout}
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaRegSun />
						<p className="text-[14px] leading-7 font-normal">Log Out</p>
					</div>
				</button>
				{/* <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaWrench />
						<p className="text-[14px] leading-7 font-normal">Account Details</p>
					</div>
					<FaChevronRight color="white" />
				</div> */}
			</div>
		</div>
	);
};

export default Sidebar;

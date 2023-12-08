import React from "react";
import {
	FaUsers,
	FaChevronRight,
	FaRegCalendar,
	FaTachometerAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { delAdminUser } from "../utils/fetchLocalStorageData";

const AdminSidebar = () => {

	const navigte = useNavigate()

	const logout  = () =>{
		delAdminUser();
		navigte("/")
	}

	return (
		<div className="bg-[#7D1E6A] h-screen px-[25px]">
			<div className="px-[12px] py-[25px] flex items-center justify-center border-b-[2px] border-[#EDEDED]/[0.3]">
				<h1 className="text-white text-[20px] leading-[24px] font-extrabold cursor-pointer">
					Admin Dashboard
				</h1>
			</div>

			<div className="flex items-center gap-[15px] py-[15px] border-b-[2px] border-[#EDEDED]/[0.3] text-white">
				<FaTachometerAlt />
				<Link to={"/admin"}>
					<p className="text-[14px] font-bold leading-[20px] text-white">
						Dashboard
					</p>
				</Link>
			</div>

			<div className="pt-[15px] border-b-[2px] border-[#EDEDED]/[0.3]">
				<p className="text-[14px] font-extrabold leading-[16px] text-white/[0.4]">
					Restaurants
				</p>

				<Link
					to="/admin-rest-list"
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaRegCalendar />
						<p className="text-[14px] leading-7 font-normal">Restaurants</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
			</div>
			<div className="pt-[15px] border-b-[2px] border-[#EDEDED]/[0.3]">
				<p className="text-[14px] font-extrabold leading-[16px] text-white/[0.4]">
					Orders
				</p>

				<Link
					to="/admin-orders-list"
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaRegCalendar />
						<p className="text-[14px] leading-7 font-normal">Orders</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
			</div>
			<div className="pt-[15px] border-b-[2px] border-[#EDEDED]/[0.3]">
				<p className="text-[14px] font-extrabold leading-[16px] text-white/[0.4]">
					Users
				</p>

				<Link
					to="/admin-users-list"
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaUsers />
						<p className="text-[14px] leading-7 font-normal">Users List</p>
					</div>
					<FaChevronRight color="white" />
				</Link>
				{/* <div className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaWrench />
						<p className="text-[14px] leading-7 font-normal">Account Details</p>
					</div>
					<FaChevronRight color="white" />
				</div> */}
			</div>
			<div className="pt-[15px] border-b-[2px] border-[#EDEDED]/[0.3]">
				<p className="text-[14px] font-extrabold leading-[16px] text-white/[0.4]">
					Utils
				</p>

				<button
					onClick={logout}
					className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer">
					<div className="flex items-center gap-[10px] text-white">
						<FaUsers />
						<p className="text-[14px] leading-7 font-normal">Log out</p>
					</div>
				</button>
				
			</div>
		</div>
	);
};

export default AdminSidebar;

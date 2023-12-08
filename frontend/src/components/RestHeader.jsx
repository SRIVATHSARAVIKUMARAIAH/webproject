import React from "react";
// import { FaEnvelope, FaRegBell, FaSearch } from "react-icons/fa";
import Profile from "../img/avatar.png";

const RestHeader = ({ name }) => {
	return (
		<div className="flex items-center justify-between h-[70px] shadow-md px-[25px]">
			<div className="flex items-center rounded-sm">
				<h2 className="text-2xl">{name}</h2>
				{/* <input
					type="search"
					className="bg-[#F8F9FC] h-[35px] outline-none pl-[13px] w-[300px] rounded-md placeholder:text-[14px] leading-[20px] font-normal"
					placeholder="search for ..."
				/>
				<div className="bg-[#7D1E6A] h-[35px] px-[14px] flex items-center justify-center cursor-pointer rounded-tr-md rounded-br-md">
					<FaSearch color="white" />
				</div> */}
			</div>

			<div className="flex items-center gap-6 relative">
				<div className="flex items-center gap-8 border-r-[2px] pr-[25px]">
					{/* <FaRegBell />
					<FaEnvelope /> */}
				</div>
				<div className="flex items-center gap-5 relative">
					<p>Restaurant User</p>
					<div className=" cursor-pointer flex items-center justify-center relative">
						<img
							src={Profile}
							alt="profile"
							className="w-[50px] h-[50px] rounded-full"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RestHeader;

import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./AdminSidebar";
import RestHeader from "./AdminHeader";

const AdminPageContainer = ({ children, name }) => {
	return (
		<div className="flex">
			<div className="basis-[15%] h-[100vh]">
				<Sidebar />
			</div>
			<div className="basis-[85%] border">
				<RestHeader name={name} />
				<div className="pt-[25px] px-[25px]">{children}</div>
				<div>
					<Outlet></Outlet>
				</div>
			</div>
		</div>
	);
};

export default AdminPageContainer;

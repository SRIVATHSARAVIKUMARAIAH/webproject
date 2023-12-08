import React, { useEffect, useState } from "react";

import { FaEllipsisV, FaUsers } from "react-icons/fa";
import { BiRestaurant, BiStats } from "react-icons/bi";

import PieComponent from "./PieComponent";
import Loader from "../../../components/Loader";
import AdminPageContainer from "../../../components/AdminPage.container";

import {
	orders_count,
	fetch_orders_by_rest_id,
} from "../../../schemas/orders.schema";
import {
	rests_count,
	fetchAllRestData,
} from "../../../schemas/restuser.schema";
import { users_count } from "../../../schemas/users.schema";

const Index = () => {
	const [isLoading, setisLoading] = useState(false);
	const [rest_details, setrest_details] = useState([]);
	const [counts, setcounts] = useState({
		rests: 0,
		users: 0,
		placed: 0,
		cancelled: 0,
		pending: 0
	});

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);

				const data = await orders_count();
				const rests = await rests_count();
				const users = await users_count();

				const rests_data = [];

				const all_rests = await fetchAllRestData();

				for (const rest of all_rests) {
					const order_data = await fetch_orders_by_rest_id(rest.doc_id);
					if (order_data) {
						const pending_ord = order_data.filter(
							(v) => v.status === "pending"
						);
						const cancel_ord = order_data.filter((v) => v.status === "cancel");
						const place_ord = order_data.filter((v) => v.status === "placed");

						rests_data.push({
							...rest,
							placed_count: place_ord.length,
							cancel_count: cancel_ord.length,
							pending_count: pending_ord.length,
							total_revenue: place_ord.reduce(function (accumulator, item) {
								return accumulator + parseFloat(item.total_price);
							}, 0),
						});
					}
				}

				setcounts({
					rests,
					users,
					placed: data.placed,
					cancelled: data.cancelled,
					pending: data.pending
				});
				setrest_details(rests_data.sort(
					(r1, r2) => (r1.total_revenue < r2.total_revenue) ? 1 : (r1.total_revenue > r2.total_revenue) ? -1 : 0));
			} catch (error) {
				console.log(error);
			} finally {
				setisLoading(false);
			}
		})();
	}, []);

	if (isLoading) {
		return (
			<center>
				<Loader />
			</center>
		);
	}

	return (
		<AdminPageContainer name={"Dashboard"}>
			<div>
				<div className="flex items-center justify-between">
					<h1 className="text-[#5a5c69] text-[25px] leading-[34px] font-medium cursor-pointer">
						Dashboard
					</h1>
					{/* <button className="bg-[#7D1E6A] h-[32px]  rounded-md text-white flex items-center justify-center px-[20px] cursor-pointer">
						Generate Report
					</button> */}
				</div>

				<div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
					<div className="h-[90px] rounded-[8px] bg-white border-l-[4px] border-[#7D1E6A] flex items-center justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
						<div>
							<h2 className="text-[#7D1E6A] text-[11px] leading-[17px] font-bold">
								Total Restaurants
							</h2>
							<h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
								{counts.rests}
							</h1>
						</div>
						<BiRestaurant fontSize={25} color="" />
					</div>

					<div className="h-[90px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
						<div>
							<h2 className="text-[#4E73DF] text-[11px] leading-[17px] font-bold">
								Total Users
							</h2>
							<h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
								{counts.users}
							</h1>
						</div>
						<FaUsers fontSize={25} color="" />
					</div>

					<div className="h-[90px] rounded-[8px] bg-white border-l-[4px] border-[#FDFF00] flex items-center justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
						<div>
							<h2 className="text-[#5a5c69] text-[11px] leading-[17px] font-bold">
								Placed Orders
							</h2>
							<h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
								{counts.placed}
							</h1>
						</div>
						<BiStats fontSize={25} color="" />
					</div>

					<div className="h-[90px] rounded-[8px] bg-white border-l-[4px] border-[#F2921D] flex items-center justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
						<div>
							<h2 className="text-[#7D1E6A] text-[11px] leading-[17px] font-bold">
								Cancellled Orders
							</h2>
							<h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
								{counts.cancelled}
							</h1>
						</div>
						<BiStats fontSize={25} color="" />
					</div>
				</div>

				<div className="flex mt-[22px] w-full gap-[20px]">
					<div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-sm">
						<div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[2px] border-[#EDEDED mb-[20px]">
							<h2 className="font-medium">Top Restaurants</h2>
							<FaEllipsisV color="grey" className="cursor-pointer" />
						</div>
						<div>
							<table class="items-center bg-transparent w-full border-collapse ">
								<thead>
									<tr>
										<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Title
										</th>
										<th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Total Placed Orders
										</th>
										<th class="px-6s bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Total Cancelled Orders
										</th>
										<th class="px-6s bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Total Pending Orders
										</th>
										<th class="px-6s bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Revenue
										</th>
									</tr>
								</thead>

								<tbody>
									{rest_details.map((v, i) => (
										<tr key={i}>
											<th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
												{v.title}
											</th>
											<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
												{v.placed_count}
											</td>
											<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
												{v.cancel_count}
											</td>
											<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
												{v.pending_count}
											</td>
											<td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
												&pound;{v.total_revenue}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>

					<div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-sm">
						<div className="bg-[#F8F9FC] flex items-center justify-between font-medium py-[15px] px-[20px] border-b-[2px] border-[#EDEDED]">
							<h2>Revenue Resources</h2>
							<FaEllipsisV color="grey" className="cursor-pointer" />
						</div>

						<div className="flex items-center justify-center">
							<PieComponent placed={counts.placed} cancel={counts.cancelled} pending={counts.pending} />
						</div>
					</div>
				</div>
			</div>
		</AdminPageContainer>
	);
};

export default Index;

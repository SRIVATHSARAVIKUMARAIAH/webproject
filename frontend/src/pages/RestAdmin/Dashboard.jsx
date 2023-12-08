import React, { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import { BiStats } from "react-icons/bi";

import PieComponent from "./PieComponent";
import Loader from "../../components/Loader";
import RestPageContainer from "../../components/RestPage.container";

import { useStateValue } from "../../context/StateProvider";
import { fetch_orders_by_rest_id } from "../../schemas/orders.schema";

const Dashboard = () => {
	const [{ restUser }] = useStateValue();
	const [isLoading, setisLoading] = useState(false);
	const [counts, setcounts] = useState({
		pending: 0,
		cancel: 0,
		placed: 0,
		total: 0,
	});

	const [pending_orders, setpending_orders] = useState([]);

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);

				const data = await fetch_orders_by_rest_id(restUser.uid);

				const pending_ord = data.filter((v) => v.status === "pending");
				const cancel_ord = data.filter((v) => v.status === "cancel");
				const place_ord = data.filter((v) => v.status === "placed");

				setcounts({
					pending: pending_ord.length,
					cancel: cancel_ord.length,
					placed: place_ord.length,
					total: data.length,
				});
				setpending_orders(pending_ord);
			} catch (error) {
				console.log(error);
			} finally {
				setisLoading(false);
			}
		})();
	}, [restUser.uid]);

	if (isLoading) {
		return (
			<center>
				<Loader />
			</center>
		);
	}

	return (
		<RestPageContainer name={"Dashboard"}>
			<div className="pt-[25px] px-[25px]">
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
								Pending Orders
							</h2>
							<h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
								{counts.pending}
							</h1>
						</div>
						<BiStats fontSize={25} color="" />
					</div>

					<div className="h-[90px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-8 cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out">
						<div>
							<h2 className="text-[#4E73DF] text-[11px] leading-[17px] font-bold">
								Total Orders
							</h2>
							<h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
								{counts.total}
							</h1>
						</div>
						<BiStats fontSize={25} color="" />
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
								Cancelled Orders
							</h2>
							<h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
								{counts.cancel}
							</h1>
						</div>
						<BiStats fontSize={25} color="" />
					</div>
				</div>

				<div className="flex mt-[22px] w-full gap-[20px]">
					<div className="basis-[70%] border bg-white shadow-md cursor-pointer rounded-sm">
						<div className="bg-[#F8F9FC] flex items-center justify-between py-[15px] px-[20px] border-b-[2px] border-[#EDEDED mb-[20px]">
							<h2 className="font-medium">Pending Orders</h2>
						</div>
						<div>
							<table className="items-center bg-transparent w-full border-collapse ">
								<thead>
									<tr>
										<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											User Name
										</th>
										<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											No. Of Items
										</th>
										<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Order Price
										</th>
										<th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
											Address
										</th>
									</tr>
								</thead>

								<tbody>
									{pending_orders.map((v, i) => (
										<tr key={i}>
											<th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
												{v.name}
											</th>
											<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
												{v.cartItems.length}
											</td>
											<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
												&pound;{v.total_price}
											</td>
											<td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
												<i className="fas fa-arrow-down text-red-500 mr-4"></i>
												{v.address}
											</td>
										</tr>
									))}
									{ pending_orders.length === 0 && <center>NO PENDING ORDERS!</center> }
								</tbody>
							</table>
						</div>
					</div>

					<div className="basis-[30%] border bg-white shadow-md cursor-pointer rounded-sm">
						<div className="bg-[#F8F9FC] flex items-center justify-between font-medium py-[15px] px-[20px] border-b-[2px] border-[#EDEDED]">
							<h2>Orders Overview</h2>
							<FaEllipsisV color="grey" className="cursor-pointer" />
						</div>

						<div className="flex items-center justify-center">
							<PieComponent pending={counts.pending} cancel={counts.cancel} placed={counts.placed} />
						</div>
					</div>
				</div>
			</div>
		</RestPageContainer>
	);
};

export default Dashboard;

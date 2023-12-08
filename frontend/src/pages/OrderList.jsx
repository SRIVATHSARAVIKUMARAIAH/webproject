import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'

import CustomerPageContainer from "../components/CustomerPage.container";
import Loader from "../components/Loader";

import { useStateValue } from "../context/StateProvider";
import { fetch_orders_by_user_uid } from "../schemas/orders.schema";
import {insert_checkout_data} from "../schemas/checkout.schema"

const OrdersList = () => {
	const [{ user }] = useStateValue();
	const navigate = useNavigate()

	const [isLoading, setisLoading] = useState(false);
	const [orders, setorders] = useState([]);

	const handleViewDetails = (order_id) =>{
		navigate("/order-details/"+order_id)
	}

	const checkout = async(data) => {
		setisLoading(true);
		let rest_doc_id = data.rest_doc_id
		let cartItems = data.cartItems
		const doc_id = await insert_checkout_data({
			rest_doc_id,
			uid: user.uid,
			cartItems,
		})
		localStorage.setItem('incoming', JSON.stringify(data));
		navigate("/checkout/"+doc_id+"?repeated=true");
	};

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);
				const data = await fetch_orders_by_user_uid(user.uid);
				console.log(data, "ck");
				setorders(data);
			} catch (error) {
				console.log(error);
			} finally {
				setisLoading(false);
			}
		})();
	}, [user.uid]);

	if (isLoading) {
		return (
			<center>
				<Loader />
			</center>
		);
	}

	return (
		<CustomerPageContainer name="Order List">

        {orders.length ===0 &&
			<div style={{ textAlign: 'center' }}>
				You have placed no Orders
				</div>
			}
    {orders.length !==0 &&

			<div className="pt-[25px] px-[25px]">
				<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
					{/* <div class="align-middle rounded-tl-lg rounded-tr-lg inline-block w-full py-4 overflow-hidden bg-white shadow-lg px-12">
						<div class="flex justify-between">
							<div class="inline-flex border rounded w-7/12 px-2 lg:px-6 h-12 bg-transparent">
								<div class="flex flex-wrap items-stretch w-full h-full mb-6 relative">
									<div class="flex">
										<span class="flex items-center leading-normal bg-transparent rounded rounded-r-none border border-r-0 border-none lg:px-3 py-2 whitespace-no-wrap text-grey-dark text-sm">
											<svg
												width="18"
												height="18"
												class="w-4 lg:w-auto"
												viewBox="0 0 18 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M8.11086 15.2217C12.0381 15.2217 15.2217 12.0381 15.2217 8.11086C15.2217 4.18364 12.0381 1 8.11086 1C4.18364 1 1 4.18364 1 8.11086C1 12.0381 4.18364 15.2217 8.11086 15.2217Z"
													stroke="#455A64"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
												<path
													d="M16.9993 16.9993L13.1328 13.1328"
													stroke="#455A64"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</span>
									</div>
									<input
										type="text"
										class="flex-shrink flex-grow flex-auto leading-normal tracking-wide w-px flex-1 border border-none border-l-0 rounded rounded-l-none px-3 relative focus:outline-none text-xxs lg:text-xs lg:text-base text-gray-500 font-thin"
										placeholder="Search"
									/>
								</div>
							</div>
						</div>
					</div> */}
					<div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
						<table class="min-w-full">
							<thead>
								<tr>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
										Order ID
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										Restuarant Name
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										Postcode
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										Price
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										Status
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										Created At
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300">Details</th>
									<th class="px-6 py-3 border-b-2 border-gray-300">Repeat Orders</th>
								</tr>
							</thead>
							<tbody class="bg-white">
								{orders.map((v, i) => (
									<tr key={i}>
										<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
											<div class="flex items-center">
												<div>
													<div class="text-sm leading-5 text-gray-800">
														#{v.doc_id}
													</div>
												</div>
											</div>
										</td>
										<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
											<div class="text-sm leading-5 text-blue-900">
												{v.rest_details.title}
											</div>
										</td>
										<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
											{v.postcode}
										</td>
										<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
											&pound;{v.total_price}
										</td>
										<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
											{v.status === "pending" ? (
												<span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
													<span
														aria-hidden
														class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
													<span class="relative text-xs">Pending</span>
												</span>
											) : v.status === "placed" ? (
												<span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
													<span
														aria-hidden
														class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
													<span class="relative text-xs">placed</span>
												</span>
											) : (
												<span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
													<span
														aria-hidden
														class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
													<span class="relative text-xs">Cancelled</span>
												</span>
											)}
										</td>
										<td class="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-blue-900 text-sm leading-5">
											{v.created_at?.toDate()?.toString()}
										</td>
										<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
											<button onClick={() =>handleViewDetails(v.doc_id)} class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
												View Details
											</button>
										</td>
										<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
											<button onClick={() =>checkout(v)} class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
												Repeat order
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
}
		</CustomerPageContainer>
	);
};

export default OrdersList;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetch_single_order } from "../schemas/orders.schema";
import Loader from "../components/Loader";

const OrderDeatils = () => {
	const { id: order_doc_id } = useParams();
	const [isLoading, setisLoading] = useState(false);
	const [details, setdetails] = useState({});

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);

				const data = await fetch_single_order(order_doc_id);
				setdetails(data);
			} catch (error) {
			} finally {
				setisLoading(false);
			}
		})();
	}, [order_doc_id]);

	if (isLoading) {
		return (
			<center>
				<Loader />
			</center>
		);
	}

	if (!details.status) {
		return <center> NO Page Found!</center>;
	}

	console.log(details);

	return (
		<div class="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
			<div class="flex justify-start item-start space-y-2 flex-col">
				<h1 class="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9">
					Order #{details.doc_id}
				</h1>
				<p class="text-base font-medium leading-6">
					{details.created_at?.toDate()?.toString()}
				</p>
				<p class="whitespace-no-wrap text-blue-900 border-gray-500 text-sm leading-5">
					{details.status === "pending" ? (
						<span class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
							<span
								aria-hidden
								class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
							<span class="relative text-xs">Pending</span>
						</span>
					) : details.status === "placed" ? (
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
				</p>
			</div>
			<div class="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
				<div class="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
					<div class="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
						<p class="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
							Items
						</p>
						{details.cartItems.map((v, i) => (
							<div
								key={i}
								class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
								<div class="pb-4 md:pb-8 w-full md:w-40">
									<img
										class="w-full hidden md:block"
										src={v.imageURL}
										alt="food"
									/>
									<img class="w-full md:hidden" src={v.imageURL} alt="food" />
								</div>

								<div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
									<div class="w-full flex flex-col justify-start items-start space-y-8">
										<h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
											{v.title}
										</h3>
										{/* <div class="flex justify-start items-start flex-col space-y-2">
											<p class="text-sm dark:text-white leading-none text-gray-800">
												<span class="dark:text-gray-400 text-gray-300">
													Restaurant:{" "}
												</span>{" "}
												
											</p>
										</div> */}
									</div>
									<div class="flex justify-between space-x-8 items-start w-full">
										<p class="text-base dark:text-white xl:text-lg leading-6">
											&pound;{v.price}
											{/* <span class="text-red-300 line-through"> $45.00</span> */}
										</p>
										<p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
											{v.qty}
										</p>
										<p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
											&pound;{v.price * v.qty}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
					<div class="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
						<div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
							<h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
								Summary
							</h3>
							<div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
								<div class="flex justify-between w-full">
									<p class="text-base dark:text-white leading-4 text-gray-800">
										Subtotal
									</p>
									<p class="text-base dark:text-gray-300 leading-4 text-gray-600">
										&pound;{details.sub_total}
									</p>
								</div>
								{/* <div class="flex justify-between items-center w-full">
									<p class="text-base dark:text-white leading-4 text-gray-800">
										Discount{" "}
										<span class="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
											STUDENT
										</span>
									</p>
									<p class="text-base dark:text-gray-300 leading-4 text-gray-600">
										-$28.00 (50%)
									</p>
								</div> */}
								<div class="flex justify-between items-center w-full">
									<p class="text-base dark:text-white leading-4 text-gray-800">
										Taxes
									</p>
									<p class="text-base dark:text-gray-300 leading-4 text-gray-600">
										&pound;{details.total_price-details.sub_total}
									</p>
								</div>
								{/* {details.substract_amount && ( 	 */}
									<div class="flex justify-between items-center w-full">
										<p class="text-base dark:text-white leading-4 text-gray-800">
											Repeat Order Discount
										</p>
										<p class="text-base text-red-600 leading-4">
											-&pound;{details.substract_amount}
										</p>
									</div>
								 {/* )}  */}

								{details.code_data && (
									<div class="flex justify-between items-center w-full">
										<p class="text-base dark:text-white leading-4 text-gray-800">
											{details.code_data.title} ({details.code_data.off}% Off)
										</p>
										<p class="text-base text-red-600 leading-4">
											-&pound;{details.percent_price_to_deduct}
										</p>
									</div>
								)}
							</div>
							<div class="flex justify-between items-center w-full">
								<p class="text-base dark:text-white font-semibold leading-4 text-gray-800">
									Total
								</p>
								<p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
									&pound;{details.total_price}
								</p>
							</div>
						</div>
						{/* <div class="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
							<h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
								Shipping
							</h3>
							<div class="flex justify-between items-start w-full">
								<div class="flex justify-center items-center space-x-4">
									<div class="w-8 h-8">
										<img
											class="w-full h-full"
											alt="logo"
											src="https://i.ibb.co/L8KSdNQ/image-3.png"
										/>
									</div>
									<div class="flex flex-col justify-start items-center">
										<p class="text-lg leading-6 dark:text-white font-semibold text-gray-800">
											DPD Delivery
											<br />
											<span class="font-normal">Delivery with 24 Hours</span>
										</p>
									</div>
								</div>
								<p class="text-lg font-semibold leading-6 dark:text-white text-gray-800">
									$8.00
								</p>
							</div>
							<div class="w-full flex justify-center items-center">
								<button class="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
									View Carrier Details
								</button>
							</div>
						</div> */}
					</div>
				</div>
				<div class="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
					<h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">
						Customer
					</h3>
					<div class="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
						<div class="flex flex-col justify-start items-start flex-shrink-0">
							<div class="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
								<div class="flex justify-start items-start flex-col space-y-2">
									<p class="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
										{details.name}
									</p>
								</div>
							</div>

							<div class="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
								<p class="cursor-pointer text-sm leading-5 ">
									{details.contact}
								</p>
							</div>
						</div>
						<div class="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
							<div class="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
								<div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
									<p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
										Address
									</p>
									<p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
										{details.address}, {details.city} {details.postcode}
									</p>
								</div>
								{/* <div class="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
									<p class="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
										Billing Address
									</p>
									<p class="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
										180 North King Street, Northhampton MA 1060
									</p>
								</div> */}
							</div>
							{/* <div class="flex w-full justify-center items-center md:justify-start md:items-start">
								<button class="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
									Edit Details
								</button>
							</div> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderDeatils;

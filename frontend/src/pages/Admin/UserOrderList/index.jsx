import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import AdminPageContainer from "../../../components/AdminPage.container";
import Loader from "../../../components/Loader";

import { fetch_orders_by_user_uid } from "../../../schemas/orders.schema";
import { fetch_user_by_uid } from "../../../schemas/users.schema";

const Index = () => {
	const { id: uid } = useParams();

	const [isLoading, setisLoading] = useState(false);
	const [orders, setorders] = useState([]);
	const [user, setuser] = useState({});

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);

				const user_details = await fetch_user_by_uid(uid);
				const data = await fetch_orders_by_user_uid(uid);

				setuser(user_details);
				setorders(data);
			} catch (error) {
				console.log(error);
			} finally {
				setisLoading(false);
			}
		})();
	}, [uid]);

	if (isLoading) {
		return (
			<center>
				<Loader />
			</center>
		);
	}

	return (
		<AdminPageContainer name={"User Order List"}>
			<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
				{orders.length === 0 ? <center>No Data</center> : ""}
				<table class="w-full text-sm text-left text-gray-500">
					<caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white">
						{user.displayName}'s Orders
						<p class="mt-1 text-sm font-normal text-gray-500">
							List of orders placed by users
						</p>
					</caption>

					<thead class="text-xs uppercase bg-gray-700 text-gray-400">
						<tr>
							<th scope="col" class="px-6 py-3">
								Order Id
							</th>
							<th scope="col" class="px-6 py-3">
								Restaurant
							</th>
							<th scope="col" class="px-6 py-3">
								Total Item
							</th>
							<th scope="col" class="px-6 py-3">
								Price
							</th>
							<th scope="col" class="px-6 py-3">
								Address
							</th>
							<th scope="col" class="px-6 py-3">
								<span class="sr-only">View</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((v, i) => (
							<tr
								key={i}
								class="bg-white border-b bg-gray-800">
								<th
									scope="row"
									class="px-6 py-4 font-medium text-black whitespace-nowrap">
									#{v.doc_id}
								</th>
								<th
									scope="row"
									class="px-6 py-4 font-medium text-black whitespace-nowrap">
									{v.rest_details.title}
								</th>
								<td class="px-6 py-4 text-black">{v.cartItems.length}</td>
								<td class="px-6 py-4 text-black">&pound;{v.total_price}</td>
								<td class="px-6 py-4 text-black">{v.address}</td>
								<td class="px-6 py-4 text-right">
									<Link
										to={"/order-details/"+v.doc_id}
										class="font-medium text-blue-500 hover:underline">
										View
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</AdminPageContainer>
	);
};

export default Index;

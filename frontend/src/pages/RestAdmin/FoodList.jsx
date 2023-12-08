import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import RestPageContainer from "../../components/RestPage.container";
import {
	fetchAllFoodItemsData,
	deleteFoodItem,
	deleteImage,
} from "../../schemas/food_items.schema";
import { useStateValue } from "../../context/StateProvider";

const FoodList = () => {
	const [isLoading, setisLoading] = useState(false);
	const [items, setitems] = useState([]);

	const [{ restUser }] = useStateValue();

	const deleteItem = async (doc_id, image_url) => {
		if (
			window.confirm(
				"Are you sure you want to delete this food item? you cannot revert back?"
			)
		) {
			try {
				setisLoading(true);
				await deleteImage(image_url);
				await deleteFoodItem(doc_id);
				await fetchfoodList();
				alert("Deleted Successfully!!");
			} catch (error) {
				alert("Something Went wrong while deleting the item!!");
			} finally {
				setisLoading(false);
			}
		}
	};

	const fetchfoodList = useCallback(async () => {
		try {
			setisLoading(true);
			const data = await fetchAllFoodItemsData(restUser.uid);
			setitems(data);
		} catch (error) {
		} finally {
			setisLoading(false);
		}
	}, [restUser.uid]);

	useEffect(() => {
		fetchfoodList();
	}, [fetchfoodList]);

	return (
		<RestPageContainer name="Food List">
			<div className="pt-[25px] px-[25px]">
				<h1 className="text-xl my-5">Food Items</h1>
				{isLoading ? <center>Loading...</center> : ""}
				{items.length > 0 ? (
					<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
						<table className="w-full text-sm text-left text-gray-500">
							<thead className="text-xs text-gray-700 uppercase bg-orange-200">
								<tr>
									<th scope="col" className="px-6 py-3">
										Image
									</th>
									<th scope="col" className="px-6 py-3">
										Name
									</th>
									<th scope="col" className="px-6 py-3">
										Veg/Non Veg
									</th>
									<th scope="col" className="px-6 py-3">
										Category
									</th>
									<th scope="col" className="px-6 py-3">
										Price
									</th>
									<th scope="col" className="px-6 py-3">
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{items.map((v, i) => (
									<tr key={i} className="bg-white border-b bg-gray-800">
										<th
											scope="row"
											className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
											<img
												width={"50"}
												height={"50"}
												src={v.imageURL}
												alt="food item"
											/>
										</th>
										<th
											scope="row"
											className="px-6 py-4 font-medium text-black whitespace-nowrap">
											{v.title}
										</th>
										<td className="px-6 py-4 text-black">{v.isVeg ? "Veg" : "Nonveg"}</td>
										<td className="px-6 py-4 text-black">{v.category}</td>
										<td className="px-6 py-4 text-black">&pound; {v.price}</td>
										<td className="px-6 py-4 text-black">
											<Link
												to={`/rest-food-item/${v.doc_id}/edit`}
												className="font-medium text-blue-600 hover:underline px-5">
												Edit
											</Link>
											<button
												onClick={() => deleteItem(v.doc_id, v.imageURL)}
												className="font-medium text-blue-600 hover:underline">
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<center className="w-full p-2 rounded-lg text-center text-lg font-semibold bg-emerald-400 text-emerald-800">
						NO DATA
					</center>
				)}
			</div>
		</RestPageContainer>
	);
};

export default FoodList;

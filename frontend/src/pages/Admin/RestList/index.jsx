import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminPageContainer from "../../../components/AdminPage.container";
import Loader from "../../../components/Loader";

import { fetchAllRestData } from "../../../schemas/restuser.schema";

const Index = () => {
	const [isLoading, setisLoading] = useState(false);
	const [rests, setrests] = useState([]);


	useEffect(() => {
		
		(async () => {
			try {
				setisLoading(true);
                
				const data = await fetchAllRestData();
				console.log(data);
               // console.log(data,"yeswanth")
				setrests(data);
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
		<AdminPageContainer name={"Restaurants"}>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left ">
					<thead className="text-xs text-gray-700 uppercase bg-white-300">
						<tr>
							<th scope="col" className="px-6 py-3">
								Title
							</th>
							<th scope="col" className="px-6 py-3">
								Type
							</th>
							<th scope="col" className="px-6 py-3">
								Address
							</th>
							<th scope="col" className="px-6 py-3">
								Contact
							</th>

							<th scope="col" className="px-6 py-3">
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{
							rests.map((v,i) => <tr key={i} className="bg-white border-b bg-gray-800">
							<th
								scope="row"
								className="px-6 py-4 font-medium  whitespace-nowrap">
								{v.title}
							</th>
							<td className="px-6 py-4 text-black">{ v.veg ? "Veg" : "" }{ v.nonveg ? ", Nonveg" : "" }</td>
							<td className="px-6 py-4 text-black">{v.city}, zip:{v.zip}</td>
							<td className="px-6 py-4 text-black">{v.contact}</td>

							<td className="px-6 py-4 text-black">
								<Link
									to={"/restaurant/"+v.doc_id}
									className="font-medium text-blue-600 text-black hover:underline">
									View Details
								</Link>
							</td>
						</tr>)
						}
					</tbody>
				</table>
			</div>
		</AdminPageContainer>
	);
};

export default Index;

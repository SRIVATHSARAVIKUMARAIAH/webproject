import React, { useEffect, useState } from "react";

import Loader from "../../components/Loader";
import RestPage from "../../components/RestPage.container";

import { useStateValue } from "../../context/StateProvider";
import {
	fetchAllCodesData,
	insert_code_data,
	deletePromoItem,
} from "../../schemas/promo_codes.schema";

const PromoCodes = () => {
	const [{ restUser }] = useStateValue();

	const [isLoading, setisLoading] = useState(false);
	const [isAddLoading, setisAddLoading] = useState(false);
	const [isOpen, setisOpen] = useState(false);
	const [formState, setformState] = useState({
		title: "",
		off: "",
	});
	const [codes, setcodes] = useState([]);

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		setformState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setisAddLoading(true);

			const doc_id = await insert_code_data({
				...formState,
				rest_id: restUser.uid,
			});

			setcodes((prev) => [...prev, { ...formState, doc_id }]);
			setformState({});
			setisOpen(false);
		} catch (error) {
			alert("Something went wrong!");
		} finally {
			setisAddLoading(false);
		}
	};

	const handleDelete = async (doc_id) => {
		try {
			setisLoading(true);

			await deletePromoItem(doc_id);

			setcodes((prev) => prev.filter((v) => v.doc_id !== doc_id));
		} catch (error) {
			alert("Something went wrong!");
		} finally {
			setisLoading(false);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);
				const data = await fetchAllCodesData(restUser.uid);
				setcodes(data);
			} catch (error) {
				alert("Something went wrong!");
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
		<RestPage name="Promo Codes List">
			<div className="pt-[25px] px-[25px]">
				<button
					type="submit"
					onClick={() => setisOpen(true)}
					class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
					Add Promo Code
				</button>
				<div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 pr-10 lg:px-8">
					<div class="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
						<table class="min-w-full">
							<thead>
								<tr>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
										ID
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										Title
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										% Off
									</th>
									<th class="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
										Delete
									</th>
								</tr>
							</thead>
							<tbody class="bg-white">
								{codes.map((v, i) => (
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
												{v.title}
											</div>
										</td>
										<td class="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
											{v.off}% Off
										</td>

										<td class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
											<button
												onClick={() => handleDelete(v.doc_id)}
												class="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div
				className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${
					isOpen ? "" : "hidden"
				}`}
				id="modal">
				<form
					onSubmit={handleSubmit}
					class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
					<div class="fixed inset-0 transition-opacity">
						<div class="absolute inset-0 bg-gray-900 opacity-75" />
					</div>
					<span class="hidden sm:inline-block sm:align-middle sm:h-screen">
						&#8203;
					</span>
					<div
						class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
						role="dialog"
						aria-modal="true"
						aria-labelledby="modal-headline">
						<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
							<label class="font-medium text-gray-800">Title</label>
							<input
								type="text"
								name="title"
								value={formState.title}
								onChange={onChangeHandler}
								class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
								required
							/>
							<label class="font-medium text-gray-800">% Off</label>
							<input
								type="number"
								name="off"
								value={formState.off}
								onChange={onChangeHandler}
								max={100}
								class="w-full outline-none rounded bg-gray-100 p-2 mt-2 mb-3"
								required
							/>
						</div>
						<div class="bg-gray-200 px-4 py-3 text-right">
							<button
								type="button"
								class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
								onClick={() => setisOpen(false)}>
								<i class="fas fa-times"></i> Cancel
							</button>
							<button
								type="submit"
								disabled={isAddLoading}
								class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2">
								<i class="fas fa-plus"></i>{" "}
								{isAddLoading ? "Loading..." : "Create"}
							</button>
						</div>
					</div>
				</form>
			</div>
		</RestPage>
	);
};

export default PromoCodes;

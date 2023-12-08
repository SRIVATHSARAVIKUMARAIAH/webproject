import React, { useEffect, useState } from "react";

import CartContainer from "../components/CartContainer";
import HotelList from "../components/HotelList";
import CustomerPage from "../components/CustomerPage.container";

import { useStateValue } from "../context/StateProvider";
import { fetchAllRestData } from "../schemas/restuser.schema";
import Loader from "../components/Loader";

const MainContainer = () => {
	const [{ cartShow }] = useStateValue();
	const [isLoading, setisLoading] = useState(false);
	const [restlist, setrestlist] = useState([]);
	const [filteredList, setfilteredList] = useState([]);
	const [filter, setfilter] = useState("both");
	const [searchInput, setsearchInput] = useState("");

	const handleChange = (e) => {
		setfilter(e.target.value);
	};

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);
				const data = await fetchAllRestData();
				setrestlist(data);
				setfilteredList(data);
			} catch (error) {
				console.log(error);
				alert("Something went wrong!");
			} finally {
				setisLoading(false);
			}
		})();
	}, []);

	useEffect(() => {
		const do_match = (title = "") =>
			title?.toLowerCase()?.includes(searchInput?.toLowerCase());
		if (filter === "veg") {
			setfilteredList(restlist.filter((v) => v.veg && do_match(v.title)));
			return;
		}
		if (filter === "nonveg") {
			setfilteredList(restlist.filter((v) => v.nonveg && do_match(v.title)));
			return;
		}
		if (filter === "both") {
			setfilteredList(
				restlist.filter((v) => (v.nonveg || v.veg) && do_match(v.title))
			);
			return;
		}
	}, [filter, restlist, searchInput]);

	return (
		<CustomerPage>
			<div className="w-full h-auto flex flex-col items-center justify-center min-h-full">
				<section class="showcase-area border w-[100%]" id="showcase">
					<div class="showcase-container">
						<div>
							<h1 class="text-5xl text-center mb-2" id="home">
								Eat Right Food
							</h1>
							<p className="text-2xl text-center">
								Eat Healty, it is good for our health.
							</p>
						</div>
						<a
							href="#rest"
							class="bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100">
							Find Restaurants
						</a>
					</div>
				</section>
				<section id="rest" className="w-full my-6">
					{isLoading ? <Loader /> : null}
					<div className="w-full flex items-center justify-between">
						<p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
							Top restaurant
						</p>
					</div>
					<div className="mt-4 flex w-full justify-between">
						<div>
							<p>Filters:</p>
							<select onChange={handleChange} name="filter">
								<option value={"veg"} selected={filter === "veg"}>
									Veg
								</option>
								<option value={"nonveg"} selected={filter === "nonveg"}>
									Non Veg
								</option>
								<option value={"both"} selected={filter === "both"}>
									Both
								</option>
							</select>
						</div>
						<div>
							<form>
								<div class="relative">
									<div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
										<svg
											class="w-4 h-4 text-gray-500"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 20 20">
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
											/>
										</svg>
									</div>
									<input
										type="search"
										value={searchInput}
										onChange={(e) => setsearchInput(e.target.value)}
										style={{ width: "400px" }}
										class="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
										placeholder={"Search Restaurants..."}
										required
									/>
								</div>
							</form>
						</div>
					</div>
					<HotelList list={filteredList} />
				</section>

				{cartShow && <CartContainer />}
			</div>
		</CustomerPage>
	);
};

export default MainContainer;

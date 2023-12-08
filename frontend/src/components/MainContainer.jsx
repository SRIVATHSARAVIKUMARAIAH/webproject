import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";

import hotel_list from "../data/hotel_list";

const MainContainer = () => {
	const [{ foodItems, cartShow }] = useStateValue();
	const [scrollValue, setScrollValue] = useState(0);

	const location_obj = useLocation();
	const id = location_obj.pathname.split("/")[2];

	const hotel_data = hotel_list.find((v) => v.id === id);

	if (!hotel_data) {
		return <center>No data</center>;
	}

	return (
		<div className="w-full h-auto flex flex-col items-center justify-center ">
			<HomeContainer
				title={hotel_data.title}
				desc={hotel_data.desc}
				items={hotel_data.top_items}
			/>

			{/* <section className="w-full my-6">
				<div className="w-full flex items-center justify-between">
					<p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100">
						Our fresh & healthy fruits
					</p>

					<div className="hidden md:flex gap-3 items-center">
						<motion.div
							whileTap={{ scale: 0.75 }}
							className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer  hover:shadow-lg flex items-center justify-center"
							onClick={() => setScrollValue(-200)}>
							<MdChevronLeft className="text-lg text-white" />
						</motion.div>
						<motion.div
							whileTap={{ scale: 0.75 }}
							className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center"
							onClick={() => setScrollValue(200)}>
							<MdChevronRight className="text-lg text-white" />
						</motion.div>
					</div>
				</div>
				<RowContainer
					scrollValue={scrollValue}
					flag={true}
					data={foodItems?.filter((n) => n.category === "fruits")}
				/>
			</section> */}

			<MenuContainer />

			{cartShow && <CartContainer />}
		</div>
	);
};

export default MainContainer;

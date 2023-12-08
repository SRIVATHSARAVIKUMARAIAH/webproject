import React from "react";

import HotelCard from "./HotelCard";

const HotelList = ({ list }) => {
	console.log(list);
	return (
		<div className="container mx-auto">
			<div className="flex flex-wrap -mx-4">
				{list.map((v, i) => (
					<HotelCard
						key={i}
						id={v.doc_id}
						title={v.title}
						desc={v.desc}
						category={v.category}
						headerImgUrl={v.header_image_url}
						isVeg={v.veg}
						isNonVeg={v.nonveg}
					/>
				))}
			</div>
		</div>
	);
};

export default HotelList;

import React, { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";

import RowContainer from "./RowContainer";

const filters = [
    {
        id: 1,
        name: "All",
        urlParamName: "all",
    },
    {
        id: 1,
        name: "Veg",
        urlParamName: "veg",
    },
    {
        id: 2,
        name: "Non Veg",
        urlParamName: "nonveg",
    },
    
];



const MenuContainer = ({ foodItems, addToCart }) => {
    
    console.log(foodItems , "fgg")
    const [catgeory, setcatgeory] = useState(foodItems);
    const [catg ,setcatg] = useState(true)
    const [filter, setFilter] = useState("all");
    const [searchText, setsearchText] = useState("");
    const [catgfunc, setcatgfunc] = useState("");
    const [catgbool, setcatgbool] = useState(false);
    
    // const [filter, setFilter] = useState("all");
    

    const filtered_data = foodItems.filter((v) => {
        const title = v.title;
        const do_title_includes = title
            ?.toLowerCase()
            ?.includes(searchText.toLowerCase());

        if (filter === "all") {
            return true && do_title_includes;
        }

        if (filter === "veg") {
            return v.isVeg && do_title_includes;
        }

        return !v.isVeg && do_title_includes; //returns non veg items
    });

    const handleClick = (item) => {
        // Call your function or perform desired actions here
        console.log('bbb' , item);
         
        setcatg(true)
        setcatgfunc(item)
        setcatgbool(true)
        // const items = item
        // setClickCount(clickCount + 1); // Update state if needed
      };

    return (
        <section className="w-full my-6" id="menu">
            <div className="w-full flex flex-col items-center justify-center">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-16 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
                    Our Dishes
                </p>

                <div class="mb-6">
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
                                value={searchText}
                                onChange={(e) => setsearchText(e.target.value)}
                                type="search"
                                style={{ width: "500px" }}
                                class="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500"
                                placeholder={"Search " + filter + " food items..."}
                                required
                            />
                        </div>
                    </form>
                </div>

                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                    {filters &&
                        filters.map((category) => (
                            <motion.div
                                whileTap={{ scale: 0.75 }}
                                key={category.id}
                                className={`group ${
                                    filter === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                                onClick={() => setFilter(category.urlParamName )}>
                                <div
                                    className={`w-10 h-10 rounded-full shadow-lg ${
                                        filter === category.urlParamName
                                            ? "bg-white"
                                            : "bg-cartNumBg"
                                    } flex items-center justify-center`}>
                                    <IoFastFood
                                        className={`${
                                            filter === category.urlParamName
                                                ? "text-textColor"
                                                : "text-white"
                                        } group-hover:text-textColor text-lg`}
                                    />
                                </div>
                                <p
                                    className={`text-sm ${
                                        filter === category.urlParamName
                                            ? "text-white"
                                            : "text-textColor"
                                    } group-hover:text-white`}>
                                    {category.name}
                                </p>
                            </motion.div>
                        ))}
                </div>
                <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                    {(catg || catgbool) && filtered_data &&
                       filtered_data.map((category) => (
                        <div onClick={() =>  handleClick(category)}>
                        <motion.div
                        whileTap={{ scale: 0.75 }}
                        key={category.id}
                        className={`group ${
                            filter === category.isVeg ? "bg-card" : "bg-card"
                        } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                        >
                        <div
                            className={`w-10 h-10 rounded-full shadow-lg ${
                                filter === category.isVeg
                                    ? "bg-cartNumBg"
                                    : "bg-cartNumBg"
                            } group-hover:bg-red flex items-center justify-center`}>
                            <IoFastFood
                                className={`${
                                    filter === category.isVeg
                                        ? "text-white"
                                        : "text-white"
                                } group-hover:text-textColor text-lg`}
                            />
                        </div>
                        <p
                            className={`text-sm ${
                                filter === category.isVeg
                                    ? "text-textColor"
                                    : "text-textColor"
                            } group-hover:text-white`}>
                            {category.category}
                        </p>
                    </motion.div>
                    </div>
                       ))}
                       </div>
                       
                    
            
              {catgbool &&
                <div className="w-full">
                    <RowContainer
                        addToCart={addToCart}
                        flag={false}
                        data={catgfunc}
                    />
                </div>
}
            </div>
        </section>
    );
};

export default MenuContainer;
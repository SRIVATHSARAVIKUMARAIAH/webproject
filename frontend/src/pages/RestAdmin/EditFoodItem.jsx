import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import { MdFastfood, MdCloudUpload, MdDelete } from "react-icons/md";
import { FaPoundSign } from "react-icons/fa";

import Loader from "../../components/Loader";
import RestPage from "../../components/RestPage.container";

import { categories } from "../../utils/data";
import { storage } from "../../firebase.config";
import {
	fetchFoodItemsDetails,
	updateFoodItem,
} from "../../schemas/food_items.schema";

const EditFoodItem = () => {
	const [title, setTitle] = useState("");
	const [isVeg, setisVeg] = useState(false);
	const [price, setPrice] = useState("");
	const [category, setCategory] = useState(null);
	const [imageAsset, setImageAsset] = useState(null);
	const [fields, setFields] = useState(false);
	const [alertStatus, setAlertStatus] = useState("danger");
	const [msg, setMsg] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isInStock, setisInStock] = useState(false);

	const navigate = useNavigate();
	const { id: food_item_id } = useParams();

	const uploadImage = (e) => {
		setIsLoading(true);
		const imageFile = e.target.files[0];
		const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				console.log(error);
				setFields(true);
				setMsg("Error while uploading : Try AGain 🙇");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setImageAsset(downloadURL);
					setIsLoading(false);
					setFields(true);
					setMsg("Image uploaded successfully 😊");
					setAlertStatus("success");
					setTimeout(() => {
						setFields(false);
					}, 4000);
				});
			}
		);
	};

	const deleteImage = () => {
		setIsLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef).then(() => {
			setImageAsset(null);
			setIsLoading(false);
			setFields(true);
			setMsg("Image deleted successfully 😊");
			setAlertStatus("success");
			setTimeout(() => {
				setFields(false);
			}, 4000);
		});
	};

	const saveDetails = async () => {
		setIsLoading(true);
		try {
			if (!title || !imageAsset || !price || !category) {
				setFields(true);
				setMsg("Required fields can't be empty");
				setAlertStatus("danger");
				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			} else {
				const data = {
					title: title,
					imageURL: imageAsset,
					isVeg,
					category: category,
					price: price,
					isInStock,
				};
				await updateFoodItem(data, food_item_id);
				setIsLoading(false);
				setFields(true);
				setMsg("Data Saved successfully 😊");
				setAlertStatus("success");
				setTimeout(() => {
					setFields(false);
				}, 4000);
			}
		} catch (error) {
			console.log(error);
			setFields(true);
			setMsg("Error while uploading : Try AGain 🙇");
			setAlertStatus("danger");
			setTimeout(() => {
				setFields(false);
				setIsLoading(false);
			}, 4000);
		}
	};

	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const d = await fetchFoodItemsDetails(food_item_id);

				if (!d) {
					setFields(true);
					setMsg("Invalid Food Item; This Food Item Doesn't exists!");
					setAlertStatus("danger");

					setTimeout(() => {
						setFields(false);
						setIsLoading(false);
						navigate("/rest-food-list");
					}, 4000);

					return;
				}

				setTitle(d.title);
				setisVeg(d.isVeg);
				setPrice(d.price);
				setCategory(d.category);
				setImageAsset(d.imageURL);
				setisInStock(d.isInStock);
			} catch (error) {
				setFields(true);
				setMsg("Error while fetching data : Try AGain 🙇");
				setAlertStatus("danger");

				setTimeout(() => {
					setFields(false);
					setIsLoading(false);
				}, 4000);
			} finally {
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<RestPage name="Edit Food Item">
			<div className="w-full flex items-center justify-center">
				<div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
					{fields && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
								alertStatus === "danger"
									? "bg-red-400 text-red-800"
									: "bg-emerald-400 text-emerald-800"
							}`}>
							{msg}
						</motion.p>
					)}

					<div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
						<MdFastfood className="text-xl text-gray-700" />
						<input
							type="text"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Give me a title..."
							className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
						/>
					</div>

					<div className="w-full">
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
							<option value="other" className="bg-white">
								Select Category
							</option>
							{categories &&
								categories.map((item) => (
									<option
										key={item.id}
										className="text-base border-0 outline-none capitalize bg-white text-headingColor"
										value={item.urlParamName}>
										{item.name}
									</option>
								))}
						</select>
					</div>

					<div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
						{isLoading ? (
							<Loader />
						) : (
							<>
								{!imageAsset ? (
									<>
										<label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
											<div className="w-full h-full flex flex-col items-center justify-center gap-2">
												<MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
												<p className="text-gray-500 hover:text-gray-700">
													Click here to upload
												</p>
											</div>
											<input
												type="file"
												name="uploadimage"
												accept="image/*"
												onChange={uploadImage}
												className="w-0 h-0"
											/>
										</label>
									</>
								) : (
									<>
										<div className="relative h-full">
											<img
												src={imageAsset}
												alt="uploaded image"
												className="w-full h-full object-cover"
											/>
											<button
												type="button"
												className="absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md  duration-500 transition-all ease-in-out"
												onClick={deleteImage}>
												<MdDelete className="text-white" />
											</button>
										</div>
									</>
								)}
							</>
						)}
					</div>

					<div className="w-full flex flex-col md:flex-row items-center gap-3">
						<div className="w-full flex-1 py-2 border-b border-gray-300 flex items-center gap-2">
							<div
								style={{ gap: "1rem" }}
								className="flex items-center rounded">
								<input
									onChange={(e) => setisVeg(e.target.checked)}
									checked={isVeg}
									id="bordered-checkbox-1"
									type="checkbox"
									name="veg"
									className="w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
								/>
								<label
									for="bordered-checkbox-1"
									className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor">
									Veg Item
								</label>
							</div>
						</div>

						<div className="flex-1 w-full py-2 border-b border-gray-300 flex items-center gap-2">
							<FaPoundSign className="text-gray-700 text-xl" />
							<input
								type="text"
								required
								value={price}
								onChange={(e) => setPrice(e.target.value)}
								placeholder="Price"
								className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
							/>
						</div>
						<div
							style={{ gap: "1rem" }}
							className="flex flex-1 items-center rounded">
							<input
								onChange={(e) => setisInStock(e.target.checked)}
								checked={isInStock}
								id="bordered-checkbox-1"
								type="checkbox"
								name="instock"
								className="w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
							/>
							<label
								for="bordered-checkbox-1"
								className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor">
								In Stock
							</label>
						</div>
					</div>

					<div className="flex items-center w-full">
						<button
							type="button"
							className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
							onClick={saveDetails}>
							Save
						</button>
					</div>
				</div>
			</div>
		</RestPage>
	);
};

export default EditFoodItem;

import React, { useState, useEffect } from "react";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";

import RestPage from "../../components/RestPage.container";
import Loader from "../../components/Loader";
import {
	saveProfileData,
	fetchProfileData,
} from "../../schemas/restuser.schema";
import { useStateValue } from "../../context/StateProvider";
import { storage } from "../../firebase.config";

const ProfileDetails = () => {
	const [formState, setformState] = useState({
		title: "",
		desc: "",
		state: "",
		county: "",
		Postcode: "",
		nonveg: false,
		veg: false,
		contact: 0,
	});
	const [isLoading, setisLoading] = useState(false);
	const [imageAsset, setImageAsset] = useState(null);
	const [imageLoading, setimageLoading] = useState(false);

	const [{ restUser }] = useStateValue();

	const handleChange = (e) => {
		setformState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleCheckboxChange = (e) => {
		setformState((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			if (!/^[0-9]{10}$/g.test(formState.contact)) {
				alert("Invalid phone number!");
				return;
			}

			setisLoading(true);

			await saveProfileData(
				{ ...formState, header_image_url: imageAsset },
				restUser.uid
			);

			alert("Data Saved Successfully!!");
		} catch (error) {
			alert("something went wrong!!");
		} finally {
			setisLoading(false);
		}
	};

	const uploadImage = (e) => {
		setimageLoading(true);
		const imageFile = e.target.files[0];
		const storageRef = ref(
			storage,
			`header-images/${Date.now()}-${imageFile.name}`
		);
		const uploadTask = uploadBytesResumable(storageRef, imageFile);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const uploadProgress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			},
			(error) => {
				console.log(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref)
					.then((downloadURL) => {
						setImageAsset(downloadURL);
						setimageLoading(false);
					})
					.catch((e) => {
						console.log(e);
						console.log("Something went wrong while uploading the image!");
						setimageLoading(false);
					});
			}
		);
	};

	const deleteImage = () => {
		setimageLoading(true);
		const deleteRef = ref(storage, imageAsset);
		deleteObject(deleteRef)
			.then(async () => {
				setImageAsset(null);
				await saveProfileData({ header_image_url: null }, restUser.uid);
				setimageLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setimageLoading(false);
				alert("Something went wrong while deleting!");
			});
	};

	useEffect(() => {
		(async () => {
			try {
				setisLoading(true);
				const data = await fetchProfileData(restUser.uid);
				if (data) {
					setformState(data);
					setImageAsset(data.header_image_url);
				}
			} catch (error) {
				alert("Something went wrong while fetching the data!");
			} finally {
				setisLoading(false);
			}
		})();
	}, [restUser.uid]);

	return (
		<RestPage name={"Profile Details"}>
			<div classNameName="pt-[25px] px-[25px]">
				<form
					onSubmit={handleSubmit}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
					<div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-340 cursor-pointer rounded-lg">
						{imageLoading ? (
							<Loader />
						) : (
							<>
								{!imageAsset ? (
									<>
										<label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
											<div className="w-full h-full flex flex-col items-center justify-center gap-2">
												<MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
												<p className="text-gray-500 hover:text-gray-700">
													Click here to upload header image
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
					<div className="-mx-3 md:flex mb-6">
						<div className="md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
								for="grid-first-name">
								Title
							</label>
							<input
								onChange={handleChange}
								name="title"
								value={formState.title}
								minLength={8}
								maxLength={100}
								className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
								id="grid-first-name"
								type="text"
								placeholder="Fancy Restaurant Title"
								required
							/>
							{/* <p className="text-red text-xs italic">Please fill out this field.</p> */}
						</div>
						<div className="md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
								for="grid-last-name">
								Contact
							</label>
							<input
								onChange={handleChange}
								value={formState.contact}
								name="contact"
								className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
								id="grid-last-name"
								type="number"
								placeholder="10 digit Phone Number"
								required
							/>
						</div>
					</div>
					<div className="-mx-3 md:flex mb-6">
						<div className="md:w-full px-3">
							<label
								className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
								for="grid-password">
								Description
							</label>
							<input
								value={formState.desc}
								onChange={handleChange}
								name="desc"
								minLength={8}
								maxLength={400}
								className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3"
								id="grid-password"
								type="text"
								placeholder="Write a description"
								required
							/>
							{/* <p className="text-grey-dark text-xs italic">
								Make it as long and as crazy as you'd like
							</p> */}
						</div>
					</div>
					<div className="-mx-3 md:flex mb-2">
						<div className="md:w-1/2 px-3 mb-6 md:mb-0">
							<label
								className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
								for="grid-city">
								City
							</label>
							<input
								value={formState.city}
								onChange={handleChange}
								name="city"
								className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
								id="grid-city"
								type="text"
								placeholder="Albuquerque"
								required
							/>
						</div>
						<div className="md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
								for="grid-state">
								{/* State  */}
								County
							</label>
							<input
								value={formState.state}
								onChange={handleChange}
								name="state"
								className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
								id="grid-state"
								type="text"
								placeholder="New Mexico"
								required
							/>
						</div>
						<div className="md:w-1/2 px-3">
							<label
								className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
								for="grid-zip">
								{/* Zip  */}
								Postcode
							</label>
							<input
								value={formState.zip}
								onChange={handleChange}
								name="zip"
								className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
								id="grid-zip"
								type="text"
								placeholder="le3***"
								required
							/>
						</div>
					</div>
					<div style={{ gap: "1rem" }} className="flex">
						<div className="flex items-center pl-4 rounded">
							<input
								checked={formState.veg}
								onChange={handleCheckboxChange}
								id="bordered-checkbox-1"
								type="checkbox"
								name="veg"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
							/>
							<label
								for="bordered-checkbox-1"
								className="w-full py-4 ml-2 text-sm font-medium">
								Veg Foods
							</label>
						</div>
						<div className="flex items-center pl-4 rounded">
							<input
								checked={formState.nonveg}
								onChange={handleCheckboxChange}
								id="bordered-checkbox-2"
								type="checkbox"
								name="nonveg"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
							/>
							<label
								for="bordered-checkbox-2"
								className="w-full py-4 ml-2 text-sm font-medium">
								Non Veg foods
							</label>
						</div>
					</div>
					<button
						disabled={isLoading}
						type="submit"
						className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
						{isLoading ? "Loading..." : "Save"}
					</button>
				</form>
			</div>
		</RestPage>
	);
};

export default ProfileDetails;

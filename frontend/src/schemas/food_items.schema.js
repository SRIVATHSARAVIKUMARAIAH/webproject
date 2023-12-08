import {
	collection,
	getDoc,
	doc,
	getDocs,
	deleteDoc,
	query,
	setDoc,
	where,
} from "firebase/firestore";
import {
	deleteObject,
	getDownloadURL,
	ref,
	uploadBytesResumable,
} from "firebase/storage";
import { firestore, storage } from "../firebase.config";

const food_items_schema = {
	name: "food_items",
	fields: {
		uid: "uid",
	},
};

export const fetchAllFoodItemsData = async (uid) => {
	const q = query(
		collection(firestore, food_items_schema.name),
		where(food_items_schema.fields.uid, "==", uid)
	);

	const querySnapshot = await getDocs(q);

	const da = [];
	querySnapshot.forEach((doc) => {
		da.push({ ...doc.data(), doc_id: doc.id });
	});

	return da;
};

export const fetchFoodItemsDetails = async (id) => {
	const docRef = doc(firestore, food_items_schema.name, id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return null;
	}
};

export const updateFoodItem = async (data, doc_id) => {
	await setDoc(doc(firestore, food_items_schema.name, doc_id), data, {
		merge: true,
	});
};

export const deleteFoodItem = async (doc_id) => {
	const docRef = doc(firestore, food_items_schema.name, doc_id);
	await deleteDoc(docRef);
};

export const deleteImage = async (image_url) => {
	const deleteRef = ref(storage, image_url);
	await deleteObject(deleteRef);
};

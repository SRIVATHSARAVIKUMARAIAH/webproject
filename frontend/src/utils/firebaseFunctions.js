import {
	collection,
	getDoc,
	doc,
	getDocs,
	orderBy,
	query,
	setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

const collections = {
	users: "users",
	restusers: "restusers",
};

// Saving new Item
export const saveItem = async (data) => {
	await setDoc(doc(firestore, "food_items", `${Date.now()}`), data, {
		merge: true,
	});
};

// getall food items
export const getAllFoodItems = async () => {
	const items = await getDocs(
		query(collection(firestore, "food_items"), orderBy("id", "desc"))
	);

	return items.docs.map((doc) => doc.data());
};

export const registerUser = async (data) => {
	await setDoc(doc(firestore, collections.users, data.uid), data, {
		merge: true,
	});
};

export const registerRestUser = async (data) => {
	await setDoc(doc(firestore, collections.restusers, data.uid), data, {
		merge: true,
	});
};

export const fetchRestUserByUID = async (uid) => {
	const docRef = doc(firestore, collections.restusers, uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return null;
	}
};

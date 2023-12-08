import {
	collection,
	getDoc,
	doc,
	deleteDoc,
    addDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

const checkout_schema = {
	name: "checkouts",
	fields: {},
};

export const insert_checkout_data = async (data) => {
	const collRef = collection(firestore, checkout_schema.name)
    const docRef = await addDoc(collRef, data);

    return docRef.id;
};


export const fetch_checkout_by_id = async (doc_id) => {
	const docRef = doc(firestore, checkout_schema.name, doc_id);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return null;
	}
};

export const delete_checkout = async (doc_id) => {
	const docRef = doc(firestore, checkout_schema.name, doc_id);
	await deleteDoc(docRef);
};

import {
	collection,
	doc,
	getDocs,
	deleteDoc,
	query,
	addDoc,
	where,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

const promo_codes_schema = {
	name: "promo_codes",
	fields: {
		rest_id: "rest_id",
	},
};

export const insert_code_data = async (data) => {
	const collRef = collection(firestore, promo_codes_schema.name);
	const docRef = await addDoc(collRef, data);

	return docRef.id;
};

export const fetchAllCodesData = async (uid) => {
	const q = query(
		collection(firestore, promo_codes_schema.name),
		where(promo_codes_schema.fields.rest_id, "==", uid)
	);

	const querySnapshot = await getDocs(q);

	const da = [];
	querySnapshot.forEach((doc) => {
		da.push({ ...doc.data(), doc_id: doc.id });
	});

	return da;
};

export const deletePromoItem = async (doc_id) => {
	const docRef = doc(firestore, promo_codes_schema.name, doc_id);
	await deleteDoc(docRef);
};

import {
	collection,
	getDoc,
	doc,
	getDocs,
	where,
	query,
	setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

const restusers_schema = {
	name: "restusers",
	fields: {},
};

export const saveProfileData = async (data, uid) => {
	await setDoc(doc(firestore, restusers_schema.name, uid), data, {
		merge: true,
	});
};

export const fetchAllRestData = async () => {
	const querySnapshot = await getDocs(
		collection(firestore, restusers_schema.name)
	);

	const da = [];
	querySnapshot.forEach((doc) => {
		da.push({ ...doc.data(), doc_id: doc.id });
	});

	return da;
};

export const fetchProfileData = async (uid) => {
	const docRef = doc(firestore, restusers_schema.name, uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		// console.log(docSnap,"anirudh");
		return docSnap.data();
	} else {
		return null;
	}
};

export const rests_count = async () => {
	
	const restRef	= collection(firestore, restusers_schema.name)
	
	const { size } = await getDocs(restRef);

	return size
};


import {
	collection,
	getDoc,
	doc,
	getDocs,
	query,
	where,
    addDoc,
	serverTimestamp,
	orderBy,
	updateDoc
} from "firebase/firestore";

import { firestore } from "../firebase.config";

const users_schema = {
	name: "users",
	fields: {
		
	},
};

export const fetch_all_users = async () => {
	
	const ordersRef	= collection(firestore, users_schema.name)

	const querySnapshot = await getDocs(ordersRef);

	const da = [];

	for (const doc of querySnapshot.docs) {
		const obj = { ...doc.data(), doc_id: doc.id }
		da.push(obj);
	}

	return da;
};

export const fetch_user_by_uid = async (uid) => {
	const docRef = doc(firestore, users_schema.name, uid);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		return docSnap.data();
	} else {
		return null;
	}
};

export const users_count = async () => {
	
	const restRef	= collection(firestore, users_schema.name)
	
	const { size } = await getDocs(restRef);

	return size
};


import {
  collection,
  getDoc,
    getDocs,
    query,
    where,
  doc,
  deleteDoc,
    addDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";


const Reviews_schema = {
  name: "Reviews",
  fields: {

    RestID: "RestID",
  },
};

export const insert_Reviews_data = async (data) => {
  console.log(data ,"hari")
  const collRef = collection(firestore, Reviews_schema.name)
  try{
    const docRef = await addDoc(collRef, data);
    return docRef.id;
  }
  catch(error){
    return error;
  }
};


// export const fetchAllFoodItemsData = async (uid) => {
// 	const q = query(
// 		collection(firestore, food_items_schema.name),
// 		where(food_items_schema.fields.uid, "==", uid)
// 	);

// 	const querySnapshot = await getDocs(q);

// 	const da = [];
// 	querySnapshot.forEach((doc) => {
// 		da.push({ ...doc.data(), doc_id: doc.id });
// 	});

// 	return da;
// };

// -----------------------------------------------

export const fetch_Reviews_by_id = async (doc_id) => {
	const q = query(
		collection(firestore, Reviews_schema.name),
		where(Reviews_schema.fields.RestID, "==", doc_id)
	);

	const querySnapshot = await getDocs(q);

	const da = [];
	querySnapshot.forEach((doc) => {
		da.push({ ...doc.data(), doc_id: doc.id });
	});

	return da;
};



// -------------------------------------------------







// export const fetch_Reviews_by_id = async (doc_id) => {

//   // const q = query(
//   //   collection(firestore, Reviews_schema.name),
//   //   		where(Reviews_schema.fields.RestID, "==", doc_id)
//   //    	);
//   //     console.log(q,'test')
//   // const docRef = collection(firestore, Reviews_schema.name, doc_id);
//     try {
//       const citiesRef = collection(firestore, "Reviews_schema.name");

//       // Create a query against the collection.
//       const q = query(citiesRef, where("doc_id", "==", "Reviews_schema.fields.RestID"));
//     return q;
//     }
//   catch(error) {
//     console.error("Error fetching data:", error);
//     return error;
//   };


// };





// export const fetch_Reviews_by_id = async (doc_id) => {
//   const docRef = collection(firestore, Reviews_schema.name, doc_id);
//     try {
//       const querySnapshot = await getDocs(docRef);
//     const dataArray = [];
//     querySnapshot.forEach((doc) => {
//       // Access data within each document
//       const data = doc.data();
//       dataArray.push(data);
//     });
//     return dataArray;
//     }
//   catch(error) {
//     console.error("Error fetching data:", error);
//     return error;
//   };


// };

export const delete_Reviews = async (doc_id) => {
  const docRef = doc(firestore, Reviews_schema.name, doc_id);
  await deleteDoc(docRef);
};
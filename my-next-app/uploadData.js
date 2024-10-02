import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCjLwf80rlxoU0ZwFq9FEEpcHHfxDCPymo",
  authDomain: "next-ecommerce-de3ac.firebaseapp.com",
  projectId: "next-ecommerce-de3ac",
  storageBucket: "next-ecommerce-de3ac.appspot.com",
  messagingSenderId: "884486379307",
  appId: "1:884486379307:web:c87630612ecc3a039bd76e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadData = async () => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 30
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

uploadData();

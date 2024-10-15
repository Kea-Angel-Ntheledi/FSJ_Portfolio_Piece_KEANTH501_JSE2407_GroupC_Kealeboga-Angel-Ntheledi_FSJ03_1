import { config } from "dotenv"; // Import the 'dotenv' package to load environment variables from a .env file
import { products, categories } from "./data.js"; // Import the products and categories data from an external file
import { initializeApp } from "firebase/app"; // Import the Firebase app initialization function
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore functions to interact with the Firestore database

// Load environment variables from a .env file into 'process.env'
config();

// Firebase configuration object that holds API keys and identifiers from environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,                 // Firebase API Key from environment variables
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,         // Firebase Auth Domain from environment variables
  projectId: process.env.FIREBASE_PROJECT_ID,           // Firebase Project ID from environment variables
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,   // Firebase Storage Bucket from environment variables
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, // Firebase Messaging Sender ID from environment variables
  appId: process.env.FIREBASE_APP_ID,                   // Firebase App ID from environment variables
};

// Initialize the Firebase app with the given configuration
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(app);

/**
 * Function to upload products data to Firestore
 * @param {Array<Object>} products - The array of product objects to be uploaded to Firestore
 */
async function uploadProducts(products) {
  try {
    // Loop through each product in the 'products' array
    for (const product of products) {
      // Pad the product's ID with leading zeros (up to 3 digits). 
      // Example: ID '1' becomes '001', ID '23' becomes '023'
      const paddedId = product.id.toString().padStart(3, "0");

      // Create a Firestore document reference with the padded ID as the document ID
      const productRef = doc(db, "products", paddedId);

      // Upload the product data to Firestore by setting the document with the specified data
      await setDoc(productRef, product);

      // Log a success message after each product is uploaded
      console.log(`Document written with ID: ${paddedId}`);
    }
  } catch (error) {
    // If an error occurs during the upload, log the error message
    console.error("Error adding document: ", error);
  }
}

/**
 * Function to upload categories data to Firestore
 * @param {Array<string>} categories - The array of category names to be uploaded to Firestore
 */
async function uploadCategories(categories) {
  try {
    // Create a Firestore document reference for a document named 'allCategories' in the 'categories' collection
    const categoriesRef = doc(db, "categories", "allCategories");

    // Upload the categories array to Firestore by setting it as the document's data
    await setDoc(categoriesRef, { categories });

    // Log a success message after the categories are uploaded
    console.log("Categories uploaded successfully!");
  } catch (error) {
    // If an error occurs during the upload, log the error message
    console.error("Error uploading categories: ", error);
  }
}

// Call the function to upload the products array to Firestore
uploadProducts(products);

// Call the function to upload the categories array to Firestore
uploadCategories(categories);

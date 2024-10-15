// pages/auth.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../pages/api/firebase'; // Ensure this path is correct based on your Firebase setup
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import the Firebase authentication method

export default function Auth() {
  // State to store email, password, and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if the user is already authenticated and redirect if so
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/'); // Redirect to home if user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component is unmounted
  }, [router]);

  // Handle the sign-in process
  const handleSignIn = async (event) => {
    event.preventDefault();
    setError(''); // Clear any existing errors

    try {
      // Attempt to sign in with Firebase Authentication using the entered email and password
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to the home page on successful sign-in
    } catch (err) {
      // Display any errors that occur during sign-in
      if (err.code === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email format.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      {/* Display error messages */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSignIn} className="flex flex-col space-y-4 w-80">
        {/* Email Input Field */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Password Input Field */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Sign In Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

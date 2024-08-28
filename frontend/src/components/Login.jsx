// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = ({ openSignup }) => {
//   const navigate = useNavigate(); // Correctly invoke useNavigate
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // Add error state for feedback

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:3000/chat/user/login",
//         { username, password }, // Send data as JSON
//         {
//           headers: {
//             "Content-Type": "application/json", // Correct content type
//           },
//         }
//       );
//       console.log(res.data);
//       if (res.data.message === "success") {
//         navigate("/chat");
//       } else {
//         setError(res.data.message || "Login failed"); // Handle error message
//       }
//     } catch (error) {
//       console.error("Error logging in:", error);
//       setError("An error occurred. Please try again."); // Handle error
//     }
//   };

//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
//         Login
//       </h2>
//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label
//             htmlFor="username"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter your username"
//             className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-blue-500"
//             onChange={(e) => setUsername(e.target.value)}
//             value={username} // Ensure value is controlled
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-blue-500"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password} // Ensure value is controlled
//           />
//         </div>
//         {error && (
//           <div className="text-red-500 text-sm mt-2">
//             {error} {/* Display error message */}
//           </div>
//         )}
//         <div className="flex items-center justify-between">
//           <label htmlFor="rememberme" className="flex items-center">
//             <input
//               type="checkbox"
//               id="rememberme"
//               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//             />
//             <span className="ml-2 text-sm text-gray-600">Remember Me</span>
//           </label>
//           <a href="#" className="text-sm text-blue-500 hover:underline">
//             Forgot Password?
//           </a>
//         </div>
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
//           >
//             Login
//           </button>
//         </div>
//       </form>
//       <div className="mt-6 text-center">
//         <span className="text-sm text-gray-600">Don't have an account?</span>
//         <button
//           className="ml-2 text-blue-500 hover:underline"
//           onClick={openSignup}
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie for cookie management

const Login = ({ openSignup }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // State for remember me

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/chat/user/login",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.message === "success") {
        window.localStorage.setItem("chat-token", res.data.token);
        window.localStorage.setItem("userId", res.data.user._id);
        if (rememberMe) {
          // Store token in cookies with an expiration of 7 days
          Cookies.set("chat-token", res.data.token, { expires: 7 });
        } else {
          // Store token in session storage
          sessionStorage.setItem("token", res.data.token);
        }
        navigate("/chat");
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Login
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-blue-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <div className="flex items-center justify-between">
          <label htmlFor="rememberme" className="flex items-center">
            <input
              type="checkbox"
              id="rememberme"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} // Update remember me state
            />
            <span className="ml-2 text-sm text-gray-600">Remember Me</span>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">Don't have an account?</span>
        <button
          className="ml-2 text-blue-500 hover:underline"
          onClick={openSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Login;

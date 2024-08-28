import { useEffect, useState } from "react";
import bgImage from "../assets/bg.jpg";
import Model from "../components/Model";
import Register from "../components/Register";
import Login from "../components/Login";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openSignup = () => {
    setIsModelOpen(true);
    setIsLogin(false);
  };
  const openLogin = () => {
    setIsModelOpen(true);
    setIsLogin(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = window.localStorage.getItem("chat-token");
        const res = await axios.get("http://localhost:3000/chat/user/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.message === "success") {
          navigate("/chat");
        }
      } catch (error) {
        console.log(error);
      }
    };
    verifyUser();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="bg-cover bg-center bg-no-repeat w-2/4 h-[calc(100vh-60px)] rounded-lg flex items-center justify-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            Welcome 👋
          </h2>

          <button
            className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
            onClick={() => setIsModelOpen(true)}
          >
            Login/Register
          </button>
        </div>
      </div>
      <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
        {isLogin ? (
          <Login openSignup={openSignup} />
        ) : (
          <Register openLogin={openLogin} />
        )}
      </Model>
    </div>
  );
};

export default Home;

////////////////////////////////////////////////////  ////////////////////////////////////
// Cookie Based
// import { useEffect, useState } from "react";
// import bgImage from "../assets/bg.jpg";
// import Model from "../components/Model";
// import Register from "../components/Register";
// import Login from "../components/Login";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Cookies from "js-cookie"; // Import js-cookie for cookie management

// const Home = () => {
//   const [isModelOpen, setIsModelOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   const openSignup = () => {
//     setIsModelOpen(true);
//     setIsLogin(false);
//   };
//   const openLogin = () => {
//     setIsModelOpen(true);
//     setIsLogin(true);
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const token = Cookies.get("token"); // Retrieve the token from the cookie
//         if (token) {
//           const res = await axios.get(
//             "http://localhost:3000/chat/user/verify",
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//               },
//             }
//           );
//           if (res.data.message === "success") {
//             navigate("/chat");
//           }
//         }
//       } catch (error) {
//         console.log("Error verifying user:", error);
//       }
//     };

//     verifyUser();
//   }, [navigate]); // Ensure `navigate` is in the dependency array

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div
//         className="bg-cover bg-center bg-no-repeat w-2/4 h-[calc(100vh-60px)] rounded-lg flex items-center justify-center"
//         style={{ backgroundImage: `url(${bgImage})` }}
//       >
//         <div className="text-center">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
//             Welcome 👋
//           </h2>

//           <button
//             className="inline-flex items-center justify-center px-8 py-4 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg h-[60px]"
//             onClick={() => setIsModelOpen(true)}
//           >
//             Login/Register
//           </button>
//         </div>
//       </div>
//       <Model isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
//         {isLogin ? (
//           <Login openSignup={openSignup} />
//         ) : (
//           <Register openLogin={openLogin} />
//         )}
//       </Model>
//     </div>
//   );
// };

// export default Home;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Sidebar = ({ setChatInitiated, setChats, socket, setReceiverId }) => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = window.localStorage.getItem("chat-token");
//         const res = await axios.get("http://localhost:3000/chat/users", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUsers(res.data.users);
//       } catch (error) {
//         navigate("/");
//         console.log(error);
//       }
//     };

//     fetchUsers();
//   }, [navigate]);

//   const startChat = (id) => {
//     socket.emit("join", id);
//     setChatInitiated(true);
//     setReceiverId(id);
//   };

//   return (
//     <div className="w-full md:w-1/4 bg-black p-4 bg-opacity-70 flex flex-col">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full p-2 mb-4 border rounded"
//       />
//       {users.length > 0 ? (
//         <div className="space-y-4">
//           {users.map((user) => (
//             <div
//               className="flex items-center space-x-4 p-2 hover:bg-gray-300 cursor-pointer"
//               key={user._id}
//               onClick={() => startChat(user._id)}
//             >
//               <img
//                 src=""
//                 alt="User Image"
//                 className="w-10 h-10 rounded-full border"
//               />
//               <span className="text-white text-sm font-bold">
//                 {user.username}
//               </span>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-white text-2xl">No Users</div>
//       )}
//       <button className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ setChatInitiated, setChats, setReceiverId }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = window.localStorage.getItem("chat-token");
        const res = await axios.get("http://localhost:3000/chat/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data.users);
      } catch (error) {
        navigate("/");
        console.error(error);
      }
    };

    fetchUsers();
  }, [navigate]);

  const startChat = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/chat/message/read/${id}`,
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "chat-token"
            )}`,
          },
        }
      );
      setChats(res.data);
    } catch (error) {
      if (
        error.response &&
        error.response.data.message === "Conversation not found"
      ) {
        setChats([]);
      } else {
        console.error(error);
      }
    }

    setChatInitiated(true);
    setReceiverId(id);
  };

  return (
    <div className="w-full md:w-1/4 bg-black p-4 bg-opacity-70 flex flex-col">
      <input
        type="text"
        placeholder="Search"
        className="w-full p-2 mb-4 border rounded"
      />
      {users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              className="flex items-center space-x-4 p-2 hover:bg-gray-300 cursor-pointer"
              key={user._id}
              onClick={() => startChat(user._id)}
            >
              <img
                src={`http://localhost:3000/images/${user.image}`}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
              <span className="text-white text-sm font-bold">
                {user.username}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-white text-2xl">No Users</div>
      )}
      <button
        className="w-full mt-4 inline-flex items-center justify-center px-4 py-2 font-sans font-semibold tracking-wide text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        onClick={() => {
          // Handle logout
          window.localStorage.removeItem("chat-token");
          window.localStorage.removeItem("userId");
          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;

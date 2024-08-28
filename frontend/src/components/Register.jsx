import React, { useState } from "react";
import axios from "axios";

const Register = ({ openLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/chat/user/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      if (res.data.message === "success") {
        openLogin();
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Register
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
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-blue-500"
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
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg py-2 px-4 outline-none focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="profile-picture"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 rounded-lg py-2 px-4 outline-none"
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Profile Preview"
                className="w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            </div>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Register
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">Already have an account?</span>
        <button
          className="ml-2 text-blue-500 hover:underline"
          onClick={openLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;

import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { useTheme } from "../../providers/ThemeProvider";

import image1  from "../../../assets/img1.png";
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'

import image1 from "../../../assets/img1.png";
import { useDispatch } from "react-redux";
import { account, client } from "../../utils/appwrite";
import { setAuthToken } from "../../../redux/studentSlice";
import { expertRegister } from "../../api/expertapi";

const ExpertSignup = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const avatarInputRef = useRef(null);
  const [error, setError] = useState(null);

  const [showpassword,setShowpassword]=useState()
  const [confirmPassword,setConfirmPassword]=useState()


  const [isGoogleLogin, setIsGoogleLogin] = useState(false);


  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phoneNo: "",
    expertise: "",
    field: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (
      [...Object.values(inputs), image].some((input) => !input || input === "")
    ) {
      setError("All fields are required");
      return;
    }
    inputs.avatar = image;
    try {
      const response = await axios.post(
        "http://localhost:5001/api/v1/otp/sendotp",
        { email: inputs.email }
      );
      alert(response.data.message);
      setInputs({
        name: "",
        email: "",
        phoneNo: "",
        expertise: "",
        field: "",
        jobTitle: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/otpverifyexpert", { state: { userData: inputs } });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const addAvatar = () => {
    avatarInputRef.current.click();
  };

  // Expert Google Login
  const handleGoogleLogin = async () => {
    setIsGoogleLogin(true);

    try {
      await account.createOAuth2Session(
        "google",
        "http://localhost:5173/expertlogin/",
        "http://localhost:5173/"
      );

      const user = await getGoogleLoginUser();

      // Check if user data is fetched successfully
      if (!user || user.message) {
        alert("The User Information is not fetched");
        return;
      }

      // Prepare form data for registration
      // I am Using the Demi Data for the Google Auth Account making here
      const data = new FormData();
      data.append("name", user.name);
      data.append("email", user.email);
      data.append("phoneNo", "1111111111"); // Ensure to handle phoneNo properly
      data.append("expertise", "Bug solving"); // Ensure to handle expertise properly
      data.append("field", "a"); // Ensure to handle field properly
      data.append("jobTitle", "a"); // Ensure to handle jobTitle properly
      data.append("password", "abc"); // Example password (replace with actual logic)
      data.append("confirmPassword", "abc"); // Example confirmPassword (replace with actual logic)
      data.append(
        "avatar",
        user.picture ||
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOcds-7qhHYK37-ksZCvyqMfLU6qEqvtDmFOU5Du-ahg&s"
      ); // Ensure to handle avatar properly
      data.append("otp", "1111"); // Ensure to handle otp properly
      data.append("GoogleLogin", true);

      // Register the user
      const response = await expertRegister(data);

      if (!response) {
        alert("The User Info Is not Created in the Database");
        setIsGoogleLogin(false);
        return;
      } else {
        console.log(response);
      }

      // Dispatch token to state
      dispatch(setAuthToken(response.data.token));
      // Reset form inputs
      setInputs({
        name: "",
        email: "",
        phoneNo: "",
        expertise: "",
        field: "",
        jobTitle: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Handle errors
      console.error("There was an error:", error);
      alert(
        error.response
          ? error.response.data.message
          : "An error occurred during Google Login"
      );
      setIsGoogleLogin(false);
    }
  };

  const getGoogleLoginUser = async () => {
    try {
      const user = await account.get();
      console.log(user);
      return user;
    } catch (err) {
      console.log("Error Message is: ", err);
      return {
        message: "There was an error while Fetching the Google Data",
      };
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center ${
        isDarkMode ? "bg-custom-gradient text-black" : " bg-white "
      } `}>
      <motion.div
        className="w-[900px] flex rounded-lg shadow-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        <div
          className={`flex-[1.5] flex flex-col  p-10 ${
            isDarkMode ? " bg-card-custom-gradient " : " bg-teal-500 text-black"
          }`}>
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}>
            <h1 className="text-4xl font-[serif] mb-5">Create Your Account</h1>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
              className=" hidden"
              ref={avatarInputRef}
            />
            {preview && (
              <img
                src={preview}
                alt="Avatar Preview"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                }}
              />
            )}
            <button
              onClick={addAvatar}
              type="button"
              className=" mt-6 bg-green-400 w-32 h-12  text-xl border-none rounded-3xl mb-6	 hover:bg-green-500 active:bg-green-600">
              Add Avatar
            </button>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={inputs.name}
              required={!isGoogleLogin}
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={inputs.email}
              required={!isGoogleLogin}
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Phone number"
              name="phoneNo"
              onChange={handleChange}
              value={inputs.phoneNo}
              required={!isGoogleLogin}
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Field"
              name="field"
              onChange={handleChange}
              value={inputs.field}
              required={!isGoogleLogin}
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <input
              type="text"
              placeholder="Job title"
              name="jobTitle"
              onChange={handleChange}
              value={inputs.jobTitle}
              required={!isGoogleLogin}
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <label className="relative">
            <input
              type={showpassword?"text":"password"}
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={inputs.password}
              required={!isGoogleLogin}
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <span 
            onClick={()=>setShowpassword((prev)=>!prev)}
            className="absolute right-3 top-[17px] z-[10] cursor-pointer">
              {showpassword?
              (<AiOutlineEyeInvisible fontSize={24} fill="#000000"/>):
              (<AiOutlineEye fontSize={24} fill="#000000"/>)}
            </span>
            </label>
            <label className="relative">
            <input
              type={confirmPassword?"text":"password"}
              placeholder="Confirm password"
              name="confirmPassword"
              onChange={handleChange}
              value={inputs.confirmPassword}
              required={!isGoogleLogin}
              className="w-[370px] py-4 px-6 mb-4 text-sm bg-gray-100 border border-gray-300 rounded-lg outline-none transition-all focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            />
            <span onClick={()=>setConfirmPassword((prev)=>!prev)}
              className="absolute right-3 top-[17px] z-[10] cursor-pointer">
              {confirmPassword?
              (<AiOutlineEyeInvisible fontSize={24} fill="#000000"/>):
              (<AiOutlineEye fontSize={24} fill="#000000"/>)}
            </span>
            </label>
            <div className="mb-4 mr-32">
              <div className="mr-40">
                <h3 className="text-md font-md mb-2">Expertise:</h3>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <input
                    type="radio"
                    id="bugSolving"
                    name="expertise"
                    value="Bug solving"
                    onChange={handleChange}
                    checked={inputs.expertise === "Bug solving"}
                    className="mr-2"
                  />
                  <label htmlFor="bugSolving" className="mr-4">
                    Bug solving
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    id="techCareer"
                    name="expertise"
                    value="Tech career assistance"
                    onChange={handleChange}
                    checked={inputs.expertise === "Tech career assistance"}
                    className="mr-2"
                  />
                  <label htmlFor="techCareer" className="mr-4">
                    Tech career assistance
                  </label>
                </div>
                <div className="flex">
                  <input
                    type="radio"
                    id="academicSupport"
                    name="expertise"
                    value="Academic support"
                    onChange={handleChange}
                    checked={inputs.expertise === "Academic support"}
                    className="mr-2"
                  />
                  <label htmlFor="academicSupport">Academic support</label>
                </div>
              </div>
            </div>
            {error && <p className=" text-red-500 text-sm">{error}</p>}
            <div className="flex space-x-4">
              <motion.button
                type="button"
                className="bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGoogleLogin}>
                Sign Up with Google
              </motion.button>
              <motion.button
                type="submit"
                className="bg-teal-500 text-white font-bold text-md py-3 px-8 rounded-full transition-all hover:bg-teal-600"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsGoogleLogin(false)}>
                Sign up
              </motion.button>
            </div>
          </motion.form>
        </div>
        <div
          className={`flex-1 flex flex-col items-center justify-center bg-card-custom-gradient p-3 ${
            isDarkMode ? "bg-card-custom-gradient" : " bg-teal-500 text-white"
          }`}>
          <img src={image1} alt="Hello" height={300} width={300} />
          <h1 className="text-white text-2xl font-[serif]">
            Already a registered expert?
          </h1>
          <Link to="/expertlogin">
            <motion.button
              type="button"
              className="mt-6 bg-white text-teal-500 font-bold text-md py-2 px-6 rounded-full transition-all hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              Sign in
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpertSignup;

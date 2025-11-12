import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Dashboard from "./Dashboard";
import { FaRegUser } from "react-icons/fa";
import profile from "../../assets/profile.png";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import { RiDeleteBin5Line } from "react-icons/ri";
import toast from "react-hot-toast";
import Select from "react-select"; // Add this import for React Select
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [country, setCuntry] = useState("India | +91");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [subscription, setSubscription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [pass1, setPass1] = useState(false);
  const [pass2, setPass2] = useState(false);
  const [cpassword, setCPassword] = useState("");
  const [password, setPassword] = useState("");
  const [newPassError, setNewPassError] = useState("");
  const [confirmPassError, setConfirmPassError] = useState("");

  const fileInputRef = useRef(null);

  // Define country options for React Select
  const countryOptions = [
    { value: "", label: "Select Country Code" },
    { value: "IST", label: "IST | +91" },
    { value: "EST", label: "GST | +971" }, // Note: Kept as in original, assuming "EST" is intentional
    { value: "PST", label: "PST | +1" },
    { value: "GMT", label: "GMT | +44" },
    { value: "JST", label: "JST | +81" },
    { value: "AEST", label: "AEST | +61" },
    { value: "NST", label: "NST | +1" },
  ];

  // Custom styles for React Select (copied from your prompt)
  const customStyles = {
    control: (base, state) => ({
      ...base,

      backgroundColor: "white",
      borderColor: state.isFocused ? "#6b7280" : "#d1d5db", // active vs default
      boxShadow: "none",
      borderRadius: "4px",
      padding: "",
      fontSize: "12px",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#6b7280",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "white", // grey on hover
      color: "#111827",
      fontSize: "12px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      paddingTop: 0, // optional: tighter top padding
      paddingBottom: 0, // optional: tighter bottom padding
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
      svg: {
        width: 13, // reduce width of arrow
        height: 13, // reduce height of arrow
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const handleClick = () => {
    fileInputRef.current.click(); // Trigger file input
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const cloudName = "dojwaepbj"; // Replace with your Cloudinary cloud name
    const uploadPreset = "simple_quotes"; // Replace with your upload preset

    // Create FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      // Upload image to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const photo = await response.json();
      const res = await axios.post(`${databaseUrl}/api/workspace/avatar`, {
        user_id: user.id,
        url: photo.secure_url,
      });
      setImageUrl(photo.secure_url);
      toast.success("Successfully added profile picture");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${databaseUrl}/api/workspace/profile`, {
        params: { user_id: user.id },
      });
      console.log(res.data);
      setUsername(res.data.fullName);
      setCuntry(res.data.country ? res.data.country : "India | +91");
      setPhoneno(res.data.phoneNo ? res.data.phoneNo : "");
      setEmail(res.data.email);
      setAddress(res.data.adress ? res.data.adress : "");
      setCompany(res.data.companyName ? res.data.companyName : "");
      setSubscription(res.data.subscription ? res.data.subscription : "");
      setImageUrl(res.data.avatar ? res.data.avatar : "");
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);

  const updateUsername = async (value) => {
    try {
      console.log(username);
      const response = await axios.post(
        `${databaseUrl}/api/workspace/username`,
        { user_id: user.id, data: value }
      );
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateCountry = async (value) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/workspace/country`,
        { user_id: user.id, data: value }
      );
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updatePhoneNo = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/phone`, {
        user_id: user.id,
        data: value,
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateAdress = async (value) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/workspace/address`,
        {
          user_id: user.id,
          data: value,
        }
      );
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/avatar`, {
        user_id: user.id,
        url: "",
      });
      setImageUrl("");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  // Called when user confirms deletion in the modal
  const deleteProfileConfirmed = async () => {
    try {
      await axios.post(`${databaseUrl}/api/workspace/deleteProfile`, {
        user_id: user.id,
      });
      toast.success("Profile deleted successfully");
      // Clear user context and localStorage
      setUser(null);
      localStorage.removeItem("user");
      setShowDeleteModal(false);
      // Redirect to login
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting profile:", error);
      toast.error("Failed to delete profile");
    }
  };

  const handleChangePassword = async () => {
    // reset errors
    setNewPassError("");
    setConfirmPassError("");

    const newPass = password;
    const confirm = cpassword;

    if (!newPass) {
      setNewPassError("Please enter a new password");
      return;
    }
    if (!confirm) {
      setConfirmPassError("Please confirm your new password");
      return;
    }

    // Enhanced password validation (same as other components)
    const strength = {
      length: newPass.length >= 8,
      uppercase: /[A-Z]/.test(newPass),
      lowercase: /[a-z]/.test(newPass),
      number: /\d/.test(newPass),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPass),
    };

    const isPasswordValid =
      strength.length &&
      strength.uppercase &&
      strength.lowercase &&
      strength.number &&
      strength.special;

    if (!isPasswordValid) {
      const requirements = [];
      if (!strength.length) requirements.push("at least 8 characters");
      if (!strength.uppercase) requirements.push("one uppercase letter");
      if (!strength.lowercase) requirements.push("one lowercase letter");
      if (!strength.number) requirements.push("one number");
      if (!strength.special) requirements.push("one special character");

      setNewPassError(`Password must contain ${requirements.join(", ")}`);
      return;
    }

    if (newPass !== confirm) {
      setConfirmPassError("New password and confirm password do not match");
      return;
    }

    try {
      const res = await axios.post(`${databaseUrl}/api/auth/changepass`, {
        id: user.id,
        password: newPass,
      });
      if (res.data && res.data.success === false) {
        toast.error(res.data.message || "Failed to change password");
        return;
      }
      toast.success("Password changed successfully");
      setShowChangePassModal(false);
      setPassword("");
      setCPassword("");
      setNewPassError("");
      setConfirmPassError("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to change password");
    }
  };

  const handleLogout = () => {
    // Clear user context and localStorage
    setUser(null);
    localStorage.removeItem("user");
    // Redirect to login
    window.location.href = "/login";
  };

  return (
    <>
      <div className="w-full bg-white min-h-[85vh] px-10 pt-10 shadow-lg shadow-gray-300">
        <div className="flex items-center justify-start mb-6 gap-2 text-xl text-gray-600 px-6">
          <FaRegUser className="text-gray-600" />
          <h2>Personal Information</h2>
        </div>
        <div className="w-full h-[75vh] overflow-y-auto scrollbar-hide relative">
          <div className="w-full flex items-start justify-between px-6 pb-8">
            <div className="w-[75%] flex flex-col gap-6">
              <div className="w-full flex flex-col gap-1">
                <label className="text-gray-500 pl-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    updateUsername(e.target.value);
                  }}
                  className="w-full border border-gray-200 px-4 py-2 rounded-md outline-none"
                />
              </div>

              <div className="flex justify-between gap-4">
                <div className="w-[48%] flex flex-col gap-1">
                  <label className="text-gray-500 ">Country Code</label>
                  {/* Replaced native select with React Select */}
                  <Select
                    options={countryOptions}
                    value={countryOptions.find((opt) => opt.value === country)}
                    onChange={(selectedOption) => {
                      setCuntry(selectedOption.value);
                      updateCountry(selectedOption.value);
                    }}
                    styles={customStyles}
                    className="text-xs"
                    isSearchable={false}
                  />
                </div>
                <div className="w-[48%] flex flex-col gap-1">
                  <label className="text-gray-500 ">Phone Number</label>
                  <input
                    type="text"
                    value={phoneno}
                    onChange={(e) => {
                      setPhoneno(e.target.value);
                      updatePhoneNo(e.target.value);
                    }}
                    placeholder="Phone Number"
                    className="w-full border border-gray-200 px-4 py-2 rounded-md outline-none"
                  />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-gray-500 ">Email</label>
                <input
                  type="text"
                  value={email}
                  className="w-full border text-[#8C8C8C] px-4 py-2 rounded-md outline-none"
                  readOnly={true}
                />
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-gray-500 ">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    updateAdress(e.target.value);
                  }}
                  className="w-full border border-gray-200 px-4 py-2 rounded-md outline-none"
                />
              </div>
              {/* todo - Ask designers for the owner and joined field as in database we do not have these fields */}
              <div className="flex justify-start gap-x-36">
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm">Users</label>
                  <div className="py-4 h-12 rounded-md bg-white text-[#1f1f1f] flex items-center">
                    {username || "User"}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm">Company</label>
                  <div className="py-4 h-12 rounded-md bg-white text-[#1f1f1f] flex items-center">
                    {company || "Owner"}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-gray-500 text-sm">Subscription</label>
                  <div className="py-4 h-12 rounded-md bg-white text-[#1f1f1f] flex items-center">
                    {subscription || "1 month ago"}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <label className="text-gray-500 ">Signature</label>
                <h1 className="w-full border border-gray-200 px-2 py-4 rounded-md outline-none text-5xl text-center mt-1 signature-text font-bold">
                  {username}
                </h1>
              </div>
            </div>
            <div className="w-[30%] flex flex-col items-center justify-start pl-10 gap-4">
              <div className="relative">
                <img
                  src={imageUrl ? imageUrl : profile}
                  alt="Profile"
                  className="w-32 h-32 rounded-[50%] relative"
                />
                {imageUrl && (
                  <div
                    onClick={() => handleDelete()}
                    className="text-lg p-2 rounded-[50%] flex items-center justify-center text-graidient_bottom bg-white absolute top-1 right-1 cursor-pointer shadow-md"
                  >
                    <RiDeleteBin5Line />
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleUpload}
                />
                <button
                  className="text-graidient_bottom hover:text-pink-600 transition-colors"
                  onClick={handleClick}
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-around mb-10">
            <button
              className="text-graidient_bottom hover:text-pink-600 transition-colors"
              onClick={() => setShowChangePassModal(true)}
            >
              Change Password
            </button>
            <button
              className="text-graidient_bottom hover:text-pink-600 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="text-graidient_bottom hover:text-pink-600 transition-colors"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Profile
            </button>
          </div>
        </div>
      </div>
      {showChangePassModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          onClick={() => {
            // close modal when clicking outside
            setShowChangePassModal(false);
            setNewPassError("");
            setConfirmPassError("");
            setPassword("");
            setCPassword("");
          }}
        >
          <div
            className="bg-white rounded-[24px] p-10 flex flex-col items-center gap-6 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center gap-2 w-[457px]">
              <h2 className="text-[32px] font-normal text-[#525252] text-center">
                Change password
              </h2>
              <p className="text-[14px] text-[#717171] text-center">
                Your password must be at least 8 characters and should include
                uppercase letters, lowercase letters, numbers, and special
                characters.
              </p>
            </div>

            <div className="flex flex-col items-center gap-6 w-[457px]">
              <div className="flex flex-col gap-2 w-[399px] relative">
                <label className="text-[14px] text-[#525252]">
                  New password *
                </label>
                <input
                  type={pass1 ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (newPassError) setNewPassError("");
                  }}
                  className="w-full h-10 px-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none"
                  placeholder="Enter new password"
                />
                <FaEye
                  onClick={() => setPass1(!pass1)}
                  className="absolute right-3 top-9 text-[#8C8C8C] cursor-pointer"
                />
                {newPassError && (
                  <p className="text-sm text-red-500 mt-1">{newPassError}</p>
                )}
              </div>

              <div className="flex flex-col gap-2 w-[399px] relative">
                <label className="text-[14px] text-[#525252]">
                  Confirm password *
                </label>
                <input
                  type={pass2 ? "text" : "password"}
                  value={cpassword}
                  onChange={(e) => {
                    setCPassword(e.target.value);
                    if (confirmPassError) setConfirmPassError("");
                  }}
                  className="w-full h-10 px-3 border border-[#E0E0E0] rounded-md shadow-sm outline-none"
                  placeholder="Confirm new password"
                />
                <FaEye
                  onClick={() => setPass2(!pass2)}
                  className="absolute right-3 top-9 text-[#8C8C8C] cursor-pointer"
                />
                {confirmPassError && (
                  <p className="text-sm text-red-500 mt-1">
                    {confirmPassError}
                  </p>
                )}
              </div>

              <button
                className="w-[399px] h-10 bg-[#DF064E] text-white rounded-md flex items-center justify-center"
                onClick={handleChangePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-[24px] p-6 flex flex-col items-center justify-center gap-8">
            <h2 className="text-[32px] font-normal text-[#525252] text-center">
              Delete Profile
            </h2>
            <p className="text-[14px] leading-6 text-[#717171] text-center">
              Are you sure you want to delete your profile? This action cannot
              be <br /> undone and will permanently remove your account data,
              preferences,
              <br />
              and saved information.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className=" text-[#717171] bg-gray-300 rounded-md px-4 py-2 flex items-center justify-center"
              >
                Cancel
              </button>
              <button
                onClick={deleteProfileConfirmed}
                className="bg-[#DF064E] text-white px-4 py-2 rounded-md  flex items-center justify-center"
              >
                Confirm Deletion
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

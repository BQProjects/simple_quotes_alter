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

const Profile = () => {
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [username, setUsername] = useState("");
  const [country, setCuntry] = useState("India | +91");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

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

  return (
    <>
      <div className="w-full bg-white min-h-[90vh] px-16 pt-8 shadow-lg shadow-gray-300 pb-10 overflow-y-auto ">
        <div className="flex items-center justify-start gap-3 text-xl ml-6  ">
          <FaRegUser /> <h2>Personal Informatin</h2>
        </div>
        <div className="w-full flex flex-col items-center justify-between">
          <div className="w-[95%] flex items-start justify-between mt-7">
            <div className="w-[75%] flex  flex-col">
              <div className="w-full flex flex-col gap-1 ">
                <label className="text-gray-500 pl-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    updateUsername(e.target.value);
                  }}
                  className="w-full border border-gray-200 px-2 py-2 rounded-md outline-none"
                />
              </div>
              <div className="flex justify-between mt-4 ">
                <div className="w-[48%] flex flex-col gap-1 ">
                  <label className="text-gray-500 pl-2">Country Code</label>
                  <select
                    value={country}
                    onChange={(e) => {
                      setCuntry(e.target.value);
                      updateCountry(e.target.value);
                    }}
                    className="w-full cursor-pointer border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 
                            focus:outline-none transition-all duration-150"
                  >
                    <option value="">Select Country Code</option>
                    <option value="IST">IST [+91]</option>
                    <option value="EST">GST [+971]</option>
                    <option value="PST">PST [+1]</option>
                    <option value="GMT">GMT [+44]</option>
                    <option value="JST">JST [+81]</option>
                    <option value="AEST">AEST [+61]</option>
                    <option value="NST">NST [+1]</option>
                  </select>
                </div>
                <div className="w-[48%] flex flex-col gap-1 ">
                  <label className="text-gray-500 pl-2">Phone Number</label>
                  <input
                    type="text"
                    value={phoneno}
                    onChange={(e) => {
                      setPhoneno(e.target.value);
                      updatePhoneNo(e.target.value);
                    }}
                    placeholder="Phone Number"
                    className="w-full border border-gray-200 px-2 py-2 rounded-md outline-none"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-1 mt-4 ">
                <label className="text-gray-500 pl-2">Email</label>
                <input
                  type="text"
                  value={email}
                  className="w-full border border-gray-200 px-2 py-2 rounded-md outline-none bg-gray-50"
                  readOnly={true}
                />
              </div>
              <div className="w-full flex flex-col gap-1 mt-4 ">
                <label className="text-gray-500 pl-2">Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    updateAdress(e.target.value);
                  }}
                  className="w-full border border-gray-200 px-2 py-2 rounded-md outline-none"
                />
              </div>
              <div className="w-full flex flex-col gap-1 mt-4 ">
                <label className="text-gray-500 pl-2">Signiture</label>
                <h1 className="w-full border border-gray-200 px-2 py-4 rounded-md outline-none text-5xl text-center mt-1 signature-text font-bold">
                  {username}
                </h1>
              </div>
              <div className="w-full flex  items-center justify-between mt-7 ">
                <button className="mt-2 text-graidient_bottom">
                  Change Password
                </button>
                <button className="mt-2 text-graidient_bottom">Logout</button>
                <button className="mt-2 text-graidient_bottom">
                  Delete Profile
                </button>
              </div>
            </div>
            <div className=" w-[30%] flex flex-col items-center justify-start pl-10">
              <div className="relative">
                <img
                  src={imageUrl ? imageUrl : profile}
                  alt="hsdv"
                  className="w-32 h-32 rounded-[50%] relative"
                />
                {imageUrl && (
                  <div
                    onClick={() => handleDelete()}
                    className="text-lg p-2 rounded-[50%] flex items-center justify-center text-graidient_bottom bg-white absolute top-1 right-1 cursor-pointer"
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
                  className="mt-1 text-graidient_bottom"
                  onClick={handleClick}
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>
          <div>
            <h1></h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

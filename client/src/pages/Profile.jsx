import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import fetchUserDetails from "../utils/fetchUserDetails";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  const [openProfileAvatarEdit, setOpenProfileAvatarEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    mobile: user.mobile,    
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
        return {
            ...preve,
            [name]: value,
        };
    });
  };

  useEffect(() => {
    setUserData({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true)
        const response = await Axios({
            ...SummaryApi.updateUserDetails,
            data : userData
        })

        const { data: responseData } = response

        if(responseData.success){
            toast.success(responseData.message)
            const userData = await fetchUserDetails()
            dispatch(setUserDetails(userData.data))
        }
    } catch (error) {
        AxiosToastError(error)
    } finally {
        setLoading(false)
    }
  };

  return (
    <div className="p-4">
      {/* profile upload and display image */}
      <div className="w-20 h-20 rounded-full bg-red-500 flex items-center justify-center overflow-hidden drop-shadow-sm">
        {user?.avatar ? (
          <img alt={user.name} src={user.avatar} className="w-full h-full" />
        ) : (
          <FaUserCircle size={65} />
        )}
      </div>
      <button
        onClick={() => setOpenProfileAvatarEdit(true)}
        className="text-sm min-w-20 border border-primary-100 hover:border-orange-400 hover:bg-primary-100 px-3 py-1 rounded-full mt-3"
      >
        Edit
      </button>

      {openProfileAvatarEdit && (
        <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)} />
      )}

      {/* name, email, mobile, change password */}
      <form onClick={handleSubmit} className="my-4 grid gap-4">
        <div className="grid">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.name}
            name="name"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your name"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.email}
            name="email"
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="grid">
          <label htmlFor="mobile">Mobile nr</label>
          <input
            type="text"
            id="mobile"
            placeholder="Enter your mobile nr"
            className="p-2 bg-blue-50 outline-none border focus-within:border-primary-200 rounded"
            value={userData.mobile}
            name="mobile"
            onChange={handleOnChange}
            required
          />
        </div>

        <button className="border border-primary-200 text-primary-200 px-4 py-2 font-semibold   hover:bg-primary-100 hover:text-black rounded">
            {
                loading ? "Loading..." : "Submit"
            }
        </button>
      </form>
    </div>
  );
};

export default Profile;

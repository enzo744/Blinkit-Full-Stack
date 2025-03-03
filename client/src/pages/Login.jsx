import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";
import fetchUserDetails from "../utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
    // const { name, value } = e.target;
    // setData((preve) => {
    //     return {
    //         ...preve,
    //         [name]: value,
    //     };
    // })

  // Controlla che tutti i campi siano valorizzati
  const validValue = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success("Login effettuato con successo!");
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshtoken", response.data.data.refreshtoken);

        const userDetails = await fetchUserDetails()
        dispatch(setUserDetails(userDetails.data))

        setData({
          email: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-md p-8">
        <p className="text-2xl font-semibold text-center">Accedi al tuo account</p>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-5 text-xl">
          {/*================ email ===============*/}
          <div className="grid gap-1">
            <label htmlFor="email" className="">
              Email :
            </label>
            <input
              type="email"
              id="email"
              className="bg-blue-50 p-2 border rounded-md outline-none focus-within:border-primary-200"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter my email"
            />
          </div>
          {/* =============== password ===============*/}
          <div className="grid gap-1">
            <label htmlFor="password" className="">
              Password :
            </label>
            <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:border-primary-200">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full outline-none bg-blue-50"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter my password"
              />
              <div
                className="cursor-pointer "
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            <Link to="/forgot-password" className="block ml-auto text-lg text-blue-700 hover:text-blue-500 underline">Password dimenticata?</Link>
          </div>
          {/*================ submit ===============*/}
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-600" : "bg-slate-500"
            }    text-white p-2 rounded-md font-semibold my-3 tracking-wider`}
          >
            Accedi
          </button>
        </form>

        <p className="text-lg">
          Non hai un account?{" "}
          <Link
            to={"/register"}
            className="text-lg text-blue-700 hover:text-blue-500 underline"
          >
            Registrati da qui
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;

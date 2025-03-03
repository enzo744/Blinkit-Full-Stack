import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import toast from 'react-hot-toast';
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // const { name, value } = e.target;
    // setData((preve) => {
    //     return {
    //         ...preve,
    //         [name]: value,
    //     };
    // })
  };

  // Controlla che tutti i campi siano valorizzati
  const validValue = Object.values(data).every((el) => el); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.password !== data.confirmPassword){
        toast.error("Password e Confirm Password devono essere uguali!")
        return
    }

    try {
        const response = await Axios({
            ...SummaryApi.register,
            data:data
        })
        if(response.data.error){
            toast.error(response.data.message)
        }
        if(response.data.success){
            toast.success("Registrazione avvenuta con successo!")
            setData({
                name:"",
                email:"",
                password:"",
                confirmPassword:""
            })
            navigate("/login")
        }
    } catch (error) {
        AxiosToastError(error)
    }

  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-md p-8">
        <p className="text-3xl font-semibold text-center">
          Benvenuto su Binkeyit
        </p>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-5 text-xl">
          {/*================ name ===============*/}
          <div className="grid gap-1">
            <label htmlFor="name" className="">
              Nome/Username :
            </label>
            <input
              type="text"
              id="name"
              autoFocus
              className="bg-blue-50 p-2 border rounded-md outline-none focus-within:border-primary-200"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Nome/Username"
            />
          </div>
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
          </div>
          {/* =============== confirm password ===============*/}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword" className="">
              Confirm Password :
            </label>
            <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:border-primary-200">
              <input
                type={confirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full outline-none bg-blue-50"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm mypassword"
              />
              <div
                className="cursor-pointer "
                onClick={() => setConfirmPassword(!confirmPassword)}
              >
                {confirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          {/*================ submit ===============*/}
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-600" : "bg-slate-500"
            }    text-white p-2 rounded-md font-semibold my-3 tracking-wider`}
          >
            Registrati
          </button>
        </form>

        <p className="text-lg">
            Hai già un account? <Link to={"/login"}
            className="text-lg text-blue-700 hover:text-blue-500 underline"
            >Accedi da qui</Link>
        </p>
      </div>
    </section>
  );
};

export default Register;

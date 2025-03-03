import { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

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
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }

      if(response.data.success){
        toast.success(response.data.message)
        navigate("/verification-otp", {
            state : data
        });
        setData({
            email : ""
        })
        
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-md p-8">
        <p className="text-2xl font-semibold text-center">Password dimenticata</p>
        <p className="text-xs from-slate-500 text-center">Inserisci la tua email e riceverai un OTP nella tua posta elettronica.</p>

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
              placeholder="Inserisci la tua email"
            />
          </div>

          {/*================ submit ===============*/}
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-600" : "bg-slate-500"
            }    text-white p-2 rounded-md font-semibold my-3 tracking-wider`}
          >
            Invia e ricevi OTP
          </button>
        </form>

        <p className="text-lg">
          Hai un account?{" "}
          <Link
            to={"/login"}
            className="text-lg text-blue-700 hover:text-blue-500 underline"
          >
            Accedi da qui
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;

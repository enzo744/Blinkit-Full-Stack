import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Controlla che tutti i campi siano valorizzati
  const validValue = Object.values(data).every((el) => el);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) { //Setta l'email se è presente: se non è presente, vai alla home
      setData((preve) => {  // setta l'email. Viene modificato solo il campo email 
      // all'interno dell'oggetto data. Gli altri valori di data restano invariati.
        return {  // viene restituito un oggetto con i valori corretti
          ...preve,  // prende il valore corrente di preve
          email: location?.state?.email,  // setta il valore di email
        };
      });
    }
  }, []);

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

  //   console.log("data reset password ", data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(data.newPassword !== data.confirmPassword){
        toast.error("Nuova Password e Confirm Password devono essere uguali!")
        return
    }
    try {
      const response = await Axios({
        ...SummaryApi.resetPassword,  // cambio password
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: ""
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-md p-8">
        <p className="text-2xl font-semibold text-center">Reset Password</p>
        <p className="text-xs from-slate-500 text-center">
          Inserisci la nuova password
        </p>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-5 text-xl">
          <div className="grid gap-1">
        {/* =============== password ===============*/}
            <label htmlFor="newPassword" className="">
              Nuova password :
            </label>
            <div className="grid gap-1">
              <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:border-primary-200">
                <input
                  type={showPassword ? "text" : "password"}
                  id="newPassword"
                  className="w-full outline-none bg-blue-50"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder="Nuova password"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer "
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>
          </div>
        {/* =============== confirm password ===============*/}
          <div className="grid gap-1">
            <label htmlFor="confirmPassword" className="">
              Conferma password :
            </label>
            <div className="grid gap-1">
              <div className="bg-blue-50 p-2 border rounded-md flex items-center focus-within:border-primary-200">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full outline-none bg-blue-50"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Conferma password"
                />
                <div
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer "
                >
                  {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
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
            Cambio password
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

export default ResetPassword;

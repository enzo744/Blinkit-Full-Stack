import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation()

  // console.log("location", location)

  useEffect(() => {
    if(!location?.state?.email){
        navigate("/forgot-password")
    }
  }, [])
  

  // Controlla che l'array sia valorizzato
  const validValue = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
            otp: data.join(""),
            email: location?.state?.email
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password", {
            state : {
                data : response.data,
                email : location?.state?.email
            }
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-white my-4 w-full max-w-lg mx-auto rounded-md p-8">
        <p className="text-2xl font-semibold text-center">Inserisci OTP</p>

        <form onSubmit={handleSubmit} className="grid gap-4 mt-5 text-xl">
          {/*================ OTP ===============*/}
          <div className="grid gap-1">
            <label htmlFor="otp" className="">
              Incolla Otp :
            </label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                        inputRef.current[index] = ref;
                        return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      // console.log("value", value);

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5){
                          inputRef.current[index+1].focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded-md outline-none focus-within:border-primary-200 text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          {/*================ submit ===============*/}
          <button
            disabled={!validValue}
            className={`${
              validValue ? "bg-green-800 hover:bg-green-600" : "bg-slate-500"
            }    text-white p-2 rounded-md font-semibold my-3 tracking-wider`}
          >
            Verifica OTP
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

export default OtpVerification;

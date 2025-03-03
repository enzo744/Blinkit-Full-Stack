/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../provider/GlobalProvider";

const EditAddressDetails = ({close, data }) => {
    const { register, handleSubmit, reset } = useForm({
        defaultValues : {
            _id : data._id,
            userId : data.userId,
            address_line: data.address_line,
            city: data.city,
            state: data.state,
            pincode: data.pincode,
            country: data.country,
            mobile: data.mobile
        }
    });
    const { fetchAddress} = useGlobalContext();

    const onSubmit = async (data)=>{
        // console.log("data", data);
        try {
            const response = await Axios({
                ...SummaryApi.updateAddress,
                data : {
                    ...data,
                    address_line: data.address_line,
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    country: data.country,
                    mobile: data.mobile
                }
            });

            const { data: responseData } = response
            if (responseData.success) {
                toast.success(responseData.message)
                if(close){
                    close()
                    reset()
                    fetchAddress()
                }
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }

  return (
    <section className="bg-black fixed top-0 left-0 bottom-0 right-0 bg-opacity-70 h-[100vh] z-50 overflow-auto">
      <div className="bg-white w-full p-4 max-w-lg mt-8 mx-auto rounded">
        <div className="flex items-center justify-between gap-4">
            <h2 className="font-semibold">Edit address</h2>
            <button onClick={close} className='hover:text-red-500'>
                        <IoClose  size={25}/>
            </button>
        </div>
        <form className="mt-4 grid gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-1">
                <label htmlFor="addressline" className="">Addrres Line :</label>
                <input 
                    type="text" 
                    id="addressline"
                    className="bg-blue-50 border p-2 rounded"
                    {...register("address_line", {required : true})}
                />
            </div>
            
            <div className="grid gap-1">
                <label htmlFor="city" className="">City :</label>
                <input 
                    type="text" 
                    id="city"
                    className="bg-blue-50 border p-2 rounded"
                    {...register("city", {required : true})}
                />
            </div>

            <div className="grid gap-1">
                <label htmlFor="state" className="">State :</label>
                <input 
                    type="text" 
                    id="state"
                    className="bg-blue-50 border p-2 rounded"
                    {...register("state", {required : true})}
                />
            </div>

            <div className="grid gap-1">
                <label htmlFor="pincode" className="">Pincode :</label>
                <input 
                    type="text" 
                    id="pincode"
                    className="bg-blue-50 border p-2 rounded"
                    {...register("pincode", {required : true})}
                />
            </div>

            <div className="grid gap-1">
                <label htmlFor="country" className="">Country :</label>
                <input 
                    type="text" 
                    id="country"
                    className="bg-blue-50 border p-2 rounded"
                    {...register("country", {required : true})}
                />
            </div>

            <div className="grid gap-1">
                <label htmlFor="mobile" className="">Mobile nr :</label>
                <input 
                    type="text" 
                    id="mobile"
                    className="bg-blue-50 border p-2 rounded"
                    {...register("mobile", {required : true})}
                />
            </div>

            <button type="submit" className="bg-primary-200 w-full py-2 hover:bg-primary-100 font-semibold mt-4 rounded">
                Submit
            </button>
        </form>
      </div>
    </section>
  )
}

export default EditAddressDetails



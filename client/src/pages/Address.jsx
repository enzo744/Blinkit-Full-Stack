import { useState } from "react"
import { useSelector } from "react-redux"
import AddAddress from "../components/AddAddress"
import { MdDelete, MdEdit } from "react-icons/md";
import EditAddressDetails from "../components/EditAddressDetails";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useGlobalContext } from "../provider/GlobalProvider";

const Address = () => {
  // addresses è stato definito in store.js
  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (id) => {
    try {
      const response = await Axios({
        ...SummaryApi.disableAddress,
        data : {
          _id : id
        }
      })

      if(response.data.success){
        toast.success("Address removed")
        if(fetchAddress){
          fetchAddress()
        }
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <div className="">
      <div className="bg-white shadow-lg px-2 py-2 flex items-center justify-between gap-4">
        <h2 className="font-semibold text-ellipsis line-clamp-1">Choose your address</h2>
        <button onClick={() => setOpenAddress(true)} className="border border-primary-200 text-primary-200 px-3 py-1 font-semibold
           hover:bg-primary-100 hover:text-black rounded-full">
          Add Address
        </button>
      </div>
      <div className="bg-blue-50 p-2 grid gap-4">
            {
              addressList.map((address, index) => {
                return (
                    <div key={index} className={`border rounded p-3 flex gap-3 bg-white ${!address.status && "hidden"}`}>
                      <div className="w-full">
                        <p>{address.address_line}</p>
                        <p>{address.city} - Postal code: {address.pincode}</p>
                        <p>{address.state}</p>
                        <p>{address.country}</p>
                        <p>Tel. - {address.mobile}</p>
                      </div>
                      <div className="grid gap-8">
                        <button onClick={() => {
                          setOpenEdit(true)
                          setEditData(address)
                        }} className="bg-green-100 hover:bg-green-600 hover:text-white rounded-md p-1">
                          <MdEdit size={20} className="" />
                        </button>
                        <button onClick={() => handleDisableAddress(address._id)}
                          className="bg-red-100 hover:bg-red-600 hover:text-white rounded-md p-1">
                          <MdDelete size={20} className=""  />
                        </button>
                      </div>
                    </div>
                )
              })
            }
            <div onClick={() => setOpenAddress(true)} className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer">
              add address
            </div>
      </div>

      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEdit && (
          <EditAddressDetails data={editData} close={() => setOpenEdit(false)} />
        )
      }
    </div>
  )
}

export default Address

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import { DisplayPriceInEuro } from "../utils/DisplayPriceInEuro"
import { validURLConvert } from "../utils/validURLConvert"
import { pricewithDiscount } from "../utils/PriceWithDiscount"
// import SummaryApi from "../common/SummaryApi"
// import  AxiosToastError  from "../utils/AxiosToastError"
// import { useState } from "react"
// import Axios from "../utils/Axios"
// import toast from "react-hot-toast"
// import Loading from "./Loading"
// import { useGlobalContext } from "../provider/GlobalProvider"
import AddToCartButton from "./AddToCartButton"

const CardProduct = ({data}) => {
    const url = `/product/${validURLConvert(data.name)}-${data._id}`
    // const [loading, setLoading] = useState(false)

  return (
    <Link to={url} className='border py-2 lg:p-4 grid gap-1 lg:gap-3 min-w-36 lg:min-w-52 rounded cursor-pointer bg-white' >
        <div className="min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden">
            <img 
                className="w-full h-full object-scale-down scale-110"
                src={data.image[0]} 
            />
        </div>
        <div className="flex items-center gap-2">
            <div className="rounded text-xs w-fit p-[1px] px-2 text-green-600 bg-green-50">
            10 min
            </div>
            <div>
            {
                    Boolean (data.discount)  && (
                    <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full">Sconto {data.discount}%</p>
                    )
                }
            </div>
        </div>
        <div className="px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2">
           {data.name}
        </div>
        <div className="w-fit gap-1 px-2 lg:px-0 text-sm lg:text-base">
           {data.unit} 
        </div>

        <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
            <div className="flex items-center gap-1">
                <div className="font-semibold">
                    {DisplayPriceInEuro(pricewithDiscount(data.price, data.discount))}
                </div>
                
            </div>
            <div className="">
                {
                    data.stock === 0 ? (
                        <p className="text-red-500 text-sm text-center">Esaurito</p>
                    ) : (
                        <AddToCartButton data={data}/>
                    )
                }
                
            </div>
        </div>

    </Link>
  )
}

export default CardProduct

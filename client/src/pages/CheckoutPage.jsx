import { useState } from "react";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInEuro } from "../utils/DisplayPriceInEuro";
import AddAddress from "../components/AddAddress";
import { useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CheckoutPage = () => {
  const { notDiscountTotalPrice, totalPrice, totalQty, fetchCartItem, fetchOrder} =
    useGlobalContext();
  const [openAddress, setOpenAddress] = useState(false);
  const addressList = useSelector((state) => state.addresses.addressList);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const cartItemsList = useSelector((state) => state.cartItem.cart);
  const navigate = useNavigate();

  const handleCashOnDelivery = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.CashOnDeliveryOrder,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectedAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);

        if (fetchCartItem) {
          fetchCartItem();
        }
        if (fetchOrder) {
          fetchOrder();
        }
        navigate("/success", {
          state: {
            text: "Order",
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleOnLinePayment = async () => {
    try {
      toast.loading("Loading...");
      const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      const stripePromise = await loadStripe(stripePublicKey);

      const response = await Axios({
        ...SummaryApi.payment_url,
        data: {
          list_items: cartItemsList,
          addressId: addressList[selectedAddress]?._id,
          subTotalAmt: totalPrice,
          totalAmt: totalPrice,
        },
      });

      const { data: responseData } = response;

      stripePromise.redirectToCheckout({ sessionId: responseData.id });

      if (fetchCartItem) {
        fetchCartItem();
      }
      if (fetchOrder) {
        fetchOrder();
      }

    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="bg-blue-50 ">
      <div className="container mx-auto p-4 flex flex-col lg:flex-row w-full gap-5 justify-between">
        <div className="w-full ">
          {/* ========= address ========= */}
          <h3 className="text-lg font-semibold">Choose your address</h3>
          <div className="bg-white p-2 grid gap-4 rounded">
            {addressList.map((address, index) => {
              return (
                <label
                  key={index}
                  htmlFor={"address" + index}
                  className={!address.status && "hidden"}
                >
                  <div className="border rounded p-3 flex gap-3 hover:bg-blue-50">
                    <div className="">
                      <input
                        id={"address" + index}
                        type="radio"
                        name="address"
                        value={index}
                        onChange={(e) => setSelectedAddress(e.target.value)}
                      />
                    </div>
                    <div className="">
                      <p>{address.address_line}</p>
                      <p>
                        {address.city} - Postal code: {address.pincode}
                      </p>
                      <p>{address.state}</p>
                      <p>{address.country}</p>
                      <p>Tel. - {address.mobile}</p>
                    </div>
                  </div>
                </label>
              );
            })}
            <div
              onClick={() => setOpenAddress(true)}
              className="h-16 bg-blue-50 border-2 border-dashed flex justify-center items-center cursor-pointer"
            >
              add address
            </div>
          </div>
        </div>

        <div className="w-full max-w-md bg-white py-4 px-2 rounded-lg">
          {/* ========= summary ========= */}
          <h3 className="text-lg font-semibold">Summary</h3>
          <div className="bg-white p-4">
            <h3 className="font-semibold">Dettagli della fattura:</h3>
            <div className="flex gap-4 justify-between ml-1">
              <p>Totale prezzo prodotti</p>
              <p className="flex items-center gap-2">
                <span className="line-through text-neutral-500">
                  {DisplayPriceInEuro(notDiscountTotalPrice)}
                </span>
                <span>{DisplayPriceInEuro(totalPrice)}</span>
              </p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Totale nr. di articoli</p>
              <p className="flex items-center gap-2">{totalQty}</p>
            </div>
            <div className="flex gap-4 justify-between ml-1">
              <p>Spese di consegna</p>
              <p className="flex items-center gap-2">0,00 €</p>
            </div>
            <div className="font-bold flex gap-4 items-center justify-between">
              <p className="">Totale</p>
              <p className="">{DisplayPriceInEuro(totalPrice)}</p>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <button
              onClick={handleOnLinePayment}
              className="py-2 px-4 bg-green-600 text-white font-semibold hover:bg-green-800 rounded"
            >
              Online Payment
            </button>
            {/* ============================ Cash on delivery ============================ */}
            <button
              onClick={handleCashOnDelivery}
              className="py-2 px-4 border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white rounded"
            >
              Cash on delivery
            </button>
          </div>
        </div>
      </div>

      {openAddress && <AddAddress close={() => setOpenAddress(false)} />}
    </section>
  );
};

export default CheckoutPage;

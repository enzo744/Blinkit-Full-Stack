import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../provider/GlobalProvider";
import { DisplayPriceInEuro } from "../utils/DisplayPriceInEuro";
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import AddToCartButton from "./AddToCartButton";
import { pricewithDiscount } from "../utils/PriceWithDiscount";
import imageEmpty from "../assets/empty_cart.webp";
import toast from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const DisplayCartItem = ({ close }) => {
  const { notDiscountTotalPrice, totalPrice, totalQty } = useGlobalContext();
  const cartItem = useSelector((state) => state.cartItem.cart);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const redirectToCheckoutPage = () => {
    if (user?._id) {
      navigate("/checkout");
      if(close){
        close()
      }
      return;
    }
    toast.error("Per completare il carrello devi effettuare il login!");
  };
  
  return (
    <section className="bg-neutral-900 fixed top-0 left-0 bottom-0 right-0 bg-opacity-70 z-50">
      <div className="bg-white w-full max-w-sm min-h-screen max-h-screen ml-auto ">
        <div className="flex items-center p-4 shadow-md gap-3 justify-between">
          <h2 className="font-semibold">Carrello acquisti</h2>
          <Link to={"/"} className="lg:hidden">
            <IoClose size={25} />
          </Link>
          <button onClick={close} className="hidden lg:block">
            <IoClose size={25} className="hover:text-red-700" />
          </button>
        </div>

        <div className="min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4">
          {/* display items */}
          {cartItem[0] ? (
            <>
              <div className="flex items-center justify-between px-4 py-2 bg-blue-100 text-blue-600 rounded-full gap-2">
                <p>Totale sconti sui prodotti</p>
                <p>{DisplayPriceInEuro(notDiscountTotalPrice - totalPrice)}</p>
              </div>
              <div className="bg-white rounded-lg p-4 grid gap-5 overflow-auto">
                {cartItem[0] &&
                  // eslint-disable-next-line no-unused-vars
                  cartItem.map((item, index) => {
                    return (
                      <div key={item?._id+"cartItemDisplay"} className="flex w-full gap-4">
                        <div className="h-16 w-16 min-h-16 min-w-16 bg-red-500 border rounded">
                          <img
                            src={item?.productId?.image[0]}
                            alt=""
                            className="object-scale-down"
                          />
                        </div>
                        <div className="w-full max-w-sm text-xs">
                          <p className="text-xs text-ellipsis line-clamp-2">
                            {item?.productId?.name}
                          </p>
                          <p className="text-neutral-400">
                            {item?.productId?.unit}
                          </p>
                          <p className="font-semibold">
                            {DisplayPriceInEuro(
                              pricewithDiscount(
                                item?.productId?.price,
                                item?.productId?.discount
                              )
                            )}
                          </p>
                        </div>
                        <div className="">
                          <AddToCartButton data={item?.productId} />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="bg-white p-4">
                  <h3 className="font-semibold">Dettagli della fattura:</h3>
                  <div className="flex gap-4 justify-between ml-1">
                    <p>Totale prezzo prodotti</p>
                    <p className="flex items-center gap-2">
                        <span className="line-through text-neutral-500">{DisplayPriceInEuro(notDiscountTotalPrice)}</span>
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
            </>
          ) : (
            <div className="text-center text-lg font-semibold p-2 bg-white rounded-lg">
              <Link onClick={close} to={"/"} className="">
                Il tuo carrello è vuoto
              <img
                src={imageEmpty}
                alt="empty cart"
                className="w-full h-full object-scale-down"
              />
              </Link>
            </div>
          )}
        </div>

        {cartItem[0] && (
          <div className="p-2">
            <div className="bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between">
              <div className="">{DisplayPriceInEuro(totalPrice)}</div>
              
              <button onClick={redirectToCheckoutPage} className="flex items-center gap-1">
                Proceed
                <span>
                  <FaCaretRight />
                </span>
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default DisplayCartItem;

import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import fetchUserDetails from "./utils/fetchUserDetails";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory, setLoadingCategory } from "./store/productSlice";
import { useDispatch } from "react-redux";
import Axios from "./utils/Axios";
import SummaryApi from "./common/SummaryApi";
// import { handleAddItemCart } from "./store/cartProduct";
import GlobalProvider from "./provider/GlobalProvider";
import CartMobileLink from "./components/CartMobile";

function App() {
  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  };

    const fetchCategory = async () => {
    try {
      dispatch(setLoadingCategory(true))
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name))))
      }
    } catch (error) {
      console.log(error);
    } 
    finally {
      dispatch(setLoadingCategory(false))
    }
  };
    
  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllSubCategory(responseData.data.sort((a, b) => a.name.localeCompare(b.name)))) 
      }
    } catch (error) {
      console.log(error);
    } 
    // finally {
      
    // }
  };


  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
    // fetchCartItem()
  }, []);
 
    
  return (
    <GlobalProvider>  {/* Fornisce il contesto globale per l'applicazione */}
      <Header />
      <main className="min-h-[78vh]">
        <Outlet /> {/* Area dove viene inserito il contenuto delle pagine figlie  */}
      </main>
      <Footer />
      <Toaster position="top-center" />
      {
        location.pathname !=="/checkout" && (
          <CartMobileLink /> // Link per accedere al carrello mobile
        )
      }
    </GlobalProvider>
  );
}

export default App;
 
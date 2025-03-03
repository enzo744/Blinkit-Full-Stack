// import React from 'react'
import banner from "../assets/banner.jpg";
import bannerMobile from "../assets/banner-mobile.jpg";
import { useSelector } from "react-redux";
import { validURLConvert } from "../utils/validURLConvert";
import { useNavigate } from "react-router-dom";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const Home = () => {
  const loadingCategory = useSelector((state) => state.product.loadingCategory);
  const categoryData = useSelector(state => state.product.allCategory);
  const subCategoryData =useSelector(state =>state.product.allSubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListPage = (id, cat)=>{
    console.log(id,cat)
    const subcategory = subCategoryData.find(sub => {
    const filterData = sub.category.some(c =>{
      return c._id === id
    })

    return filterData ? true : null
    })

    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`

    navigate(url)
    // console.log(url)
    
  }
  return (
    <section className="bg-white">
      <div className="container mx-auto ">
        <div
          className={`w-full h-full min-h-48 bg-blue-100 rounded ${
            !banner && "animate-pulse my-2"
          } `}
        >
          <img
            src={banner}
            alt="banner"
            className="w-full h-full hidden lg:block"
          />
          <img
            src={bannerMobile}
            alt="bannerMobile"
            className="w-full h-full lg:hidden"
          />
        </div>
      </div>

      <div className="container mx-auto my-2 px-4 grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {loadingCategory ? (
          new Array(12).fill(null).map((c, index) => {
            return (
              <div
                key={index+"loadingCategory"}
                className="bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse"
              >
                <div className="bg-blue-100 min-h-24 rounded"></div>
                <div className="bg-blue-100 h-8 rounded"></div>
              </div>
            );
          })
        ) : (
          categoryData.map((cat, index) => {
            return (
              <div key={cat._id+"displayCategory"+index} className="w-full h-full" onClick={()=>handleRedirectProductListPage(cat._id,cat.name)}>
                <div className="">
                  <img 
                  src={cat.image} 
                  alt="" 
                  className="w-full h-full object-scale-down"
                  />
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Visualizzazione del prodotto per categoria */}
      {
        categoryData.map((c, index)=>{
          return (
            <CategoryWiseProductDisplay 
              key={c._id+"categorywiseproductdisplay"+index} 
              id={c?._id} 
              name={c?.name} 
            />
          )
        })
      }

    </section>
  );
};

export default Home;

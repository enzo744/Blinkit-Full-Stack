/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFieldComponent from "../components/AddFieldComponent";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import successAlert from "../utils/SuccessAlert";

const EditProductAdmin = ({close, data: propsData, fetchProductData}) => {
  const [data, setData] = useState({
    _id: propsData._id,
    name: propsData.name,
    image: propsData.image,
    category: propsData.category,
    subCategory: propsData.subCategory,
    unit: propsData.unit,
    stock: propsData.stock,
    price: propsData.price,
    discount: propsData.discount,
    description: propsData.description,
    more_details: propsData.more_details || {},
  });

  const [imageLoading, setImageLoading] = useState(false);
  const [ViewImageUrl, setViewImageUrl] = useState("");
  const allCategory = useSelector((state) => state.product.allCategory);
  const allSubCategory = useSelector((state) => state.product.allSubCategory);
  const [selectCategory, setSelectCategory] = useState("");
  const [selectSubCategory, setSelectSubCategory] = useState("");

  const [openAddField, setOpenAddField] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }
    setImageLoading(true);
    const response = await uploadImage(file);
    const { data: ImageResponse } = response;
    const imageUrl = ImageResponse.data.url;

    setData((preve) => {
      return {
        ...preve,
        image: [...preve.image, imageUrl],
      };
    });
    setImageLoading(false);
  };

  const handleDeleteImage = async (index) => {
    data.image.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleRemoveCategory = async (index) => {
    data.category.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };
  const handleRemoveSubCategory = async (index) => {
    data.subCategory.splice(index, 1);
    setData((preve) => {
      return {
        ...preve,
      };
    });
  };

  const handleAddField = async () => {
    setData((preve) => {
      return {
        ...preve,
        more_details: {
          ...preve.more_details,
          [fieldName]: "",
        },
      };
    });
    setFieldName("");
    setOpenAddField(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("data", data)
    try {
      const response = await Axios({
        ...SummaryApi.updateProductDetails,
        data: data,
      });

      const { data: responseData } = response;

      if (responseData.success) {
        successAlert(responseData.message);
        if(close){
            close()
        }

        fetchProductData()

        setData({
          name: "",
          image: [],
          category: [],
          subCategory: [],
          unit: "",
          stock: "",
          price: "",
          discount: "",
          description: "",
          more_details: {},
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

//   useEffect(()=>{
//     successAlert("Upload successfully")
//   },[])

  return (
    <section className="fixed top-0 right-0 left-0 bottom-0 bg-black z-50 bg-opacity-70 p-4">
      <div className="bg-white w-full p-4 max-w-2xl mx-auto overflow-y-auto h-full max-h-[95vh] ">
        <section>
          <div className="p-2 bg-white shadow-md flex items-center justify-between">
            <h2 className="font-semibold">Upload Product</h2>
            <button onClick={close} >
                <IoClose size={20}/>
            </button>
          </div>
          <div className="grid p-3">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {/* name */}
              <div className="grid gap-1">
                <label htmlFor="name" className="font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Product Name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md"
                />
              </div>
              {/* description */}
              <div className="grid gap-1">
                <label htmlFor="description" className="font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  type="text"
                  placeholder="Product Description"
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  required
                  multiple
                  rows={3}
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md"
                />
              </div>
              {/* image */}
              <div className="">
                <p className="font-medium">Image</p>
                <div className="">
                  <label
                    htmlFor="productImage"
                    className="bg-blue-50 h-24 border rounded-md flex items-center justify-center cursor-pointer"
                  >
                    <div className="flex flex-col items-center justify-center">
                      {imageLoading ? (
                        <Loading />
                      ) : (
                        <>
                          <FaCloudUploadAlt size={35} className="" />
                          <p>Upload Image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      id="productImage"
                      className="hidden"
                      accept="image/*"
                      onChange={handleUploadImage}
                    />
                  </label>
                  {/* display uploaded image */}
                  <div className="flex flex-wrap gap-3">
                    {data.image.map((img, index) => {
                      return (
                        <div
                          key={img + index}
                          className="h-20 w-20 mt-1 min-w-20 bg-blue-50 border rounded-md relative group"
                        >
                          <img
                            src={img}
                            alt={img}
                            className="h-full w-full object-scale-down cursor-pointer"
                            onClick={() => setViewImageUrl(img)}
                          />
                          <div
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-400 hover:text-white hidden group-hover:block cursor-pointer"
                          >
                            <MdDelete />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* category */}
              <div className="grid gap-1">
                <label htmlFor="category" className="font-medium">
                  Category
                </label>
                <div className="">
                  <select
                    className="bg-blue-50 p-2 outline-none border w-full focus-within:border-primary-200 rounded-md"
                    value={selectCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const category = allCategory.find(
                        (el) => el._id === value
                      );
                      // console.log("category", category)
                      setData((preve) => {
                        return {
                          ...preve,
                          category: [...preve.category, category],
                        };
                      });
                      setSelectCategory("");
                    }}
                  >
                    <option value={""}>Select Category</option>
                    {allCategory.map((c) => {
                      return (
                        <option key={c?._id} value={c?._id}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.category.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "productsection"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-1 border rounded"
                        >
                          <p>{c.name}</p>
                          <div
                            onClick={() => handleRemoveCategory(index)}
                            className="cursor-pointer hover:text-red-500"
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* subcategory */}
              <div className="grid gap-1">
                <label htmlFor="subcategory" className="font-medium">
                  Sub Category
                </label>
                <div>
                  <select
                    className="bg-blue-50 p-2  border w-full focus-within:border-primary-200 rounded-md"
                    value={selectSubCategory}
                    onChange={(e) => {
                      const value = e.target.value;
                      const subCategory = allSubCategory.find(
                        (el) => el._id === value
                      );

                      setData((preve) => {
                        return {
                          ...preve,
                          subCategory: [...preve.subCategory, subCategory],
                        };
                      });
                      setSelectSubCategory("");
                    }}
                  >
                    <option value={""} className="">
                      Select Sub Category
                    </option>
                    {allSubCategory.map((c, index) => {
                      return (
                        <option key={c?._id + index} value={c?._id}>
                          {c.name}
                        </option>
                      );
                    })}
                  </select>
                  <div className="flex flex-wrap gap-3">
                    {data.subCategory.map((c, index) => {
                      return (
                        <div
                          key={c._id + index + "subCategory"}
                          className="text-sm flex items-center gap-1 bg-blue-50 mt-1 border rounded"
                        >
                          <p>{c.name}</p>
                          <div
                            onClick={() => handleRemoveSubCategory(index)}
                            className="cursor-pointer hover:text-red-500"
                          >
                            <IoClose size={20} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* unit */}
              <div className="grid gap-1">
                <label htmlFor="unit" className="font-medium">
                  Unit
                </label>
                <input
                  id="unit"
                  type="text"
                  placeholder="Product Unit"
                  name="unit"
                  value={data.unit}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md"
                />
              </div>
              {/* stock */}
              <div className="grid gap-1">
                <label htmlFor="stock" className="font-medium">
                  Nr. of Stock
                </label>
                <input
                  id="stock"
                  type="number"
                  placeholder="Product Stock"
                  name="stock"
                  value={data.stock}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md"
                />
              </div>
              {/* price */}
              <div className="grid gap-1">
                <label htmlFor="price" className="font-medium">
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Product Price"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md"
                />
              </div>
              {/* discount */}
              <div className="grid gap-1">
                <label htmlFor="discount" className="font-medium">
                  Discount
                </label>
                <input
                  id="discount"
                  type="number"
                  placeholder="Product Discount"
                  name="discount"
                  value={data.discount}
                  onChange={handleChange}
                  required
                  className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md"
                />
              </div>
              {/* add more field */}
              {Object?.keys(data?.more_details)?.map((k, index) => {
                return (
                  <div key={k + index} className="grid gap-1">
                    <label htmlFor={k} className="font-medium">
                      {k}
                    </label>
                    <input
                      id={k}
                      type="text"
                      value={data?.more_details[k]}
                      onChange={(e) => {
                        const value = e.target.value;
                        setData((preve) => {
                          return {
                            ...preve,
                            more_details: {
                              ...preve.more_details,
                              [k]: value,
                            },
                          };
                        });
                      }}
                      required
                      className="bg-blue-50 p-2 outline-none border focus-within:border-primary-200 rounded-md"
                    />
                  </div>
                );
              })}
              <div
                onClick={() => setOpenAddField(true)}
                className="hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-black cursor-pointer rounded"
              >
                Add Field
              </div>

              <button className="bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold">
                Update Product
              </button>
            </form>
          </div>

          {ViewImageUrl && (
            <ViewImage url={ViewImageUrl} close={() => setViewImageUrl("")} />
          )}

          {openAddField && (
            <AddFieldComponent
              value={fieldName}
              onChange={(e) => setFieldName(e.target.value)}
              submit={handleAddField}
              close={() => setOpenAddField(false)}
            />
          )}
        </section>
      </div>
    </section>
  );
};

export default EditProductAdmin;

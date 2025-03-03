import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [isMobile] = useMobile();
  const params = useLocation();
  const searchText = params?.search?.slice();

  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
    // console.log(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate("/search");
  };

  const handleOnChange = (e) => {
    const value = e.target.value;

    const url = `/search?q=${value}`;
    navigate(url);
    // console.log("value su onChange: ", value);
    
  }

  return (
    <div className="w-full min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center gap-1 text-neutral-600 bg-slate-50 group focus-within:border-primary-200">
      <div className="">
        {(isMobile && isSearchPage) ? (
          <Link to={"/"} className="flex justify-center items-center h-full p-2 m-1  group-focus-within:text-primary-200 bg-white rounded-full shadow-md">
            <FaArrowLeft size={20} className="text-primary-200" />
          </Link>
        ) : (
          <button className="flex justify-center items-center h-full p-3  group-focus-within:text-primary-200">
            <IoSearch size={22} className="" />
          </button>
        )}
      </div>
      <div className="w-full h-full">
        {!isSearchPage ? (
          // quando sono nella home = false
          <div
            onClick={redirectToSearchPage}
            className="cursor-pointer w-full h-full flex items-center"
          >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Search ...",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                'Search "bread"',
                1000,
                'Search "sugar"',
                1000,
                'Search "panner"',
                1000,
                'Search "chocolate"',
                1000,
                'Search "curd"',
                1000,
                'Search "rice"',
                1000,
                'Search "egg"',
                1000,
                'Search "chips"',
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>
        ) : (
          // quando sono nella pagina di search = true
          <div className="w-full h-full">
            <input
              type="text"
              placeholder="Search for atta dal and more"
              defaultValue={searchText}
              className="bg-transparent w-full h-full text-neutral-600 outline-none"
              onChange={handleOnChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;

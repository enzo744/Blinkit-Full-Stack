import { Outlet } from "react-router-dom"
import UserMenu from "../components/UserMenu"
import { useSelector } from "react-redux";

const Dashboard = () => {
  // eslint-disable-next-line no-unused-vars
  const user = useSelector((state) => state?.user);

  // console.log("user", user);
  
  return (
    <section className="bg-white">
      <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
            {/* left for menu */}
            <div className="py-4 sticky top-24 max-h-[calc(100vh-96px)] overflow-x-auto hidden lg:block border-r">
                <UserMenu/>
            </div>





            {/* right for content */}
            <div className="bg-white min-h-[75vh]">
                <Outlet />
            </div>
      </div>
    </section>
  )
}

export default Dashboard

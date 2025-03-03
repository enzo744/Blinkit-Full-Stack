import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

// eslint-disable-next-line react/prop-types
const AdminPermision = ({ children }) => {
  const user = useSelector((state) => state.user);
  return (
    <>
      {isAdmin(user?.role) ? (
        children
      ) : (
        <p className="text-red-600 text-semibold text-2xl text-center bg-red-100 p-4">
          Non hai i permessi per accedere in questa pagina
        </p>
      )}
    </>
  );
};

export default AdminPermision;

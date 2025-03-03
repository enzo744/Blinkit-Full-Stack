import Swal from "sweetalert2";

const successAlert = (title) => {
    const alert= Swal.fire({
        icon: "success",
        title: title,
        confirmButtonColor: "#0e7e3b",
      });
      return alert;
};

export default successAlert
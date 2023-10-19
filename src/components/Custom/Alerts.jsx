import React, { useEffect } from "react";
import Swal from "sweetalert2";

const Alert = ({ icon, title,text }) => {
  useEffect(() => {
    if (icon && title && text) {
      Swal.fire({
        icon: icon,
        title: title,
        text:text
      });
    }
  }, [icon, title,text]);

  return <></>;
};

export default Alert;


// import React, { useEffect } from "react";
// import Swal from "sweetalert2";

// const Alert = ({ title, icon }) => {
//   useEffect(() => {
//     Swal.fire({
//       icon: icon,
//       title: title,
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   }, []);
//   return <></>;
// };

// export default Alert;

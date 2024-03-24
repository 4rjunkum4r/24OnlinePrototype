// import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import axios from "axios";
// import env from "../enviroinment";
// import { useNavigate } from "react-router-dom";
// import "../style/LoginPageStyling.css";

// function Login() {
//   let [RegistrationNumber, setRegistrationNumber] = useState("");
//   let [Password, setPassword] = useState("");
//   let navigate = useNavigate();

//   let handleLogin = async () => {
//     let res = await axios.post(`${env.apiurl}/student`, {
//       RegistrationNumber,
//       Password,
//     });
//     if (res.data.statusCode === 200) {
//       sessionStorage.setItem("token", res.data.token);
//       sessionStorage.setItem("role", res.data.role);
//       sessionStorage.setItem("userId", res.data.userId);
//       sessionStorage.setItem("RegistrationNumber", RegistrationNumber);
//       sessionStorage.setItem("isSignedIn", false);
//       if (res.data.role === "admin") navigate("/dashboard");
//       else navigate("/user-menu");
//     } else {
//       setTimeout(() => {
//         setRegistrationNumber("");
//         setPassword("");
//       }, 3000);
//     }
//   };

//   return (
//     <>
//       <section
//         className="h-100 gradient-form"
//         style={{ backgroundColor: "#eee" }}
//       >
//         <div className="container py-5 h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100">
//             <div className="col-xl-12">
//               <div className="card rounded-3 text-black">
//                 <div className="card-body p-md-5 mx-md-4">
//                   <div className="text-center">
//                     <img
//                       className="logo-image logo"
//                       src="https://upload.wikimedia.org/wikipedia/en/3/3a/Lovely_Professional_University_logo.png"
//                     />
//                     <h4 className="mt-1 mb-5 pb-1">
//                       24 Online Updated Prototype
//                     </h4>
//                   </div>
//                   <div className="col-lg-12 d-flex align-items-center gradient-custom-2">
//                     <div className="text-white px-3 py-4 p-md-5 mx-md-4">
//                       <h6 className="mb-3">
//                         I understand, agree with, confirm and will abide by the
//                         University Internet usage policy interalia that this LPU
//                         internet access/ connectivity is provided/ allowed as a
//                         privilege to me for academic support only and any
//                         prohibited or unauthorized use is not permitted to me. I
//                         further understand and undertake that any unauthorized
//                         downloading, access, viewing or usage etc of any
//                         website, software, material, information, data, etc.
//                         (pertaining to the university or trust and their
//                         associates/ constituents or external agency or third
//                         party) through internet connectivity/ access/ usage so
//                         provided by the university, shall be at my sole risk and
//                         responsibility and the university shall not be
//                         responsible for the same and I hereby indemnify and
//                         shall keep indemnified the LPU or Trust and their
//                         associates/ constituents at all times from consequences
//                         arising from aforesaid any unauthorized/ prohibited act
//                         done by me.
//                       </h6>
//                     </div>
//                   </div>
//                   <br></br>
//                   <div className="text-center">
//                     <h6>
//                       Kindly enter your credentials given by the institute
//                     </h6>
//                   </div>
//                   <div className=" text-center col-lg-4">
//                     <form>
//                       <div className="form-outline mb-4 text-center">
//                         <Form.Control
//                           type="RegistrationNumber"
//                           value={RegistrationNumber}
//                           placeholder="Enter RegistrationNumber"
//                           onChange={(e) => setRegistrationNumber(e.target.value)}
//                         />
//                       </div>

//                       <div className="form-outline mb-4 text-center">
//                         <Form.Control
//                           type="Password"
//                           value={Password}
//                           placeholder="Password"
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                       </div>

//                       <div className="text-center pt-1 mb-5 pb-1">
//                         <Button
//                           className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
//                           variant="primary"
//                           onClick={() => handleLogin()}
//                         >
//                           Log in
//                         </Button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default Login;


import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import firebase from "firebase/app"; // Import Firebase
import "firebase/database"; // Import Firebase Realtime Database
import env from "../enviroinment";
import { useNavigate } from "react-router-dom";
import "../style/LoginPageStyling.css";

function Login() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Fetch user data from Firebase Realtime Database
    firebase.database().ref("users").once("value")
      .then(snapshot => {
        const users = snapshot.val();
        const user = users[registrationNumber];
        if (user && user.password === password) {
          // Login successful, navigate to appropriate route
          sessionStorage.setItem("userId", user.userId);
          sessionStorage.setItem("RegistrationNumber", registrationNumber);
          sessionStorage.setItem("isSignedIn", false);
          if (user.role === "admin") navigate("/dashboard");
          else navigate("/user-menu");
        } else {
          // Handle incorrect credentials
          alert("Invalid credentials. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  };

  return (
    <>
      {/* Your JSX code for login form */}
    </>
  );
}

export default Login;

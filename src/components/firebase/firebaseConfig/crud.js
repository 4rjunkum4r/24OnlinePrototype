"use client";
import FirebaseConfig from "./config";
import { ref, set, get, update, remove, child } from "firebase/database";
import { useState } from "react";

const database = FirebaseConfig();

function FirebaseCRUD() {
  let [uname,setUname] = useState("");
  let [registrationNumber, setRegistrationNumber] = useState("");
  let [password, setPassword] = useState("");
  let [phoneNumber, setPhoneNumber] = useState("");

  let isNullOrWhiteSpace = (value) => {
    value = value.toString();
    return value == null || value.replaceAll(" ", "").length < 1;
  };

  let InsertData = () => {
    const dbref = ref(database);
    if (
      isNullOrWhiteSpace(uname) ||
      isNullOrWhiteSpace(registrationNumber) ||
      isNullOrWhiteSpace(password) ||
      isNullOrWhiteSpace(phoneNumber)
    ) {
      alert("Fill all the fields");
      return;
    }

    get(child(dbref, "Student/" + uname))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("User already exists");
        } else {
          set(ref(database, "Student/" + uname), {
            RegistrationNumber: registrationNumber,
            Password: password,
            PhoneNumber: phoneNumber,
          }).then(()=>{
            alert("User inserted")
          })
          .catch(error=>{
            console.log(error);
            alert("Error While inserting")
          })
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error data not received");
      });
  };

  let UpdateData = () => {
    const dbref = ref(database);
    if (isNullOrWhiteSpace(uname)) {
      alert("Username is empty ");
      return;
    }

    get(child(dbref, "Student/" + uname))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(database, "Student/" + uname), {
            RegistrationNumber: registrationNumber,
            Password: password,
            PhoneNumber: phoneNumber,
          })
            .then(() => {
              alert("User Updated");
            })
            .catch((error) => {
              console.log(error);
              alert("Error While updating");
            });
        } else {
          alert("User don't exist");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error data not received");
      });
  };

  let DeleteData = () => {
    const dbref = ref(database);
    if (isNullOrWhiteSpace(uname)) {
      alert("Username is required to delete user");
      return;
    }

    get(child(dbref, "Student/" + uname))
      .then((snapshot) => {
        if (snapshot.exists()) {
          remove(ref(database, "Student/" + uname))
            .then(() => {
              alert("User deleted");
            })
            .catch((error) => {
              console.log(error);
              alert("Error While deleting");
            });
        } else {
          alert("User don't exist");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error data not received");
      });
  };

  let SelectData = () => {
    const dbref = ref(database);

    if (isNullOrWhiteSpace(uname)) {
      alert("Username is required");
      return;
    }

    get(child(dbref, "Student/" + uname))
      .then((snapshot) => {
        if (snapshot.exists()) {
        //   setRegistrationNumber(snapshot.val().RegistrationNumber);
        //   setPassword(snapshot.val().Password);
        //   setPhoneNumber(snapshot.val().PhoneNumber);
        <Dashboard/>
        
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error data not received");
      });
  };
  return (
    <>
      <label>Name</label>
      <input
        type="text"
        value={uname}
        onChange={(e) => {
          setUname(e.target.value);
        }}
      />
      <br />

      <label>Registration Number</label>
      <input
        type="number"
        value={registrationNumber}
        onChange={(e) => {
          setRegistrationNumber(e.target.value);
        }}
      />
      <br />

      <label>Password</label>
      <input
        type="text"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />

      <label>Phone Number</label>
      <input
        type="number"
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <br />

      <button onClick={InsertData}>Insert</button>
      <button onClick={UpdateData}>Update</button>
      <button onClick={DeleteData}>Delete</button>
      <button onClick={SelectData}>Select</button>
    </>
  );
}
export default FirebaseCRUD;

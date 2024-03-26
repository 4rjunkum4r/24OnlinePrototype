"use client";
import FirebaseConfig from "../../backend/database/firebaseConfig/firebaseConfig";
import { ref, set, get, update, child } from "firebase/database";
import { useState } from "react";

const database = FirebaseConfig();

function StudentLogs() {
  let [logUserName, setLogUserName] = useState("");
  let [loggedIn, setLoggedIn] = useState("");
  let [dataUpload, setDataUpload] = useState("");
  let [dataDownload, setDataDownload] = useState("");
  let [loggedOut, setLoggedOut] = useState("");

  let isNullOrWhiteSpace = (value) => {
    value = value.toString();
    return value == null || value.replaceAll(" ", "").length < 1;
  };

  let CreateLogs = () => {
    const dbref = ref(database);
    if (
      isNullOrWhiteSpace(logUserName) ||
      isNullOrWhiteSpace(loggedIn) ||
      isNullOrWhiteSpace(dataUpload) ||
      isNullOrWhiteSpace(dataDownload) ||
      isNullOrWhiteSpace(loggedOut)
    ) {
      alert("Fill all the fields");
      return;
    }

    get(child(dbref, "StudentLogs/" + logUserName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          alert("User already exists");
        } else {
          set(ref(database, "StudentLogs/" + logUserName), {
            loggedIn: loggedIn,
            dataUpload: dataUpload,
            dataDownload: dataDownload,
            loggedOut: loggedOut,
          })
            .then(() => {
              alert("User inserted");
            })
            .catch((error) => {
              console.log(error);
              alert("Error While inserting");
            });
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error data not received");
      });
  };

  let UpdateLogs = () => {
    const dbref = ref(database);
    if (isNullOrWhiteSpace(logUserName)) {
      alert("Username is empty ");
      return;
    }

    get(child(dbref, "StudentLogs/" + logUserName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(ref(database, "StudentLogs/" + logUserName), {
            loggedIn: loggedIn,
            dataUpload: dataUpload,
            dataDownload: dataDownload,
            loggedOut: loggedOut,
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

  let SelectLogs = () => {
    const dbref = ref(database);

    if (isNullOrWhiteSpace(loggedIn)) {
      alert("Username is required");
      return;
    }

    get(child(dbref, "StudentLogs/" + logUserName))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLoggedIn(snapshot.val().loggedIn);
          setDataUpload(snapshot.val().dataUpload);
          setDataDownload(snapshot.val().dataDownload);
          setLoggedOut(snapshot.val().loggedOut);
        } else {
          alert("No data available");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error data not received");
      });
  };
  return (<>

<label>Name</label>
      <input
        type="text"
        value={logUserName}
        onChange={(e) => {
          setLogUserName(e.target.value);
        }}
      />
      <br />

      <label>Logged In time</label>
      <input
        type="time"
        value={loggedIn}
        onChange={(e) => {
          setLoggedIn(e.target.value);
        }}
      />
      <br />

      <label>Data Upload</label>
      <input
        type="number"
        value={dataUpload}
        onChange={(e) => {
          setDataUpload(e.target.value);
        }}
      />
      <br />

      <label>Data Download</label>
      <input
        type="number"
        value={dataDownload}
        onChange={(e) => {
          setDataDownload(e.target.value);
        }}
      />
      <br />
      <label>Logged Out Time</label>
      <input
        type="time"
        value={loggedOut}
        onChange={(e) => {
          setLoggedOut(e.target.value);
        }}
      />
      <br />

      <button onClick={CreateLogs}>InsertLogs</button>
      <button onClick={UpdateLogs}>UpdateLogs</button>
      <button onClick={SelectLogs}>SelectLogs</button>
  </>);
}
export default StudentLogs;

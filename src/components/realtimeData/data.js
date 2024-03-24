import FirebaseConfig from "../firebase/firebaseConfig/config";
import React from "react";
import { ref, onValue } from "firebase/database";
import { Table } from "react-bootstrap";

const db = FirebaseConfig();
export class RealtimeData extends React.Component {
  constructor() {
    super();
    this.state = {
      tableData: [],
    };
  }

  componentDidMount() {
    const dbref = ref(db, "StudentLogs");
    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ "key": keyName, "data": data });
      });
      this.setState({tableData:records});
    });
  }
  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Logged In Time</th>
            <th>Data Upload</th>
            <th>Data Download</th>
            <th>Logged Out Time</th>
          </tr>
        </thead>

        <tbody>
          {this.state.tableData.map((row, index) => {
            <tr key={index}>
              <td>{index}</td>
              <td>{row.key}</td>
              <td>{row.data.logUserName}</td>
              <td>{row.data.loggedIn}</td>
              <td>{row.data.dataUpload}</td>
              <td>{row.data.dataDownload}</td>
              <td>{row.data.loggedOut}</td>
            </tr>;
          })}
        </tbody>
      </Table>
    );
  }
}

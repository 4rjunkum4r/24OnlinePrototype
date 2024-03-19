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
    const dbref = ref(db, "student");
    onValue(dbref, (snapshot) => {
      let records = [];
      snapshot.forEach((childSnapshot) => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ key: keyName, data: data });
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
            <th>Registration Number</th>
            <th>Password</th>
            <th>Phone</th>
          </tr>
        </thead>

        <tbody>
          {this.state.tableData.map((row, index) => {
            <tr>
              <td>{index}</td>
              <td>{row.key}</td>
              <td>{row.data.registrationNumber}</td>
              <td>{row.data.password}</td>
              <td>{row.data.phoneNumber}</td>
            </tr>;
          })}
        </tbody>
      </Table>
    );
  }
}

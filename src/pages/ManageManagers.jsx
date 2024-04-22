import { BASE_URL } from "../utils/constants"; // api url
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSearchBox from "react-search-box"; // search box 
import EditPopup from "../components/UI/popups/EditUserPopup";
import BanUserPopup from "../components/UI/popups/BanUserPopup";
import ResetPassPopup from "../components/UI/popups/ResetPassPopup";
import "../assets/css/ManageManagers.css";

// const ManageManagers = () => {
//   return (
//     <div className="main-body">
//       <div className="page-border">
//         <h1>Manager Data</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Manager Name</th>
//               <th>Date Of Birth</th>
//               <th>Email</th>
//               <th>Phone</th>
//               <th>Options</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Dummy Manager</td>
//               <td>yyyy-mm-dd</td>
//               <td>dummymanager@gmail.com</td>
//               <td>012345678901</td>
//               <td>
//                 <EditPopup
//                   editType="manager"
//                   userID="{manager.userid}"
//                   userName="{manager.managername}"
//                   userDOB="{manager.dob}"
//                   userEmail="{manager.email}"
//                   userPhone="{manager.phone}"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>Dummy Manager</td>
//               <td>yyyy-mm-dd</td>
//               <td>dummymanager@gmail.com</td>
//               <td>012345678901</td>
//               <td>
//               <EditPopup
//                   editType="manager"
//                   userID="{manager.userid}"
//                   userName="{manager.managername}"
//                   userDOB="{manager.dob}"
//                   userEmail="{manager.email}"
//                   userPhone="{manager.phone}"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>Dummy Manager</td>
//               <td>yyyy-mm-dd</td>
//               <td>dummymanager@gmail.com</td>
//               <td>012345678901</td>
//               <td>
//               <EditPopup
//                   editType="manager"
//                   userID="{manager.userid}"
//                   userName="{manager.managername}"
//                   userDOB="{manager.dob}"
//                   userEmail="{manager.email}"
//                   userPhone="{manager.phone}"
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td>Dummy Manager</td>
//               <td>yyyy-mm-dd</td>
//               <td>dummymanager@gmail.com</td>
//               <td>012345678901</td>
//               <td>
//               <EditPopup
//                   editType="manager"
//                   userID="{manager.userid}"
//                   userName="{manager.managername}"
//                   userDOB="{manager.dob}"
//                   userEmail="{manager.email}"
//                   userPhone="{manager.phone}"
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };


const ManageManagers = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/admin/list-owners`);
        setData(response.data.owners);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once after the initial render

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const renderOwner = (owner, index) => {
    return (
      <tr className="border-bottom" key={index}>
        <td>{owner.ownername}</td>
        <td>{owner.dob}</td>
        <td>{owner.email}</td>
        <td>{owner.phone}</td>
        <td>
          <div className="options-buttons-container">
            <EditPopup
              editType="Manager"
              userID={owner.userid}
              userName={owner.ownername}
              userDOB={owner.dob}
              userEmail={owner.email}
              userPhone={owner.phone}
            />
            <BanUserPopup
              userID={owner.userid}
              userName={owner.ownername}
              banStatus={owner.status}
            />
            <ResetPassPopup userID={owner.userid} userName={owner.ownername} />
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="main-body content-screen">
      <div className="page-border">
        <h1>Manager Data</h1>
        {/* Search bar  */}
        <div style={{width:"30%", float:"right", textAlign:"center", marginLeft:"200px",}}>
        <ReactSearchBox
        placeholder="Search"
        value="Doe"
        inputFontSize="100%"
        inputHeight="30%"
        callback={(record) => console.log(record)}
      />
      </div> 
      <br/><br/> 



        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Manager Name</th>
                <th>Date Of Birth</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>{data.map(renderOwner)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


export default ManageManagers;

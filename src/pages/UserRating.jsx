import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Card } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from "recharts";
// import { scaleOrdinal } from "d3-scale";
// import { schemeCategory10 } from "d3-scale-chromatic";
import AreaChart from "../components/AreaChart";
import DataChart from "../components/LineChart";


const UserRating = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/admin/monthly-profits`);
        setData(response.data.monthlyProfits);
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

  return (
    <div className="main-body content-screen">
      <div >
        <Card className="p-3" style={{ borderColor: "#effbff" }}>
          <h1>User Ratings</h1>
          <br />
          <h3>Displaying the ratings for the Managers</h3>
          <br />
          <br />
              <div>
                <AreaChart/>
              </div>
        </Card>
      </div><br/>
      <br />
      <div>
       <h3>Displaying the ratings for Tenants</h3>
       <AreaChart/>
      </div>
    </div>
    

  );
};

export default UserRating;



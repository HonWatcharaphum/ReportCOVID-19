import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(Tooltip, Legend, ArcElement);
let totalPrivateHospital;
let totalPublicHospital;
const PieChart = () => {
  const [dataRes, setdataRes] = useState([]);

  var baseUrl = "https://covid19.traffy.in.th/api/state-covid19";

  const fetchData = async () => {
    return await fetch(baseUrl)
      .then((response) => response.json())
      .then((data) =>{ 
        totalPrivateHospital = data.results[0].totalPrivateHospital
        totalPublicHospital = data.results[0].totalPublicHospital
        return setdataRes(data.results)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function getRandomRgbColor() {
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = (num >> 8) & 255;
    var b = num & 255;
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }

  var backgroundColors = [];
  var borderColors = [];

  dataRes.forEach(() => {
    var color = getRandomRgbColor();
    backgroundColors.push(color);
    borderColors.push(color);
  });

  var data = {
    labels: [
      'โรงพยาบาลรัฐ', 
      'โรงพยาบาลเอกชน'
    ],
    datasets: [
      {
        data: [totalPrivateHospital,totalPublicHospital],
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  return (
    <div>
      <h1 className="spacing">
        สัดส่วนผู้ป่วยโรงพยาบาล</h1>
    <div>
      <Pie data={data} height={400} options={options} />
    </div>
    </div>
  );
};

export default PieChart;
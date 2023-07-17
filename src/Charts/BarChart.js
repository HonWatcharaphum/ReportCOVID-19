import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement);

const BarChart = () => {
  const [dataRes, setdataRes] = useState([]);

  var baseUrl = "https://covid19.traffy.in.th/api/state-covid19";
  // var proxyUrl = 'https://cors-anywhere.herokuapp.com/'

  // useEffect(() => {
  //     const data = async () => {
  //        await fetch(`${baseUrl}`,{
  //             headers: {
  //                 'Content-Type': 'application/json',
  //                 'Access-Control-Allow-Origin': '*',
  //             },
  //             mode: 'no-cors'
  //         }).then((response) => {
  //             console.log (response.json())
  //         }).catch(error => {
  //             console.log(error);
  //         })
  //     }
  //     data()
  // }, [baseUrl]);
  const fetchData = () => {
    return fetch(baseUrl)
      .then((response) => response.json())
      .then((data) => setdataRes(data.results));
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
  var color;
  var data = {
    labels: dataRes.slice(0, 7).map((data) => data.publishdate),
    datasets: [
      {
        label: "จำนวนผู้ป่วยเข้าเกณฑ์ PUI (สะสม)",
        data: dataRes.map((data) => data.currentlyInfectedPatients),
        pointRadius: 0,
        spanGaps:true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนผู้ป่วยที่มีอาการตามนิยามพบที่สนามบิน (สะสม)",
        data: dataRes.map((data) => data.totalDeaths),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนพบผู้ป่วยที่มีอาการตามนิยามพบที่ท่าเรือ (สะสม)",
        data: dataRes.map((data) => data.currentlySeriousOrCritical),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนผู้ป่วยที่มีอาการตามนิยามเข้าโรงพยาบาลด้วยตนเอง (สะสม)",
        data: dataRes.map((data) => data.totalHospitalPUI),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนการตรวจแล้ว (สะสม)",
        data: dataRes.map((data) => data.totalTests),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนผู้เสียชีวิต (สะสม)",
        data: dataRes.map((data) => data.totalDeaths),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
    ],
  };

  let options = {
    plugins: {
      title: {
        display: true,
        text: "BarChart",
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        beginAtZero: true,
      },
    },
    legend: {
      labels: {
        fontsize: 26,
      },
    },
  };

  console.log(dataRes.results);
  return (
    <div>
      <h1 className="spacing">
        จำนวนผู้ป่วยโควิด-19</h1>
      <div>
        <Bar data={data} height={400} options={options} />
      </div>
    </div>
  );
};

export default BarChart;

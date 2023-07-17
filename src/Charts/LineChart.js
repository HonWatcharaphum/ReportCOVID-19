import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const Linechart = () => {
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
    labels: dataRes.slice(0, 120).map((data) => data.publishdate),
    datasets: [
      {
        label: "หายป่วย (ต่อวัน)",
        data: dataRes.map((data) => data.newRecovered),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนผู้ป่วยยืนยัน (ต่อวัน)",
        data: dataRes.map((data) => data.newCases),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนผู้เสียชีวิต (ต่อวัน)",
        data: dataRes.map((data) => data.newDeaths),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนผู้ป่วยเข้าเกณฑ์ PUI (ต่อวัน)",
        data: dataRes.map((data) => data.newPUI),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "มีอาการรุนแรง (ต่อวัน)",
        data: dataRes.map((data) => data.newSeriousOrCritical),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "อยู่ระหว่างการรักษา (ต่อวัน)",
        data: dataRes.map((data) => data.newInfectedPatients),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
      {
        label: "จำนวนการตรวจเพิ่ม (ต่อวัน)",
        data: dataRes.map((data) => data.newTests),
        pointRadius: 0,
        spanGaps: true,
        backgroundColor: [(color = getRandomRgbColor())],
        borderColor: [color],
        borderWidth: 1,
      },
    ],
  };

  let options = {
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
      <h1 className="spacing">สถานะผู้ป่วยโควิด-19</h1>
      <div>
        <Line data={data} height={500} options={options} />
      </div>
    </div>
  );
};

export default Linechart;

import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Enrollment activity",
    },
  },
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);
const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ChartDetails {
  data: number[];
  labels: string[];
}

interface LineProps {
  chartDetails: ChartDetails;
}

export const LineChart: React.FC<LineProps> = ({ chartDetails }) => {
  const data = {
    labels: chartDetails.labels,
    datasets: [
      {
        data: chartDetails.data,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.1
      },
    ],
  };

  return <Line options={options} data={data} />;
};

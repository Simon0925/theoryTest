import styles from "./MockTestChart.module.scss";
import { Line } from "react-chartjs-2";
import Chart, { ChartOptions, registerables } from 'chart.js/auto';
import { useState } from "react";

// Manually register the required components, like scales
Chart.register(...registerables);

export default function MockTestChart() {
  const [correctAnswers, setCorrectAnswers] = useState<number>(50);
  const totalQuestions = 50;

  // Line chart data
  const data = {
    labels: ["Start", "25%", "50%", "75%", "100%"], // Milestones
    datasets: [
      {
        label: "Progress", // Label for the chart
        data: [0, 15, 25,25,50,55,50,75,78, correctAnswers], // Data points (mock example)
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.1)", // Light fill color
        borderColor: "#4bc0c0", // Main line color
        borderWidth: 2,
        pointBorderColor: "#4bc0c0", // Point border color
        pointBackgroundColor: "#4bc0c0", // Point fill color
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4bc0c0",
        tension: 0.4, // Adds smooth curves to the lines
      },
    ],
  };

  // Chart options
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Ensure it fits within the container
    scales: {
      y: {
        type: 'linear',
        min: 0,
        max: totalQuestions, // Scale based on total questions
        grid: {
          drawBorder: false, // Removes axis border
          color: "rgba(200, 200, 200, 0.2)", // Light grid lines
        },
        ticks: {
          callback: function (value) {
            return `${(value as number / totalQuestions) * 100}%`; // Show percentage values
          },
          color: "#666", // Tick color
          font: {
            size: 12, // Tick font size
          },
        },
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: "#666", // Tick color for x-axis
          font: {
            size: 12, // Font size for x-axis labels
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        enabled: true, // Enable tooltips on hover
        callbacks: {
          label: function (context) {
            return `${context.raw} correct answers`; // Customize tooltip label
          },
        },
      },
    },
  };

  return (
    <div className={styles.mockTestChart}>
      <div style={{ height: "300px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

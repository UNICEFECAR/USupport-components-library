import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

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

import "./line-chart.scss";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

/**
 * LineChart
 *
 * LineChart component used in MoodTrackHistoryBlock
 *
 * @return {jsx}
 */
export const LineChart = ({ data, handleSelectItem, selectedItemId }) => {
  const getMoodValue = (mood) => {
    switch (mood) {
      case "happy":
        return 3.87;
      case "good":
        return 3;
      case "sad":
        return 2;
      case "depressed":
        return 1;
      case "worried":
        return 0.12;
      default:
        return 0;
    }
  };

  const [selectedItemIndex, setSelectedItemIndex] = useState("");

  useEffect(() => {
    const index = data.indexOf(
      data.find((x) => {
        return x.mood_tracker_id === selectedItemId;
      })
    );
    setSelectedItemIndex(index);
  }, [data, selectedItemId]);

  const lineData = useMemo(() => {
    return {
      labels: data.map((mood) => mood.time.getDate()),
      datasets: [
        {
          data: data.map((mood) => getMoodValue(mood.mood)),
          borderColor: "#20809E",
          hoverBackgroundColor: "#C1EAEA",
          borderWidth: 1,
          pointBorderWidth: 1,
          pointHoverBorderColor: "#20809E",
          pointHoverBorderWidth: 2,
          pointRadius: function (context) {
            const index = context.index;

            if (index === selectedItemIndex) {
              return 8;
            } else {
              return 6;
            }
          },
          pointHoverRadius: 7,
          pointBackgroundColor: function (context) {
            const index = context.index;

            if (index === selectedItemIndex) {
              return "#54CFD9";
            } else {
              return "#C1EAEA";
            }
          },
        },
      ],
    };
  }, [data, selectedItemIndex]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
      },
      y: {
        min: 0,
        max: 4,
        stepSize: 1,
        beginAtZero: true,
        count: 5,
        border: { dash: [4, 4] },
        grid: {
          display: true,
          color: "#A6B4B8",
          tickBorderDash: [4],
          lineWidth: 0.5,
        },
        ticks: {
          count: 5,
          display: false,
        },
      },
    },
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    onClick: (evt, element) => {
      if (element.length) {
        handleSelectItem(element[0].index);
      }
    },
  };

  return <Line data={lineData} options={options} />;
};

LineChart.propTypes = {
  // Add propTypes here
};

LineChart.defaultProps = {
  // Add defaultProps here
};

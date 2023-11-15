import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js';
import '../chartjs-adapter';

function Charts() {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    // Register necessary scales
    Chart.register('category', 'linear');

    fetch('http://localhost:3300/issue/issuesByPriority')
      .then((response) => response.json())
      .then((data) => {
        const priorities = data.priorities;
        const counts = data.counts;
        setChartData({ priorities, counts });
      })
      .catch((error) => console.error('Error fetching ticket data:', error));
  }, []);

  const createOrUpdatePriorityChart = () => {
    const ctx = document.getElementById('priorityChart').getContext('2d');

    // Check if a Chart instance already exists, and if it does, destroy it
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: chartData.priorities,
        datasets: [
          {
            label: 'Ticket Priority',
            data: chartData.counts,
            backgroundColor: 'rgba(186, 186, 186, 0.2)',
            borderColor: 'rgba(186, 186, 186, 1)',

            
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  useEffect(() => {
    if (chartData) {
      createOrUpdatePriorityChart();
    }
  }, [chartData]);

  return (
    <div className="chart-container w-3.5/5">
        <div className='pl-32 py-10 pr-16 '>
        <h3 className='text-2xl font-bold text-cyan-950 pb-4 pl-20'>Chart by periority</h3>
      {chartData ? (
        <div>
          <canvas id="priorityChart" width= "400" height = "300" ></canvas>
          
        </div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
    </div>
  );
}

export default Charts;

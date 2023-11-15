import React, { useEffect, useState, useRef } from 'react';
import { Chart } from 'chart.js';
import '../chartjs-adapter';

function StatusChart() {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register('category', 'linear');

    fetch('http://localhost:3300/issue/issuesByStatus')
      .then((response) => response.json())
      .then((data) => {
        const statuses = data.statuses;
        const counts = data.counts;
        setChartData({ statuses, counts });
      })
      .catch((error) => console.error('Error fetching ticket data:', error));
  }, []);

  const createOrUpdateStatusChart = () => {
    const ctx = document.getElementById('statusChart').getContext('2d');

    // Check if a Chart instance already exists, and if it does, destroy it
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: chartData.statuses,
        datasets: [
          {
            data: chartData.counts,
            backgroundColor: [
              'rgba(186, 186, 186, 0.2)', 
              'rgba(200, 200, 200, 0.2)',
              'rgba(0, 0, 50, 0.2)',     
              'rgba(0, 0, 80, 0.2)', 
               
            ],
            
            
            
          },
        ],
        // labels: chartData.statuses,
      },
      
      options: {
        responsive: true,
      },
    });
  };

  useEffect(() => {
    if (chartData) {
      createOrUpdateStatusChart();
    }
  }, [chartData]);

  return (
    <div className='mt-14 pl-10'>
    <div className=" chart-container">
        <h3 className='text-2xl font-bold text-cyan-950 pb-4 pl-10'>Chart by status</h3>
      {chartData ? (
        <div>
          <canvas id="statusChart" ></canvas>
          
        </div>
      ) : (
        <div>Loading data...</div>
      )}
    </div>
    </div>
  );
}

export default StatusChart;

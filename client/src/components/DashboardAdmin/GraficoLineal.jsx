import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraficoLineal = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);
  
    useEffect(() => {
      if (chartInstanceRef.current) {
        // Si el gráfico ya existe, lo destruimos antes de crear uno nuevo
        chartInstanceRef.current.destroy();
      }
      if (chartRef && chartRef.current) {
        const myChartRef = chartRef.current.getContext('2d');
        const chartInstance = new Chart(myChartRef, {
          type: 'line',
          data: {
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
            datasets: [
              {
                label: 'Ventas',
                data: [200, 300, 400, 500],
                fill: false,
                borderColor: '#3B82F6',
                tension: 0.1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
        // Guardamos una referencia al objeto del gráfico para destruirlo la próxima vez
        chartInstanceRef.current = chartInstance;
      }
    }, [chartRef]);
  
    return (
      <div className="w-96 h-64">
        <canvas ref={chartRef} />
      </div>
    );
  };

export default GraficoLineal;
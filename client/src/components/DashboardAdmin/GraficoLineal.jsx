import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const GraficoLineal = ({datos}) => {
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
            labels: datos.meses,
            datasets: [
              {
                label: `Ventas ultimos 4 meses`,
                data: datos.ventas,
                fill: false,
                borderColor: '#3B82F6',
                tension: 0.5,
              }
            ]
          },
          options: {
            scales: {
              yAxis: [
                {
                  ticks: {
                    beginAtZero: false
                  }
                }
              ]
            }
          }
        });
        // Guardamos una referencia al objeto del gráfico para destruirlo la próxima vez
        chartInstanceRef.current = chartInstance;
      }
    }, [chartRef, datos]) //eslint-disable-line

    if(!datos) return null
    return (
      <div className="w-full h-64">
        <canvas ref={chartRef} />
      </div>
    );
  };

export default GraficoLineal;
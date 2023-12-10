import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Tổng nhập',
            data: [1, 1, 1, 1, 1, 1, 1],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Tổng xuất',
            data: [2, 2.3, 2.1, 3, 3.6, 2.9, 1.7],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        {
            label: 'Tổng thu',
            data: [1, 1.3, 1.1, 2, 2.6, 1.9, 0.7],
            backgroundColor: '#9ADE7B',
        },
    ],
};

export function Home() {
    return <Bar options={options} data={data} />;
}

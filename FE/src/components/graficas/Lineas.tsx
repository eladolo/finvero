import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};
const labelsDummy = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const dataDummy = {
    labels: labelsDummy,
    datasets: [
        {
            fill: true,
            label: 'Dataset 2',
            data: labelsDummy.map(() => Math.round(Math.random() + 5) / 9999),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const Lineas = (props: any) => {
    const [chartData, setChartData] = React.useState(dataDummy);
    const [chartOptions, setChartOptions] = React.useState(options);

    React.useEffect(() => {
        if (props.data !== null) {
            setChartData(props.data);
        }
        if (props.options !== null) {
            setChartOptions(props.options);
        }
    }, [setChartData, setChartOptions, props.data, props.options]);

    return <Line options={chartOptions} data={chartData} />;
};

export default Lineas;

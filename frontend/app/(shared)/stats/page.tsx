"use client";
import Wrapper from "@/components/Wrapper";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    },
};

const StatsPage = () => {
    
    const data = {
        labels: ["one", "two", "three", "four"],
        datasets: [
            {
                label: "data",
                data: [1, 2, 3, 4],
            },
        ],
    };
    return (
        <Wrapper>
            <Bar options={options} data={data} />
        </Wrapper>
    );
};

export default StatsPage;

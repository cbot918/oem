import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// 註冊 Chart.js 元件
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const getTime = (sourceTime)=>{

  const date = sourceTime.split("T")[0]
  const year = date.split("-")[0]
  const month = date.split("-")[1]
  const day = date.split("-")[2]
  const time = sourceTime.split("T")[1]

  return {
    "date":date,
    "year":year, 
    "month":month, 
    "day":day
  }

}  


export default function LineChart() {
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 1, // 正常狀態的點大小 (預設是 3)
        hoverRadius: 4, // 滑鼠懸停時的點大小 (預設是 4)
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true, // 禁用自動跳過
          maxRotation: 45, // 旋轉 Label，防止擠在一起
          minRotation: 45
        }
      }
    }
  };


  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // 從 JSON 讀取資料
    fetch("http://localhost:8000/chart")  // 確保這個 JSON 可用
      .then((response) => response.json())
      .then((data) => {
        // 提取 Date 和 Close
        
        const labels = data.map((item) => {
          return getTime(item.Date)["year"]+"-"+getTime(item.Date)["month"]
        });
        const prices = data.map((item) => item.Close);

        setChartData({
          labels,
          datasets: [
            {
              label: "Stock Price",
              data: prices,
              borderColor: "blue",
              backgroundColor: "rgba(0,0,255,0.3)",
            },
          ],
        });
      });
  }, []);

  return (
    <div style={{ width: "1200px", height: "600px" }}>
      <h2>5 year AAPL Price Chart</h2>
      {chartData ? <Line data={chartData} options={options}/> : <p>Loading...</p>}
    </div>
  );
}

import React from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';


const PieChartComponent = (props) => {
  const COLORS = ['green', 'red'];

  const [pieChartData, setPieChartData]=React.useState(props.data ? props.data : []);

  React.useEffect(()=>{
    setPieChartData(props.data);
  },[props.data])

  return (
    <PieChart width={500} height={450} style={{ margin: "auto" }}>
      <Pie
        data={pieChartData}
        dataKey="value"
        cx={"50%"}
        cy={"50%"}
        outerRadius={80}
        fill="#8884d8"
        label={(data) => {
          // console.log(data)
          return `${data.name}-${((data.percent)*100).toFixed(2)}%`;
        }}
      >
        {pieChartData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend verticalAlign="bottom" height={120} />
    </PieChart>
  )
};

export default PieChartComponent;
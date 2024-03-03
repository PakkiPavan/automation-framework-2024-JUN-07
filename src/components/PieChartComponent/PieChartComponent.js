import React from 'react';
import { PieChart, Pie, Legend, Cell } from 'recharts';


const PieChartComponent = (props) => {
  // const COLORS = ['green', 'red'];

  const [pieChartData, setPieChartData] = React.useState(props.data ? props.data : []);

  React.useEffect(() => {
    setPieChartData(props.data);
  }, [props.data])

  return (
    <PieChart width={1000} height={550} style={{ margin: "auto" }}>
      <Pie
        data={pieChartData}
        // dataKey="value"
        dataKey="passedPercentage"
        nameKey="name"
        cx={"50%"}
        cy={"50%"}
        outerRadius={150}
        fill="#8884d8"
        label={(data) => {
          // console.log(data)
          // return `${data.name}-${((data.percent)*100).toFixed(2)}%`;
          const passedPercentage = data.passedPercentage.toFixed(0);
          const failedPercentage = data.failedPercentage.toFixed(0);
          return `${data.name}-${passedPercentage}%,${failedPercentage}%`;
        }}
      >
        {pieChartData.map((entry, index) => (
          // <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
        ))}
      </Pie>
      <Legend verticalAlign="bottom" height={120} />
    </PieChart>
  )
};

export default PieChartComponent;
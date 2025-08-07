import React from 'react'
import { PieChart, Pie, Cell } from 'recharts'

type DataType = {
  name: string
  value: number
}

function PieChartTimer({ data }: { data: DataType[] }) {
  return (
    <PieChart width={40} height={40}>
      <Pie
        data={data}
        cx='50%'
        cy='50%'
        innerRadius={0}
        outerRadius={20}
        startAngle={90}
        endAngle={-270}
        paddingAngle={0}
        dataKey='value'
        stroke='transparent'
        isAnimationActive={false}
      >
        <Cell key='Remaining' fill='#FFFFFF' />
        <Cell key='Elapsed' fill='#ffffff66' />
      </Pie>
    </PieChart>
  )
}

export default PieChartTimer

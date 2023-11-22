'use client';

import dynamic from 'next/dynamic';

const DynamicApexCharts = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

type UserChartProps = {
  name: string;
  isDownLoad: boolean;
};

const UserChart = ({ name, isDownLoad }: UserChartProps) => {
  const options = {
    chart: {
      id: 'basic-radar',
      toolbar: {
        show: isDownLoad,
      },
    },
    xaxis: {
      categories: [
        '체중',
        '골격근량',
        '체지방량',
        'BMI',
        '체지방률',
        '복부비만률',
      ],
    },
  };
  const series = [
    {
      name,
      data: [30, 40, 45, 50, 49, 60],
    },
  ];
  return (
    <div className="w-full h-full">
      <DynamicApexCharts
        options={options}
        series={series}
        type="radar"
        width="100%"
        height="100%"
      />
    </div>
  );
};

export default UserChart;

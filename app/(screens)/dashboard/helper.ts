// const labels = ["January", "February", "March", "April", "May", "June", "July"];
function getMonthFromDate(dateString: string) {
    const date = new Date(dateString);
    const monthIndex = date.getMonth();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthIndex];
  }
  
  // export const data = {
  //   labels,
  //   datasets: [
  //     {
  //       data: [3, 2, 2, 43, 1, 3, 2],
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //     },
  //   ],
  // };
  
  // const studentsPerMonth = [
//   {
//     month: "2024-02-01T00:00:00+01:00",
//     count: 17,
//   },
//   {
//     month: "2024-03-01T00:00:00+01:00",
//     count: 12,
//   },
//   {
//     month: "2024-04-01T00:00:00+01:00",
//     count: 22,
//   },
// ];

interface StudentRecord {
    month: string;
    count: number;
  }
  
  export const formatChartData = (studentsPerMonth: StudentRecord[]) => {
    const labels = studentsPerMonth.map((record) =>
      getMonthFromDate(record.month)
    );
    const data = studentsPerMonth.map((record) => record.count);
    return { labels, data };
  };
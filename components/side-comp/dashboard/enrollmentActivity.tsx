import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import React from "react";
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

const EnrollmentActivity = ({chartConfig, studentPerMonth}:any) => {
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <h1 className="pl-4 text-xs md:text-xl font-semibold">
          Enrollment activity{" "}
        </h1>
      </div>
      <ChartContainer className="max-h-[450px] w-full" config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={studentPerMonth}
          margin={{
            top: 20,
            left: 15,
            right: 10,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="count"
            type="natural"
            stroke="var(--color-desktop)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-desktop)",
            }}
            activeDot={{
              r: 6,
            }}
          >
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </Line>
        </LineChart>
      </ChartContainer>
    </div>
  );
};

export default EnrollmentActivity;

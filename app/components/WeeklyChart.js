"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyChart({ data }) {
  return (
    <div className="p-1">
      <div className="h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#163225"
            />

            <XAxis
              dataKey="day"
              stroke="#9fceb2"
              tick={{ fill: "#9fceb2", fontSize: 12 }}
            />

            <YAxis
              stroke="#9fceb2"
              tick={{ fill: "#9fceb2", fontSize: 12 }}
              allowDecimals={false}
            />

            <Tooltip
              cursor={{ fill: "rgba(34,197,94,0.1)" }}
              contentStyle={{
                backgroundColor: "#0d1511",
                border: "1px solid rgba(74,222,128,0.16)",
                borderRadius: "6px",
                color: "white",
              }}
              labelStyle={{ color: "#9fceb2" }}
            />

            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <Bar
              dataKey="total"
              fill="url(#colorTrips)"
              radius={[6, 6, 0, 0]}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

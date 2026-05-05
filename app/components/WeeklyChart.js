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
    <div className="bg-[#18181B] p-6 rounded-2xl border border-white/10 w-full">
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            
            {/* grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#27272a"
            />

            {/* x-axis */}
            <XAxis
              dataKey="day"
              stroke="#a1a1aa"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
            />

            {/* y-axis */}
            <YAxis
              stroke="#a1a1aa"
              tick={{ fill: "#a1a1aa", fontSize: 12 }}
              allowDecimals={false}
            />

            {/* tooltip */}
            <Tooltip
              cursor={{ fill: "rgba(34,197,94,0.1)" }}
              contentStyle={{
                backgroundColor: "#18181B",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                color: "white",
              }}
              labelStyle={{ color: "#a1a1aa" }}
            />

            {/* gradient */}
            <defs>
              <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.9} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            {/* bar */}
            <Bar
              dataKey="total"
              fill="url(#colorTrips)"
              radius={[10, 10, 0, 0]}
              animationDuration={800}
            />

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
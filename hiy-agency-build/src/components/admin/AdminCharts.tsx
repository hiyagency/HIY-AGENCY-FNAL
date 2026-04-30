"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const revenueData = [
  { month: "Jan", income: 42000, expenses: 12000 },
  { month: "Feb", income: 58000, expenses: 18000 },
  { month: "Mar", income: 72000, expenses: 24000 },
  { month: "Apr", income: 98000, expenses: 28000 },
  { month: "May", income: 126000, expenses: 36000 },
];

const leadData = [
  { status: "New", value: 8 },
  { status: "Contacted", value: 6 },
  { status: "Proposal", value: 4 },
  { status: "Converted", value: 3 },
];

const workData = [
  { status: "Pending", value: 3 },
  { status: "Progress", value: 7 },
  { status: "Review", value: 2 },
  { status: "Delivered", value: 9 },
];

const fills = ["#ffffff", "#d8d8d8", "#8a8a8a", "#666666"];

export function RevenueChart() {
  return (
    <ResponsiveContainer height={280} width="100%">
      <AreaChart data={revenueData}>
        <defs>
          <linearGradient id="income" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#ffffff" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="month" stroke="#8a8a8a" tickLine={false} />
        <YAxis stroke="#8a8a8a" tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "#080808",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "16px",
            color: "#ffffff",
          }}
        />
        <Area
          dataKey="income"
          fill="url(#income)"
          stroke="#ffffff"
          strokeWidth={2}
          type="monotone"
        />
        <Area
          dataKey="expenses"
          fill="transparent"
          stroke="#666666"
          strokeWidth={2}
          type="monotone"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function LeadStatusChart() {
  return (
    <ResponsiveContainer height={260} width="100%">
      <PieChart>
        <Pie data={leadData} dataKey="value" innerRadius={62} outerRadius={94} paddingAngle={3}>
          {leadData.map((entry, index) => (
            <Cell fill={fills[index % fills.length]} key={entry.status} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#080808",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "16px",
            color: "#ffffff",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function WorkStatusChart() {
  return (
    <ResponsiveContainer height={260} width="100%">
      <BarChart data={workData}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="status" stroke="#8a8a8a" tickLine={false} />
        <YAxis stroke="#8a8a8a" tickLine={false} />
        <Tooltip
          contentStyle={{
            background: "#080808",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "16px",
            color: "#ffffff",
          }}
        />
        <Bar dataKey="value" radius={[10, 10, 0, 0]}>
          {workData.map((entry, index) => (
            <Cell fill={fills[index % fills.length]} key={entry.status} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

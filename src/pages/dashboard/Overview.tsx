import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Package, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$124,500", change: "+12.5%", up: true, icon: DollarSign },
  { title: "Active Users", value: "2,450", change: "+8.2%", up: true, icon: Users },
  { title: "Products", value: "48", change: "+3", up: true, icon: Package },
  { title: "Growth Rate", value: "24.5%", change: "-2.1%", up: false, icon: TrendingUp },
];

const DashboardOverview = () => (
  <div className="space-y-6">
    <div><h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1><p className="text-muted-foreground">Welcome back! Here's what's happening.</p></div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <stat.icon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className={`text-xs flex items-center gap-1 ${stat.up ? "text-green-600" : "text-red-600"}`}>
              {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}{stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid lg:grid-cols-2 gap-6">
      <Card><CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader><CardContent><p className="text-muted-foreground text-sm">Activity feed will appear here.</p></CardContent></Card>
      <Card><CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader><CardContent><p className="text-muted-foreground text-sm">Quick action buttons will appear here.</p></CardContent></Card>
    </div>
  </div>
);

export default DashboardOverview;

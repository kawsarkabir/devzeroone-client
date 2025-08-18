import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  TrendingDown,
  Calendar,
} from "lucide-react";

interface StatsData {
  totalUsers: number;
  totalClasses: number;
  totalEnrollments: number;
  totalRevenue: number;
  monthlyRevenue: Array<{
    month: string;
    revenue: number;
    enrollments: number;
  }>;
  userGrowth: Array<{
    month: string;
    newUsers: number;
    totalUsers: number;
  }>;
  enrollmentTrends: Array<{
    month: string;
    enrollments: number;
    activeEnrollments: number;
  }>;
  topCourses: Array<{
    courseName: string;
    enrollments: number;
    revenue: number;
  }>;
}

const AdminAnalyticsDashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("12months");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/v1/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const calculateGrowthRate = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const pieColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stats) return <div>Error loading analytics data</div>;

  // Calculate growth rates
  const currentMonthRevenue =
    stats.monthlyRevenue[stats.monthlyRevenue.length - 1]?.revenue || 0;
  const previousMonthRevenue =
    stats.monthlyRevenue[stats.monthlyRevenue.length - 2]?.revenue || 0;
  const revenueGrowth = calculateGrowthRate(
    currentMonthRevenue,
    previousMonthRevenue
  );

  const currentMonthUsers =
    stats.userGrowth[stats.userGrowth.length - 1]?.newUsers || 0;
  const previousMonthUsers =
    stats.userGrowth[stats.userGrowth.length - 2]?.newUsers || 0;
  const userGrowth = calculateGrowthRate(currentMonthUsers, previousMonthUsers);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gradient">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Track your platform's performance and growth
          </p>
        </div>
        <div className="flex gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-background"
          >
            <option value="12months">Last 12 Months</option>
            <option value="6months">Last 6 Months</option>
            <option value="3months">Last 3 Months</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {revenueGrowth >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    revenueGrowth >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {Math.abs(revenueGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {formatNumber(stats.totalUsers)}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                {userGrowth >= 0 ? (
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span
                  className={
                    userGrowth >= 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {Math.abs(userGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">new users this month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Courses
              </CardTitle>
              <BookOpen className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {formatNumber(stats.totalClasses)}
              </div>
              <p className="text-xs text-muted-foreground">
                Active learning programs
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Enrollments
              </CardTitle>
              <GraduationCap className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {formatNumber(stats.totalEnrollments)}
              </div>
              <p className="text-xs text-muted-foreground">
                Active student enrollments
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Revenue Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={stats.monthlyRevenue}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} tickFormatter={formatCurrency} />
                  <Tooltip
                    formatter={(value: number) => [
                      formatCurrency(value),
                      "Revenue",
                    ]}
                    labelStyle={{ color: "#000" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    fill="url(#revenueGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                User Growth
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip labelStyle={{ color: "#000" }} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="newUsers"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="New Users"
                    dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="totalUsers"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Total Users"
                    dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enrollment Trends */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="h-96">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-orange-500" />
                Enrollment Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.enrollmentTrends}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="month" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip labelStyle={{ color: "#000" }} />
                  <Legend />
                  <Bar
                    dataKey="enrollments"
                    fill="#f59e0b"
                    name="Total Enrollments"
                  />
                  <Bar
                    dataKey="activeEnrollments"
                    fill="#10b981"
                    name="Active Enrollments"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Performing Courses */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-purple-500" />
              Top Performing Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2 font-medium">Course Name</th>
                    <th className="text-center p-2 font-medium">Enrollments</th>
                    <th className="text-center p-2 font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {(stats.topCourses || []).map((course, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1 + index * 0.1 }}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="p-2 font-medium">{course.courseName}</td>
                      <td className="p-2 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                          {course.enrollments}
                        </span>
                      </td>
                      <td className="p-2 text-center font-medium text-green-600">
                        {formatCurrency(course.revenue)}
                      </td>
                    </motion.tr>
                  ))}
                  {(!stats.topCourses || stats.topCourses.length === 0) && (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-4 text-center text-muted-foreground"
                      >
                        No course data available yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdminAnalyticsDashboard;

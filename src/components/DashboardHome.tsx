import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  User,
  Plus,
  BookMarked,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import AdminAnalyticsDashboard from "@/pages/dashboard/admin/AdminAnalyticsDashboard";

const DashboardHome = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const getCards = () => {
    switch (user?.role) {
      case "teacher":
        return [
          {
            title: "Add Class",
            description: "Create and publish a new class",
            icon: Plus,
            path: "/dashboard/add-class",
            color: "text-green-500",
          },
          {
            title: "My Classes",
            description: "Manage your classes",
            icon: BookOpen,
            path: "/dashboard/my-classes",
            color: "text-blue-500",
          },
          {
            title: "Profile",
            description: "Manage your profile",
            icon: User,
            path: "/dashboard/profile",
            color: "text-orange-500",
          },
        ];
      case "student":
        return [
          {
            title: "My Enrolled Classes",
            description: "View your enrolled courses",
            icon: BookMarked,
            path: "/dashboard/my-enrolled-classes",
            color: "text-blue-500",
          },
          {
            title: "Profile",
            description: "Manage your profile",
            icon: User,
            path: "/dashboard/profile",
            color: "text-green-500",
          },
          {
            title: "Browse Courses",
            description: "Explore and enroll in new courses",
            icon: BookOpen,
            path: "/courses",
            color: "text-purple-500",
          },
        ];
      default:
        return [];
    }
  };

  const cards = getCards();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {user?.role !== "admin" && (
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gradient">
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}{" "}
            Dashboard
          </h1>
          <p className="text-muted-foreground">Overview and quick actions</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={card.path}>
              <Card className="hover-scale cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <card.icon className={`w-5 h-5 ${card.color}`} />
                    <span>{card.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{card.description}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Analytics Dashboard - Only visible for admin users */}
      {user?.role === "admin" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <AdminAnalyticsDashboard />
        </motion.div>
      )}
    </motion.div>
  );
};

export default DashboardHome;

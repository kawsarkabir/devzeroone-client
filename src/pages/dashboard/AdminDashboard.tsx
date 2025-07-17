import React from "react";
import { motion } from "framer-motion";
import { Users, GraduationCap, BookOpen, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";

const AdminDashboard = () => {
  const adminCards = [
    {
      title: "Teacher Requests",
      description: "Review and approve teacher applications",
      icon: GraduationCap,
      path: "/dashboard/teacher-requests",
      color: "text-blue-400",
    },
    {
      title: "Users",
      description: "Manage all users and permissions",
      icon: Users,
      path: "/dashboard/users",
      color: "text-green-400",
    },
    {
      title: "All Courses",
      description: "Approve and manage all classes",
      icon: BookOpen,
      path: "/dashboard/courses",
      color: "text-purple-400",
    },
    {
      title: "Profile",
      description: "Manage your profile information",
      icon: User,
      path: "/dashboard/profile",
      color: "text-orange-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Manage users, classes, and teacher requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminCards.map((card, index) => (
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
    </motion.div>
  );
};

export default AdminDashboard;

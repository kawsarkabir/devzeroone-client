"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Users, BookOpen, TrendingUp, Award } from "lucide-react";
import { getStats, Stats } from "@/services/statsService"; // ensure Stats interface is exported from here

const StatsSection = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const statItems = stats
    ? [
        {
          icon: Users,
          value: stats.totalUsers,
          label: "Active Students",
          description: "Learning and growing every day",
        },
        {
          icon: BookOpen,
          value: stats.totalClasses,
          label: "Expert Courses",
          description: "Covering all major technologies",
        },
        {
          icon: TrendingUp,
          value: stats.totalEnrollments,
          label: "Course Enrollments",
          description: "And counting rapidly",
        },
        {
          icon: Award,
          value: 98, // You can fetch from backend too if available
          label: "Success Rate",
          description: "Student satisfaction guarantee",
          suffix: "%",
        },
      ]
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-20 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 gap-6"
          >
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="bg-muted rounded-xl p-6 h-44 animate-pulse"
                    />
                  ))
              : statItems.map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    className="bg-card rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                      <stat.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      <CountUp
                        end={stat.value}
                        duration={1.5}
                        separator=","
                        suffix={stat.suffix || ""}
                      />
                    </h3>
                    <p className="font-semibold text-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </motion.div>
                ))}
          </motion.div>

          {/* Right Column - Image and Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                alt="Students learning together"
                className="rounded-2xl object-cover w-full h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 bg-primary rounded-full p-4 glow-primary"
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            <div className="mt-8">
              <h2 className="text-3xl font-bold mb-4">
                Join the{" "}
                <span className="text-gradient">Learning Revolution</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Thousands of students worldwide trust DEVZeroOne to advance
                their careers. Our proven track record speaks for itself — with
                industry-leading instructors, comprehensive curricula, and a
                supportive community, we’re here to help you succeed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

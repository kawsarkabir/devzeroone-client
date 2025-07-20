import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseCard from "./CourseCard";
import { mockCourses } from "@/data/mockData";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPopularCourses } from "@/services/classService";
import { toast } from "sonner";
import LoadingSpiner from "./LoadingSpiner";

const PopularCourses = () => {
  const {
    data: popularCourses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["popularCourses"],
    queryFn: getPopularCourses,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) return <LoadingSpiner />;
  if (error) {
    toast.error("Failed to load popular courses");
    return <p>Error loading courses.</p>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section className="py-20 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Most Popular
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-gradient">Popular Courses</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            Discover our most enrolled courses that have helped thousands of
            students achieve their career goals. Join the learning revolution
            today.
          </motion.p>
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {popularCourses.map((course, index) => (
            <CourseCard key={course._id} course={course} index={index} />
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="btn-bounce border-primary/30 hover:bg-primary/10 text-lg px-8 py-6"
          >
            <Link to="/courses">
              View All Courses
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default PopularCourses;

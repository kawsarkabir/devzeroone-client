import React from "react";
import { motion } from "framer-motion";
import { Star, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Course } from "@/data/mockData";
import { Link } from "react-router";

interface CourseCardProps {
  course: Course;
  index?: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, index = 0 }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="bg-card rounded-xl overflow-hidden border border-border/50 card-hover group"
    >
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <span className="bg-primary px-3 py-1 rounded-full text-sm font-semibold text-white">
            ${course.price}
          </span>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
            {course.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Instructor */}
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={course.instructorImage}
            alt={course.instructor}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary/20"
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {course.instructor}
            </p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {course.shortDescription}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">
              {course.rating.average} ({course.rating.count})
            </span>
          </div>

          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.totalEnrollment.toLocaleString()}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Level Badge */}
        <div className="mb-4">
          <span className="inline-block bg-secondary/50 text-secondary-foreground px-2 py-1 rounded-md text-xs font-medium">
            {course.level}
          </span>
        </div>

        {/* Enroll Button */}
        <Button asChild className="w-full btn-bounce group/btn">
          <Link to={`/course/${course.id}`}>
            Enroll Now
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default CourseCard;

import React from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router";
import {
  Star,
  Users,
  Clock,
  Award,
  Play,
  BookOpen,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getClassById } from "@/services/classService";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: course, isLoading } = useQuery({
    queryKey: ["courses-details", id],
    queryFn: () => getClassById(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <Link to="/classes">
            <Button>Back to Courses</Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    { icon: BookOpen, text: "Comprehensive curriculum" },
    { icon: Play, text: "Video lectures" },
    { icon: Award, text: "Certificate of completion" },
    { icon: Users, text: "Community support" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/courses">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Courses
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Course Image */}
              <div className="relative mb-8 rounded-xl overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-primary px-3 py-1 rounded-full text-sm font-medium text-white">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* Course Title */}
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {course.title}
              </h1>

              {/* Course Stats */}
              <div className="flex items-center space-x-6 mb-6 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating.average}</span>
                  <span className="text-muted-foreground">{`(${course.rating.count})`}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span>{course.totalEnrollment || 0} students</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Instructor */}
              <div className="flex items-center space-x-4 mb-8 p-4 bg-card rounded-lg border border-border/50">
                <img
                  src={course.instructorImage || "/placeholder.svg"}
                  alt={course.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{course.instructor}</h3>
                  <p className="text-muted-foreground">Expert Instructor</p>
                  <p className="text-sm text-muted-foreground">
                    {course.email}
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {course.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <feature.icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-sm">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    "Master the fundamentals and advanced concepts",
                    "Build real-world projects from scratch",
                    "Industry best practices and methodologies",
                    "Portfolio-ready applications",
                    "Problem-solving and debugging techniques",
                    "Professional development workflows",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-card rounded-xl p-6 border border-border/50">
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    ${course.price}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    One-time payment
                  </p>
                </div>

                {/* Enroll Button */}
                <Button
                  className="w-full mb-4 glow-primary btn-bounce"
                  onClick={() => navigate(`/payment/${id}`)}
                >
                  Enroll Now - ${course.price}
                </Button>

                <p className="text-xs text-center text-muted-foreground mb-6">
                  30-day money-back guarantee
                </p>

                {/* Course Includes */}
                <div className="space-y-3 pt-6 border-t border-border/50">
                  <h3 className="font-semibold mb-3">This course includes:</h3>

                  {[
                    { icon: Play, text: "25+ hours of video content" },
                    { icon: BookOpen, text: "Downloadable resources" },
                    { icon: Award, text: "Certificate of completion" },
                    { icon: Users, text: "Access to student community" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <item.icon className="w-4 h-4 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Course Details */}
                <div className="pt-6 border-t border-border/50 mt-6">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Level:</span>
                      <span>Intermediate</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{course.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Students:</span>
                      <span>{course.totalEnrollment || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

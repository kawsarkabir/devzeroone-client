import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { getMyEnrolledClasses, Enrollment } from "@/services/classService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Clock, DollarSign } from "lucide-react";

const MyEnrolledClasses = () => {
  const navigate = useNavigate();

  const {
    data: enrollments = [],
    isLoading,
    error,
  } = useQuery<Enrollment[]>({
    queryKey: ["myEnrolledClasses"],
    queryFn: getMyEnrolledClasses,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Enrolled Classes</h1>
          <p className="text-muted-foreground">
            Continue your learning journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="aspect-video bg-muted animate-pulse" />
              <CardHeader>
                <div className="h-6 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted animate-pulse rounded mb-2" />
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
              </CardContent>
              <CardFooter>
                <div className="h-10 bg-muted animate-pulse rounded w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Enrolled Classes</h1>
          <p className="text-muted-foreground">
            Continue your learning journey
          </p>
        </div>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="text-destructive mb-4">
              <BookOpen className="w-16 h-16" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Error Loading Classes
            </h3>
            <p className="text-muted-foreground text-center mb-4">
              There was an error loading your enrolled classes. Please try
              again.
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">My Enrolled Classes</h1>
        <p className="text-muted-foreground">Continue your learning journey</p>
        {enrollments.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1">
            {enrollments.length}{" "}
            {enrollments.length === 1 ? "class" : "classes"} enrolled
          </p>
        )}
      </div>

      {enrollments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Classes Enrolled</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't enrolled in any classes yet. Explore our courses to
              start learning!
            </p>
            <Button onClick={() => navigate("/courses")}>Browse Classes</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment: Enrollment, index: number) => {
            const course = enrollment.class;

            if (!course) {
              console.error("Course data missing for enrollment:", enrollment);
              return null;
            }

            return (
              <motion.div
                key={enrollment._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder-course.jpg";
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <Badge
                        variant={
                          enrollment.status === "active"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {enrollment.status}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="line-clamp-2 text-lg">
                      {course.title}
                    </CardTitle>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        by {course.instructor}
                      </p>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />$
                        {enrollment.amount}
                      </div>
                      <div className="flex items-center col-span-2">
                        <Calendar className="w-3 h-3 mr-1" />
                        Enrolled:{" "}
                        {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() =>
                        navigate(
                          `/dashboard/my-enrolled-classes/${enrollment._id}`
                        )
                      }
                    >
                      Continue Learning
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default MyEnrolledClasses;

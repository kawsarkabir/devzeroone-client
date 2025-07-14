import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import CourseCard from "@/components/CourseCard";
import SearchBar from "@/components/SearchBar";
import {
  getApprovedClasses,
  getAllClasses,
  Class,
} from "@/services/classService";
import { useDebounce } from "@/hooks/useDebounce";
import LoadingSpiner from "@/components/LoadingSpiner";

const AllClasses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["approved-courses", debouncedSearchQuery],
    queryFn: () => {
      if (debouncedSearchQuery) {
        // Filter courses based on search query
        return getAllClasses().then((data) =>
          data
            .filter(
              (cls: any) =>
                cls.title
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase()) ||
                cls.name
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase()) ||
                cls.category
                  .toLowerCase()
                  .includes(debouncedSearchQuery.toLowerCase())
            )
            .filter((cls: any) => cls.status === "approved")
        );
      }
      return getApprovedClasses();
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  if (isLoading) return <LoadingSpiner />;

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold mb-4 text-gradient">
                All Classes
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover and enroll in amazing courses
              </p>
            </div>

            <SearchBar
              onSearch={handleSearch}
              placeholder="Search classes by title, instructor, or category..."
              className="max-w-2xl"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {classes.length} courses
            </p>
          </div>

          {classes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {searchQuery
                  ? "No courses found matching your search"
                  : "No courses available"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {classes.map((course: Class, index: number) => (
                <CourseCard
                  key={course._id}
                  course={{
                    ...course,
                    id: course._id,
                    instructor: course.name,
                    totalEnrollment: course.totalEnrollment || 0,
                    rating: course.rating,
                    duration: "8 weeks",
                    level: "Intermediate",
                  }}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AllClasses;

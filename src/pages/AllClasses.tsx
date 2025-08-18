import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Grid, List, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CourseCard from "@/components/CourseCard";
import { useQuery } from "@tanstack/react-query";
import { Class, getAllApprovedClasses } from "@/services/classService";

const AllClasses = () => {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["approved-courses"],
    queryFn: getAllApprovedClasses,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceSort, setPriceSort] = useState(""); // New state for price sorting
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Extract unique categories from real data
  const categories = Array.from(
    new Set(courses?.map((c) => c.category))
  ).filter(Boolean);

  // Filter and sort courses
  const filteredAndSortedCourses = courses
    ?.filter((course: Class) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || course.category === selectedCategory;
      return matchesSearch && matchesCategory && course.status === "approved";
    })
    ?.sort((a: Class, b: Class) => {
      if (priceSort === "high-to-low") {
        return (b.price || 0) - (a.price || 0);
      } else if (priceSort === "low-to-high") {
        return (a.price || 0) - (b.price || 0);
      }
      return 0; // No sorting if no price filter selected
    });

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

  // Clear all filters function
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceSort("");
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Explore All <span className="text-gradient">Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our expert-led courses to advance your career and skills.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-xl p-6 mb-12 border border-border/50"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses or instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters & View Toggle */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-secondary rounded-lg border border-border text-sm min-w-[150px]"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              {/* Price Sort Filter */}
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-secondary rounded-lg border border-border text-sm min-w-[160px]"
                >
                  <option value="">Sort by Price</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-secondary rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="px-3"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="px-3"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedCategory || priceSort) && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/50">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  Search: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-primary-foreground"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="ml-2 hover:text-primary-foreground"
                  >
                    ×
                  </button>
                </span>
              )}
              {priceSort && (
                <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                  {priceSort === "low-to-high" ? "Price: Low to High" : "Price: High to Low"}
                  <button
                    onClick={() => setPriceSort("")}
                    className="ml-2 hover:text-primary-foreground"
                  >
                    ×
                  </button>
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="ml-2"
              >
                Clear All
              </Button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <p className="text-muted-foreground">
            Showing {filteredAndSortedCourses.length} of {courses.length} courses
            {priceSort && (
              <span className="ml-2 text-primary">
                (sorted by {priceSort === "low-to-high" ? "lowest" : "highest"} price)
              </span>
            )}
          </p>
        </motion.div>

        {/* Courses Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`grid gap-8 mb-16 ${
            viewMode === "grid"
              ? "md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-4xl mx-auto"
          }`}
        >
          {filteredAndSortedCourses.map((course: Class, index: number) => (
            <CourseCard
              key={course._id}
              course={{
                ...course,
                id: course._id,
                instructor: course.instructor,
              }}
              index={index}
            />
          ))}
        </motion.div>

        {/* No Results */}
        {!isLoading && filteredAndSortedCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No courses found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find any courses matching your search criteria. Try
              adjusting your filters or search terms.
            </p>
            <Button onClick={clearAllFilters}>
              Clear All Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllClasses;
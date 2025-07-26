import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllFeedback } from "@/services/feedbackService";

const FeedbackSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const {
    data: feedback = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allFeedback"],
    queryFn: getAllFeedback,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth >= 768 ? 2 : 1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || feedback.length <= slidesPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev + slidesPerView >= feedback.length ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex, feedback.length, slidesPerView]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Calculate visible slides
  const getVisibleSlides = () => {
    const slides = [];
    const endIndex = Math.min(currentIndex + slidesPerView, feedback.length);

    for (let i = currentIndex; i < endIndex; i++) {
      slides.push(feedback[i]);
    }

    // Loop around if needed
    if (endIndex === feedback.length && slides.length < slidesPerView) {
      for (let i = 0; i < slidesPerView - slides.length; i++) {
        slides.push(feedback[i]);
      }
    }

    return slides;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            What Our <span className="text-gradient">Students Say</span>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Real feedback from real students who have transformed their careers
            with DEVZeroOne
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-xl p-6 border border-border/50 h-64 animate-pulse"
              />
            ))}
          </div>
        ) : isError || feedback.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {isError
                ? "Failed to load feedback"
                : "No feedback available yet"}
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Slides Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {getVisibleSlides().map((item, index) => (
                <motion.div
                  key={`${item._id}-${index}`}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.6 }}
                  whileHover={{ y: -5 }}
                  className="bg-card rounded-xl p-6 border border-border/50 card-hover relative h-full"
                >
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={item.image || "/default-avatar.jpg"}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-primary/20"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/default-avatar.jpg";
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.title}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < item.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2">
                    "{item.description}"
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Pagination Dots */}
            {feedback.length > slidesPerView && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({
                  length: Math.ceil(feedback.length / slidesPerView),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index * slidesPerView)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentIndex >= index * slidesPerView &&
                      currentIndex < (index + 1) * slidesPerView
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection;

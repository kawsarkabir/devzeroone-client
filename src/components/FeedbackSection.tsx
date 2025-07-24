import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllFeedback } from "@/services/feedbackService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeedbackSection = () => {
  const [sliderRef, setSliderRef] = useState<Slider | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const {
    data: feedback = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allFeedback"],
    queryFn: getAllFeedback,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

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

  // Slider settings
  const settings = {
    dots: true,
    infinite: feedback.length > 1,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: isAutoPlaying && feedback.length > 1,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    appendDots: (dots: React.ReactNode) => (
      <div className="flex justify-center gap-2 mt-8">
        {React.Children.map(dots, (dot, index) => (
          <button
            key={index}
            onClick={() => {
              sliderRef?.slickGoTo(index);
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              sliderRef?.innerSlider?.state?.currentSlide === index
                ? "bg-primary w-6"
                : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    ),
    beforeChange: () => setIsAutoPlaying(true),
  };

  const nextSlide = () => {
    sliderRef?.slickNext();
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
  };

  const prevSlide = () => {
    sliderRef?.slickPrev();
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 2000);
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
            {/* Navigation Arrows */}
            {feedback.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background p-2 rounded-full shadow-md transition-all -translate-x-4 hover:scale-110"
                  aria-label="Previous feedback"
                >
                  <ChevronLeft className="w-6 h-6 text-foreground" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 hover:bg-background p-2 rounded-full shadow-md transition-all translate-x-4 hover:scale-110"
                  aria-label="Next feedback"
                >
                  <ChevronRight className="w-6 h-6 text-foreground" />
                </button>
              </>
            )}

            {/* Slider Container */}
            <Slider ref={setSliderRef} {...settings}>
              {feedback.map((item) => (
                <div key={item._id} className="px-2">
                  <motion.div
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
                    <p className="text-muted-foreground leading-relaxed">
                      "{item.description}"
                    </p>
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackSection;
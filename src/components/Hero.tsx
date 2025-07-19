import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Users, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Hero = () => {
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

  const floatingVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute top-20 left-20 w-64 h-64 bg-primary rounded-full blur-3xl animate-pulse-glow"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent rounded-full blur-3xl animate-pulse-glow"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
            >
              <Award className="w-4 h-4 mr-2" />
              #1 Educational Platform
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Master Skills with{' '}
              <span className="text-gradient">DEVZeroOne</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Transform your career with expert-led courses in web development, data science, 
              digital marketing, and more. Join thousands of successful learners today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button
                asChild
                size="lg"
                className="btn-bounce glow-primary text-lg px-8 py-6"
              >
                <Link to="/courses">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="btn-bounce text-lg px-8 py-6 border-primary/30 hover:bg-primary/10 cursor-pointer"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-border/30"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">15,420+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">156+</div>
                <div className="text-sm text-muted-foreground">Courses</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            variants={floatingVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="relative">
              {/* Main image placeholder */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10 bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/20"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-lg p-4 card-hover">
                    <BookOpen className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Interactive Learning</h3>
                    <p className="text-xs text-muted-foreground">Hands-on projects and real-world applications</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 card-hover">
                    <Users className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Expert Instructors</h3>
                    <p className="text-xs text-muted-foreground">Learn from industry professionals</p>
                  </div>
                  
                  <div className="bg-card rounded-lg p-4 card-hover col-span-2">
                    <Award className="w-8 h-8 text-primary mb-2" />
                    <h3 className="font-semibold mb-1">Certification Ready</h3>
                    <p className="text-xs text-muted-foreground">Get industry-recognized certifications upon completion</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"
              />
              
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent/20 rounded-full blur-lg"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
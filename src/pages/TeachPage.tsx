import React from "react";
import { motion } from "framer-motion";
import { Lightbulb, Users, DollarSign, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ApplyToTeachModal from "@/components/ApplyToTeachModal";

const TeachPage = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn Money",
      description:
        "Make money by teaching what you know. Create courses and earn from each enrollment.",
    },
    {
      icon: Users,
      title: "Reach Students Worldwide",
      description:
        "Share your expertise with students from around the globe and build a following.",
    },
    {
      icon: Award,
      title: "Get Recognition",
      description:
        "Build your reputation as an expert in your field and establish your authority.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Apply to Teach",
      description:
        "Fill out our instructor application form with your experience and expertise.",
    },
    {
      number: "02",
      title: "Get Approved",
      description:
        "Our team will review your application and approve qualified instructors.",
    },
    {
      number: "03",
      title: "Create Courses",
      description:
        "Use our course creation tools to build engaging learning experiences.",
    },
    {
      number: "04",
      title: "Start Earning",
      description:
        "Publish your courses and start earning money from student enrollments.",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
            <Lightbulb className="w-4 h-4 mr-2" />
            Become an Instructor
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Teach on <span className="text-gradient">DEVZeroOne</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Share your knowledge with millions of students around the world.
            Create courses, build your brand, and earn money doing what you
            love.
          </p>
          {/* APPLY FOR TEACH MODAL */}
          <ApplyToTeachModal />
        </motion.div>

        {/* Benefits Section */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Teach on <span className="text-gradient">DEVZeroOne</span>?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-card rounded-xl p-6 text-center border border-border/50 card-hover"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How it Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-border -translate-y-1/2" />
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-linear-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Teaching?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of instructors who are already making a difference
            and earning money by sharing their knowledge on DEVZeroOne.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* APPLY FOR TEACH MODAL */}
            <ApplyToTeachModal />
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeachPage;

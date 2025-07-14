import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight, Users, DollarSign, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const TeachCallToAction = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn While Teaching',
      description: 'Create passive income by sharing your expertise with thousands of students',
    },
    {
      icon: Users,
      title: 'Global Reach',
      description: 'Connect with students from around the world and build your personal brand',
    },
    {
      icon: Star,
      title: 'Expert Support',
      description: 'Get full support from our team to create and market your courses effectively',
    },
  ];

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
    <section className="py-20 section-bg relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Become an Instructor
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
            >
              Share Your Knowledge,{' '}
              <span className="text-gradient">Impact Lives</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              Join thousands of expert instructors who are transforming careers and earning 
              passive income by teaching what they love. Start your teaching journey today.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="space-y-6 mb-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-start space-x-4"
                >
                  <div className="shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="btn-bounce glow-primary text-lg px-8 py-6 group"
              >
                <Link to="/teach">
                  Start Teaching Today
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="btn-bounce text-lg px-8 py-6 border-primary/30 hover:bg-primary/10"
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl p-8 backdrop-blur-sm border border-primary/20"
              >
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop"
                  alt="Teacher presenting to students"
                  className="rounded-xl object-cover w-full h-80"
                />
                
                {/* Floating Elements */}
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 bg-primary rounded-full p-3 glow-primary"
                >
                  <Lightbulb className="w-6 h-6 text-white" />
                </motion.div>
                
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-4 -left-4 bg-accent rounded-full p-3 glow-primary"
                >
                  <Users className="w-6 h-6 text-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Stats Overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute top-8 left-8 bg-card/90 backdrop-blur-sm rounded-lg p-4 border border-border/50"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$5,000+</div>
                <div className="text-xs text-muted-foreground">Avg. Monthly Earnings</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TeachCallToAction;
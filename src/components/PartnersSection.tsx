import React from 'react';
import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';
import { mockPartners } from '@/data/mockData';

const PartnersSection = () => {
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
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6"
          >
            <Handshake className="w-4 h-4 mr-2" />
            Trusted Partners
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            Industry <span className="text-gradient">Partnerships</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            We collaborate with leading technology companies to bring you the most 
            relevant and up-to-date curriculum in the industry.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {mockPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-card rounded-xl p-6 text-center card-hover border border-border/50 group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {partner.name}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {partner.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-8">
            Trusted by professionals at top companies worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company) => (
              <motion.div
                key={company}
                whileHover={{ opacity: 1, scale: 1.1 }}
                className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {company}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
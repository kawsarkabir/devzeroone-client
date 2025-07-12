import React from 'react';
import Hero from '@/components/Hero';
import PopularCourses from '@/components/PopularCourses';
import StatsSection from '@/components/StatsSection';
import FeedbackSection from '@/components/FeedbackSection';
import PartnersSection from '@/components/PartnersSection';
import TeachCallToAction from '@/components/TeachCallToAction';

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <PopularCourses />
      <StatsSection />
      <FeedbackSection />
      <PartnersSection />
      <TeachCallToAction />
    </main>
  );
};

export default Index;

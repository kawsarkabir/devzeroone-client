import React from "react";
import Hero from "@/components/Hero";
import PopularCourses from "@/components/PopularCourses";
import StatsSection from "@/components/StatsSection";
import FeedbackSection from "@/components/FeedbackSection";
import PartnersSection from "@/components/PartnersSection";
import TeachCallToAction from "@/components/TeachCallToAction";
// import UsersList from "@/components/UserList";
import FaqSection from "@/components/FAQ";
import UpcomingWorkshops from "@/components/UpcomingWorkshops";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <PopularCourses />
      <UpcomingWorkshops />
      <StatsSection />
      <FeedbackSection />
      <PartnersSection />
      <TeachCallToAction />
      {/* <UsersList /> */}
      <FaqSection />
    </main>
  );
};

export default Index;

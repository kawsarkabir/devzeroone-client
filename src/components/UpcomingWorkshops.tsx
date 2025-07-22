import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Workshop {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  instructor: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function UpcomingWorkshops() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const response = await axios.get("/workshops.json");
      setWorkshops(response.data);
    };
    fetchWorkshops();
  }, []);

  return (
    <section className="py-12 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our <span className="text-gradient">Upcoming Free Workshops</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join our upcoming free workshops led by expert instructors.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {workshops?.map((workshop, index) => (
            <motion.div
              key={workshop.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
            >
              <Card className="transition-all duration-300 border border-transparent hover:border-primary">
                <CardContent className="p-5 space-y-4">
                  <h3 className="text-2xl font-semibold text-secondary-theme-500">
                    {workshop.title}
                  </h3>
                  <p className="text-gray-700">{workshop.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{workshop.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ClockIcon className="w-4 h-4" />
                    <span>{workshop.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <UserIcon className="w-4 h-4" />
                    <span>{workshop.instructor}</span>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Register
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

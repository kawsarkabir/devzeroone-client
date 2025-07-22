import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LucideHelpCircle } from "lucide-react";
import Lottie from "lottie-react";
import faqAnimation from "@/components/assets/faq.json";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is your refund policy?",
    answer:
      "We offer full refunds within 30 days of purchase. Please contact support for assistance.",
  },
  {
    question: "How do I access my course?",
    answer:
      "Once you enroll, you'll receive an email with login details to our learning portal.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer full refunds within 30 days of purchase. Please contact support for assistance.",
  },
  {
    question: "How do I access my course?",
    answer:
      "Once you enroll, you'll receive an email with login details to our learning portal.",
  },
  {
    question: "Are your courses beginner-friendly?",
    answer:
      "Yes! Our courses are designed for all levels, including complete beginners.",
  },
  {
    question: "Can I get a certificate after completion?",
    answer:
      "Yes, all our courses come with a certificate upon successful completion.",
  },
  {
    question: "Do you provide lifetime access?",
    answer:
      "Yes, once you enroll, you’ll have lifetime access to the course content.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely! You can complete the course content at your convenience.",
  },
  {
    question: "Is there any support available?",
    answer:
      "Yes, our support team is available via email or live chat to assist you.",
  },
  {
    question: "How can I contact the instructor?",
    answer: "You can post in the course Q&A or reach out via our contact form.",
  },
];

export default function FaqSection() {
  return (
    <section className="py-20 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-2">
          {/* Left Lottie Animation */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            <Lottie animationData={faqAnimation} loop className="h-36" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground max-w-md">
              Find answers to the most common questions about our services and
              platform.
            </p>
          </motion.div>

          {/* Right Accordion with Scroll */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <Accordion
              type="single"
              collapsible
              className="w-full mx-auto space-y-2"
            >
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="group border rounded cursor-pointer"
                >
                  <AccordionTrigger className="transition-all group-hover:bg-primary group-hover:text-white px-4 py-3 hover:no-underline cursor-pointer">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

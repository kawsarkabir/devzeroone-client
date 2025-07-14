// Mock data for DEVZeroOne platform

export interface Course {
  id: string;
  title: string;
  instructor: string;
  instructorImage: string;
  image: string;
  price: number;
  description: string;
  shortDescription: string;
  category: string;
  totalEnrollment: number;
  rating: number;
  duration: string;
  level: string;
  status: "approved" | "pending" | "rejected";
}

export interface Feedback {
  id: string;
  name: string;
  image: string;
  title: string;
  text: string;
  rating: number;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  description: string;
}

export interface Stats {
  totalUsers: number;
  totalClasses: number;
  totalEnrollments: number;
}

export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    instructor: "Sarah Johnson",
    instructorImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    price: 129,
    description:
      "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and deploy them to production.",
    shortDescription: "Learn full-stack web development from scratch",
    category: "Web Development",
    totalEnrollment: 2847,
    rating: 4.8,
    duration: "12 weeks",
    level: "Beginner to Advanced",
    status: "approved",
  },
  {
    id: "2",
    title: "Digital Marketing Mastery",
    instructor: "Michael Chen",
    instructorImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&h=250&fit=crop",
    price: 89,
    description:
      "Complete digital marketing course covering SEO, social media, PPC, and analytics.",
    shortDescription: "Master digital marketing strategies",
    category: "Digital Marketing",
    totalEnrollment: 1923,
    rating: 4.7,
    duration: "8 weeks",
    level: "Intermediate",
    status: "approved",
  },
  {
    id: "3",
    title: "Data Science with Python",
    instructor: "Dr. Emily Rodriguez",
    instructorImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    price: 149,
    description:
      "Learn data analysis, machine learning, and visualization with Python.",
    shortDescription: "Complete data science bootcamp",
    category: "Data Science",
    totalEnrollment: 3156,
    rating: 4.9,
    duration: "16 weeks",
    level: "Advanced",
    status: "approved",
  },
];

export const mockFeedback: Feedback[] = [
  {
    id: "1",
    name: "Maria Garcia",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
    title: "Complete Web Development Bootcamp",
    text: "This course completely transformed my career! The instructor was amazing and the projects were incredibly practical.",
    rating: 5,
  },
  {
    id: "2",
    name: "David Kim",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    title: "Data Science with Python",
    text: "Excellent content and well-structured curriculum. I landed my dream job as a data scientist after completing this course.",
    rating: 5,
  },
  {
    id: "3",
    name: "Jennifer Brown",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    title: "Digital Marketing Mastery",
    text: "The best digital marketing course I've taken. Practical strategies that I could implement immediately in my business.",
    rating: 4,
  },
  {
    id: "4",
    name: "Robert Taylor",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    title: "UI/UX Design Fundamentals",
    text: "Great introduction to design principles. The hands-on projects really helped me understand the concepts.",
    rating: 5,
  },
];

export const mockPartners: Partner[] = [
  {
    id: "1",
    name: "TechCorp",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description:
      "Leading technology solutions provider partnering to offer cutting-edge courses.",
  },
  {
    id: "2",
    name: "InnovateLab",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
    description:
      "Innovation laboratory providing real-world project opportunities for students.",
  },
  {
    id: "3",
    name: "DigitalFuture",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop",
    description:
      "Digital transformation experts offering industry insights and mentorship.",
  },
  {
    id: "4",
    name: "CloudTech",
    logo: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
    description:
      "Cloud computing specialists providing infrastructure and training resources.",
  },
];

export const mockStats: Stats = {
  totalUsers: 15420,
  totalClasses: 156,
  totalEnrollments: 42890,
};

export const categories = [
  "Web Development",
  "Data Science",
  "Digital Marketing",
  "Design",
  "Mobile Development",
  "Cybersecurity",
  "AI & Machine Learning",
  "DevOps",
];

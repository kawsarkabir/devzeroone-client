import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getMyEnrolledClasses } from '../../services/classService';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

const MyEnrolledClasses = () => {
  const navigate = useNavigate();

  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ['myEnrolledClasses'],
    queryFn: getMyEnrolledClasses
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Enrolled Classes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-card rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">My Enrolled Classes</h1>
        <p className="text-muted-foreground">Continue your learning journey</p>
      </div>

      {enrolledClasses.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <BookOpen className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Classes Enrolled</h3>
            <p className="text-muted-foreground text-center mb-4">
              You haven't enrolled in any classes yet. Explore our courses to start learning!
            </p>
            <Button onClick={() => navigate('/classes')}>
              Browse Classes
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledClasses.map((course: any) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden hover-scale h-full">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">by {course.name}</p>
                    <Badge variant="secondary">{course.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/dashboard/my-enrolled-classes/${course._id}`)}
                  >
                    Continue Learning
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyEnrolledClasses;
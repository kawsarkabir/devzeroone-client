import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentDashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover-scale cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span>My Enrolled Classes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">View and continue your enrolled classes</p>
          </CardContent>
        </Card>

        <Card className="hover-scale cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5 text-primary" />
              <span>Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage your profile information</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default StudentDashboard;
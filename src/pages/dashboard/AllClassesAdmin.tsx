import React from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllClasses, approveClass, rejectClass } from '@/services/classService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AllClassesAdmin = () => {
  const queryClient = useQueryClient();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ['admin-all-classes'],
    queryFn: getAllClasses
  });

  const approveMutation = useMutation({
    mutationFn: approveClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-classes'] });
      Swal.fire({
        title: 'Success!',
        text: 'Class approved successfully',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    },
    onError: () => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to approve class',
        icon: 'error',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: rejectClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-all-classes'] });
      Swal.fire({
        title: 'Success!',
        text: 'Class rejected',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    },
    onError: () => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to reject class',
        icon: 'error',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    }
  });

  const handleApprove = (classId: string) => {
    Swal.fire({
      title: 'Approve Class?',
      text: 'This class will be visible to all students',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0EA0E2',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, approve',
      background: '#0F172A',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(classId);
      }
    });
  };

  const handleReject = (classId: string) => {
    Swal.fire({
      title: 'Reject Class?',
      text: 'This class will not be visible to students',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reject',
      background: '#0F172A',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(classId);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
        <h1 className="text-3xl font-bold mb-2 text-gradient">All Classes</h1>
        <p className="text-muted-foreground">Approve and manage all classes</p>
      </div>

      {classes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No classes found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map((classItem: any, index: number) => (
            <motion.div
              key={classItem._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <img
                    src={classItem.image || '/placeholder.svg'}
                    alt={classItem.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <CardTitle className="text-lg">{classItem.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {classItem.instructor}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {classItem.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-primary">${classItem.price}</p>
                    <Badge 
                      variant={
                        classItem.status === 'approved' ? 'default' :
                        classItem.status === 'rejected' ? 'destructive' : 'secondary'
                      }
                      className="capitalize"
                    >
                      {classItem.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-2">
                    {classItem.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleApprove(classItem._id)}
                          className="flex-1"
                          disabled={approveMutation.isPending}
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleReject(classItem._id)}
                          variant="destructive"
                          className="flex-1"
                          disabled={rejectMutation.isPending}
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    )}

                    {classItem.status === 'rejected' && (
                      <Button
                        onClick={() => handleApprove(classItem._id)}
                        className="w-full"
                        disabled={approveMutation.isPending}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                    )}

                    {classItem.status === 'approved' && (
                      <Link to={`/dashboard/class-progress/${classItem._id}`}>
                        <Button className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          View Progress
                        </Button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AllClassesAdmin;
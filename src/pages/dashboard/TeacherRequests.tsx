import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllTeacherRequests, approveTeacherRequest, rejectTeacherRequest } from '@/services/userService';
import Swal from 'sweetalert2';

const TeacherRequests = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['teacher-requests'],
    queryFn: getAllTeacherRequests
  });

  const approveMutation = useMutation({
    mutationFn: approveTeacherRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-requests'] });
      Swal.fire({
        title: 'Success!',
        text: 'Teacher request approved successfully',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    },
    onError: () => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to approve teacher request',
        icon: 'error',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    }
  });

  const rejectMutation = useMutation({
    mutationFn: rejectTeacherRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacher-requests'] });
      Swal.fire({
        title: 'Success!',
        text: 'Teacher request rejected',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    },
    onError: () => {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to reject teacher request',
        icon: 'error',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    }
  });

  const handleApprove = (requestId: string) => {
    Swal.fire({
      title: 'Approve Teacher Request?',
      text: 'This will grant teacher privileges to the user',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0EA0E2',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, approve',
      background: '#0F172A',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        approveMutation.mutate(requestId);
      }
    });
  };

  const handleReject = (requestId: string) => {
    Swal.fire({
      title: 'Reject Teacher Request?',
      text: 'This action can be reversed later',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, reject',
      background: '#0F172A',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        rejectMutation.mutate(requestId);
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
        <h1 className="text-3xl font-bold mb-2 text-gradient">Teacher Requests</h1>
        <p className="text-muted-foreground">Review and approve teacher applications</p>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No teacher requests found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request: any, index: number) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <img
                      src={request.image || '/placeholder.svg'}
                      alt={request.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{request.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{request.email}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-semibold">{request.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      Category: {request.category}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      Experience: {request.experience}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={
                        request.status === 'approved' ? 'default' :
                        request.status === 'rejected' ? 'destructive' : 'secondary'
                      }
                      className="capitalize"
                    >
                      {request.status}
                    </Badge>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleApprove(request._id)}
                        className="flex-1"
                        disabled={approveMutation.isPending}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleReject(request._id)}
                        variant="destructive"
                        className="flex-1"
                        disabled={rejectMutation.isPending}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {request.status === 'rejected' && (
                    <Button
                      onClick={() => handleApprove(request._id)}
                      className="w-full"
                      disabled={approveMutation.isPending}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TeacherRequests;
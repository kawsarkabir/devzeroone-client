import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getClassById, getClassAssignments, submitAssignment } from '../../services/classService';
import { createFeedback } from '../../services/feedbackService';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Swal from 'sweetalert2';
// @ts-ignore
import Rating from 'react-rating';
import { Star } from 'lucide-react';

interface FeedbackForm {
  description: string;
  rating: number;
}

interface SubmissionForm {
  submission: string;
}

const MyEnrolledClassDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [submissionModal, setSubmissionModal] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const { register: registerFeedback, handleSubmit: handleFeedbackSubmit, setValue: setFeedbackValue, watch: watchFeedback, reset: resetFeedback } = useForm<FeedbackForm>();
  const { register: registerSubmission, handleSubmit: handleSubmissionSubmit, reset: resetSubmission } = useForm<SubmissionForm>();

  const rating = watchFeedback('rating', 0);

  const { data: classData, isLoading: classLoading } = useQuery({
    queryKey: ['class', id],
    queryFn: () => getClassById(id!),
    enabled: !!id
  });

  const { data: assignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ['classAssignments', id],
    queryFn: () => getClassAssignments(id!),
    enabled: !!id
  });

  const feedbackMutation = useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      setShowFeedbackModal(false);
      resetFeedback();
      Swal.fire({
        title: 'Success!',
        text: 'Feedback submitted successfully',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    }
  });

  const submissionMutation = useMutation({
    mutationFn: ({ assignmentId, submission }: { assignmentId: string; submission: string }) =>
      submitAssignment(assignmentId, submission),
    onSuccess: () => {
      setSubmissionModal(null);
      resetSubmission();
      queryClient.invalidateQueries({ queryKey: ['classAssignments', id] });
      Swal.fire({
        title: 'Success!',
        text: 'Assignment submitted successfully',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    }
  });

  const onFeedbackSubmit = (data: FeedbackForm) => {
    if (!classData || !user) return;
    
    feedbackMutation.mutate({
      description: data.description,
      rating: data.rating,
      name: user.name,
      image: user.image || '',
      title: classData.title,
      classId: classData._id
    });
  };

  const onSubmissionSubmit = (data: SubmissionForm) => {
    if (!submissionModal) return;
    
    submissionMutation.mutate({
      assignmentId: submissionModal,
      submission: data.submission
    });
  };

  if (classLoading || assignmentsLoading) {
    return <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-card rounded w-1/3"></div>
      <div className="h-64 bg-card rounded"></div>
    </div>;
  }

  if (!classData) {
    return <div>Class not found</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Class Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{classData.title}</CardTitle>
              <p className="text-muted-foreground mb-4">{classData.description}</p>
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{classData.category}</Badge>
                <span className="text-sm text-muted-foreground">Instructor: {classData.name}</span>
              </div>
            </div>
            <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
              <DialogTrigger asChild>
                <Button className="btn-bounce">
                  Teaching Evaluation Report (TER)
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Submit Feedback</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFeedbackSubmit(onFeedbackSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Rating</label>
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer ${
                              star <= rating ? 'text-yellow-500 fill-current' : 'text-muted-foreground'
                            }`}
                            onClick={() => setFeedbackValue('rating', star)}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-muted-foreground">({rating}/5)</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <Textarea
                      placeholder="Share your feedback about this class..."
                      {...registerFeedback('description', { required: 'Description is required' })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setShowFeedbackModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={feedbackMutation.isPending}>
                      {feedbackMutation.isPending ? 'Sending...' : 'Send'}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
      </Card>

      {/* Assignments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No assignments available for this class yet.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assignments.map((assignment: any) => (
                  <TableRow key={assignment._id}>
                    <TableCell className="font-medium">{assignment.title}</TableCell>
                    <TableCell className="max-w-xs truncate">{assignment.description}</TableCell>
                    <TableCell>{new Date(assignment.deadline).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Dialog open={submissionModal === assignment._id} onOpenChange={(open) => setSubmissionModal(open ? assignment._id : null)}>
                        <DialogTrigger asChild>
                          <Button size="sm">Submit</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Assignment: {assignment.title}</DialogTitle>
                          </DialogHeader>
                          <form onSubmit={handleSubmissionSubmit(onSubmissionSubmit)} className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">Submission</label>
                              <Textarea
                                placeholder="Enter your assignment submission..."
                                {...registerSubmission('submission', { required: 'Submission is required' })}
                              />
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => setSubmissionModal(null)}>
                                Cancel
                              </Button>
                              <Button type="submit" disabled={submissionMutation.isPending}>
                                {submissionMutation.isPending ? 'Submitting...' : 'Submit'}
                              </Button>
                            </div>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MyEnrolledClassDetails;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Users, BookOpen, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  getClassById,
  getClassStats,
  createAssignment,
  getClassAssignments,
  Assignment,
} from "@/services/classService";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const ClassDetails = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const isTeacher = user?.role === "teacher";
  const { id } = useParams();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: classInfo, isLoading: classLoading } = useQuery({
    queryKey: ["class-details", id],
    queryFn: () => getClassById(id!),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["class-stats", id],
    queryFn: () => getClassStats(id!),
  });

  const { data: assignments = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ["class-assignments", id],
    queryFn: () => getClassAssignments(id!),
  });

  const createAssignmentMutation = useMutation({
    mutationFn: (data: Assignment) => createAssignment(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["class-assignments", id] });
      queryClient.invalidateQueries({ queryKey: ["class-stats", id] });
      setShowCreateModal(false);
      reset();
      toast.success("Assignment created successfully");
    },
    onError: () => {
      toast.error("Failed to create assignment");
    },
  });

  const handleCreateAssignment = (data: Assignment) => {
    createAssignmentMutation.mutate(data);
  };

  if (classLoading || statsLoading || assignmentsLoading) {
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
        <h1 className="text-3xl font-bold mb-2 text-gradient">
          {classInfo?.title}
        </h1>
        <p className="text-muted-foreground">Class management and progress</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {stats?.totalEnrollments || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Assignments
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {stats?.totalAssignments || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Submissions
            </CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {/* calculate total assignment submision */}

              {assignments.reduce(
                (total, assignment) =>
                  total + (assignment.submissionCount || 0),
                0
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Assignment Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Class Assignments</CardTitle>
            {isTeacher && (
              <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-card">
                  <DialogHeader>
                    <DialogTitle>Create New Assignment</DialogTitle>
                  </DialogHeader>
                  <form
                    onSubmit={handleSubmit(handleCreateAssignment)}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="title">Assignment Title</Label>
                      <Input
                        {...register("title", { required: true })}
                        placeholder="Enter assignment title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Assignment Deadline</Label>
                      <Input
                        {...register("deadline", { required: true })}
                        type="date"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">
                        Assignment Description
                      </Label>
                      <Textarea
                        {...register("description", { required: true })}
                        placeholder="Describe the assignment"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createAssignmentMutation.isPending}
                    >
                      Create Assignment
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {assignments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No assignments created yet
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignments.map((assignment: Assignment, index: number) => (
                <motion.div
                  key={assignment._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-l-4 border-l-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {assignment.title}
                        </CardTitle>
                        <span className="text-sm text-muted-foreground">
                          Due:{" "}
                          {new Date(assignment.deadline).toLocaleDateString()}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">
                        {assignment.description}
                      </p>
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          Submissions: {assignment.submissionCount || 0}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            new Date(assignment.deadline) > new Date()
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`}
                        >
                          {new Date(assignment.deadline) > new Date()
                            ? "Active"
                            : "Expired"}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ClassDetails;

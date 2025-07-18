import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  approveClass,
  Class,
  getAllClasses,
  rejectClass,
} from "@/services/classService";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllClassesAdmin = () => {
  const queryClient = useQueryClient();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["admin-all-classes"],
    queryFn: getAllClasses,
  });

  const approveMutation = useMutation({
    mutationFn: approveClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-all-classes"] });
      toast.success("Class approved successfully");
    },
    onError: () => toast.error("Failed to approve class"),
  });

  const rejectMutation = useMutation({
    mutationFn: rejectClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-all-classes"] });
      toast.success("Class rejected");
    },
    onError: () => toast.error("Failed to reject class"),
  });

  const handleApprove = (id: string) => {
    Swal.fire({
      title: "Approve this class?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0EA5E9",
      cancelButtonColor: "#EF4444",
      confirmButtonText: "Approve",
    }).then((res) => {
      if (res.isConfirmed) approveMutation.mutate(id);
    });
  };

  const handleReject = (id: string) => {
    Swal.fire({
      title: "Reject this class?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Reject",
    }).then((res) => {
      if (res.isConfirmed) rejectMutation.mutate(id);
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gradient">All Classes</h1>
        <p className="text-muted-foreground">Manage and approve all courses</p>
      </div>

      {classes.length === 0 ? (
        <p className="text-center text-muted-foreground">No classes found</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left p-4">Course</th>
                <th className="text-left p-4">Instructor</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Status</th>
                <th className="text-right p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((course: Class) => (
                <tr
                  key={course._id}
                  className="border-t hover:bg-muted transition-colors"
                >
                  <td className="p-4 font-medium">{course.title}</td>
                  <td className="p-4">{course.instructor}</td>
                  <td className="p-4">${course.price}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        course.status === "approved"
                          ? "default"
                          : course.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {course.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {course.status === "pending" && (
                          <>
                            <DropdownMenuItem
                              onClick={() => handleApprove(course._id)}
                            >
                              ✅ Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleReject(course._id)}
                            >
                              ❌ Reject
                            </DropdownMenuItem>
                          </>
                        )}

                        {course.status === "rejected" && (
                          <DropdownMenuItem
                            onClick={() => handleApprove(course._id)}
                          >
                            ✅ Approve
                          </DropdownMenuItem>
                        )}

                        {course.status === "approved" && (
                          <Link to={`/dashboard/class-progress/${course._id}`}>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Progress
                            </DropdownMenuItem>
                          </Link>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllClassesAdmin;

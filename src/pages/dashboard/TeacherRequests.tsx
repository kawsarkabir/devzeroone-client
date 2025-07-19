"use client";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, XCircle, MoreVertical } from "lucide-react";
import {
  getAllTeacherRequests,
  approveTeacherRequest,
  rejectTeacherRequest,
} from "@/services/userService"; // Assuming this path is correct
import Swal from "sweetalert2";
import { toast } from "sonner";
import LoadingSpiner from "@/components/LoadingSpiner"; // Assuming this component exists
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TeacherRequests = () => {
  const queryClient = useQueryClient();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["teacher-requests"],
    queryFn: getAllTeacherRequests,
  });

  const approveMutation = useMutation({
    mutationFn: approveTeacherRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-requests"] });
      toast.success("Teacher request approved successfully");
    },
    onError: () => {
      toast.error("Failed to approve teacher request");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: rejectTeacherRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teacher-requests"] });
      toast.success("Teacher request rejected successfully");
    },
    onError: () => {
      toast.error("Failed to reject teacher request");
    },
  });

  const handleApprove = (id: string, name: string) => {
    Swal.fire({
      title: "Approve Teacher?",
      text: `Are you sure you want to approve ${name} as a teacher?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0EA0E2",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, approve",
      background: "#0F172A",
      color: "#fff",
    }).then((res) => {
      if (res.isConfirmed) {
        approveMutation.mutate(id);
      }
    });
  };

  const handleReject = (id: string, name: string) => {
    Swal.fire({
      title: "Reject Teacher?",
      text: `Are you sure you want to reject ${name}'s request?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject",
      background: "#0F172A",
      color: "#fff",
    }).then((res) => {
      if (res.isConfirmed) {
        rejectMutation.mutate(id);
      }
    });
  };

  if (isLoading) return <LoadingSpiner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2 text-gradient">
          Teacher Requests
        </h1>
        <p className="text-muted-foreground">
          Review and manage teacher applications
        </p>
      </div>
      {requests.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No teacher requests found
        </div>
      ) : (
        <div className="overflow-x-auto rounded">
          <Table>
            <TableHeader className="bg-muted text-left">
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Photo</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((req: any, index: number) => (
                <TableRow key={req._id} className="hover:bg-muted/40">
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={
                        req.image ||
                        "/placeholder.svg?height=40&width=40&query=user profile"
                      }
                      alt={req.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{req.name}</TableCell>
                  <TableCell>{req.email}</TableCell>
                  <TableCell>{req.title}</TableCell>
                  <TableCell className="capitalize">{req.category}</TableCell>
                  <TableCell className="capitalize">{req.experience}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        req.status === "approved"
                          ? "default"
                          : req.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {req.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {req.status === "pending" || req.status === "rejected" ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {req.status === "pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleApprove(req._id, req.name)}
                                disabled={approveMutation.isPending}
                              >
                                <CheckCircle className="w-4 h-4 mr-2" /> Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleReject(req._id, req.name)}
                                disabled={rejectMutation.isPending}
                              >
                                <XCircle className="w-4 h-4 mr-2" /> Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          {req.status === "rejected" && (
                            <DropdownMenuItem
                              onClick={() => handleApprove(req._id, req.name)}
                              disabled={approveMutation.isPending}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" /> Approve
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <span className="text-green-500 font-medium">
                        Approved
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </motion.div>
  );
};

export default TeacherRequests;

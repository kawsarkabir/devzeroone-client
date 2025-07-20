import React from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Crown } from "lucide-react";
import { getAllUsers, makeAdmin } from "@/services/userService";
import Swal from "sweetalert2";
import { toast } from "sonner";
import LoadingSpiner from "@/components/LoadingSpiner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Users = () => {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const makeAdminMutation = useMutation({
    mutationFn: makeAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User has been made admin successfully");
    },
    onError: () => {
      toast.error("Failed to make user admin");
    },
  });

  const handleMakeAdmin = (userId: string, userName: string) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${userName} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0EA0E2",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, make admin",
      background: "#0F172A",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        makeAdminMutation.mutate(userId);
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
          Users Management
        </h1>
        <p className="text-muted-foreground">
          Manage all users and permissions
        </p>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No users found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-background border border-border text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th className="p-3 border-b">#</th>
                <th className="p-3 border-b">Photo</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                <th className="p-3 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any, index: number) => (
                <tr key={user._id} className="hover:bg-muted/40">
                  <td className="p-3 border-b">{index + 1}</td>
                  <td className="p-3 border-b">
                    <img
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-3 border-b font-medium">{user.name}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">
                    <Badge
                      variant={user.role === "admin" ? "default" : "secondary"}
                      className="capitalize"
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td className="p-3 border-b">
                    {user.role === "admin" ? (
                      <Button variant="outline" disabled>
                        <Crown className="w-4 h-4 mr-1" />
                        Admin
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleMakeAdmin(user._id, user.name)}
                        disabled={makeAdminMutation.isPending}
                      >
                        <Crown className="w-4 h-4 mr-1" />
                        Make Admin
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Users;

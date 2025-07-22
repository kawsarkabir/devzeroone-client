import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/services/userService";
import LoadingSpiner from "@/components/LoadingSpiner";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

const UsersList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  if (isLoading) return <LoadingSpiner />;

  const filteredUsers = users.filter((user: any) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  return (
    <section className="py-20 section-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our <span className="text-gradient">Community</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the members of our learning platform
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Filter by Role:
              </span>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* User Table */}
          {paginatedUsers.length === 0 ? (
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
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user: any, index: number) => (
                    <tr key={user._id} className="hover:bg-muted/40">
                      <td className="p-3 border-b">
                        {(currentPage - 1) * usersPerPage + index + 1}
                      </td>
                      <td className="p-3 border-b">
                        <img
                          src={user.image || "/placeholder.svg"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="p-3 border-b font-medium">{user.name}</td>
                      <td className="p-3 border-b">{user.email}</td>
                      <td className="p-3 border-b capitalize">
                        <Badge
                          variant={
                            user.role === "admin" ? "default" : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    &larr;
                  </Button>
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <Button
                        variant={page === currentPage ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    &rarr;
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default UsersList;

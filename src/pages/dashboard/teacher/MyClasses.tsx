import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  getMyClasses,
  updateClass,
  deleteClass,
} from "@/services/classService";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Swal from "sweetalert2";
import { toast } from "sonner";
import LoadingSpiner from "@/components/LoadingSpiner";
import { uploadImageToImgBB } from "@/utils/uploadImage";

const MyClasses = () => {
  const [editingClass, setEditingClass] = useState<any>(null);
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, setValue } = useForm();

  const { data: classes = [], isLoading } = useQuery({
    queryKey: ["my-classes"],
    queryFn: getMyClasses,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      updateClass(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
      setEditingClass(null);
      reset();
      toast.success("Class updated successfully");
    },
    onError: () => {
      toast.error("Failed to update class");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-classes"] });
      toast.success("Class deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete class");
    },
  });

  const handleEdit = (classItem: any) => {
    setEditingClass(classItem);
    setValue("title", classItem.title);
    setValue("price", classItem.price);
    setValue("description", classItem.description);
  };

  const handleUpdate = async (data: any) => {
    try {
      let imageUrl = editingClass.image; // fallback to existing image

      const imageFile = data.image?.[0];
      if (imageFile) {
        imageUrl = await uploadImageToImgBB(imageFile);
      }

      const updatedData = {
        title: data.title,
        price: data.price,
        description: data.description,
        image: imageUrl,
      };

      updateMutation.mutate({ id: editingClass._id, data: updatedData });
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const handleDelete = (classId: string, title: string) => {
    Swal.fire({
      title: "Delete Class?",
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete",
      background: "#0F172A",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(classId);
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
        <h1 className="text-3xl font-bold mb-2 text-gradient">My Classes</h1>
        <p className="text-muted-foreground">Manage your created classes</p>
      </div>

      {classes.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No classes found</p>
            <Link to="/dashboard/add-class">
              <Button className="mt-4">Create Your First Class</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes?.map((classItem: any, index: number) => (
            <motion.div
              key={classItem._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <img
                    src={classItem.image || "/placeholder.svg"}
                    alt={classItem.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <CardTitle className="text-lg">{classItem.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    by {classItem.instructor}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {classItem.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-primary">
                      ${classItem.price}
                    </p>
                    <Badge
                      variant={
                        classItem.status === "approved"
                          ? "default"
                          : classItem.status === "rejected"
                          ? "destructive"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {classItem.status}
                    </Badge>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleEdit(classItem)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-card">
                          <DialogHeader>
                            <DialogTitle>Edit Class</DialogTitle>
                          </DialogHeader>
                          <form
                            onSubmit={handleSubmit(handleUpdate)}
                            className="space-y-4"
                          >
                            <div>
                              <Label htmlFor="title">Title</Label>
                              <Input
                                {...register("title", { required: true })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="price">Price</Label>
                              <Input
                                {...register("price", { required: true })}
                                type="number"
                              />
                            </div>
                            <div>
                              <Label htmlFor="description">Description</Label>
                              <Textarea
                                {...register("description", { required: true })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="image">Upload Image</Label>
                              <Input
                                {...register("image")}
                                type="file"
                                accept="image/*"
                              />
                            </div>
                            <Button
                              type="submit"
                              className="w-full"
                              disabled={updateMutation.isPending}
                            >
                              Update Class
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() =>
                          handleDelete(classItem._id, classItem.title)
                        }
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>

                    {classItem.status === "approved" && (
                      <Link to={`/dashboard/my-class/${classItem._id}`}>
                        <Button className="w-full">
                          <Eye className="w-4 h-4 mr-2" />
                          See Details
                        </Button>
                      </Link>
                    )}

                    {classItem.status !== "approved" && (
                      <Button disabled className="w-full" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Pending Approval
                      </Button>
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

export default MyClasses;

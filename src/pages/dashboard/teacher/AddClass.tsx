import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createClass } from "@/services/classService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { RootState } from "../../store/store";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { uploadImageToImgBB } from "@/utils/uploadImage";

interface ClassForm {
  title: string;
  price: number;
  description: string;
  image: FileList;
  category: string;
  duration?: string;
  level?: string;
}

const categories = [
  "Web Development",
  "Mobile Development",
  "Digital Marketing",
  "Data Science",
  "UI/UX Design",
  "Cybersecurity",
  "Cloud Computing",
  "Artificial Intelligence",
];
const levels = ["Beginner", "Intermediate", "Advanced"];

const AddClass = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClassForm>();

  const createMutation = useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myClasses"] });
      navigate("/dashboard/my-classes");
      toast.success("Class created successfully and is pending approval");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (data: ClassForm) => {
    if (!user) return;

    const imageFile = data.image?.[0];
    if (!imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    try {
      const imageUrl = await uploadImageToImgBB(imageFile);
      createMutation.mutate({
        ...data,
        image: imageUrl,
        name: user.name,
        email: user.email,
        instructorImage: user.image,
      });
    } catch (error: any) {
      toast.error(error.message || "Image upload failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Add New Class</h1>
        <p className="text-muted-foreground">
          Create a new class for students to enroll
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Class Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Class Title
              </label>
              <Input
                {...register("title", { required: "Title is required" })}
                placeholder="Enter class title"
              />
              {errors.title && (
                <p className="text-destructive text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Instructor Name
                </label>
                <Input value={user?.name || ""} disabled className="bg-muted" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Instructor Email
                </label>
                <Input
                  value={user?.email || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register("price", {
                    required: "Price is required",
                    min: { value: 0, message: "Price must be positive" },
                  })}
                  placeholder="Enter price"
                />
                {errors.price && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Course Duration
                  </label>
                  <Input
                    type="text"
                    {...register("duration", {
                      required: "Duration is required",
                    })}
                    placeholder="Enter course duration"
                  />
                  {errors.duration && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.duration.message}
                    </p>
                  )}
                </div>

                <div>
                  {errors.duration && (
                    <p className="text-destructive text-sm mt-1">
                      {errors.duration.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Level</label>
                <Controller
                  name="level"
                  control={control}
                  rules={{ required: "Level is required" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Course Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.level && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.level.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Upload Course Image
              </label>
              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                className="border rounded-md p-2 w-full"
              />

              {errors.image && (
                <p className="text-destructive text-sm mt-1">
                  {errors.image.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <Textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter class description"
                rows={4}
              />
              {errors.description && (
                <p className="text-destructive text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard/my-classes")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending}
                className="btn-bounce"
              >
                {createMutation.isPending ? "Creating..." : "Add Class"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddClass;

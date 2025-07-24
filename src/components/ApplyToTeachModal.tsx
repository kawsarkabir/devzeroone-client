import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  submitTeacherRequest,
  getMyTeacherRequest,
  updateTeacherRequest,
} from "@/services/userService"; // Add updateTeacherRequest
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import LoadingSpiner from "./LoadingSpiner";

type TeachFormValues = {
  title: string;
  category: string;
  experience: "beginner" | "mid-level" | "experienced";
};

const categoryOptions = [
  "Web Development",
  "Digital Marketing",
  "Data Science",
  "UI/UX Design",
  "Cybersecurity",
];

const experienceOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "mid-level", label: "Mid-level" },
  { value: "experienced", label: "Experienced" },
];

const ApplyToTeachModal = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [existingRequestId, setExistingRequestId] = React.useState<
    string | null
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TeachFormValues>();

  const {
    data,
    refetch,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["teacherRequest", user?.id],
    queryFn: getMyTeacherRequest,
    enabled: !!user && user.role !== "teacher" && isDialogOpen,
    staleTime: 0,
  });

  const getStatus = () => {
    if (user?.role === "teacher") return "approved";
    if (data?.success && data?.data?.status) return data.data.status;
    return null;
  };

  const status = getStatus();

  // Create or update mutation
  // Create or update mutation
  const { mutate, isLoading } = useMutation({
    mutationFn: async (formData: TeachFormValues) => {
      if (!user) throw new Error("User not authenticated");

      const requestData = {
        ...formData,
        name: user.name,
        email: user.email,
        image: user.image || "",
        userId: user.id,
      };

      // If we have an existing request ID, update it
      if (existingRequestId) {
        return await updateTeacherRequest(existingRequestId, requestData);
      }
      // Otherwise create a new request
      return await submitTeacherRequest(requestData);
    },
    onSuccess: (res) => {
      toast.success(res.message || "Application submitted successfully");
      reset();
      refetch();
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit application";
      toast.error(errorMessage);
    },
  });

  const onSubmit = (formData: TeachFormValues) => {
    if (!user) {
      toast.error("Please login to apply");
      return;
    }
    mutate(formData);
  };

  // Pre-fill form if previously rejected and set existing ID
  useEffect(() => {
    if (status === "rejected" && data?.data) {
      setValue("title", data.data.title || "");
      setValue("category", data.data.category || "");
      setValue("experience", data.data.experience || "beginner");
      setExistingRequestId(data.data._id);
    } else {
      setExistingRequestId(null);
    }
  }, [status, data, setValue]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="btn-bounce glow-primary text-lg px-8 py-6">
          {status === "rejected"
            ? "Request To Another Review"
            : "Apply to Teach"}
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {status === "rejected"
              ? "Request To Another Review"
              : "Apply to Become a Teacher"}
          </DialogTitle>
        </DialogHeader>

        {isQueryLoading ? (
          <LoadingSpiner />
        ) : status === "approved" ? (
          <div className="text-green-600 text-center p-4 font-semibold">
            ✅ You are already a teacher!
          </div>
        ) : status === "pending" ? (
          <div className="text-yellow-600 text-center p-4">
            ⏳ Your application is under review.
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {status === "rejected" && (
              <div className="text-red-600 text-center mb-4">
                ❌ Your previous application was rejected. You can submit a new
                one.
              </div>
            )}

            <div>
              <Input
                {...register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 10,
                    message: "Title should be at least 10 characters",
                  },
                })}
                placeholder="Teaching Title (e.g. Full Stack Developer)"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <Select
                onValueChange={(value) => setValue("category", value)}
                defaultValue={data?.data?.category || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  Please select a category
                </p>
              )}
            </div>

            <div>
              <Select
                onValueChange={(value) =>
                  setValue("experience", value as TeachFormValues["experience"])
                }
                defaultValue={data?.data?.experience || ""}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.experience && (
                <p className="text-red-500 text-sm mt-1">
                  Please select your experience level
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit for Review"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplyToTeachModal;

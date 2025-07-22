import React, { useEffect, useState } from "react";
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
} from "@/services/userService";
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
  console.log(user);

  const { register, handleSubmit, reset, setValue, watch } =
    useForm<TeachFormValues>();

  const {
    data,
    refetch,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ["teacherRequest"],
    queryFn: getMyTeacherRequest,
    enabled: !!user && user.role !== "teacher",
    staleTime: 0, // Always fetch fresh data
    refetchOnMount: true, // Refetch when component mounts
    retry: false, // Don't retry on 404 errors
  });

  // Determine status based on user role and teacher request data
  const getStatus = () => {
    if (user?.role === "teacher") {
      return "approved";
    }
    // Handle the nested data structure from your API response
    if (data?.success && data?.data?.status) {
      return data.data.status;
    }
    return null;
  };

  const status = getStatus();

  const { mutate, isLoading } = useMutation({
    mutationFn: submitTeacherRequest,
    onSuccess: (res) => {
      toast.success(res.message || "Application submitted");
      reset();
      // Refetch the teacher request data to update the status
      refetch();
    },
    onError: () => {
      toast.error("Failed to submit application");
    },
  });

  const onSubmit = (formData: TeachFormValues) => {
    if (!user) return;

    mutate({
      ...formData,
      name: user.name,
      email: user.email,
      image: user.image || "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="btn-bounce glow-primary text-lg px-8 py-6">
          Apply to Teach <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Apply to Become a Teacher</DialogTitle>
        </DialogHeader>

        {isQueryLoading && user?.role !== "teacher" ? (
          <div className="text-center p-4">Loading...</div>
        ) : status === "approved" ? (
          <div className="text-green-600 text-center p-4 font-semibold">
            ✅ You are already a teacher!
          </div>
        ) : status === "pending" ? (
          <div className="text-yellow-600 text-center p-4">
            ⏳ Your application is under review.
          </div>
        ) : status === "rejected" ? (
          <>
            <div className="text-red-600 text-center mb-4">
              ❌ Your request was rejected. You can submit again.
            </div>
            <Form />
          </>
        ) : (
          <Form />
        )}
      </DialogContent>
    </Dialog>
  );

  function Form() {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <Input
          {...register("title", { required: true })}
          placeholder="Teaching Title (e.g. Full Stack Developer)"
        />

        <Select onValueChange={(value) => setValue("category", value)}>
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

        <Select
          onValueChange={(value) =>
            setValue("experience", value as TeachFormValues["experience"])
          }
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

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit for Review"}
        </Button>
      </form>
    );
  }
};

export default ApplyToTeachModal;

import React from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { getProfile, updateProfile } from "@/services/userService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { RootState } from "../../store/store";
import {
  User,
  Mail,
  Phone,
  Shield,
  Edit3,
  Save,
  X,
  Camera,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { uploadImageToImgBB } from "@/utils/uploadImage";

interface ProfileForm {
  name: string;
  phone?: string;
  image?: FileList;
}

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<ProfileForm>();

  // Watch for image file changes
  const imageFile = watch("image");

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setImagePreview(null);
    },
    onError: (error: any) => {
      toast.error("Failed to update profile: " + error.message);
    },
  });

  // Handle image preview
  React.useEffect(() => {
    if (imageFile && imageFile[0]) {
      const file = imageFile[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [imageFile]);

  React.useEffect(() => {
    if (profile) {
      reset({
        name: profile.name,
        phone: profile.phone || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: ProfileForm) => {
    try {
      let imageUrl = profile?.image; // Keep existing image by default

      // Upload new image if provided
      if (data.image && data.image[0]) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadImageToImgBB(data.image[0]);
        } catch (error) {
          toast.error("Failed to upload profile picture. Please try again.");
          setUploadingImage(false);
          return;
        }

        setUploadingImage(false);
      }

      // Prepare update data
      const updateData = {
        name: data.name,
        phone: data.phone,
        image: imageUrl,
      };

      updateMutation.mutate(updateData);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile. Please try again.");
      setUploadingImage(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset form when canceling edit
      reset({
        name: profile?.name,
        phone: profile?.phone || "",
      });
      setImagePreview(null);
      setValue("image", undefined as any);
      clearErrors();
    }
    setIsEditing(!isEditing);
  };

  const removeImage = () => {
    setValue("image", undefined as any);
    setImagePreview(null);
    clearErrors("image");
  };

  const isSubmitting = updateMutation.isPending || uploadingImage;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 bg-card rounded w-1/4 animate-pulse"></div>
        <div className="h-96 bg-card rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information
          </p>
        </div>

        <Button
          onClick={handleEditToggle}
          variant={isEditing ? "outline" : "default"}
          className="btn-bounce"
          disabled={isSubmitting}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center border-4 border-background shadow-lg">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile preview"
                      className="w-full h-full object-cover"
                    />
                  ) : profile?.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {profile?.name?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>

                {isEditing && (
                  <div className="absolute -bottom-2 -right-2">
                    <label className="cursor-pointer">
                      <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors shadow-lg">
                        <Camera className="w-4 h-4" />
                      </div>
                      <input
                        {...register("image", {
                          validate: {
                            fileType: (files) => {
                              if (!files || !files[0]) return true;
                              const file = files[0];
                              const allowedTypes = [
                                "image/jpeg",
                                "image/jpg",
                                "image/png",
                                "image/webp",
                              ];
                              if (!allowedTypes.includes(file.type)) {
                                return "Only JPEG, PNG, and WebP images are allowed";
                              }
                              return true;
                            },
                            fileSize: (files) => {
                              if (!files || !files[0]) return true;
                              const file = files[0];
                              const maxSize = 5 * 1024 * 1024; // 5MB
                              if (file.size > maxSize) {
                                return "Image size must be less than 5MB";
                              }
                              return true;
                            },
                          },
                        })}
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                )}

                {imagePreview && isEditing && (
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {errors.image && (
                <p className="text-destructive text-xs mb-2">
                  {errors.image.message}
                </p>
              )}

              <h3 className="text-xl font-semibold">{profile?.name}</h3>
              <div className="flex justify-center mt-2">
                <Badge variant="secondary" className="capitalize">
                  {profile?.role}
                </Badge>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm">{profile?.email}</span>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-sm">
                  {profile?.phone || "No phone number"}
                </span>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm capitalize">
                  {profile?.role} Account
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details/Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>
              {isEditing ? "Edit Profile" : "Profile Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      {...register("name", { required: "Name is required" })}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="text-destructive text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <Input
                      {...register("phone")}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      value={profile?.email}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Role
                    </label>
                    <Input
                      value={profile?.role}
                      disabled
                      className="bg-muted capitalize"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Role is determined by admin
                    </p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEditToggle}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-bounce"
                  >
                    {updateMutation.isPending ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Full Name
                      </label>
                      <p className="text-lg font-medium">{profile?.name}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Email Address
                      </label>
                      <p className="text-lg">{profile?.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Phone Number
                      </label>
                      <p className="text-lg">
                        {profile?.phone || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1">
                        Account Type
                      </label>
                      <Badge variant="secondary" className="capitalize text-sm">
                        {profile?.role}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Click "Edit Profile" to make changes to your account
                    information.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default Profile;

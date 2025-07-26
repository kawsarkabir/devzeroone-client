import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  registerWithEmail,
  loginWithGoogle,
  RegisterData,
} from "../services/authService";
import { setUser } from "../store/slices/authSlice";
import Swal from "sweetalert2";
import { toast } from "sonner";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerMutation = useMutation({
    mutationFn: registerWithEmail,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      navigate("/");
      toast.success("Account created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const googleMutation = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: (data) => {
      dispatch(setUser(data.user));
      navigate("/");
      toast.success("Logged in with Google successfully");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: RegisterData) => {
    if (!acceptTerms) {
      toast.error("You must accept the terms and conditions");
      return;
    }
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 border border-border/50"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="text-xl font-bold text-gradient">
                  DEVZeroOne
                </span>
              </Link>

              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">
                Join our learning community today
              </p>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <p className="text-[11px] mt-1 text-red-300">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] mt-1 text-red-300">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Photo URL Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Photo URL (Optional)
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="url"
                    placeholder="Enter photo URL"
                    className="pl-10"
                    {...register("photoURL")}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
                        message:
                          "Password must contain 1 uppercase, 1 lowercase, 1 number and be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] mt-1 text-red-300">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-primary border-border cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground"
                >
                  I accept the
                  <a href="/terms" className="text-primary underline ml-1">
                    terms and conditions
                  </a>
                </label>
              </div>
              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full btn-bounce glow-primary cursor-pointer"
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* social login */}
            <div className="flex items-center justify-between gap-4">
              {/* Google Sign Up */}
              <Button
                type="button"
                variant="outline"
                className="w-1/2 btn-bounce"
                onClick={() => googleMutation.mutate()}
                disabled={googleMutation.isPending}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-1/2 btn-bounce"
                onClick={() => {
                  // Add your GitHub login mutation or function here
                  toast.info("GitHub login not implemented yet");
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5C5.65 1.5.5 6.65.5 13a11.5 11.5 0 008 10.95c.6.11.82-.26.82-.58v-2.03c-3.25.7-3.94-1.55-3.94-1.55-.55-1.38-1.34-1.74-1.34-1.74-1.1-.75.08-.74.08-.74 1.22.08 1.86 1.26 1.86 1.26 1.08 1.85 2.84 1.32 3.53 1 .11-.78.42-1.33.76-1.64-2.6-.3-5.34-1.3-5.34-5.78 0-1.28.46-2.33 1.24-3.15-.13-.3-.54-1.52.12-3.17 0 0 1-.32 3.28 1.2a11.5 11.5 0 015.97 0c2.27-1.52 3.27-1.2 3.27-1.2.67 1.65.26 2.87.13 3.17.77.82 1.23 1.87 1.23 3.15 0 4.5-2.75 5.47-5.37 5.76.43.37.82 1.1.82 2.23v3.31c0 .32.22.7.83.58A11.5 11.5 0 0023.5 13c0-6.35-5.15-11.5-11.5-11.5z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </Button>
            </div>
            {/* Sign In Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?
              <Link
                to="/login"
                className="text-primary hover:underline font-medium ml-1"
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

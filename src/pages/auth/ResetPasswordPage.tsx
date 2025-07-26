import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useSearchParams } from "react-router";
import { motion } from "framer-motion";
import { Lock, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { confirmPasswordReset, verifyResetCode } from "@/services/authService";

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [searchParams] = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const navigate = useNavigate();
  const emailFromParams = searchParams.get("email");

  // Verify the password reset code using your backend
  const { data: email } = useQuery({
    queryKey: ["verifyResetCode", oobCode],
    queryFn: async () => {
      if (!oobCode) {
        navigate("/reset-password");
        return "";
      }
      try {
        const response = await verifyResetCode(oobCode);
        return response.email;
      } catch (error) {
        toast.error("Invalid or expired reset link");
        navigate("/reset-password");
        return "";
      }
    },
    enabled: !!oobCode,
  });

  const displayEmail = emailFromParams || email;

  const resetMutation = useMutation({
    mutationFn: async () => {
      if (!oobCode) throw new Error("Invalid reset code");
      if (newPassword !== confirmPassword) {
        throw new Error("Passwords don't match");
      }
      await confirmPasswordReset(oobCode, newPassword);
    },
    onSuccess: () => {
      toast.success("Password reset successfully! You can now login.");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to reset password");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetMutation.mutate();
  };

  if (!oobCode) {
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
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold mb-2">Invalid Link</h1>
                <p className="text-muted-foreground">
                  The password reset link is invalid or has expired
                </p>
              </div>
              <Button asChild className="w-full">
                <Link to="/reset-password">Get New Reset Link</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

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
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Set New Password</h1>
              <p className="text-muted-foreground">
                {displayEmail
                  ? `Reset password for ${displayEmail}`
                  : "Enter your new password"}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    className="pl-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength={6}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-bounce glow-primary"
                disabled={resetMutation.isPending}
              >
                {resetMutation.isPending ? "Resetting..." : "Reset Password"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Remember your password?
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
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

export default ResetPasswordPage;

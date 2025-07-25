import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getClassById } from "@/services/classService";
import { enrollInClass } from "@/services/paymentService";
import Swal from "sweetalert2";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Stripe form
const StripeForm = ({
  classInfo,
  onSuccess,
}: {
  classInfo: any;
  onSuccess: (paymentIntentId: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // 1. Create payment intent
      const paymentIntentRes = await fetch(
        "https://devzeroone-server.vercel.app/api/v1/payments/create-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            classId: classInfo._id,
            amount: classInfo.price,
          }),
        }
      );

      if (!paymentIntentRes.ok) {
        const errorData = await paymentIntentRes.json();
        throw new Error(errorData.error || "Failed to create payment intent");
      }

      const { clientSecret, paymentIntentId } = await paymentIntentRes.json();

      // 2. Confirm payment with Stripe
      const cardElement = elements.getElement(CardElement)!;
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) throw error;
      if (!paymentIntent || paymentIntent.status !== "succeeded") {
        throw new Error("Payment failed or not completed");
      }

      // 3. Payment succeeded - call success handler
      onSuccess(paymentIntentId);
    } catch (error: any) {
      Swal.fire("Error", error.message || "Payment failed", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="card">Card Details</Label>
        <div className="p-3 border rounded-md bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1E293B",
                  "::placeholder": { color: "#94A3B8" },
                },
                invalid: { color: "#EF4444" },
              },
            }}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isProcessing || !stripe}
      >
        {isProcessing ? (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Pay ${classInfo?.price}</span>
          </div>
        )}
      </Button>
    </form>
  );
};

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: classInfo, isLoading } = useQuery({
    queryKey: ["class-payment", id],
    queryFn: () => getClassById(id!),
  });

  const enrollMutation = useMutation({
    mutationFn: (paymentIntentId: string) =>
      enrollInClass(id!, paymentIntentId),
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "You have successfully enrolled.",
        icon: "success",
        background: "#0F172A",
        color: "#fff",
        confirmButtonColor: "#0EA0E2",
      }).then(() => {
        navigate("/dashboard/my-enrolled-classes");
      });
    },
    onError: () => {
      Swal.fire({
        title: "Error!",
        text: "Enrollment failed. Please try again.",
        icon: "error",
        background: "#0F172A",
        color: "#fff",
        confirmButtonColor: "#0EA0E2",
      });
    },
  });
  const handlePaymentSuccess = (paymentIntentId: string) => {
    enrollMutation.mutate(paymentIntentId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <h1 className="text-3xl font-bold text-gradient">
              Complete Payment
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CreditCard className="w-5 h-5" />
                  <span>Order Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={classInfo?.image || "/placeholder.svg"}
                    alt={classInfo?.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{classInfo?.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      by {classInfo?.instructor}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Course Price:</span>
                    <span>${classInfo?.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-primary">${classInfo?.price}</span>
                  </div>
                </div>

                <div className="bg-card-hover p-4 rounded-lg flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span className="text-sm">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise}>
                  <StripeForm
                    classInfo={classInfo}
                    onSuccess={handlePaymentSuccess}
                  />
                </Elements>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;

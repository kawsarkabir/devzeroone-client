import React, { useState } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { CreditCard, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { getClassById } from "@/services/classService";
import { enrollInClass } from "@/services/paymentService";
import Swal from "sweetalert2";

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: classInfo, isLoading } = useQuery({
    queryKey: ["class-payment", id],
    queryFn: () => getClassById(id!),
  });

  const enrollMutation = useMutation({
    mutationFn: (paymentData: any) => enrollInClass(id!, paymentData),
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "",
        icon: "success",
        background: "#0F172A",
        color: "#fff",
        confirmButtonColor: "#0EA0E2",
      }).then(() => {
        navigate("/dashboard/my-enrolled-classes");
      });
    },
    onError: () => {
      setIsProcessing(false);
      Swal.fire({
        title: "Error!",
        text: "Payment failed. Please try again.",
        icon: "error",
        background: "#0F172A",
        color: "#fff",
        confirmButtonColor: "#0EA0E2",
      });
    },
  });

  const handlePayment = async (data: any) => {
    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      const paymentData = {
        classId: id!,
        amount: classInfo.price,
        currency: "usd",
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
        cardholderName: data.cardholderName,
      };

      enrollMutation.mutate(paymentData);
    }, 2000);
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
                <form
                  onSubmit={handleSubmit(handlePayment)}
                  className="space-y-4"
                >
                  <div>
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      {...register("cardholderName", {
                        required: "Cardholder name is required",
                      })}
                      placeholder="John Doe"
                    />
                    {errors.cardholderName && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.cardholderName.message as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      {...register("cardNumber", {
                        required: "Card number is required",
                        pattern: {
                          value: /^\d{16}$/,
                          message: "Please enter a valid 16-digit card number",
                        },
                      })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.cardNumber.message as string}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        {...register("expiryDate", {
                          required: "Expiry date is required",
                          pattern: {
                            value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                            message: "Please enter MM/YY format",
                          },
                        })}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.expiryDate.message as string}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        {...register("cvv", {
                          required: "CVV is required",
                          pattern: {
                            value: /^\d{3,4}$/,
                            message: "Please enter a valid CVV",
                          },
                        })}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.cvv.message as string}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isProcessing || enrollMutation.isPending}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
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
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;

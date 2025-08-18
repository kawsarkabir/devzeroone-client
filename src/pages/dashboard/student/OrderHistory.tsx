import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download } from "lucide-react";

interface Enrollment {
  _id: string;
  class: {
    title: string;
    price: number;
    image?: string;
    instructor?: string;
  };
  amount: number;
  status: string;
  paymentIntentId: string;
  createdAt: string;
}

export default function OrderHistory() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/enrollments/my", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Add authorization if your backend requires JWT
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setEnrollments(data.enrollments || []);
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : enrollments.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enroll) => (
              <TableRow key={enroll._id}>
                <TableCell className="font-medium">
                  {enroll.class?.title || "N/A"}
                </TableCell>
                <TableCell>${enroll.amount}</TableCell>
                <TableCell>
                  {enroll.status === "active" && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white">
                      Paid
                    </Badge>
                  )}
                  {enroll.status === "pending" && (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Pending
                    </Badge>
                  )}
                  {enroll.status === "failed" && (
                    <Badge className="bg-red-500 hover:bg-red-600 text-white">
                      Failed
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {/* Stripe PaymentIntentId can give method if you expand it, but for now show Stripe */}
                  Stripe
                </TableCell>
                <TableCell>
                  {new Date(enroll.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

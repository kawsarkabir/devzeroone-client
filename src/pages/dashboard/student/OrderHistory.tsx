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
import api from "@/services/api";

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
        const res = await api.get("/enrollments/my");
        setEnrollments(res.data.enrollments || []);
      } catch (error) {
        console.error("Failed to fetch enrollments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // === Invoice Download ===
  const handleDownloadInvoice = async (id: string) => {
    try {
      const res = await api.get(`/enrollments/${id}/invoice`, {
        responseType: "blob", // important for PDF
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download invoice", error);
    }
  };

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
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadInvoice(enroll._id)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Invoice Download
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

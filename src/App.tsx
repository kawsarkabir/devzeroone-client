import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";
import AllClasses from "./pages/AllClasses";
import CourseDetails from "./pages/CourseDetails";
import TeachPage from "./pages/TeachPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

// Dashboard Pages
import MyEnrolledClasses from "./pages/dashboard/student/MyEnrolledClassDetails";
import MyEnrolledClassDetails from "./pages/dashboard/student/MyEnrolledClassDetails";
import Profile from "./pages/dashboard/shared/Profile";
import AddClass from "./pages/dashboard/teacher/AddClass";
import AdminDashboard from "./pages/dashboard/admin/AllClassesAdmin";
import TeacherRequests from "./pages/dashboard/admin/TeacherRequests";
import Users from "./pages/dashboard/shared/Users";
import AllClassesAdmin from "./pages/dashboard/admin/AllClassesAdmin";
import MyClasses from "./pages/dashboard/teacher/MyClasses";
import ClassDetails from "./pages/dashboard/teacher/ClassDetails";

import PaymentPage from "./pages/PaymentPage";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import AuthProvider from "./providers/AuthProvider";
import DashboardHome from "./components/DashboardHome";
import StripeProvider from "./components/StripeProvider";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <Navbar />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<AllClasses />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/unauthorized" element={<Unauthorized />} />

                {/* Protected Public  */}
                <Route
                  path="/courses/:id"
                  element={
                    <ProtectedRoute>
                      <CourseDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment/:id"
                  element={
                    <ProtectedRoute>
                      <StripeProvider>
                        <PaymentPage />
                      </StripeProvider>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/teach"
                  element={
                    <ProtectedRoute>
                      <TeachPage />
                    </ProtectedRoute>
                  }
                />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* Dashboard home page content */}
                  <Route index element={<DashboardHome />} />

                  {/* Student Routes */}
                  <Route
                    path="my-enrolled-classes"
                    // requiredRoles={["student"]}
                    element={
                      <ProtectedRoute requiredRoles={["student"]}>
                        <MyEnrolledClasses />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="my-enrolled-classes/:id"
                    element={
                      <ProtectedRoute requiredRoles={["student"]}>
                        <MyEnrolledClassDetails />
                      </ProtectedRoute>
                    }
                  />

                  {/* Teacher Routes */}
                  <Route
                    path="add-class"
                    element={
                      <ProtectedRoute requiredRoles={["teacher"]}>
                        <AddClass />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="my-classes"
                    element={
                      <ProtectedRoute requiredRoles={["teacher"]}>
                        <MyClasses />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="my-class/:id"
                    element={
                      <ProtectedRoute requiredRoles={["teacher"]}>
                        <ClassDetails />
                      </ProtectedRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="teacher-requests"
                    element={
                      <ProtectedRoute requiredRoles={["admin"]}>
                        <TeacherRequests />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="users"
                    element={
                      <ProtectedRoute requiredRoles={["admin"]}>
                        <Users />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="courses"
                    element={
                      <ProtectedRoute requiredRoles={["admin"]}>
                        <AllClassesAdmin />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="class-progress/:id"
                    element={
                      <ProtectedRoute requiredRoles={["admin"]}>
                        <ClassDetails />
                      </ProtectedRoute>
                    }
                  />

                  {/* Shared */}
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  </Provider>
);

export default App;

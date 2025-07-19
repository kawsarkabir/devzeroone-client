import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Use react-router-dom
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";
import AllClasses from "./pages/AllClasses";
import CourseDetails from "./pages/CourseDetails";
import TeachPage from "./pages/TeachPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized"; // <- Make sure you have this page
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout";

// Dashboard Pages
import MyEnrolledClasses from "./pages/dashboard/MyEnrolledClasses";
import MyEnrolledClassDetails from "./pages/dashboard/MyEnrolledClassDetails";
import Profile from "./pages/dashboard/Profile";
import AddClass from "./pages/dashboard/AddClass";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import TeacherRequests from "./pages/dashboard/TeacherRequests";
import Users from "./pages/dashboard/Users";
import AllClassesAdmin from "./pages/dashboard/AllClassesAdmin";
import MyClasses from "./pages/dashboard/MyClasses";
import ClassDetails from "./pages/dashboard/ClassDetails";
import PaymentPage from "./pages/PaymentPage";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Footer from "./components/Footer";
import AuthProvider from "./providers/AuthProvider";
import DashboardHome from "./components/DashboardHome";

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

                {/* Protected Public (any role) */}
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
                      <PaymentPage />
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
                  {/* Default (admin by default) */}
                  <Route index element={<DashboardHome />} />

                  {/* Student Routes */}
                  <Route
                    path="my-enrolled-classes"
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

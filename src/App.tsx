import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Index from "./pages/Index";
import AllClasses from "./pages/AllClasses";
import CourseDetails from "./pages/CourseDetails";
import TeachPage from "./pages/TeachPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
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
                <Route path="/" element={<Index />} />
                <Route path="/classes" element={<AllClasses />} />
                <Route
                  path="/course/:id"
                  element={
                    <ProtectedRoute>
                      <CourseDetails />
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
                <Route
                  path="/payment/:id"
                  element={
                    <ProtectedRoute>
                      <PaymentPage />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  {/* Default dashboard route */}
                  <Route index element={<AdminDashboard />} />

                  {/* Student Routes */}
                  <Route
                    path="my-enrolled-classes"
                    element={<MyEnrolledClasses />}
                  />
                  <Route
                    path="my-enrolled-classes/:id"
                    element={<MyEnrolledClassDetails />}
                  />

                  {/* Teacher Routes */}
                  <Route path="add-class" element={<AddClass />} />
                  <Route path="my-classes" element={<MyClasses />} />
                  <Route path="my-class/:id" element={<ClassDetails />} />

                  {/* Admin Routes */}
                  <Route
                    path="teacher-requests"
                    element={<TeacherRequests />}
                  />
                  <Route path="users" element={<Users />} />
                  <Route path="all-classes" element={<AllClassesAdmin />} />
                  <Route path="class-progress/:id" element={<ClassDetails />} />

                  {/* Common Routes */}
                  <Route path="profile" element={<Profile />} />
                </Route>

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

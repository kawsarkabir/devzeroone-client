import React, { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Plus,
  GraduationCap,
  Shield,
  FileText,
  BarChart,
  Menu,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { RootState } from "../store/store";
import { clearUser } from "../store/slices/authSlice";
import { logout } from "../services/authService";
import Swal from "sweetalert2";
import { toast } from "sonner";

const DashboardLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when switching to desktop
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const menuButton = document.getElementById("menu-button");

      if (
        isMobileMenuOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      navigate("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout error:", error);
    }
  };

  const getNavItems = () => {
    const commonItems = [
      { name: "Dashboard", path: "/dashboard", icon: BarChart },
    ];

    switch (user?.role) {
      case "student":
        return [
          ...commonItems,
          {
            name: "My Enrolled Classes",
            path: "/dashboard/my-enrolled-classes",
            icon: BookOpen,
          },
          { name: "Profile", path: "/dashboard/profile", icon: User },
        ];
      case "teacher":
        return [
          ...commonItems,
          { name: "Add Class", path: "/dashboard/add-class", icon: Plus },
          { name: "My Classes", path: "/dashboard/my-classes", icon: BookOpen },
          { name: "Profile", path: "/dashboard/profile", icon: User },
        ];
      case "admin":
        return [
          ...commonItems,
          {
            name: "Teacher Requests",
            path: "/dashboard/teacher-requests",
            icon: GraduationCap,
          },
          { name: "Users", path: "/dashboard/users", icon: Users },
          {
            name: "Courses",
            path: "/dashboard/courses",
            icon: BookOpen,
          },
          { name: "Profile", path: "/dashboard/profile", icon: User },
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const SidebarContent = ({ isMobile = false }) => (
    <>
      <div className="p-4 md:p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">D</span>
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold text-gradient">
                DEVZeroOne
              </h2>
              <p className="text-xs md:text-sm text-muted-foreground capitalize">
                {user?.role} Dashboard
              </p>
            </div>
          </div>
          {isMobile && (
            <Button
              onClick={closeMobileMenu}
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 md:p-4 space-y-1 md:space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={isMobile ? closeMobileMenu : undefined}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 md:px-4 py-2.5 md:py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
              }`
            }
          >
            <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
            <span className="text-sm md:text-base">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-3 md:p-4 border-t border-border/50">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center space-x-2 text-sm md:text-base"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-section flex relative">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-gradient">DEVZeroOne</h2>
            </div>
          </div>
          <Button
            id="menu-button"
            onClick={toggleMobileMenu}
            variant="ghost"
            size="sm"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border/50">
        <nav className="flex items-center justify-around px-2 py-2">
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs truncate max-w-full">
                {item.name.length > 8 ? item.name.split(" ")[0] : item.name}
              </span>
            </NavLink>
          ))}
          {navItems.length > 4 && (
            <button
              onClick={toggleMobileMenu}
              className="flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 text-muted-foreground hover:text-foreground"
            >
              <Menu className="w-5 h-5 mb-1" />
              <span className="text-xs">More</span>
            </button>
          )}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden md:flex w-64 lg:w-72 bg-card border-r border-border/50 flex flex-col"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={closeMobileMenu}
            />

            {/* Mobile Sidebar */}
            <motion.aside
              id="mobile-sidebar"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 flex flex-col z-50"
            >
              <SidebarContent isMobile={true} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Add top and bottom padding for mobile header and bottom nav */}
        <div className="pt-16 pb-20 md:pt-0 md:pb-0">
          <div className="p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

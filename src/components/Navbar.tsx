import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { logout } from "@/services/authService";
import { toast } from "sonner";
import { auth } from "@/config/firebase";
import { useAppDispatch } from "@/store/hooks";
import { clearUser } from "@/store/slices/authSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();

  // Check if device is mobile and handle window resize
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Close menus when switching to desktop
      if (!mobile) {
        setIsMobileMenuOpen(false);
        setIsProfileDropdownOpen(false);
      }
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const profileDropdown = document.getElementById("profile-dropdown");
      const profileButton = document.getElementById("profile-button");
      const mobileMenu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");

      // Close profile dropdown
      if (
        isProfileDropdownOpen &&
        profileDropdown &&
        profileButton &&
        !profileDropdown.contains(event.target as Node) &&
        !profileButton.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }

      // Close mobile menu
      if (
        isMobileMenuOpen &&
        mobileMenu &&
        menuButton &&
        !mobileMenu.contains(event.target as Node) &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileDropdownOpen, isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout(auth);
      dispatch(clearUser());
      toast.success("Logout successful");
      navigate("/");
      setIsProfileDropdownOpen(false);
    } catch (error) {
      toast.error("Logout failed");
      console.error(error);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Teach on DEVZeroOne", path: "/teach" },
    { name: "Blog", path: "/blogs" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-card/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50"
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 flex-shrink-0"
          >
            <Link to="/" className="flex items-center space-x-1">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-linear-to-br from-primary to-accent rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm sm:text-base">
                  D
                </span>
              </div>
              <span className="font-bold text-gradient text-sm sm:text-base">
                DEVZeroOne
              </span>
            </Link>
          </motion.div>
          <div className="flex items-center">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 whitespace-nowrap ${
                      isActive(item.path)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop Auth Section */}
              {!isMobile && (
                <>
                  {isAuthenticated && user ? (
                    <div className="relative">
                      <motion.button
                        id="profile-button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleProfileDropdown}
                        className="flex items-center space-x-2 p-1 sm:p-2 rounded-lg hover:bg-primary/10 transition-colors"
                      >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border-2 border-primary"
                            />
                          ) : (
                            <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          )}
                        </div>
                      </motion.button>

                      <AnimatePresence>
                        {isProfileDropdownOpen && (
                          <motion.div
                            id="profile-dropdown"
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-50"
                          >
                            <div className="px-4 py-2 border-b border-border">
                              <p className="text-sm font-medium text-foreground truncate">
                                {user.name}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {user.role}
                              </p>
                            </div>
                            <Link
                              to="/dashboard"
                              className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                            >
                              <Settings className="w-4 h-4 mr-2" />
                              Dashboard
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="flex items-center w-full px-4 py-2 text-sm text-foreground hover:bg-primary/10 transition-colors"
                            >
                              <LogOut className="w-4 h-4 mr-2" />
                              Logout
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        asChild
                        className="btn-bounce text-sm px-3 sm:px-4"
                      >
                        <Link to="/login">Login</Link>
                      </Button>
                    </motion.div>
                  )}
                </>
              )}

              {/* Mobile menu button */}
              <motion.button
                id="menu-button"
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-border/50 py-4 overflow-hidden"
            >
              <div className="space-y-2">
                {/* Navigation Links */}
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                      isActive(item.path)
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                {isAuthenticated && user ? (
                  <div className="pt-4 border-t border-border/50 space-y-2">
                    {/* User Info */}
                    <div className="px-3 py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                          {user.image ? (
                            <img
                              src={user.image}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-primary"
                            />
                          ) : (
                            <User className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {user.role}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Auth Actions */}
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center px-3 py-3 text-base text-foreground hover:bg-primary/10 rounded-md transition-colors"
                    >
                      <Settings className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-3 text-base text-foreground hover:bg-primary/10 rounded-md transition-colors"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-border/50">
                    <Button asChild className="w-full">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navbar;

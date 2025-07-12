import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
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
  BarChart
} from 'lucide-react';
import { Button } from './ui/button';
import { RootState } from '../store/store';
import { clearUser } from '../store/slices/authSlice';
import { logout } from '../services/authService';
import Swal from 'sweetalert2';

const DashboardLayout = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(clearUser());
      navigate('/');
      Swal.fire({
        title: 'Success!',
        text: 'Logged out successfully',
        icon: 'success',
        background: '#0F172A',
        color: '#fff',
        confirmButtonColor: '#0EA0E2'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getNavItems = () => {
    const commonItems = [
      { name: 'Dashboard', path: '/dashboard', icon: BarChart },
    ];

    switch (user?.role) {
      case 'student':
        return [
          ...commonItems,
          { name: 'My Enrolled Classes', path: '/dashboard/my-enrolled-classes', icon: BookOpen },
          { name: 'Profile', path: '/dashboard/profile', icon: User },
        ];
      case 'teacher':
        return [
          ...commonItems,
          { name: 'Add Class', path: '/dashboard/add-class', icon: Plus },
          { name: 'My Classes', path: '/dashboard/my-classes', icon: BookOpen },
          { name: 'Profile', path: '/dashboard/profile', icon: User },
        ];
      case 'admin':
        return [
          ...commonItems,
          { name: 'Teacher Requests', path: '/dashboard/teacher-requests', icon: GraduationCap },
          { name: 'Users', path: '/dashboard/users', icon: Users },
          { name: 'All Classes', path: '/dashboard/all-classes', icon: BookOpen },
          { name: 'Profile', path: '/dashboard/profile', icon: User },
        ];
      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-section flex">
      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="w-64 bg-card border-r border-border/50 flex flex-col"
      >
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gradient">DEVZeroOne</h2>
              <p className="text-sm text-muted-foreground capitalize">{user?.role} Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-card-hover'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
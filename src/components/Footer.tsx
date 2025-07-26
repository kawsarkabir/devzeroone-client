import { Link } from "react-router";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">DEVZeroOne</span>
            </div>
            <p className="text-muted-foreground">
              A next-generation programming platform where you will learn core
              concepts, and become a next-level developer.
            </p>
            <div className="flex space-x-4">
              <Link to="https://facebook.com">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 cursor-pointer"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="https://x.com">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 cursor-pointer"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="https://instagram.com/devzeroone">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 cursor-pointer"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="https://linkedin.com">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 w-10 p-0 cursor-pointer"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/courses"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                All Courses
              </Link>
              <Link
                to="/teach"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Become an Instructor
              </Link>
              <Link
                to="/about"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/blogs"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@devzeroone.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+88 012345678910</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 DEVZeroOne. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Cookie Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Accessibility
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary text-sm transition-colors"
            >
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

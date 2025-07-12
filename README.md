# DEVZeroOne - Educational Platform

![DEVZeroOne](https://via.placeholder.com/800x300?text=DEVZeroOne+Educational+Platform)

## 🚀 Live Demo
- **Live Site**: [Your Deployed URL Here]
- **Admin Username**: admin@devzeroone.com
- **Admin Password**: admin123

## 📚 About DEVZeroOne

DEVZeroOne is a comprehensive educational platform built with the MERN stack (MongoDB, Express.js, React, Node.js) that revolutionizes the way educational institutions, tutors, and students interact. Our platform makes skill learning and class management more efficient and accessible than ever before.

## ✨ Key Features

• **Comprehensive Authentication System** - Secure login/register with Firebase Auth + JWT tokens
• **Role-Based Access Control** - Separate dashboards for Students, Teachers, and Admins
• **Interactive Class Management** - Teachers can create, edit, and manage their courses
• **Advanced Search & Filtering** - Real-time search functionality across all classes
• **Secure Payment Integration** - Complete payment flow for class enrollment
• **Assignment Management System** - Teachers can create assignments, students can submit
• **Real-time Statistics Dashboard** - Track enrollments, assignments, and submissions
• **Teacher Application System** - Users can apply to become teachers with admin approval
• **Responsive Design** - Fully optimized for mobile, tablet, and desktop devices
• **Professional Animations** - Smooth Framer Motion animations throughout the platform

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router DOM** for navigation
- **TanStack Query** for data fetching
- **React Hook Form** for form management
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **Shadcn/ui** for component library

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Firebase Auth** for authentication
- **JWT** for secure tokens
- **Multer** for file uploads
- **Cors** for cross-origin requests

### Development Tools
- **Vite** for fast development
- **ESLint** for code linting
- **TypeScript** for type safety
- **SweetAlert2** for notifications

## 🚀 Project Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Firebase project

### Quick Start Commands

```bash
# Clone the repository
git clone <your-repository-url>
cd devzeroone

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Environment Variables
Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# API Configuration
VITE_API_URL=http://localhost:5000/api
```

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Set up backend environment variables
cp .env.example .env
# Edit with your MongoDB URI and JWT secret

# Start backend server
npm run dev
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components
│   └── ...             # Custom components
├── pages/              # Application pages
│   ├── dashboard/      # Dashboard pages
│   └── ...             # Public pages
├── services/           # API service functions
├── store/              # Redux store and slices
├── hooks/              # Custom React hooks
├── config/             # Configuration files
├── data/               # Mock data and constants
└── lib/                # Utility functions
```

## 🎯 User Roles & Features

### 👨‍🎓 Students
- Browse and search available classes
- Enroll in classes with secure payment
- View enrolled classes and assignments
- Submit assignments with deadline tracking
- Provide feedback and ratings for teachers

### 👨‍🏫 Teachers
- Apply for teacher status (requires admin approval)
- Create and manage classes
- Set class pricing and descriptions
- Create and manage assignments
- View class statistics and enrollment data

### 👨‍💼 Admins
- Approve/reject teacher applications
- Manage all users and promote to admin
- Approve/reject class submissions
- View platform-wide statistics
- Monitor class progress and assignments

## 🔒 Security Features

• JWT token-based authentication
• Protected routes based on user roles
• Input validation and sanitization
• Secure payment processing
• File upload restrictions
• CORS configuration

## 📱 Responsive Design

The platform is fully responsive and tested on:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop computers (1024px+)
- Large screens (1440px+)

## 🚀 Deployment

### Frontend Deployment
```bash
# Build the project
npm run build

# Deploy to your preferred hosting service
# (Vercel, Netlify, etc.)
```

### Backend Deployment
```bash
# Install production dependencies
npm ci --only=production

# Start with PM2 or similar process manager
pm2 start server.js
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@devzeroone.com or join our Discord community.

---

**Built with ❤️ by the DEVZeroOne Team**
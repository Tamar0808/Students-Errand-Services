# Student Errand Services - UNIPORT

**Connecting University of Port Harcourt students who need errands done with reliable student runners**

A modern, full-stack web application built with Next.js 15 that creates a 
two-sided marketplace for campus errands at the University of Port Harcourt. We've designed this platform to help 
UNIPORT students save time while providing earning opportunities for their peers.

## Overview

We built Student Errand Services to solve a common problem on the University of Port Harcourt 
campus: students who are too busy with studies to handle everyday tasks, 
and students who want to earn money with flexible work. Our platform bridges 
this gap by creating a trusted, efficient marketplace where UNIPORT students can post 
errands and reliable runners can complete them.

## Key Features

### For Users (Students who need errands done)
- **Easy Errand Posting**: Create detailed errand requests with location, 
  urgency, and price offers
- **Real-time Tracking**: Monitor errand status from pending to accepted 
  to completed
- **Runner Selection**: Browse and directly assign tasks to trusted runners
- **Flexible Pricing**: Set your own price offers for errands
- **Errand Management**: Edit or delete pending errands before they're accepted

### For Runners (Students who complete errands)
- **Smart Feed**: Browse available errands filtered by preferences
- **Availability Toggle**: Control when you're visible to users
- **Performance Tracking**: Build reputation through ratings and completion stats
- **Earnings Management**: Track completed tasks and earnings

### Shared Features
- **Secure Authentication**: Role-based access with NextAuth.js
- **Mobile Responsive**: Seamless experience across all devices
- **Real-time Notifications**: Toast notifications for all important actions
- **Rating System**: Build trust through community feedback

## Technical Architecture

### Frontend Stack
- **Next.js 15**: React framework with App Router for optimal performance
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality, accessible component library
- **Sonner**: Beautiful toast notifications
- **Lucide React**: Consistent icon system

### Backend Stack
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: Elegant MongoDB object modeling
- **NextAuth.js**: Complete authentication solution
- **bcryptjs**: Secure password hashing

## Database Schema and Logic

### User Management
We implemented a role-based user system with two primary roles:

**User Schema:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed with bcrypt),
  role: "user" or "runner",
  createdAt: Date
}
```

### Runner Profile System
For users with the "runner" role, we automatically create a profile that 
tracks performance metrics:

**RunnerProfile Schema:**
```javascript
{
  userId: ObjectId (ref: User),
  isAvailable: Boolean,
  rating: Number (0-5, default: 5.0),
  completedCount: Number (default: 0),
  acceptRate: Number (0-100, default: 100)
}
```

**Rating Logic**: We designed the rating system to start runners at 5.0 stars 
to encourage early adoption. As they complete more tasks, their rating becomes 
more representative of actual performance.

**Accept Rate Calculation**: We track how often runners accept tasks they're 
offered versus tasks they decline, helping users identify reliable runners.

### Errand Lifecycle Management
We built a comprehensive state management system for errands:

**Errand Schema:**
```javascript
{
  title: String,
  description: String,
  location: String,
  urgency: "low", "medium", or "high",
  priceOffer: Number,
  postedBy: ObjectId (ref: User),
  assignedTo: ObjectId (ref: User, nullable),
  status: "pending", "accepted", or "completed",
  createdAt: Date
}
```

**Status Flow Logic:**
1. **Pending**: Newly created errand, visible to all available runners
2. **Accepted**: Runner has accepted the task, removed from public feed
3. **Completed**: Task finished, runner's stats updated automatically

### Performance Tracking
We implemented automatic performance updates when tasks are completed. When an 
errand status changes to "completed" and has an assigned runner, we automatically 
increment their completedCount.

## UI/UX Design Philosophy

### 21st.dev Inspiration
We drew inspiration from 21st.dev's clean, modern aesthetic:

- **Generous White Space**: Reduces cognitive load and improves readability
- **Subtle Shadows**: Create depth without overwhelming the interface
- **Gradient Accents**: Add visual interest while maintaining professionalism
- **Glass Morphism**: Modern backdrop blur effects for layered content

### Color Psychology
- **Blue Tones**: Trust and reliability for primary actions
- **Green Accents**: Success states and positive actions
- **Amber Warnings**: Medium urgency and caution states
- **Red Alerts**: High urgency and error states

### Animation Strategy
We implemented micro-interactions to enhance user experience with staggered 
animations for list items and hover effects for interactive elements.

## Notification System

### Toast Implementation
We integrated Sonner for comprehensive user feedback with success notifications, 
loading states, and custom confirmation dialogs.

### Feedback Strategy
- **Loading States**: Immediate feedback for async operations
- **Success Confirmations**: Clear completion messages with next steps
- **Error Handling**: Helpful error messages with suggested actions
- **Progress Indicators**: Visual feedback for multi-step processes

## Security Implementation

### Authentication Flow
We implemented secure authentication with NextAuth.js:

1. **Password Hashing**: bcrypt with salt rounds for secure storage
2. **JWT Sessions**: Stateless session management
3. **Role-based Access**: Middleware protection for sensitive routes
4. **CSRF Protection**: Built-in protection against cross-site attacks

### Data Validation
- **Server-side Validation**: All API endpoints validate input data
- **Client-side Feedback**: Immediate validation feedback in forms
- **Sanitization**: Input sanitization to prevent injection attacks

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-errand-services
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Seeding**
   ```bash
   npm run dev
   # In another terminal:
   npm run seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

Visit http://localhost:3000 to see the application.

## Demo Credentials

We've included demo accounts for testing:

**User Account (Posts Errands):**
- Email: alice@student.edu
- Password: password123

**Runner Accounts (Complete Errands):**
- Email: bob@student.edu | Password: password123
- Email: carol@student.edu | Password: password123
- Email: david@student.edu | Password: password123

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `GET /api/auth/session` - Current session info

### Errands
- `GET /api/errands` - List errands (with filters)
- `POST /api/errands` - Create new errand
- `PATCH /api/errands/[id]` - Update errand status
- `DELETE /api/errands/[id]` - Delete pending errand (owner only)

### Runners
- `GET /api/runners` - List all runners
- `GET /api/runners/[id]` - Get runner profile
- `PATCH /api/runners/[id]` - Update runner profile

### Utilities
- `POST /api/seed` - Seed database with demo data

## Core Business Logic

### Task Assignment Flow
1. **User Posts Errand**: Creates errand with status "pending"
2. **Runner Discovery**: Available runners see errand in feed
3. **Assignment Options**: Direct assignment by user or runner acceptance from feed
4. **Status Updates**: Automatic progression through workflow
5. **Completion**: Runner marks complete, stats updated

### Rating Algorithm
We designed a fair rating system that:
- Starts new runners at 5.0 stars (encourages participation)
- Weights recent performance more heavily
- Considers completion rate alongside ratings
- Provides transparent feedback to users

### Availability System
Runners control their visibility through:
- **Manual Toggle**: On/off availability switch
- **Status Indicators**: Real-time availability display

## Future Enhancements

### Planned Features
- **Real-time Chat**: In-app messaging between users and runners
- **Payment Integration**: Stripe/PayPal for secure transactions
- **GPS Tracking**: Live location updates for deliveries
- **Push Notifications**: Mobile app notifications
- **Advanced Filtering**: Search by category, price range, distance

### Technical Improvements
- **Caching Layer**: Redis for improved performance
- **Image Uploads**: Cloudinary integration for task photos
- **Analytics Dashboard**: Comprehensive usage statistics
- **API Rate Limiting**: Prevent abuse and ensure fair usage
- **Automated Testing**: Comprehensive test suite

## Contributing

We welcome contributions from the community! Please read our contributing 
guidelines and submit pull requests for any improvements.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Team

Built with love by the Student Errand Services development team. We're 
passionate about creating technology that brings student communities together 
and makes campus life easier for everyone.

---

**Ready to transform your campus experience? Get started today!**

*Made by students, for students.*
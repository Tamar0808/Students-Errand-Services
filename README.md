# Student Errand Services - UNIPORT

We developed a modern web application that connects University of Port Harcourt (UNIPORT) students who need errands done with reliable student runners. We built this platform using Next.js, MongoDB, and Tailwind CSS to create a seamless campus service ecosystem.

## 🚀 Features We Implemented

### For Students (Users)
- **Post Errands**: We created a system where students can create detailed errand requests with location, urgency, and price offers
- **Real-time Tracking**: We implemented live monitoring so users can track errand status from pending to completion
- **Secure Payments**: We built a pricing system where students can set offers and manage transactions
- **Dashboard**: We designed a comprehensive dashboard showing all posted errands and their current status
- **Delete Errands**: We added functionality for users to remove pending errands that are no longer needed

### For Runners
- **Availability Toggle**: We implemented a system where runners can set their online/offline status for accepting errands
- **Errand Feed**: We created a browsable feed of available errands with filtering options
- **Task Management**: We built tools for runners to track accepted errands and mark them as complete
- **Earnings Dashboard**: We developed a system for runners to monitor completed tasks and total earnings
- **Rating System**: We implemented a reputation system through completed errands

### General Features We Added
- **Responsive Design**: We optimized the interface for mobile, tablet, and desktop devices
- **Authentication**: We integrated secure login/signup functionality using NextAuth.js
- **Real-time Updates**: We implemented live status updates and notifications
- **University Integration**: We specifically designed this for UNIPORT campus locations
- **Toast Notifications**: We added a user-friendly feedback system throughout the app

## 🛠️ Tech Stack We Used

- **Frontend**: We chose Next.js 16 with React 19 for modern server-side rendering and Tailwind CSS for responsive styling
- **Backend**: We implemented Next.js API Routes with NextAuth.js for seamless full-stack development
- **Database**: We integrated MongoDB with Mongoose ODM for flexible data management
- **Authentication**: We used NextAuth.js with a custom credentials provider for secure user management
- **Styling**: We utilized Tailwind CSS with custom components for consistent design
- **Icons**: We incorporated Lucide React for modern, lightweight icons
- **Notifications**: We implemented Sonner for elegant toast notifications
- **Deployment**: We configured the app to be Vercel-ready for easy deployment

## 🎯 Usage

### Demo Credentials

**User Account (Posts Errands):**
- Email: udeme@student.edu
- Password: password123

**Runner Accounts (Complete Errands):**
- Email: tamar@student.edu | Password: password123
- Email: carol@student.edu | Password: password123
- Email: david@student.edu | Password: password123

### Getting Started

1. **Sign Up**: Create an account as either a User or Runner
2. **Users**: Post errands with details like location, urgency, and price
3. **Runners**: Browse available errands and accept ones that match your availability
4. **Track Progress**: Monitor errand status in real-time
5. **Complete & Rate**: Mark errands as complete and build your reputation

## 🏗️ How We Structured Our Code

We organized our project using Next.js 13+ app directory structure for optimal performance and maintainability:

```
├── app/                    # Next.js app directory (our main application)
│   ├── api/               # API routes we created
│   │   ├── auth/          # Authentication endpoints
│   │   │   ├── [...nextauth]/  # NextAuth configuration
│   │   │   └── signup/    # User registration endpoint
│   │   ├── errands/       # Errand management APIs
│   │   │   ├── [id]/      # Individual errand operations
│   │   │   └── route.js   # Main errands CRUD operations
│   │   ├── runners/       # Runner profile APIs
│   │   │   ├── [id]/      # Individual runner operations
│   │   │   └── route.js   # Runner management endpoints
│   │   └── seed/          # Database seeding endpoint
│   ├── auth/              # Authentication pages we designed
│   │   ├── signin/        # Login page
│   │   └── signup/        # Registration page
│   ├── dashboard/         # User dashboard we built
│   ├── runner/            # Runner-specific pages
│   │   ├── feed/          # Available errands feed
│   │   ├── profile/       # Runner profile management
│   │   └── tasks/         # Runner's accepted tasks
│   └── runners/           # Public runner directory
├── components/            # Reusable React components we created
│   ├── dashboards/        # Dashboard-specific components
│   │   ├── runner-dashboard.jsx  # Runner dashboard UI
│   │   └── user-dashboard.jsx    # User dashboard UI
│   ├── providers/         # Context providers we implemented
│   │   ├── session-provider.jsx  # Authentication context
│   │   └── toast-provider.jsx    # Notification system
│   └── ui/                # Custom UI components we built
│       ├── avatar.jsx     # User avatar component
│       ├── button.jsx     # Reusable button component
│       ├── card.jsx       # Card layout component
│       └── [other components]  # Various UI elements
├── lib/                   # Utility libraries we wrote
│   ├── mongodb.js         # Database connection logic
│   ├── utils.js           # Helper functions
│   └── animations.js      # Animation utilities
├── models/                # MongoDB schemas we defined
│   ├── User.js            # User data model
│   ├── Errand.js          # Errand data structure
│   └── RunnerProfile.js   # Runner profile schema
└── public/                # Static assets we included
    ├── favicon.svg        # App icon
    └── [other assets]     # Images and static files
```

### Key Code Architecture Decisions We Made:

1. **Component-Based Architecture**: We built reusable UI components to maintain consistency
2. **API Route Organization**: We structured our backend APIs by feature (auth, errands, runners)
3. **Database Models**: We created clear MongoDB schemas for data integrity
4. **Provider Pattern**: We used React Context for global state management
5. **Utility Functions**: We centralized common functions in the lib directory

## 🔧 API Endpoints We Developed

We created a comprehensive REST API to handle all application functionality:

- **POST /api/auth/signup** - We built user registration with validation and password hashing
- **GET/POST /api/errands** - We implemented errand creation and retrieval with filtering
- **PATCH /api/errands/[id]** - We created dynamic errand status updates (pending → accepted → completed)
- **DELETE /api/errands/[id]** - We added secure errand deletion for users
- **GET/PATCH /api/runners/[id]** - We built runner profile management and availability toggling
- **POST /api/seed** - We created a database seeding endpoint for demo data

### API Features We Implemented:
- **Authentication Middleware**: We secured all endpoints with proper session validation
- **Error Handling**: We implemented comprehensive error responses with appropriate HTTP status codes
- **Data Validation**: We added input validation using Mongoose schemas
- **CORS Configuration**: We configured cross-origin requests for development and production

## 🎨 Design Features We Implemented

- **Modern UI**: We created a clean, professional interface with gradient accents and consistent branding
- **Responsive Design**: We implemented a mobile-first approach that adapts seamlessly across all devices
- **Accessibility**: We built WCAG-compliant components with proper keyboard navigation and screen reader support
- **Performance Optimization**: We optimized images, implemented lazy loading, and ensured efficient rendering
- **User Experience**: We designed intuitive navigation patterns and provided clear, actionable feedback
- **Component Library**: We developed a consistent set of reusable UI components using Tailwind CSS
- **Animation System**: We added smooth transitions and micro-interactions to enhance user engagement

## � Key Development Challenges We Solved

### 1. Real-time Status Updates
We implemented a system where errand status changes are immediately reflected across all user interfaces without requiring page refreshes.

### 2. User Role Management
We created a flexible authentication system that handles both regular users (who post errands) and runners (who complete them) with different dashboard experiences.

### 3. Location-based Services
We integrated UNIPORT-specific locations and built a system for location-based errand filtering and assignment.

### 4. Database Optimization
We designed efficient MongoDB schemas with proper indexing for fast queries, especially for the errand feed and user dashboards.

### 5. Mobile-first Responsive Design
We ensured the application works seamlessly on mobile devices, which is crucial for students who primarily use smartphones.

## 🔄 Development Workflow We Followed

1. **Planning**: We analyzed the campus errand ecosystem and identified key user needs
2. **Design**: We created wireframes and chose a modern, accessible design system
3. **Backend Development**: We built robust API endpoints with proper error handling
4. **Frontend Implementation**: We developed responsive React components with real-time updates
5. **Database Design**: We created efficient schemas for users, errands, and runner profiles
6. **Testing**: We thoroughly tested all features with demo data and user scenarios
7. **Deployment**: We configured the application for production deployment on Vercel


## 🚀 Deployment Process We Configured

### Vercel Deployment (Our Recommended Approach)
We configured the application for seamless Vercel deployment:

1. **Repository Connection**: We connected our GitHub repository to Vercel for automatic deployments
2. **Environment Variables**: We configured all necessary environment variables in the Vercel dashboard
3. **Build Configuration**: We optimized our Next.js configuration for production builds
4. **Automatic Deployment**: We set up continuous deployment that triggers on every push to main branch

### Manual Deployment Option
For alternative hosting, we also prepared manual deployment instructions:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

### Environment Configuration We Set Up
We documented all required environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=your_production_url
```

## 🎯 What We Learned

Through this project, we gained valuable experience in:
- **Full-stack Development**: Building both frontend and backend with Next.js
- **Database Design**: Creating efficient MongoDB schemas and relationships
- **User Authentication**: Implementing secure login systems with NextAuth.js
- **Responsive Design**: Creating mobile-first applications with Tailwind CSS
- **API Development**: Building RESTful APIs with proper error handling
- **Real-time Features**: Implementing live updates and notifications
- **Project Management**: Coordinating team development and version control

## 👥 Our Team Contribution

We collaborated effectively as a team to deliver this comprehensive solution:
- **Frontend Development**: We designed and implemented all user interfaces
- **Backend Architecture**: We built robust API endpoints and database integration
- **UI/UX Design**: We created an intuitive and accessible user experience
- **Testing & Quality Assurance**: We thoroughly tested all features and edge cases
- **Documentation**: We documented our code and created this comprehensive README

## Acknowledgments

We would like to thank:
- Next.js and React teams for providing excellent development frameworks
- MongoDB for reliable database solutions that scaled with our needs
- University of Port Harcourt for inspiring this campus-focused solution
- Tailwind CSS for enabling rapid, consistent styling
- Our peers for guidance throughout the development process

## 📞 Support

For support or questions about our implementation, please create an issue in this repository or contact our development team.

---

**Proudly developed for UNIPORT students, by UNIPORT students** 🎓
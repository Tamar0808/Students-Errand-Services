# Student Errand Services - UNIPORT

A modern web application connecting University of Port Harcourt (UNIPORT) students who need errands done with reliable student runners. Built with Next.js, MongoDB, and Tailwind CSS.

## 🚀 Features

### For Students (Users)
- **Post Errands**: Create detailed errand requests with location, urgency, and price offers
- **Real-time Tracking**: Monitor errand status from pending to completion
- **Secure Payments**: Set price offers and manage transactions
- **Dashboard**: Comprehensive view of all posted errands and their status
- **Delete Errands**: Remove pending errands that are no longer needed

### For Runners
- **Availability Toggle**: Set online/offline status for accepting errands
- **Errand Feed**: Browse available errands with filtering options
- **Task Management**: Track accepted errands and mark them as complete
- **Earnings Dashboard**: Monitor completed tasks and total earnings
- **Rating System**: Build reputation through completed errands

### General Features
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Authentication**: Secure login/signup with NextAuth.js
- **Real-time Updates**: Live status updates and notifications
- **University Integration**: Specifically designed for UNIPORT campus locations
- **Toast Notifications**: User-friendly feedback system

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: NextAuth.js with credentials provider
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **Notifications**: Sonner (Toast notifications)
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/student-errand-services.git
   cd student-errand-services
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret_key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Seed the database**
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

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

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── runner/            # Runner-specific pages
│   └── runners/           # Runner directory
├── components/            # Reusable React components
│   ├── dashboards/        # Dashboard components
│   ├── providers/         # Context providers
│   └── ui/                # UI components
├── lib/                   # Utility libraries
├── models/                # MongoDB models
├── public/                # Static assets
└── scripts/               # Database scripts
```

## 🔧 API Endpoints

- `POST /api/auth/signup` - User registration
- `GET/POST /api/errands` - Errand management
- `PATCH /api/errands/[id]` - Update errand status
- `DELETE /api/errands/[id]` - Delete errand
- `GET/PATCH /api/runners/[id]` - Runner profile management
- `POST /api/seed` - Database seeding

## 🎨 Design Features

- **Modern UI**: Clean, professional interface with gradient accents
- **Responsive**: Mobile-first design that works on all devices
- **Accessibility**: WCAG-compliant components and keyboard navigation
- **Performance**: Optimized images, lazy loading, and efficient rendering
- **User Experience**: Intuitive navigation and clear feedback

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- University of Port Harcourt student community
- Next.js and React teams for excellent frameworks
- MongoDB for reliable database solutions
- Tailwind CSS for beautiful styling utilities

## 📞 Support

For support, email support@studenterrands.com or create an issue in this repository.

---

**Made with ❤️ for UNIPORT students, by students**
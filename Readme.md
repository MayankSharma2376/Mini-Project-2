# WasteZero - Environmental Impact Management Platform

[![React](https://img.shields.io/badge/React-19.1.1-61dafb?style=flat&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=flat&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38b2ac?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

WasteZero is a comprehensive environmental impact management platform that connects volunteers with NGOs and waste management organizations to facilitate environmental cleanup initiatives, recycling programs, and community engagement activities.

## 🌟 Key Features

### Multi-Role Dashboard System
- **Admin Dashboard**: Complete platform oversight with user management and analytics
- **NGO Dashboard**: Event creation, volunteer management, and impact tracking
- **Volunteer Dashboard**: Opportunity browsing, application management, and participation tracking

### Real-Time Communication
- **Role-Based Messaging**: Structured communication channels between user types
  - NGOs ↔ Volunteers: Coordinate environmental activities and opportunities
  - Admins ↔ All Users: Platform oversight and support
  - Cross-role restrictions prevent unauthorized communications
- **Socket.IO Integration**: Real-time bidirectional messaging with live updates
- **Message Persistence**: Conversation history stored in MongoDB
- **Unread Indicators**: Visual badges for new messages with count display
- **User Role Display**: Clear role identification in chat interface

### Advanced Event Management
- **Event Creation**: Rich event creation with image uploads, skill requirements, and detailed descriptions
- **Application System**: Complete volunteer application workflow with approval/rejection capabilities
- **Status Tracking**: Real-time event status updates (active, inactive, completed, cancelled)
- **Capacity Management**: Automatic tracking of volunteer registrations vs. event capacity

### Professional User Experience
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Image Management**: Profile photos, event images with enlargement functionality
- **Dynamic Cards**: Real-time data updates with professional styling
- **Modal Systems**: Comprehensive modal implementations for details, confirmations, and image viewing

### Authentication & Security
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Different access levels for admin, NGO, and volunteer roles
- **Password Security**: bcrypt hashing for secure password storage
- **OTP System**: Email-based OTP for password reset functionality

## 🚀 Technology Stack

### Frontend
- **React 19.1.1**: Modern React with hooks and functional components
- **Vite 5.4.2**: Lightning-fast build tool and development server
- **React Router DOM 6.26.1**: Client-side routing with nested layouts
- **Tailwind CSS 3.4.10**: Utility-first CSS framework for responsive design
- **Socket.IO Client 4.8.1**: Real-time bidirectional communication
- **Framer Motion 12.23.12**: Smooth animations and transitions
- **React Hot Toast & Toastify**: Toast notification systems
- **Lucide React**: Modern icon library
- **Axios**: HTTP client for API communication

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js 5.1.0**: Web application framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose 8.18.1**: MongoDB object modeling and validation
- **Socket.IO 4.8.1**: Real-time communication server
- **JWT**: JSON Web Token for authentication
- **bcrypt**: Password hashing and security
- **Nodemailer 7.0.6**: Email service for OTP delivery
- **CORS**: Cross-origin resource sharing configuration

### Development Tools
- **Nodemon**: Automatic server restart during development
- **ESLint**: Code linting and quality assurance
- **PostCSS**: CSS processing and optimization
- **Vitest**: Unit testing framework

## 📁 Project Structure

```
project-root/
├── backend/
│   ├── src/
│   │   └── server.js              # Main server entry point
│   ├── controllers/               # API route handlers
│   │   ├── auth.controller.js     # Authentication logic
│   │   ├── message.controller.js  # Real-time messaging
│   │   ├── ngo.controller.js      # NGO-specific operations
│   │   ├── user.controller.js     # User management
│   │   ├── volunteer.controller.js # Volunteer operations
│   │   └── notification.controller.js # Notification system
│   ├── models/                    # Database schemas
│   │   ├── user.model.js          # User profile and authentication
│   │   ├── opportunity.model.js   # Event/opportunity structure
│   │   ├── application.model.js   # Volunteer applications
│   │   ├── conversation.model.js  # Chat conversations
│   │   └── message.model.js       # Individual messages
│   ├── routes/                    # API route definitions
│   ├── middleware/                # Authentication and validation
│   ├── socket/                    # Socket.IO configuration
│   └── lib/                       # Database connection utilities
├── frontend/
│   ├── src/
│   │   ├── pages/                 # Main application pages
│   │   │   ├── Homepage.jsx       # Landing page
│   │   │   ├── AuthPage.jsx       # Login/Registration
│   │   │   ├── AdminDashboard.jsx # Admin interface
│   │   │   ├── NGODashboard.jsx   # NGO management interface
│   │   │   ├── VolunteerDashboard.jsx # Volunteer interface
│   │   │   ├── MessagePage.jsx    # Real-time chat
│   │   │   ├── MyProfile.jsx      # User profile management
│   │   │   └── NotificationsPage.jsx # Notification center
│   │   ├── components/            # Reusable UI components
│   │   │   ├── Navbar.jsx         # Navigation header
│   │   │   ├── Side.jsx           # Sidebar navigation
│   │   │   ├── OpportunityCard.jsx # Event display cards
│   │   │   └── ...               # Various UI components
│   │   ├── services/              # API communication
│   │   ├── contexts/              # React context providers
│   │   └── constants/             # Application constants
│   └── public/                    # Static assets
└── package.json files             # Dependencies and scripts
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd project-root/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the backend directory with the following variables:
   ```env
   # Database Configuration
   MONGODB_URI=your_mongodb_connection_string
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   
   # Server Configuration
   PORT=4000
   
   # Email Configuration (for OTP)
   EMAIL_HOST=your_smtp_host
   EMAIL_PORT=your_smtp_port
   EMAIL_USER=your_email_username
   EMAIL_PASS=your_email_password
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The backend server will start at `http://localhost:4000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

   The frontend application will start at `http://localhost:5173`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/verify-otp` - OTP verification

### Events & Opportunities
- `GET /api/ngo/events` - Fetch NGO events
- `POST /api/ngo/create-event` - Create new event
- `PUT /api/ngo/events/:id` - Update event
- `GET /api/volunteer/opportunities` - Browse available opportunities
- `POST /api/volunteer/apply/:id` - Apply for opportunity

### Messaging
- `GET /api/messages/:id` - Fetch conversation messages (role-based access)
- `POST /api/messages/send/:id` - Send message (role validation enforced)
- `GET /api/users` - Get compatible users for messaging (filtered by role)

### Role-Based Communication Rules
- **NGO Users**: Can message Volunteers and Admins
- **Volunteer Users**: Can message NGOs and Admins  
- **Admin Users**: Can message all user types
- **Cross-validation**: Both send and receive operations validate role compatibility

### Notifications
- `GET /api/notifications` - Fetch user notifications
- `POST /api/notifications/mark-read/:id` - Mark notification as read

## 👥 User Roles & Permissions

### Admin
- Complete platform oversight
- User management and moderation
- System analytics and reporting
- Event creation and management

### NGO (Non-Governmental Organization)
- Create and manage environmental events
- Review and approve volunteer applications
- Track volunteer participation and impact
- Communicate with volunteers through messaging

### Volunteer
- Browse available opportunities by category and location
- Apply for events with personalized messages
- Track application status and participation history
- Engage in real-time messaging with NGOs and other volunteers

## 🎨 UI/UX Features

### Professional Design System
- **Consistent Color Palette**: Teal and green theme reflecting environmental focus
- **Responsive Layouts**: Mobile-first design with desktop enhancements
- **Interactive Elements**: Hover effects, loading states, and smooth transitions
- **Accessibility**: Proper ARIA labels and keyboard navigation support

### Advanced UI Components
- **Modal Systems**: Event details, image viewing, confirmation dialogs
- **Image Management**: Profile photos, event images with enlargement functionality
- **Real-time Updates**: Live notification badges and message indicators
- **Professional Cards**: Event cards with progress bars, status indicators, and action buttons

## 🔧 Development Guidelines

### Code Standards
- **ES6+ JavaScript**: Modern JavaScript features and syntax
- **Component Architecture**: Modular, reusable React components
- **API Design**: RESTful endpoints with consistent response formats
- **Error Handling**: Comprehensive error handling with user-friendly messages

### Performance Optimizations
- **Image Optimization**: Base64 encoding with size limits (25MB)
- **Lazy Loading**: Component-based code splitting
- **Efficient State Management**: Context API for global state
- **Socket.IO Optimization**: Efficient real-time communication

## 🚀 Deployment

### Production Build

1. **Backend Production**
   ```bash
   cd backend
   npm install --production
   npm start
   ```

2. **Frontend Production**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

### Environment Variables
Ensure all production environment variables are properly configured before deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**WasteZero** - Building a sustainable future through community engagement and environmental action. 🌱
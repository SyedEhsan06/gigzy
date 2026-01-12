# GigFlow - Freelance Marketplace Platform

![GigFlow Logo](https://via.placeholder.com/150x50?text=GigFlow)

A modern, full-stack freelance marketplace where clients can post jobs (gigs) and freelancers can submit competitive bids. Built with React, TypeScript, Express.js, and MongoDB.

## 🌟 Features

### For Clients
- **Post Gigs**: Create detailed job postings with budgets and requirements
- **Manage Bids**: Review and compare freelancer proposals
- **Hire Freelancers**: Accept bids and hire the best candidates
- **Track Projects**: Monitor your posted gigs and their status

### For Freelancers
- **Browse Gigs**: Discover available freelance opportunities
- **Submit Bids**: Place competitive offers on projects
- **Manage Proposals**: Track your submitted bids and their status
- **Withdraw Bids**: Remove bids if needed before acceptance

### Platform Features
- **Secure Authentication**: JWT-based user authentication
- **Real-time Notifications**: Toast notifications for all actions
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Glassmorphism design with smooth animations
- **Type Safety**: Full TypeScript implementation
- **Optimized Performance**: React Query for efficient data fetching

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching
- **React Hot Toast** - Notification system

### Backend
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Type-safe Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting
- **pnpm** - Fast package manager
- **Nodemon** - Auto-restart for development
- **Vite** - Frontend build tool

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (local installation or cloud instance like MongoDB Atlas)
- **pnpm** (recommended) or npm
- **Git** - Version control

### Installing Prerequisites

#### macOS (using Homebrew)
```bash
# Install Node.js
brew install node

# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Install pnpm
npm install -g pnpm
```

#### Windows
```bash
# Install Node.js from https://nodejs.org/

# Install MongoDB from https://www.mongodb.com/try/download/community

# Install pnpm
npm install -g pnpm
```

#### Linux (Ubuntu/Debian)
```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
sudo apt-get install gnupg
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# Install pnpm
npm install -g pnpm
```

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd gigflow
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
pnpm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env  # or use your preferred editor
```

#### Environment Variables (.env)
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gigflow
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_secure
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
pnpm install
```

### 4. Database Setup

Make sure MongoDB is running:

```bash
# Check if MongoDB is running
mongosh --eval "db.adminCommand('ping')"

# Or if using brew services
brew services list | grep mongodb
```

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd server
pnpm run dev
```
The server will start on `http://localhost:5000`

2. **Start the Frontend Client**
```bash
cd client
pnpm run dev
```
The client will start on `http://localhost:5173`

### Production Build

1. **Build the Backend**
```bash
cd server
pnpm run build
pnpm start
```

2. **Build the Frontend**
```bash
cd client
pnpm run build
pnpm run preview
```

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Gig Endpoints
- `GET /api/gigs` - Get all gigs
- `POST /api/gigs` - Create a new gig (authenticated)
- `GET /api/gigs/:id` - Get gig details
- `GET /api/gigs/user/:userId` - Get user's gigs

### Bid Endpoints
- `GET /api/bids/gig/:gigId` - Get bids for a gig
- `POST /api/bids` - Submit a bid (authenticated)
- `PATCH /api/bids/:id/hire` - Hire a freelancer (gig owner only)
- `PATCH /api/bids/:id/reject` - Reject a bid (gig owner only)
- `PATCH /api/bids/:id/withdraw` - Withdraw a bid (bid owner only)

## 🗂️ Project Structure

```
gigflow/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── components/    # Reusable React components
│   │   ├── contexts/      # React contexts (Auth, etc.)
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript type definitions
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── README.md
├── server/                 # Backend Express application
│   ├── src/
│   │   ├── config/        # Database and configuration
│   │   ├── controllers/   # Route controllers
│   │   ├── middlewares/   # Express middlewares
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── app.ts         # Main application file
│   ├── package.json
│   └── README.md
└── README.md              # This file
```

## 🔧 Development Scripts

### Client Scripts
```bash
cd client
pnpm run dev        # Start development server
pnpm run build      # Build for production
pnpm run lint       # Run ESLint
pnpm run preview    # Preview production build
```

### Server Scripts
```bash
cd server
pnpm run dev        # Start development server with nodemon
pnpm run build      # Compile TypeScript
pnpm start          # Start production server
```

## 🧪 Testing

### Manual Testing
1. Register a new account or login
2. Post a gig as a client
3. Switch to another account or create a freelancer account
4. Browse gigs and submit bids
5. Switch back to client account and manage bids (hire/reject)

### API Testing
```bash
# Test authentication
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"password123"}'

# Test gig creation
curl -X POST http://localhost:5000/api/gigs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Gig","description":"Test description","budget":100}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful commit messages
- Keep components small and focused
- Add proper error handling

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Make sure MongoDB is running
brew services start mongodb/brew/mongodb-community
# or
sudo systemctl start mongod
```

**Port Already in Use**
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9

# Kill process using port 5173
lsof -ti:5173 | xargs kill -9
```

**CORS Issues**
- Make sure `CLIENT_URL` in `.env` matches your frontend URL
- Check that CORS is properly configured in `server/src/app.ts`

**Build Errors**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
pnpm install
```

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review existing issues on GitHub
3. Create a new issue with detailed information
4. Include error messages, your environment, and steps to reproduce

## 🎯 Roadmap

- [ ] Email notifications for bid updates
- [ ] File upload for gig attachments
- [ ] Real-time chat between clients and freelancers
- [ ] Payment integration
- [ ] Review and rating system
- [ ] Advanced search and filtering
- [ ] Mobile app development

---

**Happy coding! 🚀**

Built with ❤️ using modern web technologies.
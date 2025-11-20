# TrueTenant Frontend

Modern React-based frontend for the TrueTenant property management platform.

## 🚀 Features

- **Modern UI**: Beautiful gradients, animations, and responsive design
- **KYC Verification**: Aadhaar-based identity verification interface
- **Owner Dashboard**: Property management, tenant tracking, maintenance requests
- **Tenant Dashboard**: Rental details, payment history, request submission
- **Secure Authentication**: JWT-based authentication with role-based access

## 🛠️ Tech Stack

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React Icons

## 📋 Prerequisites

- Node.js 18+
- npm or yarn

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/devworkkunalp/TrueTenant-Frontend.git
cd TrueTenant-Frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your backend API URL
VITE_API_URL=http://localhost:5170/api

# Start development server
npm run dev
```

The app will run on `http://localhost:5174`

## 🏗️ Build for Production

```bash
npm run build
```

Build output will be in the `dist` folder.

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navbar.jsx
│   ├── KYCStatusBanner.jsx
│   ├── AadhaarVerificationModal.jsx
│   └── ...
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── DataContext.jsx
├── pages/              # Page components
│   ├── Landing.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── OwnerDashboard.jsx
│   └── TenantDashboard.jsx
├── services/           # API services
│   └── api.js
├── App.jsx
└── main.jsx
```

## 🎨 Design System

- **Colors**: Primary (Blue), Secondary (Purple), Accent (Orange)
- **Fonts**: Inter (body), Outfit (headings)
- **Animations**: Fade-in, Slide-up, Scale-in
- **Components**: Cards, Buttons, Badges, Stats

## 🔗 Backend Repository

Backend API: [TrueTenant-Backend](https://github.com/devworkkunalp/TrueTenant-Backend)

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Set environment variable: `VITE_API_URL`
4. Deploy

### Netlify

1. Push to GitHub
2. Import project in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variable: `VITE_API_URL`

## 🔑 Test Credentials

### Owner
- Email: `owner8@test.com`
- Password: `password123`

### Tenant
- Email: `tenant1@test.com`
- Password: `password123`

## 📝 Environment Variables

```env
VITE_API_URL=http://localhost:5170/api  # Backend API URL
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License

## 👨‍💻 Author

Kunal Patil - [GitHub](https://github.com/devworkkunalp)

# Healthcare Service Booking Platform

A comprehensive healthcare service booking and management platform built with Next.js, featuring secure authentication, payment processing, and role-based dashboards.

## Live Demo

**Live Site:** https://assignment-12-kappa-seven.vercel.app/    

## Features

### User Features
- **Service Browsing**: Browse and search through available healthcare services
- **Service Booking**: Book healthcare services with customizable duration and location
- **Secure Payments**: Integrated Stripe payment gateway for secure transactions
- **Booking Management**: View, track, and cancel bookings
- **Payment History**: Access complete payment transaction history
- **User Profile**: Manage personal information including NID and contact details
- **Authentication**: Secure login with credentials or Google OAuth

### Admin Features
- **Dashboard Analytics**: View comprehensive statistics including total bookings, revenue, users, and services
- **Booking Management**: View and manage all user bookings with status updates (pending, confirmed, cancelled)
- **User Management**: Manage users and assign admin roles
- **Payment Tracking**: Monitor all payment transactions across the platform
- **Service Management**: Full CRUD operations for healthcare services

### Technical Features
- **Role-Based Access Control**: Separate dashboards and permissions for users and admins
- **Responsive Design**: Mobile-first design with Tailwind CSS and DaisyUI
- **Server-Side Rendering**: Optimized performance with Next.js App Router
- **Real-time Updates**: Dynamic data fetching and revalidation
- **Email Notifications**: Automated email confirmations via Nodemailer
- **Loading States**: Skeleton loaders for better UX
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Tech Stack

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.1.18, DaisyUI 5.5.14
- **Database**: MongoDB 7.0.0
- **Authentication**: NextAuth.js 4.24.13
- **Payment**: Stripe 20.1.2
- **Animations**: Motion 12.25.0
- **Charts**: Recharts 3.7.0
- **Notifications**: SweetAlert2 11.26.17
- **Icons**: React Icons 5.5.0
- **Email**: Nodemailer 7.0.12

## Getting Started

### Prerequisites
- Node.js 18+ installed
- MongoDB database
- Stripe account
- Google OAuth credentials (optional)

### Installation

1. Clone the repository
```bash
git clone [your-repo-url]
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email (Nodemailer)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── src/
│   ├── actions/server/      # Server actions for data operations
│   ├── app/                 # Next.js app router pages
│   │   ├── (main)/         # Public pages
│   │   ├── dashboard/      # Dashboard pages
│   │   └── api/            # API routes
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── bookings/       # Booking components
│   │   ├── buttons/        # Reusable button components
│   │   ├── dashboard/      # Dashboard components
│   │   └── layouts/        # Layout components
│   ├── lib/                # Utility functions and configs
│   └── provider/           # Context providers
├── public/                 # Static assets
└── .env.local             # Environment variables
```

## Key Pages

- `/` - Home page with featured services
- `/services` - Browse all services
- `/services/[id]` - Service details
- `/services/[id]/booking` - Service booking form
- `/login` - User login
- `/register` - User registration
- `/dashboard` - User/Admin dashboard
- `/dashboard/my-bookings` - User bookings
- `/dashboard/my-payments` - User payment history
- `/dashboard/myProfile` - User profile management
- `/dashboard/all-bookings` - Admin: All bookings
- `/dashboard/users` - Admin: User management
- `/dashboard/payments` - Admin: Payment tracking

## Authentication

The platform supports two authentication methods:
1. **Credentials**: Email and password with bcrypt hashing
2. **Google OAuth**: One-click sign-in with Google

Google users can add their NID and contact information after first login.

## Payment Flow

1. User selects service and fills booking form
2. Redirected to Stripe checkout
3. Payment processed securely via Stripe
4. Booking confirmed and email sent
5. User redirected to success page

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js |
| `NEXTAUTH_URL` | Base URL of the application |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `EMAIL_USER` | Email address for Nodemailer |
| `EMAIL_PASS` | Email app password |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Contact

For any inquiries, please contact tawsifhossain18.o@gmail.com

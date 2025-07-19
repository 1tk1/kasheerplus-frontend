# KasheerPlus Frontend

A comprehensive, production-ready SaaS application for multi-store retail management built with React 18, TypeScript, and modern web technologies.

## 🚀 Features

- **Multi-Role Authentication**: Admin, Store Owner, General Manager, Accountant, Cashier, Super Admin
- **Point of Sale (POS)**: Real-time cart management, product search, payment processing
- **Inventory Management**: Product CRUD, category management, stock tracking
- **Customer Management**: Customer database, search, and analytics
- **Supplier Management**: Supplier profiles and order tracking
- **Invoice System**: Invoice generation and management
- **Financial Management**: Revenue tracking and expense management
- **Reporting & Analytics**: Comprehensive business reports
- **Admin Panel**: User management and system settings
- **Super Admin Panel**: Platform-wide management

## 🛠️ Technology Stack

- **React 18.2.0** - Modern React with hooks and functional components
- **TypeScript 5.4.5** - Type-safe development
- **Vite 7.0.5** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible, unstyled UI components
- **Lucide React** - Modern icon library
- **React Router DOM** - Client-side routing
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Framer Motion** - Animations

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd kasheerplus-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables (optional for frontend-only development):
```bash
# Create .env file with your Supabase credentials
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── layout/         # Layout components
│   ├── shared/         # Shared components
│   └── ui/            # UI components
├── contexts/           # React Context providers
│   ├── AuthContext.tsx
│   ├── StoreSettingsContext.tsx
│   └── LoadingContext.tsx
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   └── supabase/      # Supabase integration
├── pages/              # Route-level components
│   ├── Auth.tsx
│   ├── Index.tsx
│   ├── POS.tsx
│   ├── Inventory.tsx
│   └── ...
└── main.tsx           # Application entry point
```

## 🎯 Core Features

### Authentication & User Management
- Multi-role system with role-based access control
- Email verification workflow
- Session management with JWT
- Protected routes throughout the application

### Dashboard & Analytics
- Real-time metrics and statistics
- Recent activity feed
- Performance monitoring
- Responsive design with dark mode support

### Point of Sale (POS)
- Real-time cart management
- Product search by name or barcode
- Customer selection and management
- Multiple payment methods
- Receipt generation
- Returns processing
- Keyboard shortcuts for efficiency

### Inventory Management
- Multi-store inventory tracking
- Product lifecycle management
- Category management
- Barcode/QR integration
- CSV import/export
- Low stock alerts
- Inventory movements audit trail

### Customer Management
- Complete customer profiles
- Customer search and filtering
- Purchase history tracking
- Customer analytics

### Financial Management
- Revenue tracking
- Expense management
- Financial reporting
- Multi-currency support

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

The project uses:
- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- TailwindCSS for styling

### State Management

- **React Context API** for global state (Auth, Store Settings, Loading)
- **TanStack Query** for server state management
- **React Hook Form** for form state

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Touch interfaces

## 🎨 Design System

The application uses a consistent design system with:
- Custom color palette
- Typography scale
- Component library
- Dark/light theme support
- Accessibility features

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Protected routes
- Input validation
- XSS protection

## 📊 Performance Optimizations

- Code splitting
- Lazy loading
- Memoization
- Optimized bundle size
- Caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team.

---

*KasheerPlus - Comprehensive Multi-Store Retail Management System* 
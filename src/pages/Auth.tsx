import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useLoading } from '@/contexts/LoadingContext'
import { 
  Store, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  ArrowRight,
  CheckCircle,
  Shield,
  Zap,
  BarChart3,
  Users,
  Package,
  CreditCard,
  Globe,
  ArrowLeft,
  Building,
  MapPin,
  Calendar
} from 'lucide-react'
import toast from 'react-hot-toast'

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [signupStep, setSignupStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Store Info
    storeName: '',
    storeType: '',
    storeAddress: '',
    storePhone: '',
    // Agreements
    termsAccepted: false,
    marketingEmails: false
  })
  
  const { signIn, signUp } = useAuth()
  const { showLoading, hideLoading } = useLoading()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.checked
    }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields')
      return
    }

    showLoading('Signing in...')
    
    try {
      const { error } = await signIn(formData.email, formData.password)
      
      if (error) {
        toast.error(error.message || 'Failed to sign in')
      } else {
        toast.success('Signed in successfully')
        navigate(from, { replace: true })
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
    } finally {
      hideLoading()
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Handle signup
    if (!isLogin) {
      if (signupStep < 3) {
        // Validate current step
        if (signupStep === 1 && (!formData.name || !formData.email || !formData.phone)) {
          toast.error('Please fill in all fields')
          return
        }
        if (signupStep === 2 && (!formData.storeName || !formData.storeType || !formData.storeAddress)) {
          toast.error('Please fill in all store information')
          return
        }
        if (signupStep === 3 && (!formData.password || !formData.confirmPassword || !formData.termsAccepted)) {
          toast.error('Please fill in all fields and accept terms')
          return
        }
        
        setSignupStep(signupStep + 1)
        return
      }

      // Final step - create account
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match')
        return
      }

      if (formData.password.length < 6) {
        toast.error('Password must be at least 6 characters long')
        return
      }

      if (!formData.termsAccepted) {
        toast.error('Please accept the terms and conditions')
        return
      }

      try {
        showLoading('Creating account...')
        const { error } = await signUp(formData.email, formData.password, {
          name: formData.name,
          role: 'admin'
        })

        if (error) throw error

        toast.success('Account created successfully! Please check your email to verify your account.')
        setIsLogin(true)
        setSignupStep(1)
        setFormData({
          name: '', email: '', phone: '', password: '', confirmPassword: '',
          storeName: '', storeType: '', storeAddress: '', storePhone: '',
          termsAccepted: false,
          marketingEmails: false
        })
      } catch (error: any) {
        toast.error(error.message || 'Failed to create account')
      } finally {
        hideLoading()
      }
      return
    }
  }

  const handleBackStep = () => {
    if (signupStep > 1) {
      setSignupStep(signupStep - 1)
    }
  }

  const getStepTitle = () => {
    switch (signupStep) {
      case 1: return 'Personal Information'
      case 2: return 'Store Information'
      case 3: return 'Security & Agreements'
      default: return 'Sign Up'
    }
  }

  const getStepDescription = () => {
    switch (signupStep) {
      case 1: return 'Tell us about yourself'
      case 2: return 'Tell us about your store'
      case 3: return 'Set password and accept terms'
      default: return 'Create your account'
    }
  }

  const features = [
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption with multi-factor authentication'
    },
    {
      icon: Zap,
      title: 'Real-time Sync',
      description: 'Instant updates across all stores and devices'
    },
    {
      icon: BarChart3,
      title: 'AI Analytics',
      description: 'Predictive insights and smart recommendations'
    },
    {
      icon: Users,
      title: 'Unlimited Stores',
      description: 'Manage as many locations as you need'
    },
    {
      icon: Package,
      title: 'Smart Inventory',
      description: 'Automated reordering and stock optimization'
    },
    {
      icon: CreditCard,
      title: 'Modern POS',
      description: 'Contactless payments and digital receipts'
    }
  ]

  return (
    <div className="min-h-screen auth-bg flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-6xl auth-card rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex">
          {/* Left Side - Auth Forms */}
          <div className="w-full lg:w-1/2 p-8 lg:p-12">
            {/* Tab Switcher */}
            <div className="flex bg-secondary-bg rounded-xl p-1 mb-8">
              <button
                onClick={() => {
                  setIsLogin(true)
                  setSignupStep(1)
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  isLogin 
                    ? 'bg-card-bg text-primary shadow-sm' 
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsLogin(false)
                  setSignupStep(1)
                }}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                  !isLogin 
                    ? 'bg-card-bg text-primary shadow-sm' 
                    : 'text-text-secondary hover:text-primary'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Fixed Height Container for Cards */}
            <div className="h-[400px] relative">
              {/* Login Card */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'
              }`}>
                <div className="h-full flex flex-col">
                  {/* Form Header */}
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">
                      LOGIN
                    </h1>
                    <p className="text-text-secondary">
                      Welcome back
                    </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleLogin} className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-primary mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-primary mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-12 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                            placeholder="Enter your password"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Stay Login Checkbox */}
                      <div className="flex items-center space-x-3 mb-6">
                        <input
                          type="checkbox"
                          id="stayLogin"
                          className="w-4 h-4 text-accent bg-secondary-bg border-border-light rounded focus:ring-accent"
                        />
                        <label htmlFor="stayLogin" className="text-sm text-primary">
                          Stay login
                        </label>
                      </div>
                    </div>

                    {/* Login Button */}
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-accent to-accent-light text-white py-3 px-6 rounded-xl font-medium hover:from-accent-hover hover:to-accent transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 mb-6"
                    >
                      <span>Login</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>

                    {/* Forget Password Link */}
                    <div className="text-center mb-6">
                      <a href="#" className="text-sm text-accent hover:underline">
                        forget password?
                      </a>
                    </div>

                    {/* Sign in with Google Button */}
                    <button
                      type="button"
                      className="w-full bg-white text-primary py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all duration-200 border border-border-light flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      <span>Sign in with Google</span>
                    </button>
                  </form>
                </div>
              </div>

              {/* Signup Card */}
              <div className={`absolute inset-0 transition-all duration-500 ${
                !isLogin ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
              }`}>
                <div className="h-full flex flex-col">
                  {/* Form Header */}
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-primary mb-2">
                      {getStepTitle().toUpperCase()}
                    </h1>
                    <p className="text-text-secondary">
                      {getStepDescription()}
                    </p>
                    
                    {/* Progress Steps for Signup */}
                    <div className="flex items-center space-x-2 mt-4">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                            step <= signupStep 
                              ? 'bg-accent' 
                              : 'bg-secondary-bg'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Signup Form */}
                  <form onSubmit={handleSignup} className="flex-1 flex flex-col">
                    <div className="space-y-4 flex-1">
                      {/* Step 1: Personal Information */}
                      {signupStep === 1 && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Full Name
                            </label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Email Address
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                                placeholder="Enter your email"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Phone Number
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                                placeholder="Enter your phone number"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Store Information */}
                      {signupStep === 2 && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Store Name
                            </label>
                            <input
                              type="text"
                              name="storeName"
                              value={formData.storeName}
                              onChange={handleInputChange}
                              className="w-full pl-4 pr-4 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                              placeholder="Enter your store name"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Store Type
                            </label>
                            <select
                              name="storeType"
                              value={formData.storeType}
                              onChange={handleInputChange}
                              className="w-full pl-4 pr-4 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary"
                              required
                            >
                              <option value="">Select store type</option>
                              <option value="retail">Retail Store</option>
                              <option value="restaurant">Restaurant</option>
                              <option value="pharmacy">Pharmacy</option>
                              <option value="electronics">Electronics</option>
                              <option value="clothing">Clothing</option>
                              <option value="grocery">Grocery</option>
                              <option value="other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Store Address
                            </label>
                            <input
                              type="text"
                              name="storeAddress"
                              value={formData.storeAddress}
                              onChange={handleInputChange}
                              className="w-full pl-4 pr-4 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                              placeholder="Enter your store address"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 3: Security & Agreements */}
                      {signupStep === 3 && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                              <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                                placeholder="Create a password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                              >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-primary mb-2">
                              Confirm Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-text-muted" />
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 border border-border-light rounded-xl bg-secondary-bg focus:ring-2 focus:ring-accent focus:border-accent transition-all text-primary placeholder:text-text-muted"
                                placeholder="Confirm your password"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                              >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                          </div>

                          {/* Agreements Section */}
                          <div className="space-y-4 pt-4 border-t border-border-light">
                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={formData.termsAccepted}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 text-accent bg-secondary-bg border-border-light rounded focus:ring-accent mt-1"
                                required
                              />
                              <label className="text-sm text-primary leading-relaxed">
                                I agree to the{' '}
                                <a href="#" className="text-accent hover:underline font-medium">
                                  Terms of Service
                                </a>{' '}
                                and{' '}
                                <a href="#" className="text-accent hover:underline font-medium">
                                  Privacy Policy
                                </a>
                              </label>
                            </div>

                            <div className="flex items-start space-x-3">
                              <input
                                type="checkbox"
                                name="marketingEmails"
                                checked={formData.marketingEmails}
                                onChange={handleCheckboxChange}
                                className="w-4 h-4 text-accent bg-secondary-bg border-border-light rounded focus:ring-accent mt-1"
                              />
                              <label className="text-sm text-primary leading-relaxed">
                                I agree to receive marketing emails and promotional offers from KasheerPlus
                              </label>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex space-x-4 mt-6">
                      {signupStep > 1 && (
                        <button
                          type="button"
                          onClick={handleBackStep}
                          className="flex-1 bg-secondary-bg text-primary py-3 px-6 rounded-xl font-medium hover:bg-primary hover:text-white transition-all duration-200 border border-border-light flex items-center justify-center space-x-2"
                        >
                          <ArrowLeft className="h-5 w-5" />
                          <span>Back</span>
                        </button>
                      )}
                      
                      <button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-accent to-accent-light text-white py-3 px-6 rounded-xl font-medium hover:from-accent-hover hover:to-accent transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                      >
                        <span>{signupStep === 3 ? 'Create Account' : 'Next'}</span>
                        {signupStep === 3 ? <CheckCircle className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Features */}
          <div className="hidden lg:flex lg:w-1/2 auth-features-bg relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:20px_20px]"></div>
            </div>
            
            {/* Glassmorphism Overlay */}
            <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"></div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col justify-start items-center h-full p-12 pt-16">
              {/* Logo */}
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-white">
                  Kasheer<span className="text-accent">+</span>
                </h1>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <feature.icon className="h-6 w-6 text-accent" />
                      </div>
                      <h3 className="text-white font-semibold text-sm">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-white/80 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Copyright */}
              <div className="absolute text-white/60 text-sm" style={{ bottom: '1.5rem' }}>
                © 2024 KasheerPlus. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth 
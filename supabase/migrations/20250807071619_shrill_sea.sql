/*
  # Initial KasheerPlus Database Schema

  1. New Tables
    - `stores` - Store information and settings
    - `users` - User profiles with role-based access
    - `categories` - Product categories
    - `suppliers` - Supplier information
    - `products` - Product inventory
    - `customers` - Customer database
    - `invoices` - Sales invoices
    - `invoice_items` - Invoice line items
    - `expenses` - Business expenses
    - `cash_registers` - POS register sessions
    - `product_movements` - Inventory tracking
    - `user_activities` - Audit logs

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure file uploads

  3. Functions & Triggers
    - Auto-create store on user signup
    - Update inventory on sales
    - Generate invoice numbers
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'store_owner', 'general_manager', 'accountant', 'cashier');
CREATE TYPE invoice_status AS ENUM ('draft', 'paid', 'unpaid', 'cancelled', 'refunded');
CREATE TYPE movement_type AS ENUM ('sale', 'purchase', 'adjustment', 'return', 'transfer');
CREATE TYPE payment_method AS ENUM ('cash', 'card', 'bank_transfer', 'mobile_payment');

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  address text,
  logo_url text,
  currency text DEFAULT 'USD',
  timezone text DEFAULT 'UTC',
  tax_rate decimal(5,2) DEFAULT 0,
  return_period_days integer DEFAULT 14,
  theme text DEFAULT 'light',
  language text DEFAULT 'en',
  receipt_template text DEFAULT 'classic',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  role user_role DEFAULT 'cashier',
  avatar_url text,
  phone text,
  is_active boolean DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(store_id, name)
);

-- Suppliers table
CREATE TABLE IF NOT EXISTS suppliers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  address text,
  contact_person text,
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  supplier_id uuid REFERENCES suppliers(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  sku text NOT NULL,
  barcode text,
  cost_price decimal(10,2) DEFAULT 0,
  selling_price decimal(10,2) NOT NULL,
  stock_quantity integer DEFAULT 0,
  min_stock_threshold integer DEFAULT 0,
  images text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(store_id, sku),
  UNIQUE(store_id, barcode)
);

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  address text,
  date_of_birth date,
  total_purchases decimal(10,2) DEFAULT 0,
  total_orders integer DEFAULT 0,
  last_purchase_date timestamptz,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE SET NULL,
  invoice_number text NOT NULL,
  invoice_date timestamptz DEFAULT now(),
  due_date timestamptz,
  subtotal decimal(10,2) DEFAULT 0,
  tax_amount decimal(10,2) DEFAULT 0,
  discount_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) DEFAULT 0,
  paid_amount decimal(10,2) DEFAULT 0,
  status invoice_status DEFAULT 'draft',
  payment_method payment_method,
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(store_id, invoice_number)
);

-- Invoice items table
CREATE TABLE IF NOT EXISTS invoice_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id uuid NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  unit_price decimal(10,2) NOT NULL,
  discount_amount decimal(10,2) DEFAULT 0,
  total_amount decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  category text NOT NULL,
  description text NOT NULL,
  amount decimal(10,2) NOT NULL,
  expense_date timestamptz DEFAULT now(),
  receipt_url text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Cash registers table
CREATE TABLE IF NOT EXISTS cash_registers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  opening_balance decimal(10,2) DEFAULT 0,
  closing_balance decimal(10,2),
  total_sales decimal(10,2) DEFAULT 0,
  total_expenses decimal(10,2) DEFAULT 0,
  opened_at timestamptz DEFAULT now(),
  closed_at timestamptz,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Product movements table
CREATE TABLE IF NOT EXISTS product_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  movement_type movement_type NOT NULL,
  quantity integer NOT NULL,
  reference_id uuid, -- Can reference invoice_id, purchase_id, etc.
  notes text,
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now()
);

-- User activities table (audit log)
CREATE TABLE IF NOT EXISTS user_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id),
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  details jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE cash_registers ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for stores
CREATE POLICY "Users can view their own store"
  ON stores FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Store owners can update their store"
  ON stores FOR UPDATE
  TO authenticated
  USING (
    id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'store_owner')
    )
  );

-- RLS Policies for user_profiles
CREATE POLICY "Users can view profiles in their store"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can manage users in their store"
  ON user_profiles FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'store_owner')
    )
  );

-- RLS Policies for categories
CREATE POLICY "Users can view categories in their store"
  ON categories FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage categories in their store"
  ON categories FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- RLS Policies for suppliers
CREATE POLICY "Users can view suppliers in their store"
  ON suppliers FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage suppliers in their store"
  ON suppliers FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- RLS Policies for products
CREATE POLICY "Users can view products in their store"
  ON products FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage products in their store"
  ON products FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- RLS Policies for customers
CREATE POLICY "Users can view customers in their store"
  ON customers FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage customers in their store"
  ON customers FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- RLS Policies for invoices
CREATE POLICY "Users can view invoices in their store"
  ON invoices FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage invoices in their store"
  ON invoices FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- RLS Policies for invoice_items
CREATE POLICY "Users can view invoice items in their store"
  ON invoice_items FOR SELECT
  TO authenticated
  USING (
    invoice_id IN (
      SELECT i.id FROM invoices i
      JOIN user_profiles up ON i.store_id = up.store_id
      WHERE up.id = auth.uid()
    )
  );

CREATE POLICY "Users can manage invoice items in their store"
  ON invoice_items FOR ALL
  TO authenticated
  USING (
    invoice_id IN (
      SELECT i.id FROM invoices i
      JOIN user_profiles up ON i.store_id = up.store_id
      WHERE up.id = auth.uid()
    )
  );

-- RLS Policies for expenses
CREATE POLICY "Users can view expenses in their store"
  ON expenses FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage expenses in their store"
  ON expenses FOR ALL
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- RLS Policies for cash_registers
CREATE POLICY "Users can view cash registers in their store"
  ON cash_registers FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can manage their own cash registers"
  ON cash_registers FOR ALL
  TO authenticated
  USING (
    user_id = auth.uid() OR
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'store_owner', 'general_manager')
    )
  );

-- RLS Policies for product_movements
CREATE POLICY "Users can view product movements in their store"
  ON product_movements FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can create product movements in their store"
  ON product_movements FOR INSERT
  TO authenticated
  WITH CHECK (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

-- RLS Policies for user_activities
CREATE POLICY "Users can view activities in their store"
  ON user_activities FOR SELECT
  TO authenticated
  USING (
    store_id IN (
      SELECT store_id FROM user_profiles 
      WHERE id = auth.uid()
    )
  );

CREATE POLICY "System can insert activities"
  ON user_activities FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Functions and Triggers

-- Function to auto-create store and user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  store_id uuid;
BEGIN
  -- Create a new store for the user
  INSERT INTO stores (name, email)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'store_name', 'My Store'),
    NEW.email
  )
  RETURNING id INTO store_id;

  -- Create user profile
  INSERT INTO user_profiles (
    id,
    store_id,
    name,
    role
  )
  VALUES (
    NEW.id,
    store_id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'admin')
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update product stock on invoice creation
CREATE OR REPLACE FUNCTION update_product_stock()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Decrease stock when invoice item is added
    UPDATE products 
    SET stock_quantity = stock_quantity - NEW.quantity,
        updated_at = now()
    WHERE id = NEW.product_id;
    
    -- Record product movement
    INSERT INTO product_movements (
      store_id,
      product_id,
      movement_type,
      quantity,
      reference_id,
      created_by
    )
    SELECT 
      p.store_id,
      NEW.product_id,
      'sale',
      -NEW.quantity,
      NEW.invoice_id,
      i.created_by
    FROM products p
    JOIN invoices i ON i.id = NEW.invoice_id
    WHERE p.id = NEW.product_id;
    
  ELSIF TG_OP = 'UPDATE' THEN
    -- Adjust stock if quantity changed
    UPDATE products 
    SET stock_quantity = stock_quantity + OLD.quantity - NEW.quantity,
        updated_at = now()
    WHERE id = NEW.product_id;
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Restore stock when invoice item is deleted
    UPDATE products 
    SET stock_quantity = stock_quantity + OLD.quantity,
        updated_at = now()
    WHERE id = OLD.product_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for product stock updates
DROP TRIGGER IF EXISTS on_invoice_item_change ON invoice_items;
CREATE TRIGGER on_invoice_item_change
  AFTER INSERT OR UPDATE OR DELETE ON invoice_items
  FOR EACH ROW EXECUTE FUNCTION update_product_stock();

-- Function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number(store_uuid uuid)
RETURNS text AS $$
DECLARE
  next_number integer;
  invoice_number text;
BEGIN
  -- Get the next invoice number for this store
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV-(\d+)') AS integer)), 0) + 1
  INTO next_number
  FROM invoices
  WHERE store_id = store_uuid;
  
  -- Format the invoice number
  invoice_number := 'INV-' || LPAD(next_number::text, 6, '0');
  
  RETURN invoice_number;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update customer statistics
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS trigger AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'paid' THEN
    UPDATE customers
    SET 
      total_purchases = total_purchases + NEW.total_amount,
      total_orders = total_orders + 1,
      last_purchase_date = NEW.invoice_date,
      updated_at = now()
    WHERE id = NEW.customer_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for customer statistics
DROP TRIGGER IF EXISTS on_invoice_paid ON invoices;
CREATE TRIGGER on_invoice_paid
  AFTER INSERT OR UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_customer_stats();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_store_id ON user_profiles(store_id);
CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(store_id, sku);
CREATE INDEX IF NOT EXISTS idx_products_barcode ON products(store_id, barcode);
CREATE INDEX IF NOT EXISTS idx_invoices_store_id ON invoices(store_id);
CREATE INDEX IF NOT EXISTS idx_invoices_customer_id ON invoices(customer_id);
CREATE INDEX IF NOT EXISTS idx_invoices_date ON invoices(invoice_date);
CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);
CREATE INDEX IF NOT EXISTS idx_invoice_items_product_id ON invoice_items(product_id);
CREATE INDEX IF NOT EXISTS idx_customers_store_id ON customers(store_id);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(store_id, phone);
CREATE INDEX IF NOT EXISTS idx_product_movements_product_id ON product_movements(product_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_store_id ON user_activities(store_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
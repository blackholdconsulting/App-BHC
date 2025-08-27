export interface User {
  id: string
  email: string
  name: string
  role: "owner" | "admin" | "member"
  avatar?: string
  created_at: string
}

export interface App {
  id: string
  name: string
  description: string
  version: string
  category: string
  icon: string
  status: "active" | "inactive" | "maintenance"
  installation_count: number
  rating: number
  created_at: string
  updated_at: string
  features: string[]
  screenshots: string[]
  developer: string
  price: number
  tags: string[]
}

export interface Installation {
  id: string
  app_id: string
  user_id: string
  status: "pending" | "installed" | "failed"
  installed_at: string
  config: Record<string, any>
}

export interface Task {
  id: string
  app_id: string
  name: string
  description: string
  status: "pending" | "running" | "completed" | "failed"
  scheduled_at: string
  completed_at?: string
  result?: any
  error?: string
}

export interface Webhook {
  id: string
  app_id: string
  url: string
  events: string[]
  status: "active" | "inactive"
  secret: string
  created_at: string
}

export interface Lead {
  id: string
  name: string
  email: string
  company?: string
  phone?: string
  source: string
  status: "new" | "contacted" | "qualified" | "converted"
  created_at: string
  notes?: string
}

import type { User } from "./types"

// Mock user data
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@blackhold.com",
    name: "Admin User",
    role: "owner",
    avatar: "/professional-avatar.png",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "manager@blackhold.com",
    name: "Manager User",
    role: "admin",
    avatar: "/business-manager-avatar.png",
    created_at: "2024-01-15T00:00:00Z",
  },
  {
    id: "3",
    email: "developer@blackhold.com",
    name: "Developer User",
    role: "member",
    avatar: "/developer-avatar.png",
    created_at: "2024-02-01T00:00:00Z",
  },
]

// Mock current user (for demo - normally would come from session/JWT)
let currentUser: User | null = mockUsers[0] // Default to admin user

export const getCurrentUser = (): User | null => {
  return currentUser
}

export const signIn = async (email: string, password: string): Promise<{ user: User | null; error: string | null }> => {
  // Mock authentication - in real app would validate against database
  const user = mockUsers.find((u) => u.email === email)

  if (user && password === "demo123") {
    currentUser = user
    return { user, error: null }
  }

  return { user: null, error: "Invalid credentials" }
}

export const signOut = async (): Promise<void> => {
  currentUser = null
}

export const hasPermission = (user: User | null, permission: string): boolean => {
  if (!user) return false

  const permissions = {
    owner: ["read", "write", "delete", "admin", "manage_users", "manage_apps"],
    admin: ["read", "write", "delete", "manage_apps"],
    member: ["read", "write"],
  }

  return permissions[user.role]?.includes(permission) || false
}

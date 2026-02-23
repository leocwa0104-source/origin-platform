import React, { createContext, useState, useContext, useEffect } from 'react'

// 创建认证上下文
const AuthContext = createContext()

// 认证提供者组件
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userRole, setUserRole] = useState('guest') // guest, creator, admin

  // 初始化时检查本地存储中的用户信息
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        setIsAuthenticated(true)
        setUserRole(parsedUser.role || 'creator')
      } catch (error) {
        console.error('解析用户信息失败:', error)
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  // 登录函数
  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setUserRole(userData.role || 'creator')
    localStorage.setItem('user', JSON.stringify(userData))
  }

  // 注册函数
  const register = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    setUserRole('creator')
    localStorage.setItem('user', JSON.stringify({ ...userData, role: 'creator' }))
  }

  // 登出函数
  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    setUserRole('guest')
    localStorage.removeItem('user')
  }

  // 更新用户信息
  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  // 提供给子组件的值
  const value = {
    user,
    loading,
    isAuthenticated,
    userRole,
    login,
    register,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// 自定义钩子，方便组件使用认证上下文
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内部使用')
  }
  return context
}
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './App.css'

// 导入页面组件
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import CreateContent from './pages/CreateContent'
import ContentDetail from './pages/ContentDetail'
import CopyrightCert from './pages/CopyrightCert'
import CopyrightProtection from './pages/CopyrightProtection'
import Monetization from './pages/Monetization'
import DAO from './pages/DAO'
import Admin from './pages/Admin'

// 导入全局上下文
import { AuthProvider } from './context/AuthContext'

const { Header, Content, Footer } = Layout

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <Router>
          <Layout className="app-layout">
            <Header className="app-header">
              <div className="logo">Origin原创者平台</div>
              <div className="header-menu">
                <a href="/">首页</a>
                <a href="/create">创作</a>
                <a href="/dashboard">仪表盘</a>
                <a href="/login">登录</a>
                <a href="/register">注册</a>
              </div>
            </Header>
            <Content className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile/:userId" element={<Profile />} />
                <Route path="/create" element={<CreateContent />} />
                <Route path="/content/:contentId" element={<ContentDetail />} />
                <Route path="/copyright/:contentId" element={<CopyrightCert />} />
                <Route path="/copyright-protection" element={<CopyrightProtection />} />
                <Route path="/monetization" element={<Monetization />} />
                <Route path="/dao" element={<DAO />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Content>
            <Footer className="app-footer">
              Origin原创者平台 ©{new Date().getFullYear()} 版权所有
            </Footer>
          </Layout>
        </Router>
      </AuthProvider>
    </ConfigProvider>
  )
}

export default App
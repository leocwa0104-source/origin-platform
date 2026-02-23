import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout, ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import './App.css'

// 导入页面组件
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

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
                <a href="/login">登录</a>
                <a href="/register">注册</a>
              </div>
            </Header>
            <Content className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
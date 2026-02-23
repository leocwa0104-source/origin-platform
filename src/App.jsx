import React from 'react'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">Origin原创者平台</div>
        <div className="header-menu">
          <a href="/">首页</a>
          <a href="/login">登录</a>
          <a href="/register">注册</a>
        </div>
      </header>
      <main className="app-content">
        <div className="home-page">
          <h1>欢迎来到Origin原创者平台</h1>
          <p>AI驱动的中小创作者版权确权社交平台</p>
          <p>核心解决原创者「确权难、维权难、变现难」三大痛点</p>
        </div>
      </main>
      <footer className="app-footer">
        Origin原创者平台 ©{new Date().getFullYear()} 版权所有
      </footer>
    </div>
  )
}

export default App
import React, { useState } from 'react'
import { Form, Input, Button, Card, message, Row, Col, Radio } from 'antd'
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, IdcardOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const navigate = useNavigate()
  const { register } = useAuth()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 注册成功，模拟用户数据
      const userData = {
        id: Date.now().toString(),
        username: values.username,
        email: values.email,
        phone: values.phone,
        isVerified: values.verification === 'verified',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + values.username
      }
      
      register(userData)
      message.success('注册成功')
      navigate('/dashboard')
    } catch (error) {
      message.error('注册失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const handleSendCode = () => {
    // 模拟发送验证码
    setCountdown(60)
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    message.success('验证码已发送')
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={24} sm={16} md={12} lg={10}>
        <Card title="用户注册" className="register-card">
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="username"
              label="用户名"
              rules={[{ required: true, message: '请输入用户名！' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
            </Form.Item>
            
            <Form.Item
              name="email"
              label="邮箱"
              rules={[{ required: true, message: '请输入邮箱！' }, { type: 'email', message: '请输入正确的邮箱格式！' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
            </Form.Item>
            
            <Form.Item
              name="phone"
              label="手机号"
              rules={[{ required: true, message: '请输入手机号！' }]}
            >
              <Input.Group compact>
                <Input
                  prefix={<PhoneOutlined />}
                  style={{ width: '70%' }}
                  placeholder="请输入手机号"
                />
                <Button 
                  type="link" 
                  style={{ width: '30%' }} 
                  onClick={handleSendCode}
                  disabled={countdown > 0}
                >
                  {countdown > 0 ? `${countdown}s后重发` : '获取验证码'}
                </Button>
              </Input.Group>
            </Form.Item>
            
            <Form.Item
              name="verificationCode"
              label="验证码"
              rules={[{ required: true, message: '请输入验证码！' }]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
            
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码！' }, { min: 6, message: '密码长度至少6位！' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
            </Form.Item>
            
            <Form.Item
              name="verification"
              label="认证方式"
              rules={[{ required: true, message: '请选择认证方式！' }]}
            >
              <Radio.Group>
                <Radio value="unverified">游客模式（无需实名认证）</Radio>
                <Radio value="verified">创作者模式（需实名认证）</Radio>
              </Radio.Group>
            </Form.Item>
            
            <Form.Item
              name="idCard"
              label="身份证号"
              rules={[{ required: ({ getFieldValue }) => getFieldValue('verification') === 'verified', message: '请输入身份证号！' }]}
            >
              <Input prefix={<IdcardOutlined />} placeholder="请输入身份证号" />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button" loading={loading} block>
                注册
              </Button>
              已有账号？ <a href="/login">立即登录</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Register
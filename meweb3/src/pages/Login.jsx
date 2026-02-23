import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Card, message, Row, Col } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const onFinish = async (values) => {
    setLoading(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 登录成功，模拟用户数据
      const userData = {
        id: '1',
        username: values.username,
        email: values.username,
        role: 'creator',
        isVerified: true,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + values.username
      }
      
      login(userData)
      message.success('登录成功')
      navigate('/dashboard')
    } catch (error) {
      message.error('登录失败，请检查用户名和密码')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card title="用户登录" className="login-card">
          <Form
            name="login"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名或邮箱！' }]}
            >
              <Input prefix={<UserOutlined />} placeholder="用户名或邮箱" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="密码" />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>
              <a href="#" className="login-form-forgot">忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading} block>
                登录
              </Button>
              还没有账号？ <a href="/register">立即注册</a>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Login
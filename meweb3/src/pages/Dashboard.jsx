import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic, Progress, Table, Badge, Tag, message } from 'antd'
import { DollarOutlined, FileTextOutlined, CopyrightOutlined, ShieldOutlined, StarOutlined, TrendingUpOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { Meta } = Card

const Dashboard = () => {
  const [userData, setUserData] = useState(null)
  const [recentWorks, setRecentWorks] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  // 检查用户是否已认证
  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate('/login')
    }
  }, [isAuthenticated, user, navigate])

  // 模拟获取用户数据
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟用户数据
        const mockUserData = {
          totalWorks: 45,
          totalEarnings: 8950.50,
          totalLikes: 1250,
          totalViews: 32000,
          todayEarnings: 120.50,
          weekEarnings: 850.00,
          monthEarnings: 3200.00,
          pendingEarnings: 1250.00,
          availableEarnings: 7700.50,
          copyrightCerts: 38,
          维权Cases: 5,
          successRate: 80
        }
        
        // 模拟最近作品
        const mockRecentWorks = [
          {
            id: '1',
            title: 'AI创作的未来趋势',
            views: 1200,
            likes: 89,
            earnings: 320.50,
            hasCopyright: true,
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            title: '版权保护的重要性',
            views: 850,
            likes: 67,
            earnings: 210.00,
            hasCopyright: true,
            createdAt: '2024-01-10T09:00:00Z'
          },
          {
            id: '3',
            title: '如何通过原创内容变现',
            views: 1500,
            likes: 120,
            earnings: 450.75,
            hasCopyright: true,
            createdAt: '2024-01-05T14:00:00Z'
          }
        ]
        
        setUserData(mockUserData)
        setRecentWorks(mockRecentWorks)
      } catch (error) {
        message.error('获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user) {
      fetchUserData()
    }
  }, [isAuthenticated, user])

  const handleCreateContent = () => {
    navigate('/create')
  }

  const handleViewContent = (contentId) => {
    navigate(`/content/${contentId}`)
  }

  const handleViewMonetization = () => {
    navigate('/monetization')
  }

  const handleViewCopyrightProtection = () => {
    navigate('/copyright-protection')
  }

  if (loading) {
    return <div>加载中...</div>
  }

  if (!userData) {
    return <div>暂无数据</div>
  }

  return (
    <div className="dashboard-page">
      {/* 欢迎卡片 */}
      <Card className="welcome-card">
        <h1>欢迎回来，{user?.username || '创作者'}</h1>
        <p>这里是您的创作仪表盘，实时掌握创作数据和收益情况</p>
        <div style={{ marginTop: 16 }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Card>
                <Statistic
                  title="总收益"
                  value={userData.totalEarnings}
                  prefix={<DollarOutlined />}
                  suffix="元"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card>
                <Statistic
                  title="总作品数"
                  value={userData.totalWorks}
                  prefix={<FileTextOutlined />}
                />
              </Card>
            </Col>
          </Row>
        </div>
      </Card>

      {/* 数据概览 */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="创作数据">
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Statistic title="总浏览" value={userData.totalViews} prefix={<StarOutlined />} />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic title="总点赞" value={userData.totalLikes} prefix={<StarOutlined />} />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic title="版权存证" value={userData.copyrightCerts} prefix={<CopyrightOutlined />} />
              </Col>
            </Row>
            <div style={{ marginTop: 16 }}>
              <Progress percent={Math.min((userData.totalWorks / 100) * 100, 100)} status="active" />
              <div style={{ marginTop: 8, textAlign: 'right' }}>目标：100 篇作品</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="收益概览">
            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Statistic title="今日" value={userData.todayEarnings} prefix={<DollarOutlined />} suffix="元" />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic title="本周" value={userData.weekEarnings} prefix={<DollarOutlined />} suffix="元" />
              </Col>
              <Col xs={24} sm={8}>
                <Statistic title="本月" value={userData.monthEarnings} prefix={<DollarOutlined />} suffix="元" />
              </Col>
            </Row>
            <div style={{ marginTop: 16 }}>
              <Progress percent={Math.min((userData.totalEarnings / 10000) * 100, 100)} status="active" />
              <div style={{ marginTop: 8, textAlign: 'right' }}>目标：10000 元收益</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 快速操作 */}
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col xs={24} sm={8}>
          <Card hoverable onClick={handleCreateContent}>
            <Meta
              avatar={<FileTextOutlined style={{ fontSize: 32, color: '#1890ff' }} />}
              title="开始创作"
              description="使用AI工具创作新内容"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable onClick={handleViewMonetization}>
            <Meta
              avatar={<DollarOutlined style={{ fontSize: 32, color: '#52c41a' }} />}
              title="收益管理"
              description="查看收益明细和提现"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card hoverable onClick={handleViewCopyrightProtection}>
            <Meta
              avatar={<ShieldOutlined style={{ fontSize: 32, color: '#faad14' }} />}
              title="版权保护"
              description="监测侵权和维权管理"
            />
          </Card>
        </Col>
      </Row>

      {/* 最近作品 */}
      <Card title="最近作品" style={{ marginTop: 16 }}>
        <Table
          dataSource={recentWorks}
          rowKey="id"
          columns={[
            {
              title: '作品标题',
              dataIndex: 'title',
              key: 'title',
              render: (title, record) => (
                <a href="#" onClick={() => handleViewContent(record.id)}>{title}</a>
              )
            },
            {
              title: '浏览量',
              dataIndex: 'views',
              key: 'views'
            },
            {
              title: '点赞数',
              dataIndex: 'likes',
              key: 'likes',
              render: (likes) => <Badge count={likes} showZero />
            },
            {
              title: '收益',
              dataIndex: 'earnings',
              key: 'earnings',
              render: (earnings) => `¥${earnings}`
            },
            {
              title: '版权状态',
              dataIndex: 'hasCopyright',
              key: 'hasCopyright',
              render: (hasCopyright) => (
                hasCopyright ? <Tag color="green">已确权</Tag> : <Tag color="red">未确权</Tag>
              )
            },
            {
              title: '创建时间',
              dataIndex: 'createdAt',
              key: 'createdAt',
              render: (time) => new Date(time).toLocaleDateString('zh-CN')
            }
          ]}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* 收益趋势 */}
      <Card title="收益趋势" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="今日收益"
                value={userData.todayEarnings}
                prefix={<DollarOutlined />}
                suffix="元"
                valueStyle={{ color: '#52c41a' }}
              />
              <div style={{ marginTop: 8 }}>
                <TrendingUpOutlined /> 较昨日 +15%
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="本周收益"
                value={userData.weekEarnings}
                prefix={<DollarOutlined />}
                suffix="元"
                valueStyle={{ color: '#52c41a' }}
              />
              <div style={{ marginTop: 8 }}>
                <TrendingUpOutlined /> 较上周 +20%
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title="本月收益"
                value={userData.monthEarnings}
                prefix={<DollarOutlined />}
                suffix="元"
                valueStyle={{ color: '#52c41a' }}
              />
              <div style={{ marginTop: 8 }}>
                <TrendingUpOutlined /> 较上月 +25%
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Dashboard
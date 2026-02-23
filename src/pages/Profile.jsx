import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Avatar, Button, Tabs, List, Statistic, Row, Col, Progress, Badge, Tag, message } from 'antd'
import { EditOutlined, DollarOutlined, CopyrightOutlined, ShieldOutlined, StarOutlined, MoreOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { TabPane } = Tabs
const { Meta } = Card

const Profile = () => {
  const { userId } = useParams()
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('works')
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  // 模拟获取用户信息
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟用户数据
        const mockUserInfo = {
          id: userId || '1',
          username: '原创者小明',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=小明',
          bio: '专注于AI创作和版权保护的创作者',
          followers: 1250,
          following: 320,
          worksCount: 45,
          totalEarnings: 8950.50,
          copyrightCertCount: 38,
          reputationScore: 95,
          works: [
            {
              id: '1',
              title: 'AI创作的未来趋势',
              description: '探讨AI如何改变创作行业的未来',
              cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work1',
              views: 1200,
              likes: 89,
              comments: 23,
              earnings: 320.50,
              hasCopyright: true
            },
            {
              id: '2',
              title: '版权保护的重要性',
              description: '详解创作者如何保护自己的知识产权',
              cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work2',
              views: 850,
              likes: 67,
              comments: 15,
              earnings: 210.00,
              hasCopyright: true
            },
            {
              id: '3',
              title: '如何通过原创内容变现',
              description: '创作者变现的实用指南',
              cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work3',
              views: 1500,
              likes: 120,
              comments: 35,
              earnings: 450.75,
              hasCopyright: true
            }
          ],
          earnings: {
            today: 120.50,
            week: 850.00,
            month: 3200.00,
            total: 8950.50
          },
          copyrightCerts: [
            {
              id: 'cert1',
              contentId: '1',
              contentTitle: 'AI创作的未来趋势',
              issueDate: '2024-01-15',
              status: 'valid'
            },
            {
              id: 'cert2',
              contentId: '2',
              contentTitle: '版权保护的重要性',
              issueDate: '2024-01-10',
              status: 'valid'
            }
          ],
          copyrightCases: [
            {
              id: 'case1',
              contentId: '1',
              contentTitle: 'AI创作的未来趋势',
              status: 'resolved',
              progress: 100,
              compensation: 500.00
            },
            {
              id: 'case2',
              contentId: '3',
              contentTitle: '如何通过原创内容变现',
              status: 'processing',
              progress: 60,
              compensation: 0
            }
          ]
        }
        
        setUserInfo(mockUserInfo)
      } catch (error) {
        message.error('获取用户信息失败')
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [userId])

  if (loading) {
    return <div>加载中...</div>
  }

  if (!userInfo) {
    return <div>用户不存在</div>
  }

  const isCurrentUser = isAuthenticated && user && user.id === userInfo.id

  const handleEditProfile = () => {
    // 编辑个人资料逻辑
    message.info('编辑个人资料功能开发中')
  }

  const handleViewCopyrightCert = (contentId) => {
    navigate(`/copyright/${contentId}`)
  }

  const handleViewCopyrightCase = (caseId) => {
    navigate('/copyright-protection')
  }

  return (
    <div className="profile-page">
      {/* 用户信息卡片 */}
      <Card className="profile-header-card">
        <Row gutter={24}>
          <Col xs={24} sm={8} md={6}>
            <Avatar size={128} src={userInfo.avatar} />
          </Col>
          <Col xs={24} sm={16} md={18}>
            <Row gutter={16}>
              <Col xs={24} sm={16}>
                <h1>{userInfo.username}</h1>
                <p>{userInfo.bio}</p>
                {isCurrentUser && (
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    onClick={handleEditProfile}
                  >
                    编辑资料
                  </Button>
                )}
              </Col>
              <Col xs={24} sm={8}>
                <Row gutter={8}>
                  <Col span={8}>
                    <Statistic value={userInfo.followers} title="粉丝" />
                  </Col>
                  <Col span={8}>
                    <Statistic value={userInfo.following} title="关注" />
                  </Col>
                  <Col span={8}>
                    <Statistic value={userInfo.worksCount} title="作品" />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* 数据概览卡片 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic 
              title="总收益" 
              value={userInfo.totalEarnings} 
              precision={2} 
              prefix={<DollarOutlined />} 
              suffix="元"
            />
            <div style={{ marginTop: 16 }}>
              <Progress percent={75} status="active" />
              <div style={{ marginTop: 8, textAlign: 'right' }}>本月目标: ¥5000</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic 
              title="版权存证" 
              value={userInfo.copyrightCertCount} 
              prefix={<CopyrightOutlined />} 
            />
            <div style={{ marginTop: 16 }}>
              <Tag color="green">司法认可</Tag>
              <Tag color="blue">链上存证</Tag>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic 
              title="声誉评分" 
              value={userInfo.reputationScore} 
              prefix={<StarOutlined />} 
              suffix="分"
            />
            <div style={{ marginTop: 16 }}>
              <Progress percent={userInfo.reputationScore} status="success" />
              <div style={{ marginTop: 8, textAlign: 'right' }}>优秀创作者</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 标签页内容 */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        {/* 作品墙 */}
        <TabPane tab="作品" key="works">
          <Row gutter={16}>
            {userInfo.works.map((work, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={work.id}>
                <Card
                  hoverable
                  cover={<img alt={work.title} src={work.cover} style={{ height: 180, objectFit: 'cover' }} />}
                  actions={[
                    <Badge count={work.likes} key="like" showZero>
                      <StarOutlined />
                    </Badge>,
                    work.hasCopyright && (
                      <CopyrightOutlined 
                        key="copyright" 
                        onClick={() => handleViewCopyrightCert(work.id)}
                        style={{ color: '#1890ff', cursor: 'pointer' }}
                      />
                    ),
                    <MoreOutlined key="more" />
                  ]}
                >
                  <Meta title={work.title} description={work.description} />
                  <div style={{ marginTop: 8 }}>
                    <Tag color="blue">{work.views} 浏览</Tag>
                    <Tag color="green" icon={<DollarOutlined />}>{work.earnings} 元</Tag>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </TabPane>

        {/* 收益看板 */}
        <TabPane tab="收益" key="earnings">
          <Card>
            <Row gutter={16}>
              <Col xs={24} sm={12} md={6}>
                <Statistic value={userInfo.earnings.today} title="今日收益" prefix={<DollarOutlined />} suffix="元" />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic value={userInfo.earnings.week} title="本周收益" prefix={<DollarOutlined />} suffix="元" />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic value={userInfo.earnings.month} title="本月收益" prefix={<DollarOutlined />} suffix="元" />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Statistic value={userInfo.earnings.total} title="总收益" prefix={<DollarOutlined />} suffix="元" />
              </Col>
            </Row>
            <div style={{ marginTop: 24 }}>
              <h3>收益来源分析</h3>
              {/* 收益来源图表 */}
              <div className="earnings-chart">
                <div className="chart-item">
                  <div className="chart-label">版权授权</div>
                  <div className="chart-bar-container">
                    <div className="chart-bar" style={{ width: '45%' }}>45%</div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-label">内容打赏</div>
                  <div className="chart-bar-container">
                    <div className="chart-bar" style={{ width: '25%' }}>25%</div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-label">付费内容</div>
                  <div className="chart-bar-container">
                    <div className="chart-bar" style={{ width: '20%' }}>20%</div>
                  </div>
                </div>
                <div className="chart-item">
                  <div className="chart-label">品牌合作</div>
                  <div className="chart-bar-container">
                    <div className="chart-bar" style={{ width: '10%' }}>10%</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabPane>

        {/* 版权存证 */}
        <TabPane tab="版权存证" key="copyright">
          <List
            dataSource={userInfo.copyrightCerts}
            renderItem={(cert) => (
              <List.Item>
                <List.Item.Meta
                  title={cert.contentTitle}
                  description={`颁发日期: ${cert.issueDate}`}
                />
                <div>
                  <Tag color={cert.status === 'valid' ? 'green' : 'red'}>
                    {cert.status === 'valid' ? '有效' : '无效'}
                  </Tag>
                  <Button 
                    type="link" 
                    icon={<CopyrightOutlined />} 
                    onClick={() => handleViewCopyrightCert(cert.contentId)}
                  >
                    查看证书
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </TabPane>

        {/* 维权进度 */}
        <TabPane tab="维权进度" key="copyright-protection">
          <List
            dataSource={userInfo.copyrightCases}
            renderItem={(caseItem) => (
              <List.Item>
                <List.Item.Meta
                  title={caseItem.contentTitle}
                  description={`状态: ${caseItem.status === 'resolved' ? '已解决' : '处理中'}`}
                />
                <div>
                  <Progress percent={caseItem.progress} size="small" />
                  {caseItem.compensation > 0 && (
                    <Tag color="green" icon={<DollarOutlined />}>
                      赔偿: ¥{caseItem.compensation}
                    </Tag>
                  )}
                  <Button 
                    type="link" 
                    icon={<ShieldOutlined />} 
                    onClick={() => handleViewCopyrightCase(caseItem.id)}
                  >
                    查看详情
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Profile
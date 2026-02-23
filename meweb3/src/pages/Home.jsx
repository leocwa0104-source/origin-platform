import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Button, Input, Tag, Badge, List, Avatar, message } from 'antd'
import { SearchOutlined, FileTextOutlined, PictureOutlined, StarOutlined, CopyrightOutlined, ShieldOutlined, DollarOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { Meta } = Card

const Home = () => {
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  // 模拟获取作品列表
  useEffect(() => {
    const fetchWorks = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟作品数据
        const mockWorks = [
          {
            id: '1',
            title: 'AI创作的未来趋势',
            description: '探讨AI如何改变创作行业的未来',
            type: 'article',
            cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work1',
            creator: '原创者小明',
            creatorId: '1',
            views: 1200,
            likes: 89,
            comments: 23,
            hasCopyright: true,
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            title: '版权保护的重要性',
            description: '详解创作者如何保护自己的知识产权',
            type: 'article',
            cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work2',
            creator: '创作者小红',
            creatorId: '2',
            views: 850,
            likes: 67,
            comments: 15,
            hasCopyright: true,
            createdAt: '2024-01-14T09:00:00Z'
          },
          {
            id: '3',
            title: '如何通过原创内容变现',
            description: '创作者变现的实用指南',
            type: 'article',
            cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work3',
            creator: '原创者小明',
            creatorId: '1',
            views: 1500,
            likes: 120,
            comments: 35,
            hasCopyright: true,
            createdAt: '2024-01-13T14:00:00Z'
          },
          {
            id: '4',
            title: 'AI原创作图技巧',
            description: '掌握AI创作工具，提升创作效率',
            type: 'article',
            cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work4',
            creator: '创作者小李',
            creatorId: '3',
            views: 950,
            likes: 78,
            comments: 28,
            hasCopyright: true,
            createdAt: '2024-01-12T11:00:00Z'
          }
        ]
        
        setWorks(mockWorks)
      } catch (error) {
        message.error('获取作品列表失败')
      } finally {
        setLoading(false)
      }
    }

    fetchWorks()
  }, [])

  const handleSearch = () => {
    // 搜索逻辑
    message.info(`搜索内容: ${searchText}`)
  }

  const handleCreateContent = () => {
    if (isAuthenticated) {
      navigate('/create')
    } else {
      navigate('/login')
    }
  }

  const handleViewContent = (contentId) => {
    navigate(`/content/${contentId}`)
  }

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  return (
    <div className="home-page">
      {/* 搜索栏 */}
      <div className="search-bar">
        <Row gutter={16}>
          <Col xs={24} md={18}>
            <Input
              placeholder="搜索作品、创作者..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              suffix={<Button icon={<SearchOutlined />} onClick={handleSearch} />}
              size="large"
            />
          </Col>
          <Col xs={24} md={6}>
            <Button type="primary" size="large" block onClick={handleCreateContent}>
              开始创作
            </Button>
          </Col>
        </Row>
      </div>

      {/* 平台介绍 */}
      <Card className="platform-intro-card" style={{ marginTop: 16 }}>
        <Row gutter={24}>
          <Col xs={24} md={16}>
            <h1>Origin原创者平台</h1>
            <h2>AI驱动的中小创作者版权确权社交平台</h2>
            <p>核心解决原创者「确权难、维权难、变现难」三大痛点</p>
            <div className="platform-features">
              <Row gutter={16} style={{ marginTop: 16 }}>
                <Col xs={24} sm={8}>
                  <Card>
                    <Meta
                      avatar={<Avatar icon={<CopyrightOutlined />} />}
                      title="AI创作+发文即确权"
                      description="创作全流程自动记录，发文瞬间自动生成内容唯一哈希+可信时间戳，同步上链"
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card>
                    <Meta
                      avatar={<Avatar icon={<ShieldOutlined />} />}
                      title="侵权监测+维权全流程"
                      description="平台内巡检+全网监测，自动固定侵权证据并上链，生成完整维权报告"
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card>
                    <Meta
                      avatar={<Avatar icon={<DollarOutlined />} />}
                      title="创作者全链路变现"
                      description="版权授权、内容打赏、付费内容、品牌合作等多种变现方式"
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <h3>平台优势</h3>
              <List
                dataSource={[
                  'AI驱动的创作工具',
                  '区块链版权存证',
                  '全流程维权服务',
                  '多元化变现渠道',
                  '边界化DAO治理',
                  '合规安全可靠'
                ]}
                renderItem={item => (
                  <List.Item>
                    <Badge status="success" text={item} />
                  </List.Item>
                )}
              />
              <Button type="primary" block style={{ marginTop: 16 }}>
                了解更多
              </Button>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 热门作品 */}
      <Card title="热门作品" className="hot-works-card" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          {works.map((work, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={work.id}>
              <Card
                hoverable
                cover={<img alt={work.title} src={work.cover} style={{ height: 180, objectFit: 'cover' }} />
                }
                actions={[
                  <span key="views">{work.views} 浏览</span>,
                  <Badge count={work.likes} key="likes" showZero>
                    <StarOutlined />
                  </Badge>,
                  work.hasCopyright && (
                    <CopyrightOutlined 
                      key="copyright" 
                      style={{ color: '#1890ff', cursor: 'pointer' }}
                    />
                  )
                ]}
                onClick={() => handleViewContent(work.id)}
              >
                <Meta
                  title={work.title}
                  description={work.description}
                  avatar={<Avatar onClick={() => handleViewProfile(work.creatorId)}>{work.creator[0]}</Avatar>}
                />
                <div style={{ marginTop: 8 }}>
                  <Tag color="blue">{work.type === 'article' ? '文章' : '其他'}</Tag>
                  <span style={{ float: 'right', fontSize: 12, color: '#999' }}>
                    {new Date(work.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* 创作者推荐 */}
      <Card title="优秀创作者" className="recommended-creators-card" style={{ marginTop: 16 }}>
        <Row gutter={16}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable>
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=小明" />}
                title="原创者小明"
                description="专注于AI创作和版权保护的创作者"
              />
              <div style={{ marginTop: 16 }}>
                <Button type="link" onClick={() => handleViewProfile('1')}>
                  查看主页
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable>
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=小红" />}
                title="创作者小红"
                description="擅长内容创作和品牌合作"
              />
              <div style={{ marginTop: 16 }}>
                <Button type="link" onClick={() => handleViewProfile('2')}>
                  查看主页
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable>
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=小李" />}
                title="创作者小李"
                description="专注于AI原创作图技巧分享"
              />
              <div style={{ marginTop: 16 }}>
                <Button type="link" onClick={() => handleViewProfile('3')}>
                  查看主页
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card hoverable>
              <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=小张" />}
                title="创作者小张"
                description="内容变现专家"
              />
              <div style={{ marginTop: 16 }}>
                <Button type="link">查看主页</Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default Home
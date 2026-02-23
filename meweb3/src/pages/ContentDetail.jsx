import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Avatar, Button, Tag, Badge, List, Comment, Input, message, Spin } from 'antd'
import { StarOutlined, CopyrightOutlined, ShareOutlined, GiftOutlined, DollarOutlined, UserOutlined, MessageOutlined, EyeOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { TextArea } = Input

const ContentDetail = () => {
  const { contentId } = useParams()
  const [content, setContent] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  // 模拟获取内容详情
  useEffect(() => {
    const fetchContentDetail = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟内容数据
        const mockContent = {
          id: contentId,
          title: 'AI创作的未来趋势',
          content: `# AI创作的未来趋势\n\nAI创作正在改变我们的创作方式和行业格局。从文案生成到原创作图，AI工具正在为创作者提供前所未有的便利。\n\n## 一、AI创作的优势\n\n1. **提高效率**：AI可以在短时间内生成大量内容，大大提高创作效率。\n2. **激发灵感**：AI可以根据提示词生成创意内容，为创作者提供灵感。\n3. **降低成本**：减少人工创作的时间和成本。\n\n## 二、AI创作的挑战\n\n1. **版权问题**：AI生成内容的版权归属问题需要明确。\n2. **内容质量**：AI生成的内容可能缺乏人类的情感和深度。\n3. **伦理问题**：AI创作可能涉及抄袭和滥用的问题。\n\n## 三、未来展望\n\nAI创作将成为创作者的得力助手，而不是替代品。创作者需要学会与AI协作，发挥各自的优势，创造出更加优质的内容。\n\n通过Origin原创者平台，创作者可以获得专业的版权保护服务，确保自己的AI创作成果得到应有的尊重和回报。`,
          cover: 'https://api.dicebear.com/7.x/avataaars/svg?seed=work1',
          creator: '原创者小明',
          creatorId: '1',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=小明',
          views: 1200,
          likes: 89,
          comments: 23,
          earnings: 320.50,
          hasCopyright: true,
          copyrightCert: 'cert-1',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T11:00:00Z',
          tags: ['AI创作', '版权保护', '未来趋势']
        }
        
        // 模拟评论数据
        const mockComments = [
          {
            id: '1',
            userId: '2',
            username: '创作者小红',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=小红',
            content: '非常有见解的文章，学习了！',
            likes: 15,
            createdAt: '2024-01-15T12:00:00Z'
          },
          {
            id: '2',
            userId: '3',
            username: '创作者小李',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=小李',
            content: 'AI创作确实是未来的趋势，期待更多相关内容。',
            likes: 8,
            createdAt: '2024-01-15T13:00:00Z'
          }
        ]
        
        setContent(mockContent)
        setComments(mockComments)
      } catch (error) {
        message.error('获取内容详情失败')
      } finally {
        setLoading(false)
      }
    }

    fetchContentDetail()
  }, [contentId])

  const handleLike = () => {
    // 点赞逻辑
    message.info('点赞功能开发中')
  }

  const handleShare = () => {
    // 分享逻辑
    message.info('分享功能开发中')
  }

  const handleReward = () => {
    // 打赏逻辑
    message.info('打赏功能开发中')
  }

  const handleBuyCopyright = () => {
    // 购买版权逻辑
    message.info('版权购买功能开发中')
  }

  const handleViewCopyrightCert = () => {
    navigate(`/copyright/${contentId}`)
  }

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`)
  }

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      message.error('请先登录再评论')
      return
    }
    
    if (!comment.trim()) {
      message.error('请输入评论内容')
      return
    }

    // 模拟提交评论
    const newComment = {
      id: `comment${Date.now()}`,
      userId: user.id,
      username: user.username,
      avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      content: comment,
      likes: 0,
      createdAt: new Date().toISOString()
    }

    setComments([...comments, newComment])
    setComment('')
    message.success('评论成功')
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" tip="加载内容中..." />
      </div>
    )
  }

  if (!content) {
    return <div>内容不存在</div>
  }

  return (
    <div className="content-detail-page">
      {/* 内容卡片 */}
      <Card className="content-card">
        <Row gutter={24}>
          <Col xs={24} lg={18}>
            <h1>{content.title}</h1>
            <div className="content-meta">
              <Avatar 
                src={content.avatar} 
                onClick={() => handleViewProfile(content.creatorId)}
                style={{ cursor: 'pointer' }}
              />
              <span onClick={() => handleViewProfile(content.creatorId)} style={{ cursor: 'pointer', marginLeft: 8 }}>
                {content.creator}
              </span>
              <span style={{ marginLeft: 16 }}>
                <EyeOutlined /> {content.views} 浏览
              </span>
              <span style={{ marginLeft: 16 }}>
                <MessageOutlined /> {content.comments} 评论
              </span>
              <span style={{ marginLeft: 16 }}>
                {new Date(content.createdAt).toLocaleDateString('zh-CN')}
              </span>
            </div>
            <div className="content-tags" style={{ marginTop: 16 }}>
              {content.tags.map((tag, index) => (
                <Tag key={index} color="blue">{tag}</Tag>
              ))}
            </div>
            <div className="content-body" style={{ marginTop: 24, lineHeight: 1.8 }}>
              {content.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index}>{paragraph.substring(2)}</h1>
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={index}>{paragraph.substring(3)}</h2>
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={index}>{paragraph.substring(4)}</h3>
                } else if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                  return <p key={index} style={{ marginLeft: 24 }}>{paragraph}</p>
                } else {
                  return <p key={index}>{paragraph}</p>
                }
              })}
            </div>
          </Col>
          <Col xs={24} lg={6}>
            <Card className="content-sidebar">
              <div className="creator-info">
                <Avatar size={64} src={content.avatar} />
                <h3>{content.creator}</h3>
                <Button type="primary" block style={{ marginTop: 16 }}>
                  关注
                </Button>
              </div>
              
              <div className="content-stats" style={{ marginTop: 24 }}>
                <Row gutter={16}>
                  <Col span={8}>
                    <div className="stat-item">
                      <Badge count={content.likes} showZero />
                      <p>点赞</p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="stat-item">
                      <Badge count={content.comments} showZero />
                      <p>评论</p>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="stat-item">
                      <Badge count={content.views} showZero />
                      <p>浏览</p>
                    </div>
                  </Col>
                </Row>
              </div>
              
              <div className="content-actions" style={{ marginTop: 24 }}>
                <Button 
                  icon={<StarOutlined />} 
                  onClick={handleLike}
                  block
                  style={{ marginBottom: 8 }}
                >
                  点赞
                </Button>
                <Button 
                  icon={<ShareOutlined />} 
                  onClick={handleShare}
                  block
                  style={{ marginBottom: 8 }}
                >
                  分享
                </Button>
                <Button 
                  icon={<GiftOutlined />} 
                  onClick={handleReward}
                  block
                  style={{ marginBottom: 8 }}
                >
                  打赏
                </Button>
                <Button 
                  icon={<DollarOutlined />} 
                  onClick={handleBuyCopyright}
                  type="primary"
                  block
                  style={{ marginBottom: 8 }}
                >
                  购买版权
                </Button>
                {content.hasCopyright && (
                  <Button 
                    icon={<CopyrightOutlined />} 
                    onClick={handleViewCopyrightCert}
                    block
                  >
                    查看版权证书
                  </Button>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* 评论区 */}
      <Card title="评论区" className="comments-card" style={{ marginTop: 24 }}>
        <div className="comment-input">
          <Row gutter={16}>
            <Col xs={24} md={20}>
              <TextArea
                placeholder={isAuthenticated ? '写下你的评论...' : '请登录后再评论'}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                disabled={!isAuthenticated}
              />
            </Col>
            <Col xs={24} md={4}>
              <Button 
                type="primary" 
                block 
                onClick={handleSubmitComment}
                disabled={!isAuthenticated || !comment.trim()}
              >
                提交评论
              </Button>
            </Col>
          </Row>
        </div>

        <List
          className="comments-list"
          header={`${content.comments} 条评论`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(commentItem) => (
            <Comment
              author={
                <a href="#" onClick={() => handleViewProfile(commentItem.userId)}>
                  {commentItem.username}
                </a>
              }
              avatar={<Avatar src={commentItem.avatar} />}
              content={<p>{commentItem.content}</p>}
              datetime={new Date(commentItem.createdAt).toLocaleString('zh-CN')}
            />
          )}
        />
      </Card>
    </div>
  )
}

export default ContentDetail
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Row, Col, Descriptions, Divider, message, QRCode, Spin } from 'antd'
import { CopyrightOutlined, DownloadOutlined, ShareOutlined, CheckCircleOutlined, ClockCircleOutlined, LinkOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const CopyrightCert = () => {
  const { contentId } = useParams()
  const [certInfo, setCertInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  // 模拟获取版权证书信息
  useEffect(() => {
    const fetchCertInfo = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // 模拟证书数据
        const mockCertInfo = {
          id: `cert-${contentId}`,
          contentId: contentId,
          contentTitle: 'AI创作的未来趋势',
          creator: '原创者小明',
          creatorId: '1',
          creationDate: '2024-01-15T10:30:00Z',
          certificationDate: '2024-01-15T10:35:00Z',
          hash: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0',
          timestamp: '1705295700',
          blockchain: '蚂蚁链',
          blockchainTx: 'tx1234567890abcdef',
          status: 'valid',
          expirationDate: '2044-01-15T10:35:00Z'
        }
        
        setCertInfo(mockCertInfo)
      } catch (error) {
        message.error('获取版权证书失败')
      } finally {
        setLoading(false)
      }
    }

    fetchCertInfo()
  }, [contentId])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 0' }}>
        <Spin size="large" tip="加载版权证书中..." />
      </div>
    )
  }

  if (!certInfo) {
    return <div>版权证书不存在</div>
  }

  const isCreator = isAuthenticated && user && user.id === certInfo.creatorId

  const handleDownloadCert = () => {
    // 下载证书逻辑
    message.info('证书下载功能开发中')
  }

  const handleShareCert = () => {
    // 分享证书逻辑
    message.info('证书分享功能开发中')
  }

  const handleViewContent = () => {
    navigate(`/content/${certInfo.contentId}`)
  }

  return (
    <div className="copyright-cert-page">
      <Card title="版权存证证书" className="copyright-cert-card">
        <div className="cert-header">
          <Row justify="center" style={{ marginBottom: 32 }}>
            <Col span={24}>
              <div style={{ textAlign: 'center' }}>
                <CopyrightOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
                <h1>Origin原创者平台</h1>
                <h2>版权存证证书</h2>
              </div>
            </Col>
          </Row>
        </div>

        <Divider />

        <Descriptions column={1} bordered>
          <Descriptions.Item label="证书编号">{certInfo.id}</Descriptions.Item>
          <Descriptions.Item label="作品标题">{certInfo.contentTitle}</Descriptions.Item>
          <Descriptions.Item label="创作者">{certInfo.creator}</Descriptions.Item>
          <Descriptions.Item label="创作时间">
            {new Date(certInfo.creationDate).toLocaleString('zh-CN')}
          </Descriptions.Item>
          <Descriptions.Item label="存证时间">
            {new Date(certInfo.certificationDate).toLocaleString('zh-CN')}
          </Descriptions.Item>
          <Descriptions.Item label="存证哈希">
            <code>{certInfo.hash}</code>
          </Descriptions.Item>
          <Descriptions.Item label="时间戳">
            {certInfo.timestamp} ({new Date(parseInt(certInfo.timestamp) * 1000).toLocaleString('zh-CN')})
          </Descriptions.Item>
          <Descriptions.Item label="区块链">
            {certInfo.blockchain}
          </Descriptions.Item>
          <Descriptions.Item label="区块链交易哈希">
            <code>{certInfo.blockchainTx}</code>
          </Descriptions.Item>
          <Descriptions.Item label="证书状态">
            <span style={{ color: certInfo.status === 'valid' ? '#52c41a' : '#ff4d4f' }}>
              {certInfo.status === 'valid' ? '有效' : '无效'}
            </span>
          </Descriptions.Item>
          <Descriptions.Item label="有效期至">
            {new Date(certInfo.expirationDate).toLocaleString('zh-CN')}
          </Descriptions.Item>
        </Descriptions>

        <Divider />

        <Row gutter={24} style={{ marginTop: 32 }}>
          <Col xs={24} md={12}>
            <div className="cert-qr-code">
              <h3>验证二维码</h3>
              <QRCode 
                value={`https://origin-platform.com/copyright/${certInfo.contentId}`} 
                size={200} 
                level="H"
              />
              <p style={{ marginTop: 16, textAlign: 'center' }}>扫描二维码验证证书真伪</p>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="cert-actions">
              <h3>证书操作</h3>
              <Button 
                type="primary" 
                icon={<DownloadOutlined />} 
                onClick={handleDownloadCert}
                style={{ width: '100%', marginBottom: 16 }}
              >
                下载证书
              </Button>
              <Button 
                icon={<ShareOutlined />} 
                onClick={handleShareCert}
                style={{ width: '100%', marginBottom: 16 }}
              >
                分享证书
              </Button>
              <Button 
                icon={<CheckCircleOutlined />} 
                onClick={handleViewContent}
                style={{ width: '100%' }}
              >
                查看作品
              </Button>
            </div>
          </Col>
        </Row>

        <Divider />

        <div className="cert-footer">
          <Row justify="space-between">
            <Col>
              <p>本证书由Origin原创者平台颁发</p>
              <p>基于区块链技术的可信时间戳存证</p>
            </Col>
            <Col>
              <p>证书生成时间：{new Date(certInfo.certificationDate).toLocaleString('zh-CN')}</p>
              <p>© {new Date().getFullYear()} Origin原创者平台</p>
            </Col>
          </Row>
        </div>
      </Card>

      <Card title="存证详情" className="copyright-details-card" style={{ marginTop: 24 }}>
        <Descriptions column={2}>
          <Descriptions.Item label="存证类型">版权存证</Descriptions.Item>
          <Descriptions.Item label="存证平台">Origin原创者平台</Descriptions.Item>
          <Descriptions.Item label="区块链网络">{certInfo.blockchain}</Descriptions.Item>
          <Descriptions.Item label="交易状态">
            <span style={{ color: '#52c41a' }}>已确认</span>
          </Descriptions.Item>
          <Descriptions.Item label="存证成本">免费</Descriptions.Item>
          <Descriptions.Item label="法律效力">司法认可</Descriptions.Item>
        </Descriptions>

        <div style={{ marginTop: 24 }}>
          <h3>存证流程</h3>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col xs={24} sm={8}>
              <Card hoverable>
                <div style={{ textAlign: 'center' }}>
                  <ClockCircleOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                  <h4>创作完成</h4>
                  <p>{new Date(certInfo.creationDate).toLocaleString('zh-CN')}</p>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card hoverable>
                <div style={{ textAlign: 'center' }}>
                  <CheckCircleOutlined style={{ fontSize: 32, color: '#52c41a', marginBottom: 8 }} />
                  <h4>哈希生成</h4>
                  <p>内容唯一哈希</p>
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card hoverable>
                <div style={{ textAlign: 'center' }}>
                  <LinkOutlined style={{ fontSize: 32, color: '#722ed1', marginBottom: 8 }} />
                  <h4>上链存证</h4>
                  <p>{certInfo.blockchain}存证完成</p>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  )
}

export default CopyrightCert
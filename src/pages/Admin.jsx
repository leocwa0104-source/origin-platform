import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Table, message, Row, Col, Spin, Tag, Descriptions, Statistic, Progress } from 'antd'
import { DashboardOutlined, ShieldOutlined, DollarOutlined, UserOutlined, FileTextOutlined, AlertOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { TabPane } = Tabs

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [loading, setLoading] = useState(false)
  const [platformData, setPlatformData] = useState(null)
  const [pendingReviews, setPendingReviews] = useState([])
  const [revenueDetails, setRevenueDetails] = useState([])
  const { user, isAuthenticated } = useAuth()

  // 检查用户是否已认证且为创始人
  useEffect(() => {
    if (!isAuthenticated || !user || user.role !== 'admin') {
      // 可以重定向到首页，或者显示提示
      message.error('无权限访问此页面')
    }
  }, [isAuthenticated, user])

  // 模拟获取平台数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟平台数据
        const mockPlatformData = {
          totalUsers: 12500,
          activeCreators: 3200,
          totalWorks: 45000,
          totalRevenue: 256000.50,
          platformRevenue: 12800.03,
          todayRevenue: 8500.00,
          weekRevenue: 45000.00,
          monthRevenue: 180000.00,
          topCreators: [
            { id: '1', name: '原创者小明', revenue: 45000.00, works: 120 },
            { id: '2', name: '创作者小红', revenue: 32000.00, works: 95 },
            { id: '3', name: '创作者小李', revenue: 28000.00, works: 85 },
            { id: '4', name: '创作者小张', revenue: 22000.00, works: 75 },
            { id: '5', name: '创作者小王', revenue: 18000.00, works: 65 }
          ]
        }
        
        // 模拟待审核内容
        const mockPendingReviews = [
          { id: '1', title: 'AI创作的未来趋势', type: 'article', creator: '原创者小明', riskLevel: 'medium', submittedAt: '2024-01-16T10:30:00Z' },
          { id: '2', title: '数字藏品的价值', type: 'article', creator: '创作者小红', riskLevel: 'high', submittedAt: '2024-01-16T09:00:00Z' },
          { id: '3', title: '版权保护的重要性', type: 'article', creator: '创作者小李', riskLevel: 'low', submittedAt: '2024-01-16T08:30:00Z' }
        ]
        
        // 模拟收益明细
        const mockRevenueDetails = [
          { id: '1', type: '版权授权', amount: 12500.00, platformFee: 625.00, creatorId: '1', creatorName: '原创者小明', createdAt: '2024-01-16T10:30:00Z' },
          { id: '2', type: '内容打赏', amount: 8500.00, platformFee: 425.00, creatorId: '2', creatorName: '创作者小红', createdAt: '2024-01-16T09:00:00Z' },
          { id: '3', type: '付费内容', amount: 6200.00, platformFee: 310.00, creatorId: '3', creatorName: '创作者小李', createdAt: '2024-01-16T08:30:00Z' },
          { id: '4', type: '品牌合作', amount: 12000.00, platformFee: 1200.00, creatorId: '1', creatorName: '原创者小明', createdAt: '2024-01-16T08:00:00Z' },
          { id: '5', type: 'AI会员费', amount: 2990.00, platformFee: 2093.00, creatorId: null, creatorName: '平台公共资金池', createdAt: '2024-01-16T07:30:00Z' }
        ]
        
        setPlatformData(mockPlatformData)
        setPendingReviews(mockPendingReviews)
        setRevenueDetails(mockRevenueDetails)
      } catch (error) {
        message.error('获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 审核内容
  const handleReviewContent = async (contentId, action) => {
    try {
      setLoading(true)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 更新审核状态
      const updatedReviews = pendingReviews.filter(review => review.id !== contentId)
      setPendingReviews(updatedReviews)
      message.success(`内容已${action === 'approve' ? '通过' : '拒绝'}`)
    } catch (error) {
      message.error('审核失败')
    } finally {
      setLoading(false)
    }
  }

  // 风险等级渲染
  const renderRiskLevel = (level) => {
    switch (level) {
      case 'low':
        return <Tag color="green">低风险</Tag>;
      case 'medium':
        return <Tag color="orange">中风险</Tag>;
      case 'high':
        return <Tag color="red">高风险</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  }

  return (
    <div className="admin-page">
      <Card title="创始人专属后台" className="admin-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* 数据看板 */}
          <TabPane tab={<><DashboardOutlined /> 数据看板</>} key="dashboard">
            {loading ? (
              <Spin size="large" tip="加载中..." />
            ) : platformData ? (
              <>
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={8}>
                    <Card>
                      <Statistic title="总用户数" value={platformData.totalUsers} prefix={<UserOutlined />} />
                      <Statistic title="活跃创作者" value={platformData.activeCreators} />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card>
                      <Statistic title="总作品数" value={platformData.totalWorks} prefix={<FileTextOutlined />} />
                      <Progress percent={65} status="active" style={{ marginTop: 16 }} />
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={8}>
                    <Card>
                      <Statistic title="平台收益" value={platformData.platformRevenue} prefix={<DollarOutlined />} suffix="元" />
                      <Statistic title="总收益" value={platformData.totalRevenue} suffix="元" />
                    </Card>
                  </Col>
                </Row>

                <Row gutter={16} style={{ marginTop: 16 }}>
                  <Col xs={24} md={12}>
                    <Card title="收益趋势">
                      <Row gutter={16}>
                        <Col xs={24} sm={8}>
                          <div className="revenue-trend-item">
                            <h4>今日</h4>
                            <p className="revenue-amount">¥{platformData.todayRevenue}</p>
                          </div>
                        </Col>
                        <Col xs={24} sm={8}>
                          <div className="revenue-trend-item">
                            <h4>本周</h4>
                            <p className="revenue-amount">¥{platformData.weekRevenue}</p>
                          </div>
                        </Col>
                        <Col xs={24} sm={8}>
                          <div className="revenue-trend-item">
                            <h4>本月</h4>
                            <p className="revenue-amount">¥{platformData.monthRevenue}</p>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card title=" top 5 创作者">
                      <Table
                        dataSource={platformData.topCreators}
                        rowKey="id"
                        columns={[
                          {
                            title: '排名',
                            render: (_, __, index) => index + 1
                          },
                          {
                            title: '创作者',
                            dataIndex: 'name'
                          },
                          {
                            title: '收益',
                            dataIndex: 'revenue',
                            render: (revenue) => `¥${revenue}`
                          },
                          {
                            title: '作品数',
                            dataIndex: 'works'
                          }
                        ]}
                        pagination={false}
                      />
                    </Card>
                  </Col>
                </Row>
              </>
            ) : (
              <div>暂无数据</div>
            )}
          </TabPane>

          {/* 合规审核 */}
          <TabPane tab={<><ShieldOutlined /> 合规审核</>} key="compliance">
            <Card title="待审核内容" className="pending-reviews-card">
              <Table
                dataSource={pendingReviews}
                rowKey="id"
                columns={[
                  {
                    title: '内容标题',
                    dataIndex: 'title'
                  },
                  {
                    title: '类型',
                    dataIndex: 'type'
                  },
                  {
                    title: '创作者',
                    dataIndex: 'creator'
                  },
                  {
                    title: '风险等级',
                    dataIndex: 'riskLevel',
                    render: (level) => renderRiskLevel(level)
                  },
                  {
                    title: '提交时间',
                    dataIndex: 'submittedAt',
                    render: (time) => new Date(time).toLocaleString('zh-CN')
                  },
                  {
                    title: '操作',
                    render: (_, record) => (
                      <>
                        <Button 
                          type="primary" 
                          size="small" 
                          icon={<CheckCircleOutlined />}
                          onClick={() => handleReviewContent(record.id, 'approve')}
                          loading={loading}
                          style={{ marginRight: 8 }}
                        >
                          通过
                        </Button>
                        <Button 
                          danger 
                          size="small" 
                          icon={<AlertOutlined />}
                          onClick={() => handleReviewContent(record.id, 'reject')}
                          loading={loading}
                        >
                          拒绝
                        </Button>
                      </>
                    )
                  }
                ]}
                pagination={{ pageSize: 10 }}
                loading={loading}
              />
            </Card>
          </TabPane>

          {/* 收益明细 */}
          <TabPane tab={<><DollarOutlined /> 收益明细</>} key="revenue">
            <Card title="收益明细" className="revenue-details-card">
              <Table
                dataSource={revenueDetails}
                rowKey="id"
                columns={[
                  {
                    title: '类型',
                    dataIndex: 'type'
                  },
                  {
                    title: '金额',
                    dataIndex: 'amount',
                    render: (amount) => `¥${amount}`
                  },
                  {
                    title: '平台收益',
                    dataIndex: 'platformFee',
                    render: (fee) => `¥${fee}`
                  },
                  {
                    title: '创作者',
                    dataIndex: 'creatorName'
                  },
                  {
                    title: '时间',
                    dataIndex: 'createdAt',
                    render: (time) => new Date(time).toLocaleString('zh-CN')
                  }
                ]}
                pagination={{ pageSize: 10 }}
                loading={loading}
              />
            </Card>

            <Card title="收益汇总" className="revenue-summary-card" style={{ marginTop: 16 }}>
              {platformData && (
                <Descriptions column={2} bordered>
                  <Descriptions.Item label="平台总收益">¥{platformData.platformRevenue}</Descriptions.Item>
                  <Descriptions.Item label="今日收益">¥{platformData.todayRevenue}</Descriptions.Item>
                  <Descriptions.Item label="本周收益">¥{platformData.weekRevenue}</Descriptions.Item>
                  <Descriptions.Item label="本月收益">¥{platformData.monthRevenue}</Descriptions.Item>
                </Descriptions>
              )}
            </Card>
          </TabPane>

          {/* 系统设置 */}
          <TabPane tab={<><FileTextOutlined /> 系统设置</>} key="settings">
            <Card className="system-settings-card">
              <h3>系统设置</h3>
              <div className="settings-content">
                <p>1. <strong>平台设置</strong>：平台名称、Logo、域名等基础设置</p>
                <p>2. <strong>支付设置</strong>：微信/支付宝支付配置</p>
                <p>3. <strong>AI模型设置</strong>：豆包/通义千问API配置</p>
                <p>4. <strong>区块链设置</strong>：蚂蚁链/百度超级链配置</p>
                <p>5. <strong>DAO设置</strong>：投票规则、权重计算等</p>
              </div>
              
              <Button type="primary" block style={{ marginTop: 16 }}>
                进入系统设置
              </Button>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  )
}

export default Admin
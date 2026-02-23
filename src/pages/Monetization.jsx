import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Form, Input, Table, message, Row, Col, Spin, Select, Descriptions, Tag, Modal, Divider } from 'antd'
import { DollarOutlined, CreditCardOutlined, ShoppingOutlined, GiftOutlined, TrophyOutlined, UsersOutlined, SettingsOutlined, FileTextOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { TabPane } = Tabs
const { Option } = Select

const Monetization = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [earnings, setEarnings] = useState(null)
  const [paymentMethods, setPaymentMethods] = useState([])
  const [withdrawalRequests, setWithdrawalRequests] = useState([])
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null)
  const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false)
  const { user, isAuthenticated } = useAuth()

  // 检查用户是否已认证
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // 可以重定向到登录页，或者显示提示
    }
  }, [isAuthenticated, user])

  // 模拟获取收益数据和支付方式
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟收益数据
        const mockEarnings = {
          total: 8950.50,
          pending: 1250.00,
          available: 7700.50,
          today: 120.50,
          week: 850.00,
          month: 3200.00,
          breakdown: [
            { type: '版权授权', amount: 4027.73, percentage: 45 },
            { type: '内容打赏', amount: 2237.63, percentage: 25 },
            { type: '付费内容', amount: 1790.10, percentage: 20 },
            { type: '品牌合作', amount: 895.05, percentage: 10 }
          ]
        }
        
        // 模拟支付方式
        const mockPaymentMethods = [
          {
            id: 'pm1',
            type: 'wechat',
            name: '微信支付',
            status: 'active',
            account: 'wxid_1234567890'
          },
          {
            id: 'pm2',
            type: 'alipay',
            name: '支付宝',
            status: 'active',
            account: 'user@example.com'
          }
        ]
        
        // 模拟提现记录
        const mockWithdrawalRequests = [
          {
            id: 'wd1',
            amount: 2000.00,
            status: 'completed',
            method: 'wechat',
            createdAt: '2024-01-15T10:30:00Z',
            completedAt: '2024-01-15T11:30:00Z'
          },
          {
            id: 'wd2',
            amount: 1500.00,
            status: 'processing',
            method: 'alipay',
            createdAt: '2024-01-18T09:00:00Z'
          }
        ]
        
        setEarnings(mockEarnings)
        setPaymentMethods(mockPaymentMethods)
        setWithdrawalRequests(mockWithdrawalRequests)
      } catch (error) {
        message.error('获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 申请提现
  const handleWithdraw = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 模拟创建提现申请
      const newWithdrawal = {
        id: `wd${Date.now()}`,
        amount: values.amount,
        status: 'processing',
        method: values.paymentMethod,
        createdAt: new Date().toISOString()
      }
      
      setWithdrawalRequests([...withdrawalRequests, newWithdrawal])
      message.success('提现申请已提交')
      form.resetFields()
      setWithdrawalModalVisible(false)
    } catch (error) {
      message.error('提交提现申请失败')
    } finally {
      setLoading(false)
    }
  }

  // 查看提现详情
  const handleViewWithdrawalDetail = (withdrawal) => {
    setSelectedWithdrawal(withdrawal)
    setWithdrawalModalVisible(true)
  }

  // 分账规则状态渲染
  const renderRevenueSplit = (type, amount) => {
    let platformPercentage = 0
    let creatorPercentage = 0
    let platformFee = 0

    switch (type) {
      case '版权授权':
      case '内容打赏':
      case '付费内容':
      case '服务店铺':
        platformPercentage = 5
        creatorPercentage = 95
        platformFee = amount * 0.05
        break
      case '品牌合作':
        platformPercentage = 10
        creatorPercentage = 90
        platformFee = amount * 0.1
        break
      case '付费社群':
      case '会员订阅':
        platformPercentage = 0
        creatorPercentage = 100
        platformFee = 1 // 1元/笔基础服务费
        break
      case 'AI会员费':
        platformPercentage = 70
        creatorPercentage = 0
        platformFee = amount * 0.7
        break
      case '数字藏品':
        platformPercentage = 5
        creatorPercentage = 95
        platformFee = amount * 0.05
        break
      default:
        platformPercentage = 5
        creatorPercentage = 95
        platformFee = amount * 0.05
    }

    return (
      <div className="revenue-split">
        <p><strong>平台:</strong> {platformPercentage}% ({platformFee.toFixed(2)}元)</p>
        <p><strong>创作者:</strong> {creatorPercentage}% ({(amount - platformFee).toFixed(2)}元)</p>
      </div>
    )
  }

  // 提现状态渲染
  const renderWithdrawalStatus = (status) => {
    switch (status) {
      case 'pending':
        return <Tag color="blue">待处理</Tag>;
      case 'processing':
        return <Tag color="processing">处理中</Tag>;
      case 'completed':
        return <Tag color="green">已完成</Tag>;
      case 'rejected':
        return <Tag color="red">已驳回</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  }

  return (
    <div className="monetization-page">
      <Card title="创作者变现中心" className="monetization-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* 收益概览 */}
          <TabPane tab={<><DollarOutlined /> 收益概览</>} key="overview">
            {loading ? (
              <Spin size="large" tip="加载中..." />
            ) : earnings ? (
              <>
                <Row gutter={16}>
                  <Col xs={24} sm={12} md={8}>
                    <Card>
                      <Descriptions column={1}>
                        <Descriptions.Item label="总收益">
                          <span style={{ fontSize: 24, fontWeight: 'bold' }}>¥{earnings.total}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="待结算">¥{earnings.pending}</Descriptions.Item>
                        <Descriptions.Item label="可提现">¥{earnings.available}</Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Col>
                  <Col xs={24} sm={12} md={16}>
                    <Card title="收益趋势">
                      <Row gutter={16}>
                        <Col xs={24} sm={8}>
                          <div className="earning-trend-item">
                            <h4>今日</h4>
                            <p className="earning-amount">¥{earnings.today}</p>
                          </div>
                        </Col>
                        <Col xs={24} sm={8}>
                          <div className="earning-trend-item">
                            <h4>本周</h4>
                            <p className="earning-amount">¥{earnings.week}</p>
                          </div>
                        </Col>
                        <Col xs={24} sm={8}>
                          <div className="earning-trend-item">
                            <h4>本月</h4>
                            <p className="earning-amount">¥{earnings.month}</p>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                </Row>

                <Card title="收益来源分析" style={{ marginTop: 16 }}>
                  <Table
                    dataSource={earnings.breakdown}
                    rowKey="type"
                    columns={[
                      {
                        title: '收益类型',
                        dataIndex: 'type',
                        key: 'type'
                      },
                      {
                        title: '金额',
                        dataIndex: 'amount',
                        key: 'amount',
                        render: (amount) => `¥${amount}`
                      },
                      {
                        title: '占比',
                        dataIndex: 'percentage',
                        key: 'percentage',
                        render: (percentage) => `${percentage}%`
                      },
                      {
                        title: '分账明细',
                        key: 'split',
                        render: (_, record) => renderRevenueSplit(record.type, record.amount)
                      }
                    ]}
                  />
                </Card>

                <Button 
                  type="primary" 
                  icon={<CreditCardOutlined />} 
                  onClick={() => setActiveTab('withdrawal')}
                  style={{ marginTop: 16 }}
                >
                  申请提现
                </Button>
              </>
            ) : (
              <div>暂无收益数据</div>
            )}
          </TabPane>

          {/* 提现管理 */}
          <TabPane tab={<><CreditCardOutlined /> 提现管理</>} key="withdrawal">
            <Card title="申请提现" className="withdrawal-application-card">
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="amount"
                      label="提现金额"
                      rules={[{ required: true, message: '请输入提现金额！' }, { type: 'number', message: '请输入数字！' }, { min: 100, message: '最低提现金额100元！' }]}
                    >
                      <Input type="number" placeholder="请输入提现金额" addonBefore="¥" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="paymentMethod"
                      label="提现方式"
                      rules={[{ required: true, message: '请选择提现方式！' }]}
                    >
                      <Select placeholder="请选择提现方式">
                        <Option value="wechat">微信支付</Option>
                        <Option value="alipay">支付宝</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                
                <Button 
                  type="primary" 
                  icon={<DollarOutlined />} 
                  onClick={handleWithdraw}
                  loading={loading}
                  block
                >
                  提交提现申请
                </Button>
              </Form>
            </Card>

            <Card title="提现记录" className="withdrawal-history-card" style={{ marginTop: 24 }}>
              <Table
                dataSource={withdrawalRequests}
                rowKey="id"
                columns={[
                  {
                    title: '提现ID',
                    dataIndex: 'id',
                    key: 'id'
                  },
                  {
                    title: '金额',
                    dataIndex: 'amount',
                    key: 'amount',
                    render: (amount) => `¥${amount}`
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => renderWithdrawalStatus(status)
                  },
                  {
                    title: '提现方式',
                    dataIndex: 'method',
                    key: 'method',
                    render: (method) => method === 'wechat' ? '微信支付' : '支付宝'
                  },
                  {
                    title: '创建时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: (time) => new Date(time).toLocaleString('zh-CN')
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, record) => (
                      <Button 
                        type="link" 
                        icon={<FileTextOutlined />} 
                        onClick={() => handleViewWithdrawalDetail(record)}
                      >
                        查看详情
                      </Button>
                    )
                  }
                ]}
                pagination={{ pageSize: 10 }}
                loading={loading}
              />
            </Card>
          </TabPane>

          {/* 变现渠道 */}
          <TabPane tab={<><ShoppingOutlined /> 变现渠道</>} key="channels">
            <Row gutter={16}>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="monetization-channel-card">
                  <div className="channel-icon">
                    <DollarOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                  </div>
                  <h3>版权授权</h3>
                  <p>将您的原创作品授权给他人使用，获得收益</p>
                  <p className="channel-split">分账比例：创作者 95% / 平台 5%</p>
                  <Button type="primary" block>开启</Button>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="monetization-channel-card">
                  <div className="channel-icon">
                    <GiftOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                  </div>
                  <h3>内容打赏</h3>
                  <p>接收粉丝和读者的打赏，支持您的创作</p>
                  <p className="channel-split">分账比例：创作者 95% / 平台 5%</p>
                  <Button type="primary" block>开启</Button>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="monetization-channel-card">
                  <div className="channel-icon">
                    <TrophyOutlined style={{ fontSize: 32, color: '#faad14' }} />
                  </div>
                  <h3>付费内容</h3>
                  <p>创建高质量的付费内容，获得订阅收益</p>
                  <p className="channel-split">分账比例：创作者 95% / 平台 5%</p>
                  <Button type="primary" block>开启</Button>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="monetization-channel-card">
                  <div className="channel-icon">
                    <UsersOutlined style={{ fontSize: 32, color: '#722ed1' }} />
                  </div>
                  <h3>付费社群</h3>
                  <p>创建付费社群，与粉丝深度互动</p>
                  <p className="channel-split">分账比例：创作者 100% / 平台 1元/笔</p>
                  <Button type="primary" block>开启</Button>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="monetization-channel-card">
                  <div className="channel-icon">
                    <ShoppingOutlined style={{ fontSize: 32, color: '#13c2c2' }} />
                  </div>
                  <h3>服务店铺</h3>
                  <p>开设个人服务店铺，提供专业服务</p>
                  <p className="channel-split">分账比例：创作者 95% / 平台 5%</p>
                  <Button type="primary" block>开启</Button>
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card hoverable className="monetization-channel-card">
                  <div className="channel-icon">
                    <GiftOutlined style={{ fontSize: 32, color: '#eb2f96' }} />
                  </div>
                  <h3>数字藏品</h3>
                  <p>创建和销售数字藏品，获得收益</p>
                  <p className="channel-split">分账比例：创作者 95% / 平台 5%</p>
                  <Button type="primary" block>开启</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* 分账规则 */}
          <TabPane tab={<><SettingsOutlined /> 分账规则</>} key="rules">
            <Card className="revenue-split-rules-card">
              <h3>平台分账规则</h3>
              <div className="revenue-split-rules-content">
                <p>1. <strong>版权授权/内容打赏/付费内容/服务店铺</strong>：95% 归创作者，5% 归平台</p>
                <p>2. <strong>品牌商单智能撮合</strong>：90% 归创作者，10% 归平台</p>
                <p>3. <strong>付费社群/会员订阅</strong>：100% 归创作者，平台仅收 1 元/笔基础服务费</p>
                <p>4. <strong>AI会员费</strong>：29元/月、299元/年，70% 归平台，30% 入平台公共资金池</p>
                <p>5. <strong>合规数字藏品</strong>：首发收益 100% 归创作者，平台收 5% 服务费，永久转售版税由创作者自主设置</p>
              </div>

              <Divider />

              <h3>支付与结算说明</h3>
              <div className="payment-settlement-content">
                <p>1. <strong>资金安全</strong>：所有资金走微信/支付宝官方直连分账，不经过平台任何中转账户，彻底规避二清风险</p>
                <p>2. <strong>结算周期</strong>：平台采用 T+7 结算周期，确保资金安全</p>
                <p>3. <strong>提现门槛</strong>：最低提现金额为 100 元，无最高限额</p>
                <p>4. <strong>提现方式</strong>：支持微信支付和支付宝两种提现方式</p>
                <p>5. <strong>手续费</strong>：平台不收取提现手续费，由支付渠道收取</p>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      {/* 提现详情模态框 */}
      <Modal
        title="提现详情"
        open={withdrawalModalVisible}
        onCancel={() => setWithdrawalModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setWithdrawalModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {selectedWithdrawal && (
          <div className="withdrawal-detail">
            <Descriptions column={1}>
              <Descriptions.Item label="提现ID">{selectedWithdrawal.id}</Descriptions.Item>
              <Descriptions.Item label="提现金额">¥{selectedWithdrawal.amount}</Descriptions.Item>
              <Descriptions.Item label="提现方式">{selectedWithdrawal.method === 'wechat' ? '微信支付' : '支付宝'}</Descriptions.Item>
              <Descriptions.Item label="状态">{renderWithdrawalStatus(selectedWithdrawal.status)}</Descriptions.Item>
              <Descriptions.Item label="创建时间">{new Date(selectedWithdrawal.createdAt).toLocaleString('zh-CN')}</Descriptions.Item>
              {selectedWithdrawal.completedAt && (
                <Descriptions.Item label="完成时间">{new Date(selectedWithdrawal.completedAt).toLocaleString('zh-CN')}</Descriptions.Item>
              )}
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Monetization
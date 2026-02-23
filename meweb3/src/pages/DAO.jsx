import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Form, Input, Table, message, Row, Col, Spin, Select, Radio, Tag, Progress, Modal, Descriptions } from 'antd'
import { TeamOutlined, FileTextOutlined, VoteOutlined, SettingOutlined, CheckCircleOutlined, AlertOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select

const DAO = () => {
  const [activeTab, setActiveTab] = useState('proposals')
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const [proposals, setProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [proposalModalVisible, setProposalModalVisible] = useState(false)
  const [userVotes, setUserVotes] = useState({})
  const { user, isAuthenticated } = useAuth()

  // 检查用户是否已认证
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // 可以重定向到登录页，或者显示提示
    }
  }, [isAuthenticated, user])

  // 模拟获取提案数据
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟提案数据
        const mockProposals = [
          {
            id: 'prop1',
            title: '调整创作激励规则',
            description: '提高原创内容的激励比例，鼓励优质创作',
            type: 'incentive',
            status: 'active',
            creator: '原创者小明',
            creatorId: '1',
            createdAt: '2024-01-15T10:30:00Z',
            endAt: '2024-01-22T10:30:00Z',
            votes: {
              yes: 1250,
              no: 320,
              total: 1570
            },
            progress: 75
          },
          {
            id: 'prop2',
            title: '优化内容推荐算法',
            description: '改进推荐算法，提高优质内容的曝光率',
            type: 'feature',
            status: 'active',
            creator: '创作者小红',
            creatorId: '2',
            createdAt: '2024-01-16T09:00:00Z',
            endAt: '2024-01-23T09:00:00Z',
            votes: {
              yes: 980,
              no: 450,
              total: 1430
            },
            progress: 65
          },
          {
            id: 'prop3',
            title: '公共资金池使用计划',
            description: '使用公共资金池支持创作者培训计划',
            type: 'funding',
            status: 'completed',
            creator: '原创者小明',
            creatorId: '1',
            createdAt: '2024-01-10T14:00:00Z',
            endAt: '2024-01-17T14:00:00Z',
            votes: {
              yes: 1850,
              no: 150,
              total: 2000
            },
            progress: 100,
            result: 'approved'
          }
        ]
        
        // 模拟用户投票
        const mockUserVotes = {
          prop1: 'yes',
          prop3: 'yes'
        }
        
        setProposals(mockProposals)
        setUserVotes(mockUserVotes)
      } catch (error) {
        message.error('获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 创建提案
  const handleCreateProposal = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 模拟创建提案
      const newProposal = {
        id: `prop${Date.now()}`,
        title: values.title,
        description: values.description,
        type: values.type,
        status: 'active',
        creator: user.username,
        creatorId: user.id,
        createdAt: new Date().toISOString(),
        endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        votes: {
          yes: 0,
          no: 0,
          total: 0
        },
        progress: 0
      }
      
      setProposals([...proposals, newProposal])
      message.success('提案已创建')
      form.resetFields()
      setProposalModalVisible(false)
    } catch (error) {
      message.error('创建提案失败')
    } finally {
      setLoading(false)
    }
  }

  // 投票
  const handleVote = async (proposalId, vote) => {
    try {
      setLoading(true)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 更新提案投票
      const updatedProposals = proposals.map(proposal => {
        if (proposal.id === proposalId) {
          const updatedVotes = {
            ...proposal.votes,
            [vote]: proposal.votes[vote] + 1,
            total: proposal.votes.total + 1
          }
          return {
            ...proposal,
            votes: updatedVotes
          }
        }
        return proposal
      })
      
      setProposals(updatedProposals)
      setUserVotes({ ...userVotes, [proposalId]: vote })
      message.success('投票成功')
    } catch (error) {
      message.error('投票失败')
    } finally {
      setLoading(false)
    }
  }

  // 查看提案详情
  const handleViewProposalDetail = (proposal) => {
    setSelectedProposal(proposal)
    setProposalModalVisible(true)
  }

  // 提案状态渲染
  const renderProposalStatus = (status) => {
    switch (status) {
      case 'active':
        return <Tag color="blue">进行中</Tag>;
      case 'completed':
        return <Tag color="green">已完成</Tag>;
      case 'rejected':
        return <Tag color="red">已拒绝</Tag>;
      case 'pending':
        return <Tag color="processing">待审核</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  }

  // 提案类型渲染
  const renderProposalType = (type) => {
    switch (type) {
      case 'incentive':
        return <Tag color="gold">创作激励</Tag>;
      case 'feature':
        return <Tag color="blue">功能迭代</Tag>;
      case 'recommendation':
        return <Tag color="green">推荐权重</Tag>;
      case 'funding':
        return <Tag color="purple">资金使用</Tag>;
      default:
        return <Tag color="default">其他</Tag>;
    }
  }

  return (
    <div className="dao-page">
      <Card title="DAO治理中心" className="dao-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* 提案列表 */}
          <TabPane tab={<><FileTextOutlined /> 提案列表</>} key="proposals">
            <Button 
              type="primary" 
              icon={<FileTextOutlined />} 
              onClick={() => setProposalModalVisible(true)}
              style={{ marginBottom: 16 }}
              block
            >
              创建提案
            </Button>

            <Card title="当前提案" className="active-proposals-card">
              <Table
                dataSource={proposals.filter(p => p.status === 'active')}
                rowKey="id"
                columns={[
                  {
                    title: '提案标题',
                    dataIndex: 'title',
                    key: 'title'
                  },
                  {
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (type) => renderProposalType(type)
                  },
                  {
                    title: '创建者',
                    dataIndex: 'creator',
                    key: 'creator'
                  },
                  {
                    title: '开始时间',
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: (time) => new Date(time).toLocaleString('zh-CN')
                  },
                  {
                    title: '结束时间',
                    dataIndex: 'endAt',
                    key: 'endAt',
                    render: (time) => new Date(time).toLocaleString('zh-CN')
                  },
                  {
                    title: '投票进度',
                    dataIndex: 'votes',
                    key: 'votes',
                    render: (votes) => (
                      <Progress 
                        percent={votes.total > 0 ? Math.min((votes.yes / votes.total) * 100, 100) : 0} 
                        status="active" 
                      />
                    )
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, record) => (
                      <>
                        <Button 
                          type="link" 
                          icon={<FileTextOutlined />} 
                          onClick={() => handleViewProposalDetail(record)}
                        >
                          查看详情
                        </Button>
                        {!userVotes[record.id] && (
                          <>
                            <Button 
                              type="primary" 
                              size="small" 
                              onClick={() => handleVote(record.id, 'yes')}
                              loading={loading}
                              style={{ marginLeft: 8 }}
                            >
                              赞成
                            </Button>
                            <Button 
                              danger 
                              size="small" 
                              onClick={() => handleVote(record.id, 'no')}
                              loading={loading}
                              style={{ marginLeft: 8 }}
                            >
                              反对
                            </Button>
                          </>
                        )}
                        {userVotes[record.id] && (
                          <Tag color={userVotes[record.id] === 'yes' ? 'green' : 'red'}>
                            {userVotes[record.id] === 'yes' ? '已赞成' : '已反对'}
                          </Tag>
                        )}
                      </>
                    )
                  }
                ]}
                pagination={{ pageSize: 10 }}
                loading={loading}
              />
            </Card>

            <Card title="历史提案" className="completed-proposals-card" style={{ marginTop: 16 }}>
              <Table
                dataSource={proposals.filter(p => p.status === 'completed')}
                rowKey="id"
                columns={[
                  {
                    title: '提案标题',
                    dataIndex: 'title',
                    key: 'title'
                  },
                  {
                    title: '类型',
                    dataIndex: 'type',
                    key: 'type',
                    render: (type) => renderProposalType(type)
                  },
                  {
                    title: '创建者',
                    dataIndex: 'creator',
                    key: 'creator'
                  },
                  {
                    title: '结果',
                    dataIndex: 'result',
                    key: 'result',
                    render: (result) => (
                      <Tag color={result === 'approved' ? 'green' : 'red'}>
                        {result === 'approved' ? '通过' : '拒绝'}
                      </Tag>
                    )
                  },
                  {
                    title: '赞成票',
                    dataIndex: 'votes',
                    key: 'votes.yes',
                    render: (votes) => votes.yes
                  },
                  {
                    title: '反对票',
                    dataIndex: 'votes',
                    key: 'votes.no',
                    render: (votes) => votes.no
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, record) => (
                      <Button 
                        type="link" 
                        icon={<FileTextOutlined />} 
                        onClick={() => handleViewProposalDetail(record)}
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

          {/* 治理规则 */}
          <TabPane tab={<><SettingOutlined /> 治理规则</>} key="rules">
            <Card className="governance-rules-card">
              <h3>边界化DAO治理规则</h3>
              <div className="governance-rules-content">
                <h4><AlertOutlined /> 永久不可投票修改内容</h4>
                <ul>
                  <li>5% 基础服务费比例</li>
                  <li>创始人收益规则</li>
                  <li>平台合规审核规则</li>
                  <li>平台主体控制权</li>
                </ul>

                <h4><CheckCircleOutlined /> 可投票内容</h4>
                <ul>
                  <li>创作激励规则</li>
                  <li>非核心功能迭代</li>
                  <li>优质内容推荐权重</li>
                  <li>公共资金池使用</li>
                </ul>

                <h4><VoteOutlined /> 投票规则</h4>
                <ul>
                  <li>仅实名+有确权作品的创作者可参与</li>
                  <li>用平台积分投票</li>
                  <li>单用户最高投票权重不超过 5%</li>
                  <li>对接 Snapshot 零门槛投票</li>
                </ul>

                <h4><AlertOutlined /> 创始人特权</h4>
                <ul>
                  <li>对合规相关、平台生死线决策拥有一票否决权</li>
                </ul>
              </div>
            </Card>
          </TabPane>

          {/* 投票权重 */}
          <TabPane tab={<><TeamOutlined /> 投票权重</>} key="voting-power">
            <Card className="voting-power-card">
              <Descriptions column={1} bordered>
                <Descriptions.Item label="用户">{user?.username || '未登录'}</Descriptions.Item>
                <Descriptions.Item label="平台积分">1250</Descriptions.Item>
                <Descriptions.Item label="投票权重">4.2%</Descriptions.Item>
                <Descriptions.Item label="最大权重限制">5%</Descriptions.Item>
              </Descriptions>

              <div style={{ marginTop: 24 }}>
                <h4>投票权重计算规则</h4>
                <ul>
                  <li>基础权重：1 积分 = 0.01% 权重</li>
                  <li>创作加成：每发布 10 篇确权作品，权重 + 0.5%</li>
                  <li>平台贡献：每获得 100 个赞，权重 + 0.1%</li>
                  <li>最大限制：单个用户权重不超过 5%</li>
                </ul>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      {/* 提案详情模态框 */}
      <Modal
        title={selectedProposal ? "提案详情" : "创建提案"}
        open={proposalModalVisible}
        onCancel={() => setProposalModalVisible(false)}
        footer={selectedProposal ? [
          <Button key="close" onClick={() => setProposalModalVisible(false)}>
            关闭
          </Button>
        ] : [
          <Button key="cancel" onClick={() => setProposalModalVisible(false)}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreateProposal} loading={loading}>
            提交
          </Button>
        ]}
        width={800}
      >
        {selectedProposal ? (
          <div className="proposal-detail">
            <Descriptions column={1}>
              <Descriptions.Item label="提案标题">{selectedProposal.title}</Descriptions.Item>
              <Descriptions.Item label="提案类型">{renderProposalType(selectedProposal.type)}</Descriptions.Item>
              <Descriptions.Item label="创建者">{selectedProposal.creator}</Descriptions.Item>
              <Descriptions.Item label="描述">{selectedProposal.description}</Descriptions.Item>
              <Descriptions.Item label="开始时间">{new Date(selectedProposal.createdAt).toLocaleString('zh-CN')}</Descriptions.Item>
              <Descriptions.Item label="结束时间">{new Date(selectedProposal.endAt).toLocaleString('zh-CN')}</Descriptions.Item>
              <Descriptions.Item label="状态">{renderProposalStatus(selectedProposal.status)}</Descriptions.Item>
              <Descriptions.Item label="投票结果">
                <div>
                  <p>赞成：{selectedProposal.votes.yes} ({(selectedProposal.votes.total > 0 ? (selectedProposal.votes.yes / selectedProposal.votes.total * 100).toFixed(2) : 0)}%)</p>
                  <p>反对：{selectedProposal.votes.no} ({(selectedProposal.votes.total > 0 ? (selectedProposal.votes.no / selectedProposal.votes.total * 100).toFixed(2) : 0)}%)</p>
                  <Progress percent={selectedProposal.votes.total > 0 ? (selectedProposal.votes.yes / selectedProposal.votes.total * 100) : 0} status="active" />
                </div>
              </Descriptions.Item>
              {selectedProposal.result && (
                <Descriptions.Item label="最终结果">
                  <Tag color={selectedProposal.result === 'approved' ? 'green' : 'red'}>
                    {selectedProposal.result === 'approved' ? '通过' : '拒绝'}
                  </Tag>
                </Descriptions.Item>
              )}
            </Descriptions>
          </div>
        ) : (
          <Form form={form} layout="vertical">
            <Form.Item
              name="title"
              label="提案标题"
              rules={[{ required: true, message: '请输入提案标题！' }]}
            >
              <Input placeholder="请输入提案标题" />
            </Form.Item>
            
            <Form.Item
              name="type"
              label="提案类型"
              rules={[{ required: true, message: '请选择提案类型！' }]}
            >
              <Select placeholder="请选择提案类型">
                <Option value="incentive">创作激励</Option>
                <Option value="feature">功能迭代</Option>
                <Option value="recommendation">推荐权重</Option>
                <Option value="funding">资金使用</Option>
              </Select>
            </Form.Item>
            
            <Form.Item
              name="description"
              label="提案描述"
              rules={[{ required: true, message: '请输入提案描述！' }]}
            >
              <TextArea rows={6} placeholder="请详细描述提案内容" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  )
}

export default DAO
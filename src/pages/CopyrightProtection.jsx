import React, { useState, useEffect } from 'react'
import { Card, Tabs, Button, Form, Input, Table, message, Row, Col, Spin, Select, Progress, Badge, Tag, Modal, Divider } from 'antd'
import { ShieldOutlined, SearchOutlined, AlertOutlined, FileTextOutlined, UserOutlined, ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { TabPane } = Tabs
const { Option } = Select

const CopyrightProtection = () => {
  const [activeTab, setActiveTab] = useState('monitoring')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [form] = Form.useForm()
  const [monitoringTasks, setMonitoringTasks] = useState([])
  const [copyrightCases, setCopyrightCases] = useState([])
  const [selectedCopyrightCase, setSelectedCopyrightCase] = useState(null)
  const [copyrightCaseModalVisible, setCopyrightCaseModalVisible] = useState(false)
  const { user, isAuthenticated } = useAuth()

  // 检查用户是否已认证
  useEffect(() => {
    if (!isAuthenticated || !user) {
      // 可以重定向到登录页，或者显示提示
    }
  }, [isAuthenticated, user])

  // 模拟获取监测任务和维权案例
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // 模拟监测任务数据
        const mockMonitoringTasks = [
          {
            id: 'task1',
            contentId: '1',
            contentTitle: 'AI创作的未来趋势',
            status: 'running',
            startTime: '2024-01-15T10:30:00Z',
            lastCheckTime: '2024-01-16T10:30:00Z',
            suspectedInfringements: 3
          },
          {
            id: 'task2',
            contentId: '2',
            contentTitle: '版权保护的重要性',
            status: 'paused',
            startTime: '2024-01-10T09:00:00Z',
            lastCheckTime: '2024-01-12T09:00:00Z',
            suspectedInfringements: 1
          }
        ]
        
        // 模拟维权案例数据
        const mockCopyrightCases = [
          {
            id: 'case1',
            contentId: '1',
            contentTitle: 'AI创作的未来趋势',
            status: 'resolved',
            progress: 100,
            compensation: 500.00,
            createTime: '2024-01-16T08:00:00Z',
            resolveTime: '2024-01-20T14:00:00Z'
          },
          {
            id: 'case2',
            contentId: '3',
            contentTitle: '如何通过原创内容变现',
            status: 'processing',
            progress: 60,
            compensation: 0,
            createTime: '2024-01-18T10:00:00Z'
          }
        ]
        
        setMonitoringTasks(mockMonitoringTasks)
        setCopyrightCases(mockCopyrightCases)
      } catch (error) {
        message.error('获取数据失败')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // 开始监测任务
  const handleStartMonitoring = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // 模拟创建监测任务
      const newTask = {
        id: `task${Date.now()}`,
        contentId: values.contentId,
        contentTitle: values.contentTitle,
        status: 'running',
        startTime: new Date().toISOString(),
        lastCheckTime: new Date().toISOString(),
        suspectedInfringements: 0
      }
      
      setMonitoringTasks([...monitoringTasks, newTask])
      message.success('监测任务已启动')
      form.resetFields()
    } catch (error) {
      message.error('启动监测任务失败')
    } finally {
      setLoading(false)
    }
  }

  // 停止监测任务
  const handleStopMonitoring = async (taskId) => {
    try {
      setLoading(true)
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 更新任务状态
      const updatedTasks = monitoringTasks.map(task => 
        task.id === taskId ? { ...task, status: 'paused' } : task
      )
      setMonitoringTasks(updatedTasks)
      message.success('监测任务已停止')
    } catch (error) {
      message.error('停止监测任务失败')
    } finally {
      setLoading(false)
    }
  }

  // 生成维权材料
  const handleGenerateMaterials = async () => {
    setGenerating(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success('维权材料生成成功')
    } catch (error) {
      message.error('生成维权材料失败')
    } finally {
      setGenerating(false)
    }
  }

  // 委托律师维权
  const handleDelegateLawyer = async () => {
    setGenerating(true)
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success('已提交律师委托申请')
    } catch (error) {
      message.error('提交律师委托申请失败')
    } finally {
      setGenerating(false)
    }
  }

  // 查看维权案例详情
  const handleViewCopyrightCaseDetail = (caseItem) => {
    setSelectedCopyrightCase(caseItem)
    setCopyrightCaseModalVisible(true)
  }

  // 监测任务状态渲染
  const renderTaskStatus = (status) => {
    switch (status) {
      case 'running':
        return <Badge status="processing" text="运行中" />;
      case 'paused':
        return <Badge status="default" text="已暂停" />;
      case 'error':
        return <Badge status="error" text="错误" />;
      default:
        return <Badge status="default" text="未知" />;
    }
  }

  // 维权案例状态渲染
  const renderCaseStatus = (status) => {
    switch (status) {
      case 'pending':
        return <Tag color="blue">待处理</Tag>;
      case 'processing':
        return <Tag color="processing">处理中</Tag>;
      case 'resolved':
        return <Tag color="green">已解决</Tag>;
      case 'rejected':
        return <Tag color="red">已驳回</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
    }
  }

  return (
    <div className="copyright-protection-page">
      <Card title="版权保护中心" className="copyright-protection-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* 侵权监测 */}
          <TabPane tab={<><SearchOutlined /> 侵权监测</>} key="monitoring">
            <Card title="启动监测任务" className="monitoring-task-card">
              <Form form={form} layout="vertical">
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="contentId"
                      label="作品ID"
                      rules={[{ required: true, message: '请输入作品ID！' }]}
                    >
                      <Input placeholder="请输入作品ID" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name="contentTitle"
                      label="作品标题"
                      rules={[{ required: true, message: '请输入作品标题！' }]}
                    >
                      <Input placeholder="请输入作品标题" />
                    </Form.Item>
                  </Col>
                </Row>
                
                <Form.Item
                  name="monitoringScope"
                  label="监测范围"
                  rules={[{ required: true, message: '请选择监测范围！' }]}
                >
                  <Select placeholder="请选择监测范围">
                    <Option value="platform">平台内</Option>
                    <Option value="web">全网</Option>
                    <Option value="both">平台内+全网</Option>
                  </Select>
                </Form.Item>
                
                <Button 
                  type="primary" 
                  icon={<SearchOutlined />} 
                  onClick={handleStartMonitoring}
                  loading={loading}
                  block
                >
                  启动监测任务
                </Button>
              </Form>
            </Card>

            <Card title="监测任务列表" className="monitoring-tasks-card" style={{ marginTop: 24 }}>
              <Table
                dataSource={monitoringTasks}
                rowKey="id"
                columns={[
                  {
                    title: '任务ID',
                    dataIndex: 'id',
                    key: 'id'
                  },
                  {
                    title: '作品标题',
                    dataIndex: 'contentTitle',
                    key: 'contentTitle'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => renderTaskStatus(status)
                  },
                  {
                    title: '开始时间',
                    dataIndex: 'startTime',
                    key: 'startTime',
                    render: (time) => new Date(time).toLocaleString('zh-CN')
                  },
                  {
                    title: '最后检查时间',
                    dataIndex: 'lastCheckTime',
                    key: 'lastCheckTime',
                    render: (time) => new Date(time).toLocaleString('zh-CN')
                  },
                  {
                    title: '疑似侵权数',
                    dataIndex: 'suspectedInfringements',
                    key: 'suspectedInfringements'
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, record) => (
                      <>
                        {record.status === 'running' ? (
                          <Button 
                            danger 
                            onClick={() => handleStopMonitoring(record.id)}
                            loading={loading}
                          >
                            停止监测
                          </Button>
                        ) : (
                          <Button type="primary">启动监测</Button>
                        )}
                      </>
                    )
                  }
                ]}
                pagination={{ pageSize: 10 }}
                loading={loading}
              />
            </Card>
          </TabPane>

          {/* 维权中心 */}
          <TabPane tab={<><ShieldOutlined /> 维权中心</>} key="protection">
            <Card title="维权通道" className="copyright-protection-channel-card">
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Card hoverable>
                    <h3>自助维权</h3>
                    <p>生成维权材料，自行处理侵权问题</p>
                    <Button 
                      type="primary" 
                      icon={<FileTextOutlined />} 
                      onClick={handleGenerateMaterials}
                      loading={generating}
                      block
                    >
                      {generating ? '生成中...' : '生成维权材料'}
                    </Button>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card hoverable>
                    <h3>委托律师维权</h3>
                    <p>专业律师团队为您处理侵权纠纷</p>
                    <p>成功后赔偿款按 80% 创作者 / 15% 律所 / 5% 平台分配</p>
                    <Button 
                      type="primary" 
                      icon={<UserOutlined />} 
                      onClick={handleDelegateLawyer}
                      loading={generating}
                      block
                    >
                      {generating ? '提交中...' : '委托律师'}
                    </Button>
                  </Card>
                </Col>
              </Row>
            </Card>

            <Card title="维权案例" className="copyright-cases-card" style={{ marginTop: 24 }}>
              <Table
                dataSource={copyrightCases}
                rowKey="id"
                columns={[
                  {
                    title: '案例ID',
                    dataIndex: 'id',
                    key: 'id'
                  },
                  {
                    title: '作品标题',
                    dataIndex: 'contentTitle',
                    key: 'contentTitle'
                  },
                  {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (status) => renderCaseStatus(status)
                  },
                  {
                    title: '进度',
                    dataIndex: 'progress',
                    key: 'progress',
                    render: (progress) => <Progress percent={progress} size="small" />
                  },
                  {
                    title: '赔偿金额',
                    dataIndex: 'compensation',
                    key: 'compensation',
                    render: (compensation) => compensation > 0 ? `¥${compensation}` : '-'
                  },
                  {
                    title: '操作',
                    key: 'action',
                    render: (_, record) => (
                      <Button 
                        type="link" 
                        icon={<FileTextOutlined />} 
                        onClick={() => handleViewCopyrightCaseDetail(record)}
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

          {/* 合规规则 */}
          <TabPane tab={<><AlertOutlined /> 合规规则</>} key="compliance">
            <Card className="compliance-rules-card">
              <h3>平台合规规则</h3>
              <div className="compliance-rules-content">
                <p>1. <strong>通知-删除原则</strong>：平台严格执行《信息网络传播权保护条例》规定的"通知-删除"原则，收到侵权通知后及时处理。</p>
                <p>2. <strong>证据存证</strong>：平台对所有疑似侵权行为进行证据固定和区块链存证，确保维权过程中有据可依。</p>
                <p>3. <strong>不越权判定</strong>：平台仅做疑似侵权筛查和证据存证，侵权行为的终局认定权归司法机构。</p>
                <p>4. <strong>快速响应</strong>：平台在收到侵权通知后24小时内进行处理，保障权利人的合法权益。</p>
                <p>5. <strong>透明流程</strong>：维权全过程透明可查，权利人可实时了解维权进度。</p>
              </div>

              <Divider />

              <h3>维权流程说明</h3>
              <div className="copyright-protection-process-content">
                <Row gutter={16}>
                  <Col xs={24} sm={6}>
                    <Card hoverable>
                      <div style={{ textAlign: 'center' }}>
                        <ClockCircleOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                        <h4>1. 提交申请</h4>
                        <p>填写侵权信息，提交维权申请</p>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card hoverable>
                      <div style={{ textAlign: 'center' }}>
                        <SearchOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                        <h4>2. 证据收集</h4>
                        <p>平台自动收集和固定侵权证据</p>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card hoverable>
                      <div style={{ textAlign: 'center' }}>
                        <ShieldOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                        <h4>3. 维权处理</h4>
                        <p>选择自助维权或委托律师维权</p>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} sm={6}>
                    <Card hoverable>
                      <div style={{ textAlign: 'center' }}>
                        <CheckCircleOutlined style={{ fontSize: 32, color: '#1890ff', marginBottom: 8 }} />
                        <h4>4. 结果反馈</h4>
                        <p>维权结果反馈和赔偿处理</p>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Card>
          </TabPane>
        </Tabs>
      </Card>

      {/* 维权案例详情模态框 */}
      <Modal
        title="维权案例详情"
        open={copyrightCaseModalVisible}
        onCancel={() => setCopyrightCaseModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setCopyrightCaseModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={800}
      >
        {selectedCopyrightCase && (
          <div className="copyright-case-detail">
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <p><strong>案例ID:</strong> {selectedCopyrightCase.id}</p>
                <p><strong>作品标题:</strong> {selectedCopyrightCase.contentTitle}</p>
                <p><strong>状态:</strong> {renderCaseStatus(selectedCopyrightCase.status)}</p>
                <p><strong>进度:</strong> <Progress percent={selectedCopyrightCase.progress} /></p>
                <p><strong>赔偿金额:</strong> {selectedCopyrightCase.compensation > 0 ? `¥${selectedCopyrightCase.compensation}` : '-'}</p>
                <p><strong>创建时间:</strong> {new Date(selectedCopyrightCase.createTime).toLocaleString('zh-CN')}</p>
                {selectedCopyrightCase.resolveTime && (
                  <p><strong>解决时间:</strong> {new Date(selectedCopyrightCase.resolveTime).toLocaleString('zh-CN')}</p>
                )}
              </Col>
              <Col xs={24} md={12}>
                <h4>处理步骤</h4>
                <div className="copyright-case-steps">
                  <div className="step-item">
                    <div className="step-status completed">1</div>
                    <div className="step-content">
                      <h5>提交申请</h5>
                      <p>已完成</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className="step-status completed">2</div>
                    <div className="step-content">
                      <h5>证据收集</h5>
                      <p>已完成</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className={`step-status ${selectedCopyrightCase.progress >= 60 ? 'completed' : 'processing'}`}>
                      {selectedCopyrightCase.progress >= 60 ? '3' : <Spin size="small" />}
                    </div>
                    <div className="step-content">
                      <h5>维权处理</h5>
                      <p>{selectedCopyrightCase.progress >= 60 ? '已完成' : '处理中'}</p>
                    </div>
                  </div>
                  <div className="step-item">
                    <div className={`step-status ${selectedCopyrightCase.progress >= 100 ? 'completed' : ''}`}>
                      {selectedCopyrightCase.progress >= 100 ? '4' : '4'}
                    </div>
                    <div className="step-content">
                      <h5>结果反馈</h5>
                      <p>{selectedCopyrightCase.progress >= 100 ? '已完成' : '待处理'}</p>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CopyrightProtection
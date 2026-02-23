import React, { useState } from 'react'
import { Card, Tabs, Button, Form, Input, Upload, message, Row, Col, Spin, Select } from 'antd'
import { FileTextOutlined, PictureOutlined, CheckCircleOutlined, SendOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const { TabPane } = Tabs
const { TextArea } = Input
const { Option } = Select

const CreateContent = () => {
  const [activeTab, setActiveTab] = useState('text')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  // 检查用户是否已认证
  if (!isAuthenticated || !user) {
    navigate('/login')
    return null
  }

  // AI文案生成/润色功能
  const handleGenerateText = async (type) => {
    setGenerating(true)
    try {
      const values = await form.validateFields()
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 模拟生成结果
      let generatedContent = ''
      if (type === 'generate') {
        generatedContent = `# ${values.topic}\n\n${values.topic}是一个重要的创作主题。在当今数字化时代，创作者需要关注版权保护和内容变现。\n\n本文将探讨${values.topic}的核心价值，以及如何通过AI工具提升创作效率和质量。\n\n通过Origin原创者平台，创作者可以获得专业的版权保护服务，确保自己的作品得到应有的尊重和回报。`
      } else if (type === 'polish') {
        generatedContent = values.content.replace(/\n/g, '\n\n').replace(/重要/g, '至关重要').replace(/需要/g, '亟需')
      }
      
      form.setFieldsValue({ content: generatedContent })
      message.success(type === 'generate' ? '文案生成成功' : '文案润色成功')
    } catch (error) {
      message.error('操作失败，请重试')
    } finally {
      setGenerating(false)
    }
  }

  // AI原创作图功能
  const handleGenerateImage = async () => {
    setGenerating(true)
    try {
      const values = await form.validateFields(['imagePrompt'])
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // 模拟生成的图片URL
      const generatedImageUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(values.imagePrompt)}`
      
      // 这里可以将生成的图片添加到上传列表
      message.success('图片生成成功')
      console.log('生成的图片URL:', generatedImageUrl)
    } catch (error) {
      message.error('图片生成失败，请重试')
    } finally {
      setGenerating(false)
    }
  }

  // 内容查重检测功能
  const handleCheckPlagiarism = async () => {
    setGenerating(true)
    try {
      const values = await form.validateFields(['content'])
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // 模拟查重结果
      const plagiarismResult = {
        similarity: 15,
        riskLevel: 'low', // low, medium, high
        sources: [
          {
            title: '相关文章1',
            url: 'https://example.com/article1',
            similarity: 10
          },
          {
            title: '相关文章2',
            url: 'https://example.com/article2',
            similarity: 5
          }
        ]
      }
      
      // 显示查重结果
      message.success(`查重完成，相似度: ${plagiarismResult.similarity}%，风险等级: ${plagiarismResult.riskLevel === 'low' ? '低' : plagiarismResult.riskLevel === 'medium' ? '中' : '高'}`)
      console.log('查重结果:', plagiarismResult)
    } catch (error) {
      message.error('查重失败，请重试')
    } finally {
      setGenerating(false)
    }
  }

  // 发布内容功能
  const handlePublish = async () => {
    setLoading(true)
    try {
      const values = await form.validateFields()
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success('发布成功，正在进行版权确权...')
      
      // 模拟确权完成后跳转到内容详情页
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
    } catch (error) {
      message.error('发布失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  // 保存草稿功能
  const handleSaveDraft = async () => {
    try {
      const values = await form.validateFields()
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      message.success('草稿保存成功')
    } catch (error) {
      message.error('保存草稿失败，请重试')
    }
  }

  return (
    <div className="create-content-page">
      <Card title="AI创作中心" className="create-content-card">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          {/* 文案创作 */}
          <TabPane tab={<><FileTextOutlined /> 文案创作</>} key="text">
            <Form form={form} layout="vertical">
              <Form.Item
                name="topic"
                label="创作主题"
                rules={[{ required: true, message: '请输入创作主题！' }]}
              >
                <Input placeholder="请输入创作主题" />
              </Form.Item>
              
              <Form.Item
                name="contentType"
                label="内容类型"
                rules={[{ required: true, message: '请选择内容类型！' }]}
              >
                <Select placeholder="请选择内容类型">
                  <Option value="article">文章</Option>
                  <Option value="social">社交媒体</Option>
                  <Option value="marketing">营销文案</Option>
                  <Option value="other">其他</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="content"
                label="内容"
                rules={[{ required: true, message: '请输入内容！' }]}
              >
                <TextArea 
                  rows={10} 
                  placeholder="请输入内容，或使用AI生成"
                  style={{ resize: 'vertical' }}
                />
              </Form.Item>
              
              <Row gutter={16} style={{ marginBottom: 24 }}>
                <Col xs={24} sm={12}>
                  <Button 
                    type="primary" 
                    icon={generating ? <LoadingOutlined spin /> : <SendOutlined />} 
                    onClick={() => handleGenerateText('generate')}
                    loading={generating}
                    block
                  >
                    {generating ? '生成中...' : 'AI生成文案'}
                  </Button>
                </Col>
                <Col xs={24} sm={12}>
                  <Button 
                    icon={generating ? <LoadingOutlined spin /> : <CheckCircleOutlined />} 
                    onClick={() => handleGenerateText('polish')}
                    loading={generating}
                    block
                  >
                    {generating ? '润色中...' : 'AI润色文案'}
                  </Button>
                </Col>
              </Row>
              
              <Button 
                icon={<CheckCircleOutlined />} 
                onClick={handleCheckPlagiarism}
                loading={generating}
              >
                内容查重检测
              </Button>
            </Form>
          </TabPane>

          {/* 原创作图 */}
          <TabPane tab={<><PictureOutlined /> 原创作图</>} key="image">
            <Form form={form} layout="vertical">
              <Form.Item
                name="imagePrompt"
                label="图片描述"
                rules={[{ required: true, message: '请输入图片描述！' }]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="请详细描述你想要的图片内容，例如：一只可爱的小猫在阳光下睡觉，写实风格，高清"
                  style={{ resize: 'vertical' }}
                />
              </Form.Item>
              
              <Form.Item
                name="imageStyle"
                label="图片风格"
                rules={[{ required: true, message: '请选择图片风格！' }]}
              >
                <Select placeholder="请选择图片风格">
                  <Option value="realistic">写实风格</Option>
                  <Option value="cartoon">卡通风格</Option>
                  <Option value="anime">动漫风格</Option>
                  <Option value="abstract">抽象风格</Option>
                </Select>
              </Form.Item>
              
              <Button 
                type="primary" 
                icon={generating ? <LoadingOutlined spin /> : <SendOutlined />} 
                onClick={handleGenerateImage}
                loading={generating}
                style={{ marginBottom: 24 }}
              >
                {generating ? '生成中...' : 'AI生成图片'}
              </Button>
              
              <Form.Item
                name="uploadImage"
                label="上传图片"
              >
                <Upload.Dragger name="file" action="/api/upload" listType="picture">
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                  <p className="ant-upload-hint">
                    支持 JPG、PNG、GIF 格式，单个文件不超过10MB
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form>
          </TabPane>

          {/* 综合创作 */}
          <TabPane tab={<><CheckCircleOutlined /> 综合创作</>} key="comprehensive">
            <Form form={form} layout="vertical">
              <Form.Item
                name="comprehensiveTitle"
                label="标题"
                rules={[{ required: true, message: '请输入标题！' }]}
              >
                <Input placeholder="请输入标题" />
              </Form.Item>
              
              <Form.Item
                name="comprehensiveContent"
                label="内容"
                rules={[{ required: true, message: '请输入内容！' }]}
              >
                <TextArea 
                  rows={8} 
                  placeholder="请输入内容"
                  style={{ resize: 'vertical' }}
                />
              </Form.Item>
              
              <Form.Item
                name="comprehensiveImages"
                label="图片"
              >
                <Upload.Dragger name="files" action="/api/upload" listType="picture-card" multiple>
                  <p className="ant-upload-drag-icon">
                    <PictureOutlined />
                  </p>
                  <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
                  <p className="ant-upload-hint">
                    支持 JPG、PNG、GIF 格式，单个文件不超过10MB
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
        
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col xs={24} sm={8}>
            <Button 
              icon={<SaveOutlined />} 
              onClick={handleSaveDraft}
              block
            >
              保存草稿
            </Button>
          </Col>
          <Col xs={24} sm={16}>
            <Button 
              type="primary" 
              icon={<SendOutlined />} 
              onClick={handlePublish}
              loading={loading}
              block
            >
              {loading ? '发布中...' : '发布并确权'}
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default CreateContent
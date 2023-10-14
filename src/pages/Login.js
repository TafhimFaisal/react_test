import React, { useState, useEffect, createRef } from 'react'
import { Row, Col, Space, Button, Input, Typography, Spin, Form, Select, notification } from 'antd'
import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import { login } from '../redux/actions/AuthAction'

const { Title, Paragraph } = Typography
const { Option } = Select
const formRef = createRef()

export default function Login(props) {
  const navigate = useNavigate()
  const auth = useSelector( (state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false)

  useEffect(() => {
    if (auth.authenticated) {
      navigate('/')
    }
  }, [auth.authenticated])

  const onFinish = async (values) => {
    setloading(true)
    await dispatch(login({
      ...values,
      callBack:(response)=>{
        setloading(false)
        let is_ok = response.status == 201
        if(!is_ok) {
          notification['error']({
            message: 'Oops.',
            // description: response.data,
          })
        }
      }
    }))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <Row style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
      <Col span={0} lg={8}></Col>
      <Col span={0} lg={12}>
        <Spin spinning={loading}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100vh',
              flexDirection: 'column',
              maxWidth: '90%',
            }}
          >
            <Title level={3}>Welcome back :)</Title>
            <Paragraph>
              In order to manage your contents, please login{' '}
              <KeyOutlined style={{ color: '#3275A3' }} />
            </Paragraph>

            <Space direction="vertical">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                ref={formRef}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your user name!' },
                  ]}
                >
                  <Input placeholder="user name." suffix={<UserOutlined />} />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input.Password placeholder="password." />
                </Form.Item>
                
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Space>
          </div>
        </Spin>
      </Col>
      <Col span={0} lg={6}></Col>
    </Row>
  )
}
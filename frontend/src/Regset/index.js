import React, { useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import './index.css';
import { useNavigate } from 'react-router-dom';
const Reg = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onBack = () => {
    navigate('/login', { replace: true })
  }
  return (
    <div className='reg'>
      <div className='reginfo'>
        <h2>welcome</h2>
        <Form
          name="basic"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
            <Checkbox>remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div style={{ width: '100%', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}  >
              <Button type="primary" htmlType="submit" className="button_sb">
                Register
              </Button>
              <Button type="link" onClick={() => { onBack() }}>
                Existing account? Return to login
              </Button>
            </div>

          </Form.Item>
        </Form>
      </div>

    </div>

  )

}
export default Reg;
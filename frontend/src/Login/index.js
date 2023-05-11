import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/index';

const Login = () => {
  const navigate = useNavigate();

  // Function called when the form is successfully submitted
  const onFinish = async (values) => {
    const { username, password } = values;

    // API request to login endpoint (currently commented out)
    // const data = await login({ username, password });
    // const { code } = data;
    // if (code === 200) {
    //   message.success('Login successful');
    // }

    // Check if username and password are provided
    if (username && password) {
      // Store user information in localStorage
      localStorage.setItem('userInfo', JSON.stringify(values));

      // Navigate to the '/home' route
      navigate('/home');
    }
  };

  // Function called when form submission fails
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // Function to navigate to the '/reg' (registration) route
  const goReg = () => {
    navigate('/reg');
  };

  return (
    <div className='login'>
      <div className='loginfo'>
        <h2>Welcome</h2>
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
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit" className="button_sb">
                Login
              </Button>
              <Button type="primary" htmlType="submit" className="button_sb" onClick={goReg}>
                Register
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

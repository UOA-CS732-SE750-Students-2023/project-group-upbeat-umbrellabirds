import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/index';
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { username, password } = values
    //  const data =  await  login({username,password})
    //  const {code } = data;
    //  if(code === 200){
    //   message.success('登陆成功')
    //  }
    if (username && password) {
      localStorage.setItem('userInfo', JSON.stringify(values))
      navigate('/home')
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const goReg = () => {
    navigate('/reg')
  }
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
            <div style={{ width: '100%', display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
              <Button type="primary" htmlType="submit" className="button_sb" >
                Login
              </Button>
              <Button type="primary" htmlType="submit" className="button_sb" onClick={() => { goReg() }}>
                Register
              </Button>
            </div>

          </Form.Item>
        </Form>
      </div>

    </div>

  )

}
export default Login;
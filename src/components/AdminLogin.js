import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios'

const HOSTNAME = "localhost";//"3.19.229.228";

export default function adminLogin() {
    const navigate = useNavigate();

    const onFinish = values => {
        const {username, password} = values;
        axios.post(`http://${HOSTNAME}:3001/validatePassword`, {username, password})
            .then(res => {
                if(res.data.validation){
                    navigate('/AdminDashboard');
                }else{
                    alert('Incorrect password.');
                }
            })
    }

    return (
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center'}}>

            <div style={{width:400}}>

                <h1 style={{textAlign:'center'}}>Login</h1>

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>

                </Form.Item>
            </Form>
            </div>
        </div>
    )
}
import React from 'react'
import { Form, Input, Button } from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';

export default function SignupForm({handleSubmit}) {
    return (
        <Form
                    name="normal_login"
                    className="login-form"

                    onFinish={handleSubmit}
                    >
                    <Form.Item
                        name="email"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese su Email!',
                        },
                        ]}
                    >
                        <Input 
                        prefix={<MailOutlined className="site-form-item-icon" />} 
                        placeholder="Email" 
                        />
                    </Form.Item>
                    
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese su password!',
                        },
                        ]}
                    >
                        <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        rules={[
                        {
                            required: true,
                            message: 'Ingrese su nombre!',
                        },
                        ]}
                    >
                        <Input 
                        prefix={<UserOutlined className="site-form-item-icon" />} 
                        placeholder="Nombre" 
                        />
                    </Form.Item>

                    

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Registrarse
                        </Button>
                    </Form.Item>
                </Form>
    )
}

import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default function LoginForm({handleSubmit}) {
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
                            message: 'Por favor, ingrese su email!',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Por favor, ingrese su password!',
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
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Igresar
                        </Button>
                    </Form.Item>
                </Form>
    )
}

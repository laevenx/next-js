import { Layout, Menu, Breadcrumb,Form, Input, Button, Checkbox,Row, Col, Tooltip  } from 'antd';
import Link from "next/link";
import axios from 'axios'

const { Content, Footer } = Layout;

import {Header} from '../containers/Header'
import { useState } from 'react';
import { useRouter } from 'next/router';


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

export default function Register(){
  const router = useRouter()

  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const [saldo,setSaldo] = useState()
    const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

      function register(){
        axios.post('http://localhost:3001/register', {
          name,email,password,saldo
        })
        .then(({data}) => {
          router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
      }

    return (
        <Layout className="layout">
        <Header>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Register</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
      <Col span={8}></Col>
      <Col span={8}>
      <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >

        <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input your Name!',
              },
            ]}
          >
            <Input  onChange={(event) => setName(event.target.value)}/>
          </Form.Item>


          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input  onChange={(event) => setEmail(event.target.value)}/>
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password  onChange={(event) => setPassword(event.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Saldo"
            name="saldo"
            rules={[
              {
                required: true,
                message: 'Please input your saldo!',
              },
            ]}
          >
            <Input  onChange={(event) => setSaldo(event.target.value)}/>
          </Form.Item>
    
          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>i Agree</Checkbox>
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" onClick={register}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={8}></Col>
    </Row>
          
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>


            )
}
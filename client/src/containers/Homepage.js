
    import { Layout, Menu, Breadcrumb,Form, Input, Button, Checkbox,Row, Col  } from 'antd';
import Link from "next/link";
import axios from 'axios'
import { useRouter } from 'next/router'


const { Content, Footer } = Layout;

import {Header} from './Header'
import Axios from 'axios';
import { useState } from 'react';
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

export function HomePage(){
  const router = useRouter()

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()

    const onFinish = values => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
      };

      function login (){
          axios.post('http://localhost:3001/login', {
            email, password
          })
          .then(({data}) => {
            router.push('/list')
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
            <Breadcrumb.Item>Login</Breadcrumb.Item>
          </Breadcrumb>
         <h1>Welcome</h1>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
      );
}

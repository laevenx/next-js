import {
  Layout,
  Menu,
  Breadcrumb,
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
} from "antd";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";

const { Content, Footer } = Layout;
import { Header } from "../containers/Header";

import { useEffect, useState } from "react";

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

export default function List({ ownersList }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout className="layout">
      <Header></Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          {ownersList.map((e, index) => (
            <div key={index}>
              <img
                src="https://i2.wp.com/butterwithasideofbread.com/wp-content/uploads/2012/07/Easiest-Best-Homemade-Bread.BSB_.IMG_6014.jpg?w=775&ssl=1"
                height="100"
                width="125"
              ></img>
              <Link as={`/shop/${e.name}`} href="/shop/[person]">
                <a>
                  {e.name}'s stock: {e.amount} price: {e.price}
                </a>
              </Link>
            </div>
          ))}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

List.getInitialProps = async () => {
  const response = await fetch("http://localhost:3001/product");
  const ownersList = await response.json();
  return { ownersList: ownersList };
};

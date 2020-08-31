import { Layout, Menu, Breadcrumb, Form, Input, Button, Checkbox , InputNumber,Row, Col} from "antd";
import Link from "next/link";

import { useRouter } from "next/router";


const { Content, Footer } = Layout;

import { Header } from "../../containers/Header";

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

export default function Checkout() {
    const router = useRouter();

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

  return (
    <Layout className="layout">
      <Header></Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Cart</Breadcrumb.Item>
        </Breadcrumb>
        <Row>
      <Col span={8}></Col>
      <Col span={8}> <div>
            <img src="https://i2.wp.com/butterwithasideofbread.com/wp-content/uploads/2012/07/Easiest-Best-Homemade-Bread.BSB_.IMG_6014.jpg?w=775&ssl=1" height="400" width="500"></img>
         
        </div>
        </Col>
      <Col span={8}> <h1>Name : asd</h1>
          <h1>price: 2000</h1>
          <h3>Amount</h3>
          <InputNumber min={1} max={10} defaultValue={1}  />
          </Col>
    </Row>
    <Row>
      <Col span={8}></Col>
      <Col span={8}> <div>
            <img src="https://i2.wp.com/butterwithasideofbread.com/wp-content/uploads/2012/07/Easiest-Best-Homemade-Bread.BSB_.IMG_6014.jpg?w=775&ssl=1" height="400" width="500"></img>
         
        </div>
        </Col>
      <Col span={8}> <h1>Name : asd</h1>
          <h1>price: 2000</h1>
          <h3>Amount</h3>
          <InputNumber min={1} max={10} defaultValue={1}  />
          </Col>
    </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

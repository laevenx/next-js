import { Layout, Menu, Breadcrumb,Form, Input, Button, Checkbox  } from 'antd';
import Link from "next/link";



export function Header(){
    return (
        <div>
             <div className="logo" ></div>
            
             <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1"><Link href="/login"><a>Login</a></Link></Menu.Item>
            <Menu.Item key="2"><Link href="/register"><a>Register</a></Link></Menu.Item>
            <Menu.Item key="3"><Link href="/list"><a>Products</a></Link></Menu.Item>
            <Menu.Item key="4"><Link href="/shop/checkout"><a>Checkout</a></Link></Menu.Item>
            </Menu>
        </div>
    )
}
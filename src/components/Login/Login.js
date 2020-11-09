import React, {useEffect, useState} from 'react';
import  { withRouter, Route, Link ,Switch} from "react-router-dom";
import {Menu, Form, Input, Button, Layout, Row, Col, Image, Breadcrumb} from "antd";
import 'antd/dist/antd.css';
import '../../App.css';
import Register from "../Register/Register";
import {useDispatch, connect, useSelector} from "react-redux";
import userServices from '../../services/users.services'
import {logins} from "../../actions/user.action";
import { isPlainObject } from 'is-plain-object';
import history from "../history/history";


const {  Content , Footer } = Layout;

const layout = {

    labelCol : {
        span : 8,
    },
    wrapperCol : {
        span : 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16 ,
    },
};

const Login = () =>{

    const dispatch = useDispatch();
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const user = useSelector(state => state.user);

    useEffect(() => {
        if (user.type === "LoginSuccess") {
            history.push('/dashboard')
            window.location.reload(false);
        }

    } ,[user])
    const handleSubmit = () => {
        let temp = { type : "LOGIN" , user : {username: username, password: password}};
        dispatch(logins(temp));
    }

    // const [form] = Form.useForm();

    // console.log(this.state);

    return(
        <>
            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>Login</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">
                        <Form name={"login"}  {...layout} initialValues={{remember: true,}}>
                            <Form.Item
                                name={"username"}
                                label={"User Name"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter UserName First"
                                }]}
                                onChange={(e) => {setUsername(e.target.value)}}
                            >
                                <Input />
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
                                onChange={(e) => {setPassword(e.target.value)}}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                    Login
                                </Button>
                            </Form.Item>

                        </Form>

                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2020 Created by Abdullah
                </Footer>
            </Layout>
        </>
    );
}
export default Login
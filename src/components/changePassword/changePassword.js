import React, {useState} from "react";
import {Button, Form, Input, Breadcrumb, Layout, Select, Menu} from "antd";
import {logins} from "../../actions/user.action";
import {useDispatch} from "react-redux";
import { Registers} from "../../actions/Users/Users";
import SubMenu from "antd/es/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {userLogout} from "../../actions/logout/logout";
import {passwordChange} from "../../actions/changePassword/changePassword";


const layout = {

    labelCol : {
        span : 3,
    },
    wrapperCol : {
        span : 8,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 3,
        span: 16 ,
    },
};

const {Content , Footer , Header, Sider} = Layout;
const rightStyle = {position: 'absolute', top: 0, right: 0}

const changePassword = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentPassword , setCurrentPassword] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password , setPassword] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [confirmPassword , setConfirmPassword ] = useState();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [obj , setObj ] = useState([])

    const logout = () => {
        dispatch(userLogout())
    }

    const hadnleSubmit = () => {

        setObj({current_password : currentPassword  ,password : password , password_confirmation : confirmPassword  })
        let object = {current_password : currentPassword  ,password : password , password_confirmation : confirmPassword  };
        console.log(object)
        dispatch(passwordChange(object))
    }

    return (

        <Layout>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item>Change Password</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">

                    <Form name={"register"}  {...layout} initialValues={{remember: true,}}>

                        <Form.Item
                            name={"current_password"}
                            label={"Current Password"}
                            rules={[{
                                required : true ,
                                message : "Please Enter Current Password First"
                            }]}
                            onChange={(e) => {setCurrentPassword(e.target.value)}}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name={"password"}
                            label={"New Password"}
                            rules={[{
                                required : true ,
                                message : "Please Enter New Password First"
                            }]}
                            onChange={(e) => {setPassword(e.target.value)}}
                        >
                            <Input.Password />

                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            name="password_confirmation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please Enter Conformation password!',
                                },
                            ]}
                            onChange={(e) => {setConfirmPassword(e.target.value)}}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" onClick={hadnleSubmit}>
                                Change Password
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Content>
        </Layout>
    )
}

export default changePassword;
import React, {useState} from "react";
import {Button, Form, Input, Breadcrumb, Layout, Select} from "antd";
import {logins} from "../../actions/user.action";
import {useDispatch} from "react-redux";
import { Registers} from "../../actions/Users/Users";


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

const {Content , Footer} = Layout;

const Register = () => {
    const dispatch = useDispatch();

    const [userName , setUserName] = useState();
    const [email , setEmail] = useState();
    const [type , setType] = useState();
    const [password , setPassword] = useState();
    const [confirmPassword , setConfirmPassword ] = useState();
    const [obj , setObj ] = useState([])


    const hadnleSubmit = () => {

        setObj({userName : userName , email : email , type : type , password : password , confirmPassword : confirmPassword  })
        let object = {userName : userName , email : email , type : type , password : password , confirmPassword : confirmPassword  };
        console.log(object)
        dispatch(Registers(object))
    }

    return (

            <Layout>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>Register</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-content">

                    <Form name={"register"}  {...layout} initialValues={{remember: true,}}>

                            <Form.Item
                                name={"username"}
                                label={"User Name"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter UserName First"
                                }]}
                                onChange={(e) => {setUserName(e.target.value)}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={"email"}
                                label={"email"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter UserName First"
                                }]}
                                onChange={(e) => {setEmail(e.target.value)}}
                            >
                                <Input />

                            </Form.Item>

                            <Form.Item
                                name={"Type"}
                                label={"Type"}
                                rules={[{
                                    required : true ,
                                    message : "Please Select Type First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a person"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setType(value);
                                    }}
                                >
                                    <option>Select User Type</option>
                                    <option value="Inbound">Inbound</option>
                                    <option value="Outbound">Outbound</option>
                                    <option value="Brended">Brended</option>
                                    <option value="Normal">Normal</option>
                                </Select>

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

                                <Form.Item
                                    label="Confirm Password"
                                    name="confirm-password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                    onChange={(e) => {setConfirmPassword(e.target.value)}}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" onClick={hadnleSubmit}>
                                        Register
                                    </Button>
                                </Form.Item>

                            </Form>
                    </div>
                </Content>
            </Layout>

    )
}

export default Register;
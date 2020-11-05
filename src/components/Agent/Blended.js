import React, {useEffect, useState} from 'react'
import {Breadcrumb, Button, Form, Input, Layout, Menu, Space, Table} from "antd";
import {useDispatch} from "react-redux";
import axios from "axios";
import {CreateData, DeleteData, UpdateData} from "../../actions/Agent/Blended";
import SubMenu from "antd/es/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {userLogout} from "../../actions/logout/logout";

const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const layout = {
    labelCol: {
        span: 2,
    },
    wrapperCol: {
        offset : 1,
        span: 16,
    },
};
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not validate email!',
        number: '${label} is not a validate number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const rightStyle = {position: 'absolute', top: 0, right: 0}

const Blended = () => {

    const [firstName , setFirstName ] = useState("");
    const [lastName , setLastName ] =  useState("");
    const[email , setEmail ] = useState("");
    const[password , setPassword ] = useState("");
    const[btnName , setBtnName ] = useState("Submit");
    const [obj , setObj ] = useState([])
    const [data , setData] = useState([]);
    const [form] = Form.useForm();

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("https://reqres.in/api/users?page=2").then(response => {
            setData(response.data.data)
        })
    },[])

    const onFinish = (values) => {
        console.log(values);
        handleSubmitAction()
    };

    const getDataByID = (record) => {
        // let records = dispatch(GetDataByID(record))
        setFirstName(record.first_name)
        setLastName(record.last_name)
        setEmail(record.email)
        setBtnName("Update")
        form.setFieldsValue({
            first_name : record.first_name,
            last_name : record.last_name,
            email : record.email,
        })
        setObj({firstName : record.first_name , lastName : record.last_name , email : record.email , id : record.id })
    }

    const deleteData = (record) => {
        dispatch(DeleteData(record))
    }
    const logout = () => {
        dispatch(userLogout())
    }
    const handleSubmitAction = () => {
        if(btnName =="Submit")
        {
            setObj({firstName : firstName , lastName : lastName , email : email  })
            dispatch(CreateData(obj))
        }
        else
        {
            dispatch(UpdateData(obj))
            setBtnName("Submit")
            form.setFieldsValue({
                first_name : setFirstName(""),
                last_name : setLastName(""),
                email : setEmail(""),
            })
        }
    }


    return (
        <>
            <Layout className="site-layout">
                <Header  style={{ padding: 0 }} >
                    <Menu selectable={false} mode='horizontal' style={rightStyle} theme={"dark"}>
                        <SubMenu key="sub2" icon={<UserOutlined />} title="User">
                            <Menu.Item key="20">
                                <Link to={"/changePassword"}>Change Password</Link>
                            </Menu.Item>
                            <Menu.Item key="21" onClick={logout}>Logout</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Agent</Breadcrumb.Item>
                        <Breadcrumb.Item>Blended</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>
                        <Form {...layout} name="nest-messages" onFinish={onFinish} form={form} validateMessages={validateMessages}>
                            <Form.Item
                                name='first_name'
                                label="first_name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input size="large" onChange = {(e) => {setFirstName(e.target.value)}} />
                            </Form.Item>
                            <Form.Item
                                name= 'last_name'
                                label="last_name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                initialValue={lastName}
                            >
                                <Input size="large" onChange = {(e) => {setLastName(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'email'
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        required: true,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setEmail(e.target.value)}} />
                            </Form.Item>

                            <Form.Item name={['user', 'password']} label="password" initialValue={password}>
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                                <Button type="primary" htmlType="submit" name="Submit" >
                                    {btnName}
                                </Button>
                            </Form.Item>
                        </Form>

                        <Table dataSource={data} scroll={{ x: 1500, y: 300 }} >

                            <ColumnGroup title="Name">
                                <Column title="First Name" dataIndex="first_name" key="first_name" />
                                <Column title="Last Name" dataIndex="last_name" key="last_name" />
                            </ColumnGroup>

                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="ID" dataIndex="id" key="id" />

                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button onClick={() => { getDataByID(record)}} >Update</Button>
                                        <Button onClick={() => {deleteData(record)}} >Delete</Button>
                                    </Space>
                                )}
                            />
                        </Table>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created By Bilal</Footer>
            </Layout>
        </>
    )
}

export default Blended

import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input, Layout, Select, Space, Table, Alert, InputNumber, Menu} from "antd";
import {useDispatch, connect, useSelector} from "react-redux";
import axios from "axios";
import {CreateData, DeleteData, showData, UpdateData} from "../../actions/Extensoin/Extension";
import apiClient from "../../axios/axios";
import {userLogout} from "../../actions/logout/logout";
import SubMenu from "antd/es/menu/SubMenu";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";


const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        offset : 2,
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

const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 16 ,
    },
};
const rightStyle = {position: 'absolute', top: 0, right: 0}

const Extension = () => {

    const [id , setId] = useState();
    const [context , setContext] = useState();
    const [exten , setExten] = useState();
    const [priority , setPriority] = useState('');
    const [app , setApp] = useState();
    const [appData , setAppData ] = useState();
    const [btnName , setBtnName ] = useState("Submit");
    const [obj , setObj ] = useState([])
    const [data , setData] = useState([]);
    const [form] = Form.useForm();

    const dispatch = useDispatch();
    const extension = useSelector(state => state.Extension)

    useEffect(() => {
        if(extension.type === "showData")
            setData(extension.Extension)

        else if (extension.type === "update"){
            if(extension.status == 1){
                console.log("updated")
                data.find( p => p.id == id && ( p.context = context, true ) && ( p.exten = exten, true )&& ( p.priority = priority, true )&& ( p.app = app, true )&& ( p.appdata = appData, true )) ;
                form.setFieldsValue({
                    context : setContext(""),
                    exten : setExten(""),
                    priority : setPriority(""),
                    app : setApp(""),
                    appdata : setAppData(""),
                })
            }
        }
        else if (extension.type === "delete"){
            if(extension.status == 1){
                console.log("delete")
                // let index = data.findIndex(x => x.id == id);
                console.log(id)
                setData(data.filter(item => item.id !== id))
                console.log(data)
            }
        }
        else if (extension.type == "createData"){
            console.log(extension.Extension)
            if(extension.Extension!=null && extension.Extension!="") {
                dispatch(showData())
                // setData([...data, {name , type , email , id }]);
                // setData(data.push(users.Users.name , users.Users.email , users.Users.type , users.Users.id));
                form.setFieldsValue({
                    context : setContext(""),
                    exten : setExten(""),
                    priority : setPriority(""),
                    app : setApp(""),
                    appdata : setAppData(""),
                })
            }
        }
    }, [extension])

    useEffect(() => {
        console.log(data)
    },[data])


    useEffect(() => {
        dispatch(showData())
    },[])

    const onFinish = (values) => {
        console.log(values);
        handleSubmitAction()
    };



    const getDataByID = (record) => {
        // let records = dispatch(GetDataByID(record))
        setBtnName("Update")
        setContext(record.context)
        setExten(record.exten)
        setPriority(record.priority)
        setApp(record.app)
        setAppData(record.appdata)
        setId(record.id)
        form.setFieldsValue({
            context : record.context,
            exten : record.exten,
            priority : record.priority,
            app : record.app,
            appdata : record.appdata,
        })
        // setObj({username : record.username , email : record.email , type : record.type , id : record.id })
    }

    const deleteData = (record) => {
        setId(record.id)
        dispatch(DeleteData(record))
    }

    const handleSubmitAction = () => {
        if(btnName =="Submit")
        {
            let object = {context : context , priority : priority , exten : exten , app : app , appdata : appData };
            setObj({context : context , priority : priority , exten : exten , app : app , appdata : appData })
            dispatch(CreateData(object))
        }
        else
        {
            let object = {id : id , context : context , priority : priority , exten : exten , app : app , appdata : appData };
            dispatch(UpdateData(object))
            setBtnName("Submit")
        }
    }

    const logout = () => {
        dispatch(userLogout())
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
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Extension</Breadcrumb.Item>
                    </Breadcrumb>
                    {extension && extension.error && <Alert
                        message={'Error'}
                        description={extension.error}
                        type={"error"}
                        showIcon
                        closable
                    />}
                    {extension && (extension.type=="createData") && <Alert
                        message={'Success'}
                        description={"Inserted"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    {extension && (extension.type=="update") && <Alert
                        message={'Success'}
                        description={"Updated"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>
                        <Form name={"register"}  {...layout} initialValues={{remember: true,}} form={form} >
                            <Form.Item
                                name={"context"}
                                label={"Context"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter Context First"
                                }]}
                                onChange={(e) => {setContext(e.target.value)}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={"exten"}
                                label={"Extension"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter Extension First"
                                }]}
                                onChange={(e) => {setExten(e.target.value)}}
                            >
                                <Input />

                            </Form.Item>

                            <Form.Item
                                name={"priority"}
                                label={"Priority"}
                                rules={[{
                                    required : true ,
                                    message : "Please Select Priority First"
                                }]}
                                onChange={(e) => {setPriority(e.target.value)}}
                            >
                                <InputNumber size="middle" min={1} max={100000}   onChange={(e) => {setPriority(e)}}/>
                            </Form.Item>
                            <Form.Item
                                label="App"
                                name="app"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input App !',
                                    },
                                ]}
                                onChange={(e) => {setApp(e.target.value)}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="App Data"
                                name="appdata"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input App Data!',
                                    },
                                ]}
                                onChange={(e) => {setAppData(e.target.value)}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={handleSubmitAction}>
                                    {btnName}
                                </Button>
                            </Form.Item>

                        </Form>

                        <Table dataSource={data} scroll={{ x: 1500, y: 300 }} >

                            <Column title="Contex" dataIndex="context" key="context" />
                            <Column title="Exten" dataIndex="exten" key="exten" />
                            <Column title="Priority" dataIndex="priority" key="priority" />
                            <Column title="App" dataIndex="app" key="app" />
                            <Column title="AppData" dataIndex="appdata" key="appdata" />
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

export default Extension
import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input, Layout, Select, Space, Table, Alert, Menu} from "antd";
import {useDispatch,  useSelector} from "react-redux";
import axios from "axios";
import {CreateData, DeleteData, showData, UpdateData} from "../../actions/Users/Users";
import apiClient from "../../axios/axios";
import SubMenu from "antd/es/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {userLogout} from "../../actions/logout/logout";
import {showData as queueData} from '../../actions/Queues/Queuse'

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

const Users = () => {

    const [id , setId] = useState();
    const [name , setName] = useState();
    const [username , setUsername] = useState();
    const [email , setEmail] = useState();
    const [type , setType] = useState('');
    const [queue , setQueue] = useState([]);
    const [queueValue , setQueueValue] = useState([]);
    const [password , setPassword] = useState();
    const [confirmPassword , setConfirmPassword ] = useState();
    const [authUserName , setAuthUserName ] = useState();
    const [authPassword , setAuthPassword ] = useState();
    const [btnName , setBtnName ] = useState("Submit");
    const [obj , setObj ] = useState([])
    const [data , setData] = useState([]);
    const [form] = Form.useForm();
    const [validate , setValidate] = useState(true);

    const dispatch = useDispatch();
    const users = useSelector(state => state.Users)
    const queuesData = useSelector(state => state.Queues.Queues)

    useEffect(() => {
        console.log(queuesData)
        if(queuesData.type === "showData")
            setQueue(queuesData.Queues)
    },[queuesData])

    useEffect(() => {
        console.log(users.Users)
        if(users.type === "showData")
            setData(users.Users)

        else if (users.type === "update"){
            if(users.status == 1){
                data.find( p => p.id == id && ( p.name = name, true ) && ( p.email = email, true ) && ( p.type = type, true ) ) ;
                form.setFieldsValue({
                    name : setName(""),
                    type : setType(""),
                    email : setEmail(""),
                })
            }
        }
        else if (users.type === "delete"){
            if(users.status == 1){
                console.log("delete")
                // let index = data.findIndex(x => x.id == id);
                console.log(id)
                setData(data.filter(item => item.id !== id))
                console.log(data)
            }
        }
        else if (users.type == "createData"){
            console.log(users.Users)
            if(users.Users!=null && users.Users!="") {
                dispatch(showData())
                // setData([...data, {name , type , email , id }]);
                // setData(data.push(users.Users.name , users.Users.email , users.Users.type , users.Users.id));
                form.setFieldsValue({
                    name : setName(""),
                    type : setType(""),
                    email : setEmail(""),
                    password : setPassword(""),
                    username : setUsername(""),
                    confirm_password : setConfirmPassword(""),
                })
            }
        }
    }, [users])

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
        setName(record.name)
        setUsername(record.username)
        setEmail(record.email)
        setType(record.type)
        setId(record.id)
        form.setFieldsValue({
            name : record.name,
            username : record.username,
            email : record.email,
            type : record.type,
            id : record.id
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
            let object = { username : username , name : name , email : email , type : type , authUserName : authUserName , authPassword : authPassword , password : password , confirmPassword : confirmPassword , queue : queueValue };
            console.log(authPassword)
            console.log(queueValue)
            setObj({name : name , email : email , type : type , password : password , confirmPassword : confirmPassword  })
            dispatch(CreateData(object))
        }
        else
        {
            let object = {username : username , name : name , email : email , type : type , id : id , queue : queueValue };
            setValidate(false)
            dispatch(UpdateData(object))
            setBtnName("Submit")
        }
    }
    const logout = () => {
        dispatch(userLogout())
    }

    useEffect(() => {
        if(type === "Inbound" || type === "Blended")
        {
            dispatch(queueData())
        }
    } , [type])


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
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Users</Breadcrumb.Item>
                    </Breadcrumb>
                    {users && users.error && <Alert
                        message={'Error'}
                        description={users.error}
                        type={"error"}
                        showIcon
                        closable
                    />}
                    {users && (users.type=="createData") && <Alert
                        message={'Success'}
                        description={"Inserted"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    {users && (users.type=="updata") && <Alert
                        message={'Success'}
                        description={"Updated"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    {users && (users.type=="delete") && <Alert
                        message={'Danger'}
                        description={"Deleted"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>
                        <Form name={"register"}  {...layout} initialValues={{remember: true,}} form={form} >
                            <Form.Item
                                name={"name"}
                                label={"Name"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter Name First"
                                }]}
                                onChange={(e) => {setName(e.target.value)}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={"username"}
                                label={"User Name"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter Name First"
                                }]}
                                onChange={(e) => {setUsername(e.target.value)}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={"email"}
                                label={"Email"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter UserName First"
                                }]}
                                onChange={(e) => {setEmail(e.target.value)}}
                            >
                                <Input />

                            </Form.Item>

                            <Form.Item
                                name={"type"}
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
                                    <option value="Blended">Blended</option>
                                    <option value="Normal">Normal</option>
                                </Select>

                            </Form.Item>
                            {(type != 'Normal') && (type != '') &&
                            <>
                                <Form.Item
                                    label="Auth Name"
                                    name="authUserName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your UserName!',
                                        },
                                    ]}
                                    onChange={(e) => {
                                        setAuthUserName(e.target.value)
                                    }}
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="Auth Password"
                                    name="authPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                    onChange={(e) => {
                                        setAuthPassword(e.target.value)
                                    }}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </>
                            }
                            {(type === 'Inbound') &&
                            <Form.Item
                                name={"queue"}
                                label={"Queue"}
                                rules={[{
                                    required: true,
                                    message: "Please Select Queue First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Queue"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        console.log(value)
                                        setQueueValue(value);
                                    }}
                                >
                                    <Select.Option value={null}>Select Queue Type</Select.Option>
                                    {queue.map((i) => (<Select.Option key={i.name} value={i.id}>{i.name}</Select.Option>))}
                                </Select>

                            </Form.Item>
                            }
                            {(type === 'Blended') &&
                            <Form.Item
                                name={"queue"}
                                label={"Queue"}
                                rules={[{
                                    required: true,
                                    message: "Please Select Queue First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Queue"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        console.log(value)
                                        setQueueValue(value);
                                    }}
                                >
                                    <Select.Option value={null}>Select Queue Type</Select.Option>
                                    {queue.map((i) => (<Select.Option key={i.name} value={i.id}>{i.name}</Select.Option>))}
                                </Select>

                            </Form.Item>
                            }
                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: validate,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                onChange={(e) => {setPassword(e.target.value)}}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item
                                label="Confirm Password"
                                name="confirm_password"
                                rules={[
                                    {
                                        required: validate,
                                        message: 'Please input your password!',
                                    },
                                ]}
                                onChange={(e) => {setConfirmPassword(e.target.value)}}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={handleSubmitAction}>
                                    {btnName}
                                </Button>
                            </Form.Item>

                        </Form>

                        <Table dataSource={data} scroll={{ x: 1500, y: 300 }} >

                            <Column title="UserName" dataIndex="name" key="name" />
                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="Type" dataIndex="type" key="type" />
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title="authUserName" dataIndex="auth_username" key="auth_username" />
                            <Column title="authPassowrd" dataIndex="auth_password" key="auth_password" />

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

export default Users
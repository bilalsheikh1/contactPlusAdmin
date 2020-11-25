import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input, Layout, Select, Space, Table, Alert, Menu} from "antd";
import {useDispatch,  useSelector} from "react-redux";
// import {CreateData, DeleteData, showData, UpdateData} from "../../actions/Users/Users";
import apiClient from "../../../axios/axios";
import SubMenu from "antd/es/menu/SubMenu";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {userLogout} from "../../../actions/logout/logout";
import {CreateInbound} from "../../../actions/IVR/IVRInbound";
// import {showData as queueData} from '../../actions/Queues/Queuse'

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

const IVRInbound = () => {

    const [id , setId] = useState()
    const [number , setNumber] = useState()
    const [module , setModule] = useState('')
    const [queue , setQueue] = useState([])
    const [btnName , setBtnName ] = useState("Submit")
    const [obj , setObj ] = useState([])
    const [data , setData] = useState([])
    const [validate , setValidate] = useState(true)
    const [form] = Form.useForm()

    const dispatch = useDispatch()
    const IVRInbound = useSelector(state => state.IVR)
    // const queuesData = useSelector(state => state.Queues.Queues)

    // useEffect(() => {
    //     console.log(queuesData)
    //     if(queuesData.type === "showData")
    //         setQueue(queuesData.Queues)
    // },[queuesData])

    useEffect(() => {
        console.log(IVRInbound.Users)
        if(IVRInbound.type === "showData")
            setData(IVRInbound.Users)

        else if (IVRInbound.type === "update"){
            if(IVRInbound.status == 1){
                // data.find( p => p.id == id && ( p.name = name, true ) && ( p.email = email, true ) && ( p.type = type, true ) ) ;
                form.setFieldsValue({
                    // name : setName(""),
                    module : setModule(""),
                    number : setNumber(""),
                })
            }
        }
        else if (IVRInbound.type === "delete"){
            if(IVRInbound.status == 1){
                console.log("delete")
                // let index = data.findIndex(x => x.id == id);
                console.log(id)
                setData(data.filter(item => item.id !== id))
                console.log(data)
            }
        }
        else if (IVRInbound.type == "createData"){
            console.log(IVRInbound.Users)
            if(IVRInbound.Users!=null && IVRInbound.Users!="") {
                // dispatch(showData())
                // setData([...data, {name , type , email , id }]);
                // setData(data.push(users.Users.name , users.Users.email , users.Users.type , users.Users.id));
                form.setFieldsValue({
                    // name : setName(""),
                    module : setModule(""),
                    number : setNumber(""),
                })
            }
        }
    }, [IVRInbound])

    // useEffect(() => {
    //     dispatch(showData())
    // },[])

    const onFinish = (values) => {
        console.log(values)
        handleSubmitAction()
    }

    const getDataByID = (record) => {
        setBtnName("Update")
        setNumber(record.number)
        setModule(record.module)
        setId(record.id)
        form.setFieldsValue({
            number : record.number,
            module : record.module,
        })
        // setObj({username : record.username , email : record.email , type : record.type , id : record.id })
    }

    const deleteData = (record) => {
        setId(record.id)
        // dispatch(DeleteData(record))
    }

    const handleSubmitAction = () => {
        if(btnName =="Submit")
        {
            // setObj({number : number , module : module })
            let object = {number : number , module : module }
            dispatch(CreateInbound(object))
        }
        else
        {
            setValidate(false)
            // dispatch(UpdateData(object))
            setBtnName("Submit")
        }
    }

    const logout = () => {
        dispatch(userLogout())
    }

    return (
        <>
            <Layout className="site-layout">

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>IVR</Breadcrumb.Item>
                        <Breadcrumb.Item>IVRInbound</Breadcrumb.Item>
                    </Breadcrumb>
                    {/*{users && users.error && <Alert*/}
                    {/*    message={'Error'}*/}
                    {/*    description={users.error}*/}
                    {/*    type={"error"}*/}
                    {/*    showIcon*/}
                    {/*    closable*/}
                    {/*/>}*/}
                    {/*{users && (users.type=="createData") && <Alert*/}
                    {/*    message={'Success'}*/}
                    {/*    description={"Inserted"}*/}
                    {/*    type={"success"}*/}
                    {/*    showIcon*/}
                    {/*    closable*/}
                    {/*/>}*/}
                    {/*{users && (users.type=="updata") && <Alert*/}
                    {/*    message={'Success'}*/}
                    {/*    description={"Updated"}*/}
                    {/*    type={"success"}*/}
                    {/*    showIcon*/}
                    {/*    closable*/}
                    {/*/>}*/}
                    {/*{users && (users.type=="delete") && <Alert*/}
                    {/*    message={'Danger'}*/}
                    {/*    description={"Deleted"}*/}
                    {/*    type={"success"}*/}
                    {/*    showIcon*/}
                    {/*    closable*/}
                    {/*/>}*/}
                    <div style={{ padding: 24, minHeight: 700 , background : '#fff' }}>
                        <Form name={"register"}  {...layout} initialValues={{remember: true,}} form={form} >
                            <Form.Item
                                name={"number"}
                                label={"Number"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter Number First"
                                }]}
                                onChange={(e) => {setNumber(e.target.value)}}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name={"module"}
                                label={"Module"}
                                rules={[{
                                    required : true ,
                                    message : "Please Select Module First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Module"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setModule(value)
                                    }}
                                >
                                    <option>Select Module Type</option>
                                    <option value="IVR">IVR</option>
                                    <option value="Queue">Queue</option>
                                </Select>

                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button type="primary" htmlType="submit" onClick={handleSubmitAction}>
                                    {btnName}
                                </Button>
                            </Form.Item>

                        </Form>

                        <Table dataSource={data} scroll={{ x: 1500, y: 700 }} >

                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title="Number" dataIndex="number" key="number" />
                            <Column title="Module" dataIndex="Module" key="Module" />
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

export default IVRInbound
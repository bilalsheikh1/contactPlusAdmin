import React, {useEffect, useState} from "react";
import {Breadcrumb, Layout, Table, Form, Button, InputNumber, Input, Space, Alert, Menu, Spin} from "antd";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {CreateData, DeleteData, showData, UpdateData} from "../../actions/PauseReason/PauseReason";
import {userLogout} from "../../actions/logout/logout";
import SubMenu from "antd/es/menu/SubMenu";
import {Link} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";

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

const PauseReason = () => {

    const [name , setName ] =  useState();
    const [id , setID ] = useState();
    const [btnName , setBtnName ] = useState("Submit");
    const [obj , setObj ] = useState([])
    const [data , setData] = useState([]);
    const [form] = Form.useForm();
    const [loading , setLoading] = useState(false)
    const dispatch = useDispatch();
    const pauseReason = useSelector(state => state.PauseReason);

    useEffect(() => {
        setLoading(false)
        if(pauseReason.type === "showData")
            setData(pauseReason.PauseReason)

        else if(pauseReason.type === "createData"){
            console.log(pauseReason)
            if(pauseReason.status == 1) {
                dispatch(showData())
                // setData({...data} , workCode.WorkCode)
                // data.push(workCode.WorkCode)
                form.setFieldsValue({
                    name : setName(""),
                })
            }
        }
        else if (pauseReason.type === "update"){
            if(pauseReason.status == 1){
                console.log(name)
                data.find( p => p.id == id && ( p.name = name, true )) ;
                form.setFieldsValue({
                    name : setName(""),
                })
                setBtnName("Submit")
            }
        }
        else if (pauseReason.type === "delete"){
            if(pauseReason.status == 1){
                console.log("delete")
                // let index = data.findIndex(x => x.id == id);
                console.log(id)
                setData(data.filter(item => item.id !== id))
                console.log(data)
            }
        }
    },[pauseReason])


    useEffect(() => {
        dispatch(showData())
        setLoading(true)
    },[])

    const onFinish = (values) => {
        console.log(values);
        handleSubmitAction()
    };

    const getDataByID = (record) => {
        // let records = dispatch(GetDataByID(record))
        setName(record.name)
        setID(record.id)
        setBtnName("Update")
        form.setFieldsValue({
            name : record.name,
        })
        setObj({name : record.name ,id : record.id })
    }

    const deleteData = (record) => {
        setID(record.id)
        dispatch(DeleteData(record))
    }

    const handleSubmitAction = () => {
        if(btnName =="Submit")
        {
            setObj({name : name })
            let obj = {name : name };
            console.log(name)
            dispatch(CreateData(obj))
        }
        else
        {
            let obj = {name : name , id : id};
            console.log(name)
            dispatch(UpdateData(obj))
        }
        setLoading(true)
    }

    return (
        <>
            <Layout className="site-layout">

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Admin</Breadcrumb.Item>
                        <Breadcrumb.Item>Pause Reason</Breadcrumb.Item>
                    </Breadcrumb>
                    {pauseReason && pauseReason.error && <Alert
                        message={'Error'}
                        description={pauseReason.error}
                        type={"error"}
                        showIcon
                        closable
                    />}
                    {pauseReason && (pauseReason.type=="createData") && <Alert
                        message={'Success'}
                        description={"Inserted"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    {pauseReason && (pauseReason.type=="update") && <Alert
                        message={'Success'}
                        description={"Updated"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    {pauseReason && (pauseReason.type=="delete") && <Alert
                        message={'Success'}
                        description={"Deleted"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    <Spin tip="Loading..." spinning={loading}>
                    <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>

                        <Form {...layout} name="nest-messages" onFinish={onFinish} form={form} validateMessages={validateMessages}>
                            <Form.Item
                                name='name'
                                label="Name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input size="large" onChange = {(e) => {setName(e.target.value)}} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                                <Button type="primary" htmlType="submit" name="Submit" >
                                    {btnName}
                                </Button>
                            </Form.Item>
                        </Form>

                        <Table dataSource={data} scroll={{ x: 1500, y: 300 }} >

                            <Column title="ID" dataIndex="id" key="id" />
                            <Column title="Name" dataIndex="name" key="name" />
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
                    </Spin>
                </Content>
            </Layout>
        </>
    );
}

export default PauseReason;
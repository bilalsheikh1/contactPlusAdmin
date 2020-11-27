import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input, Layout, Select, Space, Table, Alert, Menu, Spin} from "antd";
import {useDispatch,  useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {GetIVR} from "../../../actions/IVR/IVR";

const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;

const IVRList = () => {

    // const [id , setId] = useState()
    // const [name , setName] = useState()
    const [loading , setLoading] = useState(false)
    const [data , setData] = useState([])
    const dispatch = useDispatch()
    const IVRInbound = useSelector(state => state.IVR)

     useEffect(() => {
         setLoading(false)
        if(IVRInbound.type === "showData") {
            setData(IVRInbound.IVR)
        }
    }, [IVRInbound])

    useEffect(() => {
        setLoading(true)
        dispatch(GetIVR())
    },[])

    return (
        <>
            <Layout className="site-layout">
                <Spin tip="Loading..." spinning={loading}>
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>IVR</Breadcrumb.Item>
                        <Breadcrumb.Item>IVRList</Breadcrumb.Item>
                    </Breadcrumb>

                    <div style={{ padding: 24, minHeight: 700 , background : '#fff' }}>
                        <Table dataSource={data} scroll={{ x: 1400, y: 700 }} >
                            <Column title="Name" dataIndex="name" key="name" />
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Link to={{pathname : 'IVR' , query : {name: record, script: record} }} >
                                            <Button>Update IVR</Button>
                                        </Link>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                </Content>
                </Spin>
            </Layout>
        </>
    )
}

export default IVRList
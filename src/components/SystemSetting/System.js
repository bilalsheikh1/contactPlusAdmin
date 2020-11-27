import React, {useEffect, useState} from "react";
import {
    Alert,
    Breadcrumb,
    Button,
    Form,
    Input,
    Layout,
    Menu,
    Modal,
    Select,
    Space, Spin,
    Switch as CheckboBtn,
    Table,
    Upload
} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {updateLogo} from "../../actions/logo/logo";
import SubMenu from "antd/es/menu/SubMenu";
import {Link, Redirect, Route} from "react-router-dom";
import {userLogout} from "../../actions/logout/logout";
import {UserOutlined} from "@ant-design/icons";
import '../../index.css';
import {changeThemes, createData, ShowData, updateData} from "../../actions/SystemSetting/SystemSetting";
import useHistory from "react-router-dom";
import isLogin from "../../auth";
import SystemSetting from "../../reducers/SystemSetting";


const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const layout = {
    labelCol: {
        span: 4,
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
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
const rightStyle = {position: 'absolute', top: 0, right: 0}
const System = () =>
{
    let [previewVisible , setPreviewVisible] = useState(false)
    let [previewImage , setPreviewImage] = useState('')
    let [previewTitle , setPreviewTitle] = useState('')
    let [fileList , setFileList] = useState([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }
    ])

    const [id , setID] = useState()
    const [server_address , setServer_address] = useState()
    const [wss_port , setWss_port] = useState()
    const [manager_port , setManager_port] = useState()
    const [username , setUsername] = useState()
    const [secret , setSecret] = useState()
    const [connection_timeout , setConnection_timeout] = useState()
    const [read_timeout , setRead_timeout] = useState()
    const [btnName , setBtnName ] = useState("Submit");
    const [tableData , setTableData ] = useState([]);
    const [themeID , setThemeID] = useState()
    const [theme , setTheme] = useState()

    const dispatch = useDispatch();
    const [data , setData] = useState({  previewVisible , previewImage , previewTitle , fileList })
    const system = useSelector(state => state.systemSetting)
    const [loading , setLoading] = useState(false)
    const [form] = Form.useForm();

    useEffect(() => {
        dispatch(ShowData())
        setLoading(true)
    },[])

    useEffect(() => {
        setLoading(false)
        if(system.type === "showSetting") {
            setTableData([system.systemSetting])
            setThemeID(system.systemSetting.id)
            console.log(system.systemSetting.id)
        }

        else if (system.type === "update"){
            if(system.status == 1){
                tableData.find( p => p.id == id && ( p.server_address = server_address, true ) && ( p.wss_port = wss_port, true ) && ( p.manager_port = manager_port, true )  && ( p.username = username, true )
                    && ( p.secret = secret, true )  && ( p.connection_timeout = connection_timeout, true )   && ( p.read_timeout = read_timeout, true ) ) ;
                form.setFieldsValue({
                    server_address : setServer_address(""),
                    wss_port : setWss_port(""),
                    manager_port : setManager_port(""),
                    username : setUsername(""),
                    secret : setSecret(""),
                    connection_timeout : setConnection_timeout(""),
                    read_timeout : setRead_timeout(""),
                })
                setBtnName("Submit")
            }
        }
    }, [system])



    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file);
        }
        setData({
            previewImage: file.url || file.preview,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
            fileList
        });
    };

    const handleChange = ({fileList}) => {
        setFileList(fileList);
    }
    const handleSubmitAction = () => {
        if(btnName =="Update")
        {
            let object = {id : id , server_address : server_address , wss_port : wss_port , manager_port : manager_port , username : username , secret : secret ,connection_timeout : connection_timeout , read_timeout : read_timeout};
            dispatch(updateData(object))
            setBtnName("Submit")
            setLoading(true)
        }
    }
    const handleCancel = () => this.setState({ previewVisible: false });

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const getDataByID = (record) => {
        // let records = dispatch(GetDataByID(record))
        setBtnName("Update")
        setWss_port(record.wss_port)
        setRead_timeout(record.read_timeout)
        setConnection_timeout(record.connection_timeout)
        setSecret(record.secret)
        setUsername(record.username)
        setManager_port(record.manager_port)
        setServer_address(record.server_address)
        setID(record.id)
        form.setFieldsValue({
            wss_port : record.wss_port,
            read_timeout : record.read_timeout,
            connection_timeout : record.connection_timeout,
            secret : record.secret,
            username : record.username,
            manager_port : record.manager_port,
            server_address : record.server_address,
        })
    }

    const changeTheme = async (value) => {
        let object = {id : themeID , theme : value ? 'dark' : 'light'}
        dispatch(changeThemes(object))
        setLoading(true)
    };

    return (
        <>

            <Layout className="site-layout">

                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>System Setting</Breadcrumb.Item>
                        <Breadcrumb.Item>Logo</Breadcrumb.Item>
                    </Breadcrumb>
                    {system && system.error && <Alert
                        message={'Error'}
                        description={system.error}
                        type={"error"}
                        showIcon
                        closable
                    />}
                    {system && (system.type=="update") && <Alert
                        message={'Success'}
                        description={"Updated"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    <Spin tip="Loading..." spinning={loading}>
                    <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>
                        <Form name={"register"}  {...layout} initialValues={{remember: true,}} form={form} >

                            <Form.Item
                                label="Server Address"
                                name="server_address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your server Address!',
                                    },
                                ]}
                                onChange={(e) => {
                                    setServer_address(e.target.value)
                                }}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="WSS Port"
                                name="wss_port"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input WSS Port Address!',
                                    },
                                ]}
                                onChange={(e) => {
                                    setWss_port(e.target.value)
                                }}
                            >
                                <Input/>
                            </Form.Item>
            
                            <Form.Item
                                label="Manager Port"
                                name="manager_port"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Manager Port !',
                                    },
                                ]}
                                onChange={(e) => {
                                    setManager_port(e.target.value)
                                }}
                            >
                                <Input/>
                            </Form.Item>
            
                            <Form.Item
                                label="User Name"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input User Name!',
                                    },
                                ]}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            >
                                <Input/>
                            </Form.Item>
            
                            <Form.Item
                                label="Secret"
                                name="secret"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input secret!',
                                    },
                                ]}
                                onChange={(e) => {
                                    setSecret(e.target.value)
                                }}
                            >
                                <Input/>
                            </Form.Item>
            
                            <Form.Item
                                label="Connection Timeout"
                                name="connection_timeout"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Connection Timeout!',
                                    },
                                ]}
                                onChange={(e) => {
                                    setConnection_timeout(e.target.value)
                                }}
                            >
                                <Input/>
                            </Form.Item>
                            <Space size="middle"></Space>
                            <Form.Item
                                label="Read Timeout"
                                name="read_timeout"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input Read Timeout!',
                                    },
                                ]}
                                onChange={(e) => {
                                    setRead_timeout(e.target.value)
                                }}
                            >
                                <Input/>
                            </Form.Item>
            
                            <Form.Item
                                name={"logo"}
                                label={"Logo"}
                                rules={[{
                                    required : true ,
                                    message : "Please Enter Name First"
                                }]}
                                // onChange={(e) => {setName(e.target.value)}}
                            >
                                <Upload
                                    action={(e) => dispatch(updateLogo(e))}
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                >
                                    {fileList.length == 1 ? null : uploadButton}
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                >
                                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                </Modal>
                            </Form.Item>
            
                            <Form.Item
                                label={"Theme"}
                            >
                                <CheckboBtn
                                    checked={theme}
                                    onChange={changeTheme}
                                    checkedChildren={(theme === 'dark') ? 'light' : 'dark'}
                                    unCheckedChildren={(theme === 'dark') ? 'dark' : 'light'}
                                />
                            </Form.Item>
                            {btnName == "Update" &&
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit" onClick={handleSubmitAction}>
                                        Update
                                    </Button>
                                </Form.Item>
                            }
                        </Form>
            
                        <Table dataSource={tableData} scroll={{ x: 1500, y: 300 }} >
            
                            <Column title="ServerAddress" dataIndex="server_address" key="server_address" />
                            <Column title="WSSPort" dataIndex="wss_port" key="wss_port" />
                            <Column title="ManagerPort" dataIndex="manager_port" key="manager_port" />
                            <Column title="username" dataIndex="username" key="username" />
                            <Column title="secret" dataIndex="secret" key="secret" />
                            <Column title="ConnectionTimeout" dataIndex="connection_timeout" key="connection_timeout" />
                            <Column title="ReadTimeout" dataIndex="read_timeout" key="read_timeout" />
                            <Column title="ID" dataIndex="id" key="id" />
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        <Button onClick={() => { getDataByID(record)}} >Update</Button>
                                    </Space>
                                )}
                            />
                        </Table>
                    </div>
                    </Spin>
                </Content>
            </Layout>
        </>
    )
}

export default System

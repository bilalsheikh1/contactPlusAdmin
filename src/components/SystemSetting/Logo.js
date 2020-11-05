import React, {useState} from "react";
import {Alert, Breadcrumb, Button, Form, Input, Layout, Menu, Modal, Select, Space, Table, Upload} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {useDispatch} from "react-redux";
import {updateLogo} from "../../actions/logo/logo";
import SubMenu from "antd/es/menu/SubMenu";
import {Link} from "react-router-dom";
import {userLogout} from "../../actions/logout/logout";
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

const tailLayout = {
    wrapperCol: {
        offset: 3,
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

const Logo = () =>
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

    const dispatch = useDispatch();
    const [data , setData] = useState({  previewVisible , previewImage , previewTitle , fileList })

    // let { previewVisible, previewImage, fileList, previewTitle } = data;
    const [form] = Form.useForm();

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
        console.log("ok ok ok ok ok ok ")
    }

    const handleCancel = () => this.setState({ previewVisible: false });

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
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
                        <Breadcrumb.Item>System Setting</Breadcrumb.Item>
                        <Breadcrumb.Item>Logo</Breadcrumb.Item>
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
                    <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>
                        <Form name={"register"}  {...layout} initialValues={{remember: true,}} form={form} >
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

                        </Form>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created By Bilal</Footer>
            </Layout>
        </>
    )
}

export default Logo
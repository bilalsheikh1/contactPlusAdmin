import React, {useEffect, useState} from "react";
import {Breadcrumb, Card, Layout, Menu, Space} from "antd";
import {UserOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import SubMenu from "antd/es/menu/SubMenu";
import {useDispatch, useSelector} from "react-redux";
import {userLogout} from '../../actions/logout/logout'
import {showData} from "../../actions/SystemSetting/SystemSetting";
import { createBrowserHistory } from 'history';


const { Header, Content, Footer, Sider } = Layout;
const rightStyle = {position: 'absolute', top: 0, right: 0}

const Dashboard = () => {

    const [theme , setTheme] = useState("dark")
    const dispatch = useDispatch();
    // const userLogouts = useSelector(state => state.logout)
    const themeUpdate = useSelector(state => state.SystemSetting)
    const user = useSelector(state => state.loggedIn)

    // useEffect(() => {
    //     if(themeUpdate.type === 'showData') {
    //         setTheme(themeUpdate.systemSetting.theme)
    //         setThemeID(themeUpdate.systemSetting.id)
    //     }
    //     if(themeUpdate.status ==1)
    //     {
    //         setTheme((theme === "dark") ? "light" : "dark")
    //     }
    //     // console.log(systemSetting.status)
    // },[systemSetting])

    const history =  createBrowserHistory();


    // useEffect(() => {
    //     if(user.loggedIn)
    //         history.push("/");
    // }, [user])

    const logout = () => {
        dispatch(userLogout())
    }
    // useEffect(() => {
    //     dispatch(showData())
    // },[themeUpdate])

    return (
        <>
            <Layout className="site-layout">
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                        <Space direction="horizontal" >
                            <Card title="Total User" style={{ width: 300 , background : '#689F38' , color : '#fff' , fontWeight : 'bold'}} >
                                <p>Inbound   10</p>
                                <p>Outbound   20</p>
                                <p>Blended    30</p>
                            </Card>
                            <Card title="Total Agent" style={{ width: 300 , background : '#2196F3', color : '#fff' , fontWeight : 'bold'}}>
                                <p>Inbound   10</p>
                                <p>Outbound   20</p>
                                <p>Blended    30</p>
                            </Card>
                            <Card title="Total Extension" style={{ width: 300 , background : '#FF9800' , color : '#fff' , fontWeight : 'bold'}}>
                                <p>Inbound   10</p>
                                <p>Outbound   20</p>
                                <p>Blended    30</p>
                            </Card>
                            <Card title="Total Routes" style={{ width: 300 , background : '#F44336' , color : '#fff' , fontWeight : 'bold'}}>
                                <p>Inbound   10</p>
                                <p>Outbound   20</p>
                                <p>Blended    30</p>
                            </Card>
                        </Space>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created By Bilal</Footer>
            </Layout>
        </>
    );
}

export default Dashboard;
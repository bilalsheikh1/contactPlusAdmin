import {Layout, Menu, Breadcrumb, Image, Switch as CheckboBtn, Form, Spin} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
    SettingFilled,
    UserSwitchOutlined,
    UsergroupAddOutlined,
    FormatPainterOutlined,
    SolutionOutlined,
    PauseCircleOutlined,
    FileDoneOutlined,
} from '@ant-design/icons';
import React, {useEffect, useState} from "react";
import '../../App.css';
import {Link, Route,Switch} from "react-router-dom";
import Register from "../Register/Register";
import PrivateRoute from "../../Routes/PrivateRoute";
import Users from "../user/users";
import Dashboard from "../dashboard/dashboard";
import Inbound from "../Agent/Inbound";
import Outbound from "../Agent/Outbound";
import Blended from "../Agent/Blended";
import IVRInbound from "../Routes/Inbound"
import RoutesOutbound from "../Routes/RoutesOutbound";
import IVR from "../IVR/IVR"
import Queues from '../Queues/Queuse'
import Extension from "../extension/Extension";
import {useDispatch, useSelector} from "react-redux";
import System from "../SystemSetting/System";
import changePassword from "../changePassword/changePassword";
import WorkCode from "../WorkCode/WorkCode";
import PauseReason from "../PauseReason/PauseReason";
import {userLogout} from "../../actions/logout/logout";
import IVRList from "../IVR/IVRInbound/IVRList";
import { useHistory } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const rightStyle = {position: 'absolute', top: 0, right: 10}


const SideBar = () => {

    const [collapsed , setCollapsed] = useState(false);
    const [current , setCurrent] = useState(1);
    const [theme , setTheme] = useState()
    const [themeID , setThemeID] = useState()
    const [loading , setLoading] = useState(false)
    const systemSetting = useSelector(state => state.systemSetting);
    const dispatch = useDispatch();
    const history = useHistory();
    const logoutResponse = useSelector(state => state.logout)

    useEffect(() => {
        setLoading(false)
        if(logoutResponse.type === "update")
        {
            history.push('/login')
        }
    } ,[logoutResponse])

    const logout = () => {
        setLoading(true)
        dispatch(userLogout())
    }

    const onCollapsed= (collapseds ) => {
        setCollapsed(collapseds);
    };

    const handleClick = (e) => {
        setCurrent(e.key)
    };

    return(
        <>
            <Layout>
                <Spin tip="Loading..." spinning={loading}>
                <Header theme="light" >
                    <div className="logo" >
                        <Image src="images/logo.png"  />
                    </div>
                    <Menu selectable={false} mode='horizontal' style={rightStyle} theme={"dark"}>
                        <SubMenu key="sub1" icon={<UserOutlined />} title="User" >
                            <Menu.Item key="20" style={{marginRight : "12px"}}>
                                <Link to={"/changePassword"}>Change Password</Link>
                            </Menu.Item>
                            <Menu.Item key="21" onClick={logout}>Logout</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed} width={200} style={{minHeight : 1000}}>

                    <Menu  defaultSelectedKeys={['0']}
                          theme={theme}
                          onClick={handleClick}
                          defaultOpenKeys={['1']}
                          selectedKeys={[current]}
                          mode="inline"
                          style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="1" icon={<PieChartOutlined/>} >
                            <Link to={"/dashboard"} >Dashboard</Link>
                        </Menu.Item>

                        <Menu.Item key="2" icon={<UserOutlined />} >
                            <Link to={"/users"} >Users</Link>
                        </Menu.Item>

                        <SubMenu key="sub2" icon={<UserOutlined />} title="Routes"> {/*Routes*/}
                            <Menu.Item key="6">
                                <Link to={"/Inbound"}>Inbound</Link> {/*Inbound*/}
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to={"/routesOutbound"}>Comming Soon</Link> {/*Outbound*/}
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub3" icon={<PieChartOutlined />} title="IVR">
                            <Menu.Item key="8"  >
                                <Link to={"/IVR"}>IVR Nodes</Link>
                            </Menu.Item>
                            <Menu.Item key="91">
                                <Link to={"/IVRList"}>IVRList</Link> {/*Outbound*/}
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="9" icon={<UsergroupAddOutlined />} >
                            <Link to={"/Queues"}>Queues</Link>
                        </Menu.Item>

                        <Menu.Item key="10" icon={<FormatPainterOutlined />} >
                            <Link to={"/extension"}>Extension</Link>
                        </Menu.Item>

                        <Menu.Item key="11" icon={<SolutionOutlined />} >
                            <Link to={"/workcode"}>Work Code</Link>
                        </Menu.Item>

                        <Menu.Item key="12" icon={<PauseCircleOutlined />} >
                            <Link to={"/pauseReason"}>Pause Reason</Link>
                        </Menu.Item>

                        <SubMenu key="sub4" icon={<FileDoneOutlined />} title="Reports">
                            <Menu.Item key="13">CDR</Menu.Item>
                            <Menu.Item key="14">Login Report</Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub5" icon={<SettingFilled />} title="System Setting">
                            <Menu.Item key="16">
                                <Link to={"setting"} >Settings</Link>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>

                <Switch>
                    <PrivateRoute path='/dashboard' restricted={false}  exact component={Dashboard} />
                    <PrivateRoute path="/users" restricted={true} component={Users} />
                    <PrivateRoute path="/actionInbound" component={Inbound} />
                    <PrivateRoute path="/actionOutbound" component={Outbound} />
                    <PrivateRoute path="/actionBlended" component={Blended} />
                    <PrivateRoute path="/routesOutbound" component={RoutesOutbound} />
                    <PrivateRoute path="/IVR" component={IVR} />
                    <PrivateRoute path="/Queues" component={Queues} />
                    <PrivateRoute path="/extension" component={Extension} />
                    <PrivateRoute path="/register" component={Register} />
                    <PrivateRoute path="/setting" component={System} />
                    <PrivateRoute path="/changePassword" component={changePassword} />
                    <PrivateRoute path="/workcode" component={WorkCode} />
                    <PrivateRoute path="/pauseReason" component={PauseReason} />
                    <PrivateRoute path="/IVRList" component={IVRList} />
                    <PrivateRoute path="/Inbound" component={IVRInbound} />
                </Switch>
              </Layout>
                </Spin>
                <Footer style={{ textAlign: 'center' }}>Created By Dev Team @ Telecard</Footer>
            </Layout>
        </>
    );
}

export default SideBar;
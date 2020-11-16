import {Layout, Menu, Breadcrumb, Image, Switch as CheckboBtn, Form} from 'antd';
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
import Login from "../Login/Login";
import Register from "../Register/Register";
import PrivateRoute from "../../Routes/PrivateRoute";
import Home from "../Home/Home";
import Users from "../user/users";
import Dashboard from "../dashboard/dashboard";
import Inbound from "../Agent/Inbound";
import Outbound from "../Agent/Outbound";
import Blended from "../Agent/Blended";
import RoutesInbound from "../Routes/RoutesInbound"
import RoutesOutbound from "../Routes/RoutesOutbound";
import IVR from "../IVR/IVR"
import Queues from '../Queues/Queuse'
import Extension from "../extension/Extension";
import {changeThemes, showTheme} from '../../actions/SystemSetting/SystemSetting'
import {Theme,themeUpdate} from "../../helper/GlobalThemeColor";
import {useDispatch, useSelector} from "react-redux";
import SystemSetting from "../../reducers/SystemSetting";
import System from "../SystemSetting/System";
import changePassword from "../changePassword/changePassword";
import WorkCode from "../WorkCode/WorkCode";
import PauseReason from "../PauseReason/PauseReason";
import {userLogout} from "../../actions/logout/logout";
import Routes from "../../Routes";
import PublicRoute from "../../Routes/PublicRoute";


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const rightStyle = {position: 'absolute', top: 0, right: 10}


const SideBar = () => {

    const [collapsed , setCollapsed] = useState(false);
    const [current , setCurrent] = useState(1);
    const [theme , setTheme] = useState()
    const [themeID , setThemeID] = useState()

    const systemSetting = useSelector(state => state.systemSetting);
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(userLogout())
    }

    useEffect(() => {
        console.log("first time")
        if(systemSetting.type === 'showTheme') {
            // setTheme(systemSetting.systemSetting.theme)
            // setThemeID(systemSetting.systemSetting.id)
        }
        if(systemSetting.status ==1)
        {
            setTheme((theme === "dark") ? "light" : "dark")
        }
        // console.log(systemSetting.status)
    },[systemSetting])

    // useEffect(() => {
    //     // dispatch(showTheme())
    // },[])

    const onCollapsed= (collapseds ) => {
        console.log(collapseds);
        setCollapsed(collapseds);
    };

    const handleClick = (e) => {
        console.log('click ', e);
            setCurrent(e.key)
    };

    const changeTheme = async (value) => {
        // setTheme(value ? 'dark' : 'light')
        // theme =await themeUpdate(value ? 'dark' : 'light');
        console.log(value ? 'dark' : 'light')
        let object = {id : themeID , theme : value ? 'dark' : 'light'}
        dispatch(changeThemes(object))
        // setTheme(await themeUpdate(value ? 'dark' : 'light'))
        // console.log(theme)

        // Theme(value ? 'dark' : 'light')
    };

    return(
        <>
            <Layout>
                <Header theme="light" >
                    <div className="logo" >
                        <Image src="images/logo.png"  />
                    </div>
                    <Menu selectable={false} mode='horizontal' style={rightStyle} theme={"dark"}>
                        <SubMenu key="sub2" icon={<UserOutlined />} title="User" >
                            <Menu.Item key="20" style={{marginRight : "12px"}}>
                                <Link to={"/changePassword"}>Change Password</Link>
                            </Menu.Item>
                            <Menu.Item key="21" onClick={logout}>Logout</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Header>
                <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed} width={200} >

                    <Menu  defaultSelectedKeys={['0']}
                          theme={theme}
                          onClick={handleClick}
                          defaultOpenKeys={['sub1']}
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

                        {/*<SubMenu key="sub1" icon={<UserOutlined />} title="Agents">*/}
                        {/*    <Menu.Item key="3">*/}
                        {/*        <Link to={"/actionInbound"}>Inbound</Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="4">*/}
                        {/*        <Link to={"/actionOutbound"}>Outbound</Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*    <Menu.Item key="5">*/}
                        {/*        <Link to={"/actionBlended"}>Blended</Link>*/}
                        {/*    </Menu.Item>*/}
                        {/*</SubMenu>*/}

                        <SubMenu key="sub2" icon={<UserOutlined />} title="Routes"> {/*Routes*/}
                            <Menu.Item key="6">
                                <Link to={"/routesInbound"}>Comming Soon</Link> {/*Inbound*/}
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to={"/routesOutbound"}>Comming Soon</Link> {/*Outbound*/}
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="8" icon={<PieChartOutlined />} >
                            <Link to={"/IVR"}>IVR</Link>
                        </Menu.Item>

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

                        <SubMenu key="sub3" icon={<FileDoneOutlined />} title="Reports">
                            <Menu.Item key="13">CDR</Menu.Item>
                            <Menu.Item key="14">Login Report</Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub4" icon={<SettingFilled />} title="System Setting">

                            <Menu.Item key="16">
                                <Link to={"setting"} >Settings</Link>
                            </Menu.Item>
                        </SubMenu>

                        {/*<Menu.Item key=""  >*/}

                        {/*</Menu.Item>*/}
                    </Menu>
                </Sider>

                <Switch>
                    <PrivateRoute path='/dashboard' restricted={false}  exact component={Dashboard} />
                    <PrivateRoute path="/users" restricted={true} component={Users} />
                    <PrivateRoute path="/actionInbound" component={Inbound} />
                    <PrivateRoute path="/actionOutbound" component={Outbound} />
                    <PrivateRoute path="/actionBlended" component={Blended} />
                    <PrivateRoute path="/routesInbound" component={RoutesInbound} />
                    <PrivateRoute path="/routesOutbound" component={RoutesOutbound} />
                    <PrivateRoute path="/IVR" component={IVR} />
                    <PrivateRoute path="/Queues" component={Queues} />
                    <PrivateRoute path="/extension" component={Extension} />
                    <PrivateRoute path="/register" component={Register} />
                    <PrivateRoute path="/setting" component={System} />
                    <PrivateRoute path="/changePassword" component={changePassword} />
                    <PrivateRoute path="/workcode" component={WorkCode} />
                    <PrivateRoute path="/pauseReason" component={PauseReason} />
                </Switch>
              </Layout>
            </Layout>
        </>
    );
}

export default SideBar;
import {Layout, Menu, Breadcrumb, Image ,Switch as CheckboBtn} from 'antd';
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import React, {useState} from "react";
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

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SideBar = () => {

    const [collapsed , setCollapsed] = useState(false);
    const [theme , setTheme] = useState("dark");
    const [current , setCurrent] = useState(1);

    const onCollapsed= (collapseds ) => {
        console.log(collapseds);
        setCollapsed(collapseds);
    };

    const handleClick = (e) => {
        console.log('click ', e);
            setCurrent(e.key)
    };

    const changeTheme = (value) => {
        setTheme(value ? 'dark' : 'light')
    };


    return(
        <>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed} >
                    <Header >
                        <div className="logo" >
                            <Image src="images/logo.png"  />
                        </div>

                    </Header>

                    <Menu  defaultSelectedKeys={['1']}
                          theme={theme}
                          onClick={handleClick}
                          // defaultOpenKeys={['sub1']}
                          selectedKeys={[current]}
                          mode="inline"
                           style={{minHeight: '1000px'}}
                    >
                        <Menu.Item key="1" icon={<PieChartOutlined/>} >
                            <Link to={"/dashboard"} >Dashboard</Link>
                        </Menu.Item>

                        <Menu.Item key="2" icon={<PieChartOutlined />} >
                            <Link to={"/users"} >Users</Link>
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<UserOutlined />} title="Agents">
                            <Menu.Item key="3">
                                <Link to={"/actionInbound"}>Inbound</Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Link to={"/actionOutbound"}>Outbound</Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to={"/actionBlended"}>Blended</Link>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="sub2" icon={<UserOutlined />} title="Routes">
                            <Menu.Item key="6">
                                <Link to={"/routesInbound"}>Inbound</Link>
                            </Menu.Item>
                            <Menu.Item key="7">
                                <Link to={"/routesOutbound"}>Outbound</Link>
                            </Menu.Item>
                        </SubMenu>

                        <Menu.Item key="8" icon={<PieChartOutlined />} >
                            <Link to={"/IVR"}>IVR</Link>
                        </Menu.Item>

                        <Menu.Item key="9" icon={<PieChartOutlined />} >
                            <Link to={"/Queues"}>Queues</Link>
                        </Menu.Item>

                        <SubMenu key="sub3" icon={<UserOutlined />} title="Reports">
                            <Menu.Item key="10">CDR</Menu.Item>
                            <Menu.Item key="11">Login Report</Menu.Item>
                        </SubMenu>

                        <Menu.Item key="1"  >
                            <CheckboBtn
                                checked={theme === 'dark'}
                                onChange={changeTheme}
                                checkedChildren="Dark"
                                unCheckedChildren="Light"
                            />
                        </Menu.Item>
                    </Menu>
                </Sider>

                <Switch>
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route path="/users" component={Users} />
                    <Route path="/actionInbound" component={Inbound} />
                    <Route path="/actionOutbound" component={Outbound} />
                    <Route path="/actionBlended" component={Blended} />
                    <Route path="/routesInbound" component={RoutesInbound} />
                    <Route path="/routesOutbound" component={RoutesOutbound} />
                    <Route path="/IVR" component={IVR} />
                    <Route path="/Queues" component={Queues} />
                    <Route path="/register" component={Register} />
                    {/*<PrivateRoute path="/home" >*/}
                    {/*    <Home />*/}
                    {/*</PrivateRoute>*/}
                </Switch>
            </Layout>
        </>
    );
}

export default SideBar;
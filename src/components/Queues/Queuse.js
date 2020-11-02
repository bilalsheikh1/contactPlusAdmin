import React, {useEffect, useState} from "react";
import {Modal, Breadcrumb, Button, Form, Input, Layout, Select, Space, Table, Alert} from "antd";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {CreateData, DeleteData, UpdateData} from "../../actions/Queues/Queuse";
import {showData} from "../../actions/Queues/Queuse";



const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const layout = {
    labelCol: {
        span: 4,
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

const Outbound = () => {

    const[name , setName ] = useState("");
    const[musicOnHold , setMusicOnHold ] =  useState("");
    const[announce , setAnnounce ] = useState("");
    const[context , setContext ] = useState("");
    const[timeout , setTimeout ] = useState();
    const[ringInUse , setRingInUse ] = useState("");
    const[setInterfaceVar , setSetInterfaceVar ] = useState("");
    const[setQueueVar , setSetQueueVar ] = useState("");
    const[setQueueentryVar , setSetQueueentryVar ] = useState("");
    const[monitor_format , setMonitor_format ] = useState("");
    const[memberMacro , setMemberMacro ] = useState("");
    const[memberGoSub , setMemberGoSub ] = useState("");
    const[queue_YouAreNext , setQueue_YouAreNext ] = useState("");
    const[queue_ThereAre , setQueue_ThereAre ] = useState("");
    const[queue_CallsWaiting , setQueue_CallsWaiting ] = useState("");
    const[queue_Quantity1 , setQueue_Quantity1 ] = useState("");
    const[queue_Quantity2 , setQueue_Quantity2 ] = useState("");
    const[queue_HoldTime , setQueue_HoldTime ] = useState("");
    const[queue_Minutes , setQueue_Minutes ] = useState("");
    const[queue_Minute , setQueue_Minute ] = useState("");
    const[queue_Seconds , setQueue_Seconds ] = useState("");
    const[queue_Thankyou , setQueue_Thankyou ] = useState("");
    const[queue_CallerAnnounce , setQueue_CallerAnnounce ] = useState("");
    const[queue_ReportHold , setQueue_ReportHold ] = useState("");
    const[announce_Frequency , setAnnounce_Frequency ] = useState("");
    const[announce_To_First_User , setAnnounce_To_First_User ] = useState("");
    const[min_Announce_Frequency , setMin_Announce_Frequency ] = useState("");
    const[announce_Round_Seconds , setAnnounce_Round_Seconds ] = useState("");
    const[announce_HoldTime , setAnnounce_HoldTime ] = useState("");
    const[announce_Position , setAnnounce_Position ] = useState("");
    const[announce_Position_Limit , setAnnounce_Position_Limit ] = useState();
    const[periodic_Announce , setPeriodic_announce ] = useState("");
    const[periodic_Announce_Frequency , setPeriodic_Announce_Frequency ] = useState("");
    const[relative_Periodic_Announce , setRelative_Periodic_Announce ] = useState();
    const[random_Periodic_Announce, setRandom_Periodic_Announce ] = useState("");
    const[retry , setRetry ] = useState();
    const[wrapUpTime , setWrapUpTime ] = useState();
    const[penaltyMembersLimit , setPenaltyMembersLimit ] = useState();
    const[autofill , setAutofill ] = useState();
    const[monitor_Type , setMonitor_type ] = useState();
    const[autoPause , setAutoPause ] = useState();
    const[autoPauseDelay , setAutoPauseDelay ] = useState();
    const[autoPauseBusy , setAutoPauseBusy ] = useState();
    const[autoPauseUnavail , setAutoPauseUnavail ] = useState();
    const[maxLen , setMaxLen ] = useState();
    const[serviceLevel , setServiceLevel ] = useState();
    const[strategy , setStrategy ] = useState();
    const[joinEmpty , setJoinEmpty ] = useState();
    const[leaveWhenEmpty , setLeaveWhenEmpty ] = useState();
    const[reportHoldTime , setReportHoldTime ] = useState();
    const[memberDelay , setMemberDelay ] = useState();
    const[weight , setWeight ] = useState();
    const[timeOutRestart , setTimeOutRestart ] = useState();
    const[defaultRule , setDefaultRule ] = useState();
    const[timeOutPriority , setTimeOutPriority ] = useState();
    const[btnName , setBtnName ] = useState("Submit");
    const [obj , setObj ] = useState([])
    const [data , setData] = useState([]);
    // const [modelText , setModelText] = useState([]);
    const [form] = Form.useForm();
    // const [visible , setVisible] = useState(false);
    const dispatch = useDispatch();
    const queue = useSelector(state => state.Queues);
    const [oldName , setOldName] = useState();


    useEffect(() => {
        if (queue.type === "showData")
            setData(queue.Queues)
        else if (queue.type === "update"){
            if(queue.status == 1){
                console.log(data.find( p => p.name == oldName && ( p.name = name, true )))
                form.setFieldsValue({
                    name : setName(""),
                })
                console.log(name);
            }
        }
        else if (queue.type === "delete"){
            if(queue.status == 1){
                setData(data.filter(item => item.name !== name))
                // console.log(data.filter(item =>item.name !== name));
                console.log(data)
            }
        }
        else if (queue.type === "createData"){
            if(queue.Queues!=null && queue.Queues!="") {
                // dispatch(showData())
                setData([...data, {name}]);
                // setData(data.push(queue.Queues.name))
                // setData(data.push(users.Users.name , users.Users.email , users.Users.type , users.Users.id));
                form.setFieldsValue({
                    name : setName(""),
                })
            }
        }
    } ,[queue])

    useEffect(() => {
        console.log(data)
    },[data])

    useEffect(() => {
        dispatch(showData())
    },[])

    const onFinish = (values) => {
        console.log(values);
        handleSubmitAction()
    };

    const getDataByID = (record) => {
        setName(record.name)
        setOldName(record.name)
        // let records = dispatch(GetDataByID(record))
        // setFirstName(record.first_name)
        // setLastName(record.last_name)
        // setEmail(record.email)
        setBtnName("Update")
        form.setFieldsValue({
            name : record.name,
        })
        // setObj({firstName : record.first_name , lastName : record.last_name , email : record.email , id : record.id })
    }

    // const handleOk = () => {
    //     setVisible(false)
    // };

    // const detail = (record) => {
    //     setVisible(true)
    //     setModelText("name " + record.name);
    // }

    const deleteData = (record) => {
        setName(record.name)
        dispatch(DeleteData(record))
    }

    const handleSubmitAction = () => {
        if(btnName =="Submit")
        {
            // setObj({firstName : firstName , lastName : lastName , email : email  })
            let obj = {name : name , musiconhold : musicOnHold , announce : announce , context : context , timeout : timeout ,
                ringinuse : ringInUse , setinterfacevar : setInterfaceVar , setqueuevar : setQueueVar , setqueueentryvar : setQueueentryVar ,
                monitor_format : monitor_format , membermacro : memberMacro , membergosub : memberGoSub , queue_youarenext : queue_YouAreNext ,
                queue_thereare : queue_ThereAre , queue_callswaiting : queue_CallsWaiting , queue_quantity1 : queue_Quantity1 , queue_quantity2 : queue_Quantity2 ,
                queue_holdtime : queue_HoldTime , queue_minutes : queue_Minutes , queue_seconds : queue_Seconds , queue_Minute ,
                queue_thankyou : queue_Thankyou , queue_callerannounce : queue_CallerAnnounce , queue_reporthold : queue_ReportHold , announce_frequency : announce_Frequency ,
                announce_to_first_user : announce_To_First_User , min_announce_frequency : min_Announce_Frequency , announce_round_seconds : announce_Round_Seconds ,
                announce_holdtime : announce_HoldTime , announce_position : announce_Position , announce_position_limit : announce_Position_Limit , periodic_announce : periodic_Announce ,
                periodic_announce_frequency : periodic_Announce_Frequency , relative_periodic_announce : relative_Periodic_Announce , retry : retry , wrapuptime : wrapUpTime ,
                penaltymemberslimit : penaltyMembersLimit , autofill : autofill , monitor_type : monitor_Type , autopause : monitor_Type , autopausedelay : autoPauseDelay ,
                autopausebusy : autoPauseBusy , autopauseunavail : autoPauseUnavail , maxlen : maxLen , servicelevel : serviceLevel , strategy : strategy , joinempty : joinEmpty ,
                leavewhenempty : leaveWhenEmpty , reportholdtime : reportHoldTime , memberdelay : memberDelay , weight : weight , timeoutrestart : timeOutRestart , defaultrule : defaultRule , timeoutpriority : timeOutPriority}
            dispatch(CreateData(obj))
        }
        else
        {
            let obj = {name : name , oldName : oldName};
            dispatch(UpdateData(obj))
        }
    }


    return (
        <>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Queues</Breadcrumb.Item>
                        <Breadcrumb.Item>Queues</Breadcrumb.Item>
                    </Breadcrumb>
                    {queue && queue.error && <Alert
                        message={'Error'}
                        description={queue.error}
                        type={"error"}
                        showIcon
                        closable
                    />}
                    {queue && (queue.type == "createData") && <Alert
                        message={'Success'}
                        description={"Inserted"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    {queue && (queue.type=="delete") && <Alert
                        message={'Success'}
                        description={"Deleted"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    {queue && (queue.type=="update") && <Alert
                        message={'Success'}
                        description={"Updated"}
                        type={"success"}
                        showIcon
                        closable
                    />}
                    <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>
                        <Form {...layout} name="nest-messages" onFinish={onFinish} form={form} validateMessages={validateMessages}>
                            <Form.Item
                                name='name'
                                label="name"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input size="large" onChange = {(e) => {setName(e.target.value)}} />
                            </Form.Item>
                            <Form.Item
                                name= 'musiconhold'
                                label="MusicOnHold"
                                rules={[
                                    {
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large" onChange = {(e) => {setMusicOnHold(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'announce'
                                label="Announce"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'context'
                                label="Context"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setContext(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'timeout'
                                label="TimeOut"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setTimeout(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"ringinuse"}
                                label={"RingInUse"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a RingInUse"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setRingInUse(value);
                                    }}
                                >
                                    <option>Select RingInUse</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>


                            <Form.Item
                                name={"setinterfacevar"}
                                label={"setInterFaceVar"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a setInterFaceVar"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setSetInterfaceVar(value);
                                    }}
                                >
                                    <option>Select setInterFaceVar</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name={"setqueuevar"}
                                label={"SetQueueVar"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a SetQueueVar"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setSetQueueVar(value);
                                    }}
                                >
                                    <option>Select SetQueueVar</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name={"setqueueentryvar"}
                                label={"SetQueueenTryVar"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a SetQueueenTryVar"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setSetQueueentryVar(value);
                                    }}
                                >
                                    <option>Select SetQueueenTryVar</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'monitor_format'
                                label="MonitorFormat"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMonitor_format(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'membermacro'
                                label="MemberMacro"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMemberMacro(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'membergosub'
                                label="MemberGoSub"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMemberGoSub(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_youarenext'
                                label="QueueYouAreNext"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_YouAreNext(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_thereare'
                                label="QueueThereAre"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_ThereAre(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_callswaiting'
                                label="QueueCallsWaiting"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_CallsWaiting(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_quantity1'
                                label="QueueQuantity1"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_Quantity1(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_quantity2'
                                label="QueueQuantity2"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_Quantity2(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_holdtime'
                                label="QueueHoldTime"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_HoldTime(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_minutes'
                                label="QueueMinutes"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_Minutes(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_minute'
                                label="QueueMinute"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_Minute(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_seconds'
                                label="QueueSeconds"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_Seconds(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_thankyou'
                                label="QueueThankYou"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_Thankyou(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_callerannounce'
                                label="QueueCallerAnnounce"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_CallerAnnounce(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'queue_reporthold'
                                label="QueueReportHold"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setQueue_ReportHold(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'announce_frequency'
                                label="AnnounceFrequency"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce_Frequency(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"announce_to_first_user"}
                                label={"AnnounceToFirstUser"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select AnnounceToFirstUser"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a AnnounceToFirstUser"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setAnnounce_To_First_User(value);
                                    }}
                                >
                                    <option>Select SetQueueVar</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'min_announce_frequency'
                                label="MinAnnounceFrequency"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMin_Announce_Frequency(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'announce_round_seconds'
                                label="AnnounceRoundSeconds"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce_Round_Seconds(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'announce_holdtime'
                                label="AnnounceHoldTime"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce_HoldTime(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'announce_position'
                                label="AnnouncePosition"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce_Position(e.target.value)}} />
                            </Form.Item>


                            <Form.Item
                                name = 'announce_position_limit'
                                label="AnnouncePositionLimit"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce_Position_Limit(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'periodic_announce'
                                label="PeriodicAnnounce"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setPeriodic_announce(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'periodic_announce_frequency'
                                label="PeriodicAnnounceFrequency"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setPeriodic_Announce_Frequency(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"relative_periodic_announce"}
                                label={"RelativePeriodicAnnounce"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select RelativePeriodicAnnounce"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a RelativePeriodicAnnounce"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setRelative_Periodic_Announce(value);
                                    }}
                                >
                                    <option>Select SetQueueVar</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name={"random_periodic_announce"}
                                label={"RandomPeriodicAnnounce"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select RandomPeriodicAnnounce"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a RandomPeriodicAnnounce"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setRandom_Periodic_Announce(value);
                                    }}
                                >
                                    <option>Select SetQueueVar</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'retry'
                                label="Retry"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setRetry(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'wrapuptime'
                                label="WrapupTime"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setWrapUpTime(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'penaltymemberslimit'
                                label="PenaltyMembersLimit"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setPenaltyMembersLimit(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"autofill"}
                                label={"AutoFill"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select AutoFill"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a AutoFill"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setAutofill(value);
                                    }}
                                >
                                    <option>Select AutoFill</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'monitor_type'
                                label="MonitorType"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMonitor_type(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"autopause"}
                                label={"AutoPause"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select AutoFill"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a AutoPause"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setAutoPause(value);
                                    }}
                                >
                                    <option>Select AutoPause</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'autopausedelay'
                                label="AutoPauseDelay"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAutoPauseDelay(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"autopausebusy"}
                                label={"AutoPauseBusy"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select AutoFill"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a AutoPauseBusy"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setAutoPauseBusy(value);
                                    }}
                                >
                                    <option>Select AutoPauseBusy</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name={"autopauseunavail"}
                                label={"AutoPauseUnavail"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select AutoPauseUnavail"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a AutoPauseUnavail"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setAutoPauseUnavail(value);
                                    }}
                                >
                                    <option>Select AutoPauseUnavail</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'maxlen'
                                label="Maxlen"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMaxLen(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'servicelevel'
                                label="ServiceLevel"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setServiceLevel(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'strategy'
                                label="Strategy"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setStrategy(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'joinempty'
                                label="JoinEmpty"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setJoinEmpty(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'leavewhenempty'
                                label="LeaveWhenEmpty"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setLeaveWhenEmpty(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"reportholdtime"}
                                label={"reportholdtime"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select reportholdtime"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a reportholdtime"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setReportHoldTime(value);
                                    }}
                                >
                                    <option>Select reportholdtime</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'memberdelay'
                                label="MemberDelay"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMemberDelay(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'weight'
                                label="Weight"
                                rules={[
                                    {
                                        type : "number",
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setWeight(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name={"timeoutrestart"}
                                label={"TimeOutRestart"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select TimeOutRestart"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a TimeOutRestart"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setTimeOutRestart(value);
                                    }}
                                >
                                    <option>Select TimeOutRestart</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'defaultrule'
                                label="DefaultRule"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setDefaultRule(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'timeoutpriority'
                                label="TimeOutPriority"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setTimeOutPriority(e.target.value)}} />
                            </Form.Item>

                            <Form.Item name={['user', 'password']} label="password" >
                                <Input size="large" />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
                                <Button type="primary" htmlType="submit" name="Submit" >
                                    {btnName}
                                </Button>
                            </Form.Item>
                        </Form>

                        <Table dataSource={data} scroll={{ x: 1500, y: 300 }} >

                            <Column title="Name" dataIndex="name" key="name" />
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <Space size="middle">
                                        {/*<Button onClick={() => {detail(record)}}>Detail</Button>*/}
                                        <Button onClick={() => {getDataByID(record)}} >Update</Button>
                                        <Button onClick={() => {deleteData(record)}} >Delete</Button>
                                    </Space>
                                )}
                            />
                        </Table>

                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created By Bilal</Footer>
            </Layout>
            {/*<Modal*/}
            {/*    title="Detail Record"*/}
            {/*    visible={visible}*/}
            {/*    onOk={handleOk}*/}
            {/*    onCancel={handleOk}*/}
            {/*>*/}
            {/*    <p>{modelText}</p>*/}
            {/*</Modal>*/}
        </>
    )
}

export default Outbound
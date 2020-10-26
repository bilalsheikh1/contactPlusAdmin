import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Form, Input, Layout, Space, Table} from "antd";
import {useDispatch} from "react-redux";
import axios from "axios";
import {CreateData, DeleteData, UpdateData} from "../../actions/Queues/Queuse";



const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const layout = {
    labelCol: {
        span: 2,
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

const Outbound = () => {

    const [name , setName ] = useState("");
    const [musicOnHold , setMusicOnHold ] =  useState("");
    const[announce , setAnnounce ] = useState("");
    const[context , setContext ] = useState("");
    const[timeout , setTimeout ] = useState(0);
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
    const[announce_Position_Limit , setAnnounce_Position_Limit ] = useState(0);
    const[periodic_Announce , setPeriodic_announce ] = useState("");
    const[periodic_Announce_Frequency , setPeriodic_Announce_Frequency ] = useState("");
    const[relative_Periodic_Announce , setRelative_Periodic_Announce ] = useState(0);
    const[random_Periodic_Announce, setRandom_Periodic_Announce ] = useState("");
    const[retry , setRetry ] = useState(0);
    const[wrapUpTime , setWrapUpTime ] = useState(0);
    const[penaltyMembersLimit , setPenaltyMembersLimit ] = useState(0);
    const[autofill , setAutofill ] = useState();
    const[monitor_Type , setMonitor_type ] = useState();
    const[autoPause , setAutoPause ] = useState();
    const[autoPauseDelay , setAutoPauseDelay ] = useState();
    const[autoPauseBusy , setAutoPauseBusy ] = useState();
    const[autoPauseUnavail , setAutoPauseUnavail ] = useState();
    const[maxLen , setMaxLen ] = useState(0);
    const[serviceLevel , setServiceLevel ] = useState(0);
    const[strategy , setStrategy ] = useState();
    const[joinEmpty , setJoinEmpty ] = useState();
    const[leaveWhenEmpty , setLeaveWhenEmpty ] = useState();
    const[reportHoldTime , setReportHoldTime ] = useState();
    const[memberDelay , setMemberDelay ] = useState(0);
    const[weight , setWeight ] = useState(0);
    const[timeOutRestart , setTimeOutRestart ] = useState();
    const[defaultRule , setDefaultRule ] = useState();
    const[timeOutPriority , setTimeOutPriority ] = useState();

    const[btnName , setBtnName ] = useState("Submit");
    const [obj , setObj ] = useState([])
    const [data , setData] = useState([]);
    const [form] = Form.useForm();

    const dispatch = useDispatch();


    useEffect(() => {
        axios.get("https://reqres.in/api/users?page=2").then(response => {
            setData(response.data.data)
        })
    },[])

    const onFinish = (values) => {
        console.log(values);
        handleSubmitAction()
    };

    const getDataByID = (record) => {
        // let records = dispatch(GetDataByID(record))
        // setFirstName(record.first_name)
        // setLastName(record.last_name)
        // setEmail(record.email)
        // setBtnName("Update")
        // form.setFieldsValue({
        //     first_name : record.first_name,
        //     last_name : record.last_name,
        //     email : record.email,
        // })
        // setObj({firstName : record.first_name , lastName : record.last_name , email : record.email , id : record.id })
    }

    const deleteData = (record) => {
        dispatch(DeleteData(record))
    }

    const handleSubmitAction = () => {
        if(btnName =="Submit")
        {
            // setObj({firstName : firstName , lastName : lastName , email : email  })
            // dispatch(CreateData(obj))
        }
        else
        {
            dispatch(UpdateData(obj))
            setBtnName("Submit")
            // form.setFieldsValue({
            //     first_name : setFirstName(""),
            //     last_name : setLastName(""),
            //     email : setEmail(""),
            // })
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setTimeout(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'ringinuse'
                                label="RingInUse"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setRingInUse(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'setinterfacevar'
                                label="setInterFaceVar"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setSetInterfaceVar(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'setqueuevar'
                                label="SetQueueVar"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setSetQueueVar(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'setqueueentryvar'
                                label="SetQueueenTryVar"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setSetQueueentryVar(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'monitor_format'
                                label="MonitorFormat"
                                rules={[
                                    {
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce_Frequency(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'announce_to_first_user'
                                label="AnnounceToFirstUser"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAnnounce_To_First_User(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'min_announce_frequency'
                                label="MinAnnounceFrequency"
                                rules={[
                                    {
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setPeriodic_Announce_Frequency(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'relative_periodic_announce'
                                label="RelativePeriodicAnnounce"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setRelative_Periodic_Announce(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'random_periodic_announce'
                                label="RandomPeriodicAnnounce"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setRandom_Periodic_Announce(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'retry'
                                label="Retry"
                                rules={[
                                    {
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setPenaltyMembersLimit(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'autofill'
                                label="AutoFill"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAutofill(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'monitor_type'
                                label="MonitorType"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setMonitor_type(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'autopause'
                                label="AutoPause"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAutoPause(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'autopausedelay'
                                label="AutoPauseDelay"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAutoPauseDelay(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'autopausebusy'
                                label="AutoPauseBusy"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAutoPauseBusy(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'autopauseunavail'
                                label="AutoPauseUnavail"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setAutoPauseUnavail(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'maxlen'
                                label="Maxlen"
                                rules={[
                                    {
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
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
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setLeaveWhenEmpty(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'reportholdtime'
                                label="reportholdtime"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setReportHoldTime(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'memberdelay'
                                label="MemberDelay"
                                rules={[
                                    {
                                        type: 'text',
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
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setWeight(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'timeoutrestart'
                                label="TimeOutRestart"
                                rules={[
                                    {
                                        type: 'text',
                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setTimeOutRestart(e.target.value)}} />
                            </Form.Item>

                            <Form.Item
                                name = 'defaultrule'
                                label="DefaultRule"
                                rules={[
                                    {
                                        type: 'text',
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
                                        type: 'text',
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

                            <ColumnGroup title="Name">
                                <Column title="First Name" dataIndex="first_name" key="first_name" />
                                <Column title="Last Name" dataIndex="last_name" key="last_name" />
                            </ColumnGroup>

                            <Column title="Email" dataIndex="email" key="email" />
                            <Column title="ID" dataIndex="id" key="id" />

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

export default Outbound
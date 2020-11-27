import React, {useEffect, useState} from "react";
import {Modal, Breadcrumb, Button, Form, Input, Layout, Select, Space, Table, Alert, Menu, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
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
const rightStyle = {position: 'absolute', top: 0, right: 0}

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
    const [loading , setLoading] = useState(false);
    const [form] = Form.useForm();
    // const [visible , setVisible] = useState(false);
    const dispatch = useDispatch();
    const queue = useSelector(state => state.Queues);
    const [oldName , setOldName] = useState();


    useEffect(() => {
        setLoading(false)
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
                setData([...data, {name}]);
                form.setFieldsValue({
                    name : setName(""),
                })
            }
        }
    } ,[queue])

    useEffect(() => {
        dispatch(showData())
        setLoading(true)
    },[])

    const onFinish = (values) => {
        handleSubmitAction()
    };

    const getDataByID = (record) => {
        setName(record.name)
        setOldName(record.name)
        setBtnName("Update")
        form.setFieldsValue({
            name : record.name,
            musiconhold : record.musiconhold,
            announce : record.announce,
            context : record.context,
            timeout : record.timeout,
            ringinuse : record.ringinuse,
            setinterfacevar : record.setinterfacevar,
            setqueuevar : record.setqueuevar,
            setqueueentryvar : record.setqueueentryvar,
            monitor_format : record.monitor_format,
            membermacro : record.membermacro,
            membergosub : record.membergosub,
            queue_youarenext : record.queue_youarenext,
            queue_thereare : record.queue_thereare,
            queue_callswaiting : record.queue_callswaiting,
            queue_quantity1 : record.queue_quantity1,
            queue_quantity2 : record.queue_quantity2,
            queue_holdtime : record.queue_holdtime,
            queue_minutes : record.queue_minutes,
            queue_seconds : record.queue_seconds,
            queue_thankyou : record.queue_thankyou,
            queue_callerannounce : record.queue_callerannounce,
            queue_reporthold : record.queue_reporthold,
            announce_to_first_user : record.announce_to_first_user,
            announce_frequency : record.announce_frequency,
            min_announce_frequency : record.min_announce_frequency,
            announce_round_seconds : record.announce_round_seconds,
            announce_holdtime : record.announce_holdtime,
            announce_position : record.announce_position,
            announce_position_limit : record.announce_position_limit,
            periodic_announce : record.periodic_announce,
            periodic_announce_frequency : record.periodic_announce_frequency,
            relative_periodic_announce : record.relative_periodic_announce,
            retry : record.retry,
            wrapuptime :record.wrapuptime,
            penaltymemberslimit : record.penaltymemberslimit,
            autofill : record.autofill,
            monitor_Type : record.monitor_Type,
            autopause: record.autopause,
            autopausedelay : record.autopausedelay,
            autopausebusy : record.autopausebusy,
            autopauseunavail : record.autopauseunavail,
            maxlen : record.maxlen,
            servicelevel : record.servicelevel,
            strategy : record.strategy,
            joinempty : record.joinempty,
            leavewhenempty : record.leavewhenempty,
            reportholdtime : record.reportholdtime,
            memberdelay : record.memberdelay,
            weight : record.weight,
            timeoutrestart : record.timeoutrestart,
            defaultrule : record.defaultrule,
            timeoutpriority : record.timeoutpriority
        })
    }

    const deleteData = (record) => {
        setName(record.name)
        dispatch(DeleteData(record))
    }

    const handleSubmitAction = () => {
        if(btnName =="Submit")
        {
            let obj = {name : name , musiconhold : musicOnHold , announce : announce , context : context , timeout : timeout ,
                ringinuse : ringInUse , setinterfacevar : setInterfaceVar , setqueuevar : setQueueVar , setqueueentryvar : setQueueentryVar ,
                monitor_format : monitor_format , membermacro : memberMacro , membergosub : memberGoSub , queue_youarenext : queue_YouAreNext ,
                queue_thereare : queue_ThereAre , queue_callswaiting : queue_CallsWaiting , queue_quantity1 : queue_Quantity1 , queue_quantity2 : queue_Quantity2 ,
                queue_holdtime : queue_HoldTime , queue_minutes : queue_Minutes , queue_seconds : queue_Seconds ,
                queue_thankyou : queue_Thankyou , queue_callerannounce : queue_CallerAnnounce , queue_reporthold : queue_ReportHold , announce_frequency : announce_Frequency ,
                announce_to_first_user : announce_To_First_User , min_announce_frequency : min_Announce_Frequency , announce_round_seconds : announce_Round_Seconds ,
                announce_holdtime : announce_HoldTime , announce_position : announce_Position , announce_position_limit : announce_Position_Limit , periodic_announce : periodic_Announce ,
                periodic_announce_frequency : periodic_Announce_Frequency , relative_periodic_announce : relative_Periodic_Announce , retry : retry , wrapuptime : wrapUpTime ,
                penaltymemberslimit : penaltyMembersLimit , autofill : autofill , monitor_type : monitor_Type , autopause : monitor_Type , autopausedelay : autoPauseDelay ,
                autopausebusy : autoPauseBusy , autopauseunavail : autoPauseUnavail , maxlen : maxLen , servicelevel : serviceLevel , strategy : strategy , joinempty : joinEmpty ,
                leavewhenempty : leaveWhenEmpty , reportholdtime : reportHoldTime , memberdelay : memberDelay , weight : weight , timeoutrestart : timeOutRestart , defaultrule : defaultRule , timeoutpriority : timeOutPriority}
            dispatch(CreateData(obj))
        }
        else {
            let obj = {name : name , musiconhold : musicOnHold , announce : announce , context : context , timeout : timeout ,
                ringinuse : ringInUse , setinterfacevar : setInterfaceVar , setqueuevar : setQueueVar , setqueueentryvar : setQueueentryVar ,
                monitor_format : monitor_format , membermacro : memberMacro , membergosub : memberGoSub , queue_youarenext : queue_YouAreNext ,
                queue_thereare : queue_ThereAre , queue_callswaiting : queue_CallsWaiting , queue_quantity1 : queue_Quantity1 , queue_quantity2 : queue_Quantity2 ,
                queue_holdtime : queue_HoldTime , queue_minutes : queue_Minutes , queue_seconds : queue_Seconds ,oldName: oldName,
                queue_thankyou : queue_Thankyou , queue_callerannounce : queue_CallerAnnounce , queue_reporthold : queue_ReportHold , announce_frequency : announce_Frequency ,
                announce_to_first_user : announce_To_First_User , min_announce_frequency : min_Announce_Frequency , announce_round_seconds : announce_Round_Seconds ,
                announce_holdtime : announce_HoldTime , announce_position : announce_Position , announce_position_limit : announce_Position_Limit , periodic_announce : periodic_Announce ,
                periodic_announce_frequency : periodic_Announce_Frequency , relative_periodic_announce : relative_Periodic_Announce , retry : retry , wrapuptime : wrapUpTime ,
                penaltymemberslimit : penaltyMembersLimit , autofill : autofill , monitor_type : monitor_Type , autopause : monitor_Type , autopausedelay : autoPauseDelay ,
                autopausebusy : autoPauseBusy , autopauseunavail : autoPauseUnavail , maxlen : maxLen , servicelevel : serviceLevel , strategy : strategy , joinempty : joinEmpty ,
                leavewhenempty : leaveWhenEmpty , reportholdtime : reportHoldTime , memberdelay : memberDelay , weight : weight , timeoutrestart : timeOutRestart , defaultrule : defaultRule , timeoutpriority : timeOutPriority}
            // let obj = {name: name, oldName: oldName};
            dispatch(UpdateData(obj))
        }
        setLoading(true)
    }

    return (
        <>
            <Layout className="site-layout">
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
                                label="Time Out"
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
                                label={"Ring InUse"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Ring InUse"
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
                                label={"Set Inter FaceVar"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Set Inter FaceVar"
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
                                label={"Set QueueVar"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Set QueueVar"
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
                                label={"Set Queueen TryVar"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select First"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Set Queueen TryVar"
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
                                label="Monitor Format"
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
                                label="Member Macro"
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
                                label="Member Go Sub"
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
                                label="Queue You Are Next"
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
                                label="Queue There Are"
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
                                label="Queue Calls Waiting"
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
                                label="Queue Quantity1"
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
                                label="Queue Quantity2"
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
                                label="Queue HoldTime"
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
                                label="Queue Minutes"
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
                                label="Queue Minute"
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
                                label="Queue Seconds"
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
                                label="Queue ThankYou"
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
                                label="Queue Caller Announce"
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
                                label="Queue Report Hold"
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
                                label="Announce Frequency"
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
                                label={"Announce To First User"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select Announce To First User"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Announce To First User"
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
                                label="Min Announce Frequency"
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
                                label="Announce Round Seconds"
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
                                label="Announce HoldTime"
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
                                label="Announce Position"
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
                                label="Announce Position Limit"
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
                                label="Periodic Announce"
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
                                label="Periodic Announce Frequency"
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
                                label={"Relative Periodic Announce"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select RelativePeriodicAnnounce"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Relative Periodic Announce"
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
                                label={"Random Periodic Announce"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select Random Periodic Announce"
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
                                label="Wrap up Time"
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
                                label="Penalty Members Limit"
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
                                label="Monitor Type"
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
                                label="Auto Pause Delay"
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
                                label={"Auto Pause Busy"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select Auto Pause Busy"
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
                                label={"Auto Pause Unavail"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select Auto Pause Unavail"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Auto Pause Unavail"
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
                                label="Service Level"
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
                                rules={[{
                                    required : false ,
                                    message : "Please Select Strategy"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Strategy"
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={(value) => {
                                        setStrategy(value);
                                    }}
                                >
                                    <option>Select Strategy</option>
                                    <option value="ringall">Ring All</option>
                                    <option value="leastrecent">Least Recent</option>
                                    <option value="fewestcalls">Fewest Calls</option>
                                    <option value="random">Random</option>
                                    <option value="rrmemory">RR Memory</option>
                                    <option value="linear">Linear</option>
                                    <option value="wrandom">W Random</option>
                                    <option value="rrordered">RR Ordered</option>
                                </Select>

                            </Form.Item>

                            <Form.Item
                                name = 'joinempty'
                                label="Join Empty"
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
                                label="Leave When Empty"
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
                                label={"Report HoldTime"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select Report HoldTime"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a Report HoldTime"
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
                                label="Member Delay"
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
                                label={"TimeOut Restart"}
                                rules={[{
                                    required : false ,
                                    message : "Please Select TimeOut Restart"
                                }]}
                            >
                                <Select
                                    showSearch
                                    placeholder="Select a TimeOut Restart"
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
                                label="TimeOut Priority"
                                rules={[
                                    {

                                        required: false,
                                    },
                                ]}
                            >
                                <Input size="large"  onChange = {(e) => {setTimeOutPriority(e.target.value)}} />
                            </Form.Item>

                            <Form.Item name={['user', 'password']} label="Password" >
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
                    </Spin>
                </Content>
            </Layout>
        </>
    )
}

export default Outbound
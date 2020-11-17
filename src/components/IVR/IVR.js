import React, {useEffect, useState} from "react";
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import {Alert, Breadcrumb , DatePicker, Button, Form, Input, Layout, Select, Table ,Upload, message ,TimePicker} from "antd";
import { InboxOutlined  ,UploadOutlined} from '@ant-design/icons';
import { Handle } from 'react-flow-renderer';
import moment from 'moment';

import ReactFlow, {
    removeElements,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';
import {
    answer,
    GetData, GetOption, HangUp,
    SayAlpha,
    SayDate,
    SayDateTime,
    SayDigits,
    SayNumber,
    SayPhonetic,
    SayTime, SetVar,
    StreamFile, WaitForDigit
} from "./IVRDetail";

// import initialElements from './initial-elements';

const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        offset : 2,
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 5,
        span: 16 ,
    },
};

const { Dragger } = Upload;
const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    beforeUpload: file => {
        console.log(file.type)
        if (file.type !== 'audio/mpeg') {
            message.error(`${file.name} is not a mp3 file`);
        }
        return file.type === 'audio/mpeg';
    },
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const customNodeStyles = {
    background: '#9CA8B3',
    color: '#FFF',
    padding: 10,
};

const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const IVR = () => {

    let numOfOutput = 0;
    // let totalNumOfOutput = []
    // const [label , setLabel] = useState("");
    const [type , setType] = useState();
    const [edgeLabel , setEdgeLabel] = useState();
    // const [numOfOutput , setNumOfOutput] = useState(0);
    const [totalNumOfOutput , setTotalNumOfOutput] = useState([]);
    const [timeOut , setTimeOut] = useState()
    const [maxDigits , setMaxDigits] = useState()
    const [date , setDate] = useState()
    const [number , setNumber] = useState()
    // const [numNumber , setNumNumber] = useState()
    const [escapeDigits , setEscapeDigits] = useState()
    // const [digitsEscapeDigits , setDigitsEscapeDigits] = useState()
    // const [dateEscapeDigits , setDateEscapeDigits] = useState()
    // const [numberEscapeDigits , setNumberEscapeDigits] = useState()
    // const [phoneticsEscapeDigits , setPhoneticsEscapeDigits] = useState()
    // const [aplhaEscapeDigits , setAplhaEscapeDigits] = useState()
    // const [optionEscapeDigits , setOptionEscapeDigits] = useState()
    // const [timeEscapeDigits , setTimeEscapeDigits] = useState()
    // const [digitTimeOut , setDigitTimeOut] = useState()
    // const [optionTimeOut , setOptionTimeOut] = useState()
    // const [dateTimeEscapeDigits , setDateTimeEscapeDigits] = useState()
    const [time , setTime] = useState()
    const [varName , setVarName] = useState()
    const [varValue , setVarValue] = useState()
    const [phonetics , setPhonetics] = useState()
    const [channelName , setChannelName] = useState()
    // const [aplhaNumber , setAplhaNumber] = useState()
    // const [edge , setEdge] = useState()
    const [obj , setObj] = useState()
    const [form] = Form.useForm();



    const [elements, setElements] = useState([{
        id: '1',
        type: 'input',
        data: {
            label: (
                <>
                    <strong>Start</strong>
                </>
            ),
        },
        position: { x: 250, y: 0 },
        },
    ]);

    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onConnect = (params) =>
    {
        let edge = {id : "e"+params.source+"-"+params.target , sourceHandle : params.sourceHandle, source : params.source , target : params.target , label : edgeLabel}
        console.log(params)
        console.log(edge)
        // setElements((els) => addEdge(edge, els));
        let elementData = setElements((els) => addEdge(edge, els));
        // let object = {type : type , edgeLabel : edgeLabel , totalNumOfOutput : totalNumOfOutput , timeOut : timeOut , maxDigits : maxDigits ,
        //     date : date , number : number , numNumber : numNumber , digitsEscapeDigits :digitsEscapeDigits , dateEscapeDigits : dateEscapeDigits,
        //     numberEscapeDigits : numberEscapeDigits , phoneticsEscapeDigits : phoneticsEscapeDigits ,aplhaEscapeDigits : aplhaEscapeDigits ,
        //     optionEscapeDigits: optionEscapeDigits , timeEscapeDigits : timeEscapeDigits , digitTimeOut : digitTimeOut , optionTimeOut: optionTimeOut ,
        //     dateTimeEscapeDigits : dateTimeEscapeDigits , time :time , varName : varName , varValue : varValue , phonetics : phonetics , channelName :channelName ,
        //     aplhaNumber : aplhaNumber , element : elements
        // }
        console.log(elements)
    }
    // const [node , setNode] = useState( {node: nodeID, type: name , position : { x : 10 , y : 10} })

    const onLoad = (reactFlowInstance) => {
        console.log('flow loaded:', reactFlowInstance);
        reactFlowInstance.fitView();
    }

    const numOfOutputNode = () =>
    {
        var j=5;
        for(var i =0 ; i<numOfOutput; i++){
            var k = j+"%"
            totalNumOfOutput.push(<Handle type="source" position="bottom" id={i} key={i} style={{ left: ''+k , borderRadius: 0 }} />)
            j +=20;
        }
    }

    const CustomNodeComponent = ({ data }) => {
        return (

            <div style={customNodeStyles}>
                <Handle type="target" position="left" style={{ borderRadius: 0 }} />
                <div>{data.text}</div>
                {totalNumOfOutput}
            </div>
        );
    };
    const nodeTypes = {
        special: CustomNodeComponent,
    };



    const submit = () => {
        let id = elements.length;
        id++;
        console.log(id)
        if(type !="" && type != null) {
            if (type == "Answer") {
                setElements([...elements, answer()])
            }
            else if(type == "Stream File")
            {
                setElements([...elements, StreamFile("")])
            }
            else if(type == "Get Data")
            {
                setElements([...elements, GetData(timeOut ,maxDigits )])
            }
            else if(type == "Say Alpha")
            {
                setElements([...elements, SayAlpha(number ,escapeDigits )])
            }
            else if(type == "Say Date")
            {
                setElements([...elements, SayDate(timeOut ,maxDigits )])
            }
            else if(type == "Say DateTime")
            {
                setElements([...elements, SayDateTime(time ,escapeDigits )])
            }
            else if(type == "Say Digits")
            {
                setElements([...elements, SayDigits(number ,escapeDigits )])
            }
            else if(type == "Say Number")
            {
                setElements([...elements, SayNumber(number ,escapeDigits )])
            }
            else if(type == "Say Phonetic")
            {
                setElements([...elements, SayPhonetic(phonetics ,escapeDigits )])
            }
            else if(type == "Say Time")
            {
                setElements([...elements, SayTime(time ,escapeDigits )])
            }
            else if(type == "Get Option")
            {
                setElements([...elements, GetOption(timeOut ,escapeDigits )])
            }
            else if(type == "Set Var")
            {
                setElements([...elements, SetVar(varName ,varValue )])
            }
            else if(type == "Wait For Digit")
            {
                setElements([...elements, WaitForDigit(timeOut ,channelName )])
            }
            else if(type == "HangUp")
            {
                setElements([...elements, HangUp(channelName )])
            }

            form.setFieldsValue({
                type: setType(""),
            })
        }
    }




    // useEffect(() => {
    //
    // },[node])
    const onNodeDragStop = (event, node) => console.log('drag stop', node);
    const onElementClick = (event, element) => console.log('click', element);


    return(
        <>
            <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Admin</Breadcrumb.Item>
                    <Breadcrumb.Item>IVR</Breadcrumb.Item>
                </Breadcrumb>
                <Form name={"register"}  {...layout} initialValues={{remember: true,}} form={form}  >

                    <Form.Item
                        name={"type"}
                        label={"Type"}
                        rules={[{
                            required : true ,
                            message : "Please Select Type"
                        }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a Type"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(value) => {
                                setType(value);
                            }}
                        >
                            <option>Select Type</option>
                            <option value="Answer">Answer</option>
                            <option value="Stream File">Stream File</option>
                            <option value="Get Data">Get Data</option>
                            <option value="Say Alpha">Say Alpha</option>
                            <option value="Say Date">Say Date</option>
                            <option value="Say DateTime">Say DateTime</option>
                            <option value="Say Digits">Say Digits</option>
                            <option value="Say Number">Say Number</option>
                            <option value="Say Phonetic">Say Phonetic</option>
                            <option value="Say Time">Say Time</option>
                            <option value="Get Option">Get Option</option>
                            <option value="Noop">Noop</option>
                            <option value="Set Var">Set Var</option>
                            <option value="Wait For Digit">Wait For Digit</option>
                            <option value="HangUp">HangUp</option>
                            <option value="No Operation">No Operation</option>
                        </Select>

                    </Form.Item>

                    { (type === 'Get Data') && (type != '') &&
                    <>
                        <Form.Item
                            label="Time Out"
                            name="time_out"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Timeout!',
                                },
                            ]}
                            onChange={(e) => {
                                setTimeOut(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Max Digits"
                            name="max_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Max Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setMaxDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }

                    { (type === 'Say Date') && (type != '') &&
                    <>
                        <Form.Item
                            label="Date"
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Date!',
                                },
                            ]}
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                        >
                            <DatePicker onChange={(date, dateString) =>setDate(date)}  />
                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }

                    { (type === 'Say Alpha') && (type != '') &&
                    <>
                        <Form.Item
                            label="Number"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Number!',
                                },
                            ]}
                            onChange={(e) => {
                                setNumber(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }
                    { (type === 'Say DateTime') && (type != '') &&
                    <>
                        <Form.Item
                            label="Time"
                            name="time"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your TimeOut!',
                                },
                            ]}
                            onChange={(e) => {
                                setTime(e.target.value)
                            }}
                        >
                            <TimePicker use12Hours onChange={(time, timeString) => setTime(time)} />

                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }
                    { (type === 'Get Option') && (type != '') &&
                    <>
                        <Form.Item
                            label="TimeOut"
                            name="timeout"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your TimeOut!',
                                },
                            ]}
                            onChange={(e) => {
                                setTimeOut(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }

                    { (type === 'Say Digits') && (type != '') &&
                    <>
                        <Form.Item
                            label="Number"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Number!',
                                },
                            ]}
                            onChange={(e) => {
                                setNumber(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }

                    { (type === 'Say Number') && (type != '') &&
                    <>
                        <Form.Item
                            label="Number"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Number!',
                                },
                            ]}
                            onChange={(e) => {
                                setNumber(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }

                    { (type === 'Say Phonetic') && (type != '') &&
                    <>
                        <Form.Item
                            label="Phonetics String"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Phonetics!',
                                },
                            ]}
                            onChange={(e) => {
                                setPhonetics(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }

                    { (type === 'Say Time') && (type != '') &&
                    <>
                        <Form.Item
                            label="Phonetics Time"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Phonetics!',
                                },
                            ]}
                            onChange={(e) => {
                                setTime(e.target.value)
                            }}
                        >
                            <TimePicker onChange={(time, timeString) => setTime(time)} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
                        </Form.Item>

                        <Form.Item
                            label="Escape Digits"
                            name="escape_digits"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Escape Digits!',
                                },
                            ]}
                            onChange={(e) => {
                                setEscapeDigits(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }

                    { (type === 'Set Var') && (type != '') &&
                    <>
                        <Form.Item
                            label="Variable Name"
                            name="var_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Var Name!',
                                },
                            ]}
                            onChange={(e) => {
                                setVarName(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Variable Value"
                            name="var_value"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Variable Value!',
                                },
                            ]}
                            onChange={(e) => {
                                setVarValue(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }


                    { (type === 'Wait For Digit') && (type != '') &&
                    <>
                        <Form.Item
                            label="Digit TimeOut"
                            name="digit_timeout"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Digit TimeOut!',
                                },
                            ]}
                            onChange={(e) => {
                                setTimeOut(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }
                    { (type === 'HangUp') && (type != '') &&
                    <>
                        <Form.Item
                            label="Channel Name"
                            name="channel_name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Channel Name!',
                                },
                            ]}
                            onChange={(e) => {
                                setChannelName(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>
                    </>
                    }



                    <Form.Item
                        name={"edgeLabel"}
                        label={"Edge Label"}
                        rules={[{
                            required : true ,
                            message : "Please Enter Edge Label First"
                        }]}
                        onChange={(e) => {setEdgeLabel(e.target.value)}}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name={"num_of_output"}
                        label={"Number Of Output"}
                        rules={[{
                            required : true ,
                            message : "Please Select Output Type"
                        }]}
                    >
                        <Select
                            showSearch
                            placeholder="Select a Output"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={(value) => {
                                numOfOutput =value;
                                numOfOutputNode()
                            }}
                        >
                            <option>Select Output</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </Select>

                    </Form.Item>

                    <Form.Item
                        label={"Upload File"}
                    >
                        <Upload {...props}>
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>,
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={submit}>
                            Submit
                        </Button>
                    </Form.Item>

                </Form>
                <div style={{ padding: 24, minHeight: 360 , background : '#fff' }}>

                    <div style={{ height: 500 }}>
                        <ReactFlow
                            elements={elements}
                            onElementsRemove={onElementsRemove}
                            onConnect={onConnect}
                            onLoad={onLoad}
                            snapToGrid={true}
                            snapGrid={[20, 20]}
                            nodeTypes={nodeTypes}
                            defaultZoom={1.5}
                        >
                            <MiniMap
                                nodeStrokeColor={(n) => {
                                    if (n.style?.background) return n.style.background;
                                    if (n.type === 'input') return '#0041d0';
                                    if (n.type === 'output') return '#ff0072';
                                    if (n.type === 'default') return '#1a192b';
                                    return '#eee';
                                }}
                                nodeColor={(n) => {
                                    if (n.style?.background) return n.style.background;
                                    return '#fff';
                                }}
                                nodeBorderRadius={2}
                            />
                            <Controls />
                            <Background color="#aaa" gap={16} />
                        </ReactFlow>
                    </div>
              </div>
            </Content>
        </>
    )
}

export default IVR
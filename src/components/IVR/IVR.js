import React, {useEffect, useState} from "react";
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
    Alert,
    Breadcrumb,
    Button,
    Form,
    Input,
    Layout,
    Select,
    Table,
    Modal,
} from "antd";
import { InboxOutlined  ,UploadOutlined} from '@ant-design/icons';
import { Handle } from 'react-flow-renderer';
import moment from 'moment';
import Modals from "./Modal";
import ReactFlow, {
    removeElements,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';
import {answer, StreamFile} from "./IVRDetail";
import GetData from "./GetData";
import GetSay from "./SayData";
import SayAlpha from "./SayAlpha";
import SayDate from "./SayDate";
import SayDateTime from "./SayDateTime";
import SayDigits from "./SayDigits";
import SayNumber from "./SayNumber";
import SayPhonetic from "./SayPhonetic";
import SayTime from "./SayTime";
import GetOption from "./GetOptions";
import SetVar from "./SetVar";
import WaitForDigit from "./WaitForDigit";
import HangUp from "./HangUp";
import {useDispatch, useSelector} from "react-redux";
import {SaveIVR} from "../../actions/IVR/IVR";
import apiClient from "../../axios/axios";

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

const { Column, ColumnGroup } = Table;
const { Header, Content, Footer, Sider } = Layout;
const IVR = () => {

    const dispatch = useDispatch();
    const [value1 , setValue1] = useState()
    const [value2 , setValue2] = useState()
    const [value3 , setValue3] = useState()
    const [type , setType] = useState();
    const [file , setFile] = useState();
    const [edgeLabel , setEdgeLabel] = useState();
    const [totalNumOfOutputs , setTotalNumOfOutputs] = useState([]);
    const [form] = Form.useForm();
    const [visible , setvisible] = useState()
    const [dataStatus , setDataStatus] = useState(false)
    const IVRData = useSelector(state => state.IVR)
    const initElement = [{
        id: '1',
        type: 'input',
        data: {
            label: 'Start'
        },
        position: { x: 250, y: 0 },
    }]
    const [elements, setElements] = useState(initElement);

    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));

    const onConnect = (params) =>
    {
        let label = "";
        if(params.source === "1")
            setElements((els) => addEdge({...params , label:label}, els));
        else {
            Modal.confirm({
                centered: true,
                title: 'Add Edge Label',
                content: (
                    <Form.Item onChange={(e) => label = e.target.value} name="Label" label="Edge label" required>
                        <Input/>
                    </Form.Item>
                ),
                onOk() {
                    setElements((els) => addEdge({...params, label: label}, els));
                },
                onCancel() {

                }
            })
        }
    }

    const onLoad = (reactFlowInstance) => {
        console.log('flow loaded:', reactFlowInstance);
        reactFlowInstance.fitView();
    }

    useEffect(() =>
    {
        console.log(IVRData)
        if(IVRData.status == 1 ) {
            console.log("ok")
        }

    }, [IVRData])


    const customNodeStyles = {
        background: '#fff',
        borderColor: '#0041d0',
        borderRadius: '3px',
        padding: '10px',
        width: '150px',
        color: '#222',
        textAlign: 'center',
        borderWidth: '1px',
        borderStyle: 'solid'
    };

    const CustomNodeComponent = ({ data }) => {

          return (
            <div style={customNodeStyles}>
                <Handle type="target" position="top" style={{ borderRadius: 0 }} />
                <center>
                    <div>{data.text}</div>
                    <small>{data.file}</small>
                </center>
                {data.totalNumOfOutputs}
            </div>
        );
    };

    const nodeTypes = {
        special: CustomNodeComponent,
    };

    const saveFlow = () =>
    {
        let name  ="";
        Modal.confirm({
            centered: true,
            title: 'Add Edge Label',
            content: (
                <Form.Item onChange={(e) => name=e.target.value} name="name" label="IVR Name" required>
                    <Input />
                </Form.Item>
            ),
            onOk() {
                dispatch(SaveIVR(name , elements))
                console.log(elements)
                setDataStatus(false)
            },
            onCancel() {
                setDataStatus(true)
            }
        })
    }

    const open = () =>
    {
        setvisible(true)
    }

    const close = () =>
    {
        setvisible(false)
    }

    const submit = () =>
    {
        let filtered = elements.reverse().filter(((value, index) => value.position))
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
                setElements([...elements, GetData(value1 ,value2, totalNumOfOutputs,file , filtered[0].position.y + 100)])
            }
            // else if(type == "Get Say")
            // {
            //     setElements([...elements, GetSay(value1 ,value2, totalNumOfOutputs, filtered[0].position.y + 100)])
            // }
            else if(type == "Say Alpha")
            {
                setElements([...elements, SayAlpha(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Say Date")
            {
                setElements([...elements, SayDate(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Say DateTime")
            {
                setElements([...elements, SayDateTime(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Say Digits")
            {
                setElements([...elements, SayDigits(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Say Number")
            {
                setElements([...elements, SayNumber(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Say Phonetic")
            {
                setElements([...elements, SayPhonetic(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Say Time")
            {
                setElements([...elements, SayTime(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Get Option")
            {
                setElements([...elements, GetOption(value1 ,value2 ,totalNumOfOutputs,file, filtered[0].position.y + 100)])
            }
            else if(type == "Set Var")
            {
                setElements([...elements, SetVar(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "Wait For Digit")
            {
                setElements([...elements, WaitForDigit(value1 ,value2 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }
            else if(type == "HangUp")
            {
                setElements([...elements, HangUp(value1 ,totalNumOfOutputs, filtered[0].position.y + 100)])
            }

            form.setFieldsValue({
                type: setType(""),
            })

            setvisible(false)
        }
    }

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

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="button" onClick={open}>
                            Open
                        </Button>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="button" onClick={saveFlow}>
                            Save Flow
                        </Button>
                    </Form.Item>

                    <Modals visible={visible} submit={submit} setFile={setFile} edgeLabel={edgeLabel} setEdgeLabel={setEdgeLabel} setTotalNumOfOutputs={setTotalNumOfOutputs} close={close} type={type} setValue1={setValue1} setValue2={setValue2} setValue3={setValue3}/>

                </Form>
                {IVRData && (IVRData.status=="1") && <Alert
                    message={'Success'}
                    description={"Inserted"}
                    type={"success"}
                    showIcon
                    closable
                />}
                {(dataStatus)  && <Alert
                    message={'Error'}
                    description={"Node Not Inserted"}
                    type={"error"}
                    showIcon
                    closable
                />}
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
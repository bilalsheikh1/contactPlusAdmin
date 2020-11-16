import React, {useEffect, useState} from "react";
import { FlowChartWithState } from "@mrblenny/react-flow-chart";
import {Alert, Breadcrumb, Button, Form, Input, Layout, Select, Table ,Upload, message} from "antd";
import { InboxOutlined  ,UploadOutlined} from '@ant-design/icons';
import { Handle } from 'react-flow-renderer';

import ReactFlow, {
    removeElements,
    addEdge,
    MiniMap,
    Controls,
    Background,
} from 'react-flow-renderer';

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
    // const [label , setLabel] = useState("");
    const [type , setType] = useState();
    const [edgeLabel , setEdgeLabel] = useState();
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
        setElements((els) => addEdge(edge, els));
    }
    // const [node , setNode] = useState( {node: nodeID, type: name , position : { x : 10 , y : 10} })

    const onLoad = (reactFlowInstance) => {
        console.log('flow loaded:', reactFlowInstance);
        reactFlowInstance.fitView();
    }


    const CustomNodeComponent = ({ data }) => {
        return (
            <div style={customNodeStyles}>
                <Handle type="target" position="left" style={{ borderRadius: 0 }} />
                <div>{data.text}</div>
                <Handle
                    type="source"
                    position="right"
                    id="a"
                    style={{ top: '30%', borderRadius: 0 }}
                />
                <Handle
                    type="source"
                    position="right"
                    id="b"
                    style={{ top: '70%', borderRadius: 0 }}
                />
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
            let node = [...elements, {
                id: "" + id,
                type: 'special',
                data: {
                    text: (
                        <>
                            <strong>{type}</strong>
                        </>
                    ),
                },
                position: {x: 150, y: 50},
            }]
            setElements(node)
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
                            <option value="HangUp">HangUp</option>
                            <option value="No Operation">No Operation</option>
                        </Select>

                    </Form.Item>
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
                            // onNodeDragStop={onNodeDragStop}
                            // onElementClick={onElementClick}

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
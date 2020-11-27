import React, {useEffect, useState} from "react";
import ReactFlow, {removeElements, addEdge, MiniMap, Background, Controls} from "react-flow-renderer";
import {Breadcrumb, Layout, Form, Button, Select, Row, Col, InputNumber, Input, Modal, Upload, DatePicker,TimePicker} from "antd"
import {InboxOutlined, QuestionCircleFilled, SaveFilled, UploadOutlined} from "@ant-design/icons"
import moment from 'moment';
import GetData from "./nodes/GetData"
import Hangup from "./nodes/Hangup"
import GetOperations from "./nodes/GetOptions"
import Noop from "./nodes/Noop"
import NoOperation from "./nodes/NoOperation";
import SayAlpha from "./nodes/SayAlpha";
import SayDate from "./nodes/SayDate";
import SayDateTime from "./nodes/SayDateTime";
import SayDigits from "./nodes/SayDigits";
import SayNumber from "./nodes/SayNumber";
import SayPhonetic from "./nodes/SayPhonetic";
import SayTime from "./nodes/SayTime";
import SetVar from "./nodes/SetVar";
import Timeout from "./nodes/Timeout";
import WaitForDigits from "./nodes/WaitForDigits";
import StreamFile from "./nodes/StreamFile";
import apiClient from "../../axios/axios";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 },
};
const tailLayout = {
    wrapperCol: { span: 4 },
};

function IVR(props) {



    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    let elementData = [{
          id: Date.now(),
          type: 'input',
          data: { label: 'Start' },
          position: { x: 300, y: 10 },
    }];
    let  name ="";
    if(typeof props.location.query != "undefined") {
        if (props.location.query.script !== "" && props.location.query.script !== null) {
            let data = props.location.query
            elementData = data.script.script
            name=data.name.name
            // console.log(data.name.name)
        }
    }
    const [formElements, setFormElements] = useState([])
    const [inputValues, setInputValues] = useState([])
    const [appName, setAppName] = useState(name)
    const initialElements = elementData

    // const initialElements = [
    //     {
    //         id: Date.now(),
    //         type: 'input',
    //         data: { label: 'Start' },
    //         position: { x: 300, y: 10 },
    //     },
    // ]

    const [elements, setElements] = useState(initialElements);
    const onElementsRemove = (elementsToRemove) =>
        setElements((els) => removeElements(elementsToRemove, els));
    // const onConnect = (params) => setElements((els) => addEdge(params, els))
    const onConnect = params => {
        getEdgeLabel(params)
    }

    useEffect(() => {
        console.log(elements)
    }, [elements])

    const getEdgeLabel = params => {
        params.label = ''

        Modal.confirm({
            centered: true,
            title: 'Add Edge Label',
            content: (
                <Form.Item onChange={(e) => params.label=e.target.value} name="Label" label="Edge label" required>
                    <Input />
                </Form.Item>
            ),
            onOk() {
                setElements((els) => addEdge({...params, animated: true, type: 'straight'}, els))
            },
            onCancel() {

            }
        })
    }

    const onFormSubmit = values => {
        console.log(values)
        let temp = elements
        let filtered = temp.reverse().filter(((value, index) => value.position))
        switch (values.nodeType) {
            default:
                break
            case 'hangup':
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'Hangup',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name},
                }])
                break
            case 'noop':
                console.log('Noop')
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'Noop',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name},
                }])
                break
            case 'noOperation':
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'NoOperation',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name},
                }])
                break
            case "getData":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'GetData',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs, file: values.file.file.name},
                }])
                break
            case "streamFile":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'StreamFile',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs, file: values.file.file.name},
                }])
                break
            case "getOptions":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'GetOptions',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "sayAlpha":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SayAlpha',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "sayDate":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SayDate',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "sayDateTime":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SayDateTime',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "sayDigits":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SayDigits',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "sayNumber":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SayNumber',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "sayPhonetic":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SayPhonetic',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "sayTime":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SayTime',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "setVar":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'SetVar',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break
            case "waitForDigits":
                setElements(elements => [...elements, {
                    id: Date.now(),
                    type: 'WaitForDigits',
                    position: {x: 300, y: filtered[0].position.y + 100},
                    data: {text: values.name, outputs: values.numberOfOutputs},
                }])
                break



        }
    }

    const { Dragger } = Upload
    let draggerProps
    let element
    const onTypeSelect = (params) => {
        switch (params) {
            default:
                break
            case 'hangup':
                setFormElements([])
                break
            case 'noop':
                setFormElements([])
                break
            case 'noOperation':
                setFormElements([])
                break
            case 'getData':
                draggerProps = {
                    name: 'file',
                    multiple: false,
                    method: 'GET',
                    action: '',
                    beforeUpload: false,
                    customRequest: action => {
                        console.log(action)
                        apiClient.get('/sanctum/csrf-cookie').then(response => {
                            let form = new FormData()
                            form.append('fileName', action.file)
                            apiClient.post('/api/upload/audio', form, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                                .then(response => action.onSuccess('ok'))
                                .catch(error => console.log(error))
                        })
                    },
                }

                element = (<>
                    <Form.Item key="timeout" name="timeout" label="Timeout" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="maxdigits" name="maxdigits" label="Max Digits" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="file" name="file" label="File" required>
                        <Dragger {...draggerProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'streamFile':
                draggerProps = {
                    name: 'file',
                    multiple: false,
                    method: 'GET',
                    action: '',
                    beforeUpload: false,
                    customRequest: action => {
                        console.log(action)
                        apiClient.get('/sanctum/csrf-cookie').then(response => {
                            let form = new FormData()
                            form.append('fileName', action.file)
                            apiClient.post('/api/upload/audio', form, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                                .then(response => action.onSuccess('ok'))
                                .catch(error => console.log(error))
                        })
                    },
                }

                element = (<>
                    <Form.Item key="timeout" name="timeout" label="Timeout" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="file" name="file" label="File" required>
                        <Dragger {...draggerProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'getOptions':
                draggerProps = {
                    name: 'file',
                    multiple: false,
                    method: 'GET',
                    action: '',
                    beforeUpload: false,
                    customRequest: action => {
                        console.log(action)
                        apiClient.get('/sanctum/csrf-cookie').then(response => {
                            let form = new FormData()
                            form.append('fileName', action.file)
                            apiClient.post('/api/upload/audio', form, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                                .then(response => action.onSuccess('ok'))
                                .catch(error => console.log(error))
                        })
                    },
                }

                element = (<>
                    <Form.Item key="timeout" name="timeout" label="Timeout" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="file" name="file" label="File" required>
                        <Dragger {...draggerProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                                band files
                            </p>
                        </Dragger>
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'sayAlpha':
                element = (<>
                    <Form.Item key="number" name="number" label="Number" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'sayDate':
                element = (<>
                    <Form.Item key="date" name="date" label="Date" required>
                        <DatePicker  />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'sayDateTime':
                element = (<>
                    <Form.Item key="dateTime" name="dateTime" label="Date Time" required>
                        <DatePicker
                            format="YYYY-MM-DD HH:mm:ss"
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'sayDigits':
                element = (<>
                    <Form.Item key="number" name="number" label="Number" required>
                        <InputNumber  />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'sayNumber':
                element = (<>
                    <Form.Item key="number" name="number" label="Number" required>
                        <InputNumber  />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'sayPhonetic':
                element = (<>
                    <Form.Item key="string" name="string" label="String" required>
                        <InputNumber  />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'sayTime':
                element = (<>
                    <Form.Item key="string" name="string" label="String" required>
                        <TimePicker defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />
                    </Form.Item>
                    <Form.Item key="escape digits" name="escapeDigits" label="Escape Digits" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'setVar':
                element = (<>
                    <Form.Item key="variableName" name="variableName" label="Variable Name" required>
                        <Input />
                    </Form.Item>
                    <Form.Item key="value" name="value" label="Value" required>
                        <Input />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

            case 'waitForDigits':
                element = (<>
                    <Form.Item key="timeout" name="timeout" label="Timeout" required>
                        <InputNumber  />
                    </Form.Item>
                </>)
                setFormElements(formElements => [element])
                break

        }
    }

    const nodeTypes = {
        GetData,
        Hangup,
        GetOperations,
        Noop,
        NoOperation,
        SayAlpha,
        SayDigits,
        SayDate,
        SayDateTime,
        SayNumber,
        SayPhonetic,
        SayTime,
        SetVar,
        Timeout,
        WaitForDigits,
        StreamFile
    }

    const onSaveChanges = () => {
        apiClient.get('/sanctum/csrf-cookie').then(res => {
            apiClient.post('/api/ivr', {
                name: appName,
                script: elements
            })
                .then(response => console.log(response))
                .catch(error => console.log(error))
        })
    }

    useEffect(() => {
        console.log(appName)
    }, [appName])

    const AppNameModal = () => {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={appName === ''}
                title="Specify name of App"
                okText="Save"
                cancelText="Cancel"
                onOk={() => {
                    form
                        .validateFields()
                        .then(values => {
                            form.resetFields();
                            setAppName(values.name)
                        })
                        .catch(info => {
                            console.log('Validate Failed:', info);
                        })
                }}
            >
                <Form
                    form={form}
                    layout="horizontal"
                    name="form_in_modal"
                >
                    <Form.Item
                        name="name"
                        label="Title"
                        rules={[{ required: true, message: 'Please input the title of app!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    return(
        <Layout className="site-layout" style={{ padding: '0 24px 24px' }}>
            <AppNameModal />
            <Layout.Content>
                <Breadcrumb style={{ margin: '10px 0' }}>
                    <Breadcrumb.Item>IVR</Breadcrumb.Item>
                    <Breadcrumb.Item>Create</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col lg={6}>
                        <div className="site-layout-content">
                            <Form onFinish={onFormSubmit} layout="horizontal">
                                <Form.Item fieldKey="nodeType" name="nodeType" label="Select" required>
                                    <Select onSelect={onTypeSelect}>
                                        <Select.Option value="getData">Get Data</Select.Option>
                                        <Select.Option value="streamFile">Stream File</Select.Option>
                                        <Select.Option value="hangup">HangUp</Select.Option>
                                        <Select.Option value="getOptions">Get Options</Select.Option>
                                        <Select.Option value="noOperation">No Operation</Select.Option>
                                        <Select.Option value="sayAlpha">Say Alpha</Select.Option>
                                        <Select.Option value="sayDate">Say Date</Select.Option>
                                        <Select.Option value="sayDateTime">Say DateTime</Select.Option>
                                        <Select.Option value="sayDigits">Say Digits</Select.Option>
                                        <Select.Option value="sayNumber">Say Number</Select.Option>
                                        <Select.Option value="sayPhonetic">Say Phonetic</Select.Option>
                                        <Select.Option value="sayTime">Say Time</Select.Option>
                                        <Select.Option value="setVar">Set Var</Select.Option>
                                        {/*<Select.Option value="timeout">Timeout</Select.Option>*/}
                                        <Select.Option value="waitForDigits">Wait For Digits</Select.Option>
                                        <Select.Option value="noop">Noop</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item fieldKey="name" name="name" label="Node Name" required>
                                    <Input />
                                </Form.Item>
                                <Form.Item fieldKey="numberOfOutputs" name="numberOfOutputs" label="No. of Output(s)" required>
                                    <InputNumber />
                                </Form.Item>
                                {formElements}
                                <Form.Item {...tailLayout}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button onClick={onSaveChanges} icon={<SaveFilled />} type="primary" danger block>Save Changes</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                    <Col lg={18}>
                        <div style={{height: 600}}>
                            <ReactFlow
                                elements={elements}
                                onElementsRemove={onElementsRemove}
                                onConnect={onConnect}
                                deleteKeyCode={46} /* 'delete'-key */
                                nodeTypes={nodeTypes}
                            >
                                <MiniMap />
                                <Controls />
                                <Background />
                            </ReactFlow>
                        </div>
                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    )
}

export default IVR
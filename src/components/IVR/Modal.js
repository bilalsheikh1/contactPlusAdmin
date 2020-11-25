import React, {useEffect, useState} from "react";
import {Button, DatePicker, Form, Input, message, Modal, Select, TimePicker, Upload} from "antd";
import {Handle} from "react-flow-renderer";
import {InboxOutlined} from "@ant-design/icons";
import moment from "moment";
import {useDispatch} from "react-redux";
import {upload} from "../../actions/FileUpload/fileUpload";
import {actions} from "@mrblenny/react-flow-chart";
import apiClient from "../../axios/axios";
import {FileUpload} from "../../actions/APIConstant";

const { Dragger } = Upload;

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

const Modals = (props) =>
{
    let numOfOutput = 0;

    const [numOfOutput1, setNumOfOutput1] = useState(0)
    const [totalNumOfOutput , setTotalNumOfOutput] = useState([])
    const [edgeLabel , setEdgeLabel] = useState([])
    const [totalEdgeLabel , setTotalEdgeLabel] = useState([])
    const [btnStatus , setBtnStatus] = useState("false")

    const dispatch = useDispatch()

    const fileProps = {
        name: 'file',
        multiple: false,
        actions: 'http://api.contact-plus.com/contactplusapi/public/audio',
        beforeUpload: file => {
            console.log(file.type)
            if (file.type !== 'audio/wav') {
                message.error(`${file.name} is not a WAV file`);
            }
            return file.type  === 'audio/wav';
        },
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(status)
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };


    const numOfOutputNode = () =>
    {
        let output = [];
        var j=5;
        setNumOfOutput1(numOfOutput)
        for(var i =0 ; i<numOfOutput; i++){
            var k = j+"%"
            output.push(<Handle type="source" position="bottom" id={i} key={i} style={{ left: ''+k , borderRadius: 0 }} />)
            j +=20;
        }
        setTotalNumOfOutput(output)
        props.setTotalNumOfOutputs(output)
        output = [];
    }

    const [form] = Form.useForm();

    return(
        <>
         <Modal
                    title="IVR Flow"
                    visible={props.visible}
                    onOk={props.submit}
                    onCancel={props.close}
                    okText="Submit"
                    // okButtonProps={{ disabled: btnStatus }}
                    cancelText="Cancel"
                    width={1000}
                >
             <Form {...layout} initialValues={{remember: true,}}>
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
                              numOfOutput=value
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
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                      </Select>

                  </Form.Item>

                    { (props.type === 'Get Data') && (props.type != '') &&
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
                                props.setValue1(e.target.value)
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
                                props.setValue2(e.target.value)
                            }}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label={"Upload File"}
                        >
                            <Dragger
                                customRequest={(e) => {
                                    apiClient.get('/sanctum/csrf-cookie').then(response => {
                                        let formData = new FormData();
                                        formData.append("fileName", e.file);
                                        if(response.status === 204 || response.status === 200)
                                        {
                                            apiClient.post("/api/"+FileUpload , formData ).then(response => {
                                                // dispatch(uploadFile(response.data))
                                                e.onSuccess('ok')
                                                props.setFile(e.file.name)
                                                setBtnStatus("false")
                                            }).catch(error => {
                                                e.onError("")
                                            })
                                        }
                                    })
                                }}
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>

                            </Dragger>
                        </Form.Item>

                    </>
                    }

                  { (props.type === 'Say Date') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
                          }}
                      >
                          <DatePicker onChange={(date, dateString) =>props.setValue1(date)}  />
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }

                  { (props.type === 'Say Alpha') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }
                  { (props.type === 'Say DateTime') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
                          }}
                      >
                          <TimePicker use12Hours onChange={(time, timeString) => props.setValue1(time)} />

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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }
                  { (props.type === 'Get Option') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>

                      <Form.Item
                          label={"Upload File"}
                      >
                          <Dragger
                              customRequest={(e) => {
                                  apiClient.get('/sanctum/csrf-cookie').then(response => {
                                      let formData = new FormData();
                                      formData.append("fileName", e.file);
                                      if(response.status === 204 || response.status === 200)
                                      {
                                          apiClient.post("/api/"+FileUpload , formData ).then(response => {
                                              // dispatch(uploadFile(response.data))
                                              e.onSuccess('ok')
                                              props.setFile(e.file.name)
                                              setBtnStatus("false")
                                          }).catch(error => {
                                              e.onError("")
                                          })
                                      }
                                  })
                              }}
                          >
                              <p className="ant-upload-drag-icon">
                                  <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">Click or drag file to this area to upload</p>

                          </Dragger>
                      </Form.Item>

                  </>
                  }

                  { (props.type === 'Say Digits') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }

                  { (props.type === 'Say Number') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }

                  { (props.type === 'Say Phonetic') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }

                  { (props.type === 'Say Time') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
                          }}
                      >
                          <TimePicker onChange={(time, timeString) => props.setValue1(time)} defaultOpenValue={moment('00:00:00', 'HH:mm:ss')} />,
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }

                  { (props.type === 'Set Var') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }


                  { (props.type === 'Wait For Digit') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>

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
                              props.setValue2(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }
                  { (props.type === 'HangUp') && (props.type != '') &&
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
                              props.setValue1(e.target.value)
                          }}
                      >
                          <Input />
                      </Form.Item>
                  </>
                  }

             </Form>
                </Modal>
            </>
    );
}

export default Modals
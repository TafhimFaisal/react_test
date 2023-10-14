import React,{ createRef,useEffect } from 'react'
import { Card,Button,Form, Input,notification, Select,Spin } from 'antd';
import { useSelector,useDispatch } from 'react-redux';
import { useState } from 'react';
import { sendInvite } from '../../redux/actions/InviteAction';
import { useNavigate } from 'react-router';
const layout = {
    labelCol: {
        span: 3,
    },
    wrapperCol: {
        span: 17,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 19,
        span: 16,
    },
};
const formRef = createRef();
const { Option } = Select;
export default function SendInvitations() {
    const auth = useSelector(state => state.auth)
    const [loading,setloading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    
    const onFinish = async (values) => {
        setloading(true)
        dispatch(sendInvite({
            ...values,
            callBack:setErrorOrShowNotification
        }))
    };

    const setErrorOrShowNotification = (response) => {
        setloading(false)
        if(response.status != 201 ){
            notification['error']({
                message: 'Oops !!!',
                description: response.data.message,
            });
        };
        if(response.status == 201 ){
            notification['success']({
                message: 'successful'
            });
        };
    }
  
  
    const validateEmail = (_, value) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if ( !value.match(mailformat)) {
            return Promise.reject(new Error('please enter a valide email'));
        }
        
        return Promise.resolve();
    }
  

    return (
        <div>
            <Card title="">
                <Spin spinning={loading}> 

                    <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
                        <Form.Item
                            name="rolesInvitedTo"
                            label="Role"
                            rules={[
                                {
                                    required: true,
                                    message:"role is required"
                                }
                            ]}
                        >
                            <Select mode="multiple" allowClear style={{ width: '100%' }}>
                                <Option value={5}>Admin</Option>
                                <Option value={6}>Generale</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item
                            name="emailInvitedTo"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message:"email is required"
                                },
                                { validator: validateEmail }
                            ]}
                        >
                            <Input allowClear />
                        </Form.Item>
                        
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" loading={loading}> Send </Button>
                        </Form.Item>
                    </Form>
                </Spin>
            </Card>
        </div>
    )
}

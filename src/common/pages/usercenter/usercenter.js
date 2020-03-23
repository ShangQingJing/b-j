import React, { Component } from 'react';
import './usercenter.css';
import log from '../../../img/log.jpg'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { get, post } from '../http/http'
import { login } from '../api/api.js';
import { connect } from 'react-redux';
import { grn } from '../redux/action/todolist.js';
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
@connect((state) => ({}))
class Usercenter extends Component {
  constructor() {
    super();
    this.state = {
      params: {}
    }
  }
  onFinish = () => {
    const _self = this;
    const params = _self.state.params;
    post(login, params).then(res => {
      if (res.code == 200) {
        message.success(res.message);
        localStorage.setItem("token", res.data[2]);
        _self.props.history.push('/project');
        console.log(res)
      } else {
        message.info(res.message);
      }
    })
  };
  onFinishFailed = () => {
    const _self = this;
    const params = _self.state.params;
    if (!params.hasOwnProperty('username')) {
      message.info('请输入账号');
    } else if (params.username.length == 0) {
      message.info('请输入账号');
    } else if (!params.hasOwnProperty('password')) {
      message.info('请输入密码');
    } else if (params.password.length == 0) {
      message.info('请输入密码');
    }
    console.log('Failed:');
  };
  inputOnFocus = (e) => {
    const _self = this;
    const params = _self.state.params;
    const name = e.currentTarget.dataset.name;
    params[name] = e.target.value
    _self.setState({
      params: params
    }, () => {
      console.log(_self.state.params, 123)
    })

  };
  submit = () => {
    console.log(666)
  };
  onLeave(){
    console.log('onLeave');
  }
  componentWillUnmount() {
    const _self = this;
    _self.props.dispatch(grn({
      type: 'GRN',
      text: window.location.pathname
    }));
  };
  render() {
    const _self = this;
    return (
      <div className="Logcenter">
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={_self.onFinish} serve
          onFinishFailed={_self.onFinishFailed}
          className="Logbtn"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input onChange={(e) => _self.inputOnFocus(e)} name="username" data-name="username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password onChange={(e) => _self.inputOnFocus(e)} name="password" data-name="password" />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType={_self.submit}>
              Submit
        </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Usercenter;
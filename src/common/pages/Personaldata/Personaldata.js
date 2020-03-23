import React, { Component } from 'react';
import Bottom from '../bottom/bottom';
import { get, post } from '../http/http';
import { Upload, message } from 'antd';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { upload, Apiurl, findUserInfo,updateUserSelf} from '../api/api.js';
import './Personaldata.css';
import left from '../../../img/left.png';
import Tab from "../components/tartop.js";
let Global = require('../Global/Global.js');
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
class Personal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      PersonalInfos: '',
      list:123,
      imageUrl: '',
      txt:'个人中心',
      Routers:'/index'
    }
  }
  componentDidMount() {
    const _self = this;
    _self.initdata();
  };
  initdata = () => {
    let _self = this;
    let param = {};
    post(findUserInfo, param).then(res => {
      _self.setState({
        PersonalInfos: res.data,
        imageUrl: Apiurl + "bjupload" + res.data.avatar
      });
    });
  }
  onChange = (e) => {
    const _self = this;
    const PersonalInfos = _self.state.PersonalInfos;
    const name = e.target.name;
    const value = e.target.value;
    PersonalInfos[name] = value;
    _self.setState({
      PersonalInfos: PersonalInfos
    });
  };
  isEmailAvailable=(emailInput)=>{
    let myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!myreg.test(emailInput)) {
      return false;
    } else {
      return true;
    }
  };
  chickCard=(card)=>{
    let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(card) === false) {
      return false;
    } else {
      return true;
    }
  };
  SubmitInfo = () => {
    const _self = this;
    const PersonalInfos = _self.state.PersonalInfos;
    const param=PersonalInfos
    _self.setState({
      list:456
    });
    if(PersonalInfos.cardNmber && !_self.chickCard(PersonalInfos.cardNmber)){
      message.info('请输入正确的身份证号');
    }else if(PersonalInfos.email && !_self.isEmailAvailable(PersonalInfos.email)){
      message.info('请输入正确的邮箱');
    }else{
      post(updateUserSelf, param).then(res => {
      console.log(res);
      if(res.code==200){
        message.success(res.message);
        setTimeout(()=>{
      _self.props.history.push('/index')
        },1000)
      }
      });
    }
    console.log(PersonalInfos);
  };
  handleChange = info => {
    let _self = this;
    let file = info.file.originFileObj;
    let PersonalInfos=_self.state.PersonalInfos;
    let param = new FormData();
    let type=1;
    Global.multipartFile = true;
    param.append('multipartFile', file)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    };
    if (info.file.status === 'done') {
      post(upload, param,type).then(res => {
        console.log(res, 666);
        PersonalInfos.avatar=res.data;
        _self.setState({
          loading: true,
          PersonalInfos:PersonalInfos,
          imageUrl: Apiurl + 'bjupload' + res.data
        }, () => {
          Global.multipartFile = false;
        });
      });
    };
  };
  render() {
    let _self = this;
    let uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl, PersonalInfos,tabtxt} = this.state;
    return (
      <div className={`Personalcenter ${imageUrl? '':'ishide'}`}>
           <Tab tabtxt={tabtxt} props={_self.props}/>
        <div className="Personalhead">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </div>
        <div className="Headmain">
          <div className="Headtxt">职位</div>
          <div className="Perimg" >{PersonalInfos.stationName ? PersonalInfos.stationName : '(空)'}</div>
        </div>
        <div className="Headmain">
          <div className="Headtxt">公司名称</div>
          <input placeholder="请输入公司名称" style={{ width: '5rem', border: 'none' }} value={PersonalInfos.departmentName} name="departmentName" onChange={e => _self.onChange(e)} disabled="true"/>
        </div>
        <div className="Headmain">
          <div className="Headtxt">姓名</div>
          <input placeholder="请输入姓名" style={{ width: '5rem', border: 'none' }} value={PersonalInfos.nickname} name="nickname" onChange={e => _self.onChange(e)} />
        </div>
        <div className="Headmain">
          <div className="Headtxt">性别</div>
          <input placeholder="请输入性别" style={{ width: '5rem', border: 'none' }} value={PersonalInfos.sex} name="sex" onChange={e => _self.onChange(e)} />
        </div>

        <div className="Headmain">
          <div className="Headtxt">身份证号</div>
          <input placeholder="请输入身份证号" style={{ width: '5rem', border: 'none' }} value={PersonalInfos.cardNmber} name="cardNmber" onChange={e => _self.onChange(e)} />
        </div>
        <div className="Headmain">
          <div className="Headtxt">工作证号</div>
          <input placeholder="请输入工作证号" style={{ width: '5rem', border: 'none' }} value={PersonalInfos.jobNumber} name="jobNumber" onChange={e => _self.onChange(e)} />
        </div>
        <div className="Headmain">
          <div className="Headtxt">邮箱</div>
          <input placeholder="请输入邮箱" style={{ width: '5rem', border: 'none' }} value={PersonalInfos.email} name="email" onChange={e => _self.onChange(e)} />
        </div>
        <div className="Headmain">
          <div className="Headtxt">手机</div>
          <input placeholder="请输入手机" style={{ width: '5rem', border: 'none' }} value={PersonalInfos.phone} name="phone" onChange={e => _self.onChange(e)} disabled="true"/>
        </div>
        <div className="Submitbtn" onClick={_self.SubmitInfo} list={_self.state.list}>
          <div className="main">保存</div>
        </div>
      </div>
    )
  }
}
export default Personal;
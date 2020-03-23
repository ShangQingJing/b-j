import React, { Component } from 'react';
import Combtn from '../combtn/combtn.js';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './projectdetail.css';
import { Apiurl, updata } from '../api/api.js';
import { post } from '../http/http';
import Tab from "../components/tartop.js";
const Imgurl = Apiurl + 'bjupload';
class Projectdetial extends Component {
    constructor() {
        super();
        this.state = {
            UpdataInfos: [],
            tabtxt:'修改项目集'
        };
    };
    componentWillMount() {
        const _self = this;
        console.log(_self.props)
        if (_self.props.location.hasOwnProperty('item')) {
            _self.setState({
                UpdataInfos: JSON.parse(_self.props.location.item),
                index:_self.props.location.index
            }, () => {
                localStorage.setItem('items', _self.props.location.item);
                localStorage.setItem('index', _self.props.location.index);
            });
        } else {
            _self.setState({
                UpdataInfos: JSON.parse(localStorage.getItem('items')),
                index: localStorage.getItem('index')
            }, () => {
                console.log(localStorage.getItem('items'), 456)
            });
        }
    };
    Getsubmit = () => {
        const _self = this;
        const UpdataInfos = _self.state.UpdataInfos;
        const param = UpdataInfos;
        post(updata, param).then(res => {
         console.log(res);
         if(res.code==200){
            message.success('修改成功');
            setTimeout(()=>{
                _self.props.history.push({pathname:'/projectlist',UpdataInfos:UpdataInfos})
            })
         }
        });
    }
    onChange = (e) => {
        const _self = this;
        const UpdataInfos = _self.state.UpdataInfos;
        const name = e.target.name;
        const value = e.target.value;
        UpdataInfos[name] = value;
        _self.setState({
            UpdataInfos: UpdataInfos
        });
    };
    render() {
        const _self = this;
        const { UpdataInfos,tabtxt } = _self.state;
        console.log(UpdataInfos, 123)
        return (
            <div className="container">
                  <Tab tabtxt={tabtxt} props={_self.props}/>
                <div className="pro-pad">
                    <div className="pro-detail">
                        <div className="pro-txt">项目名称</div>
                        <input value={UpdataInfos.name} placeholder="请输入项目名称" name="name" data-name="name" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">项目编号</div>
                        <input value={UpdataInfos.project} placeholder="请输入项目编号" name="project" data-name="project" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">项目类型</div>
                        <input value={UpdataInfos.projectType} placeholder="请输入项目类型" name="projectType" data-name="projectType" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">项目经理</div>
                        <input value={UpdataInfos.projectManager} placeholder="请输入项目经理" name="projectManager" data-name="projectManager" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt" >建设单位</div>
                        <input value={UpdataInfos.projectConstructionUnit} placeholder="请输入建设单位" name="projectConstructionUnit" data-name="projectConstructionUnit" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">监理单位</div>
                        <input value={UpdataInfos.projectCheckUnit} placeholder="请输入监理单位" name="projectCheckUnit" data-name="projectCheckUnit" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">设计单位</div>
                        <input value={UpdataInfos.projectDesignUnit} placeholder="请输入设计单位" name="projectDesignUnit" data-name="projectDesignUnit" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">施工单位</div>
                        <input value={UpdataInfos.projectImplementUnit} placeholder="施工单位" name="projectImplementUnit" data-name="projectImplementUnit" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">总投资额</div>
                        <input value={UpdataInfos.projectTotalPrice} name="projectTotalPrice" data-name="projectTotalPrice" onChange={e => _self.onChange(e)} placeholder="请输入总投资额" />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt">开工时间</div>
                        <input value={UpdataInfos.projectStartTime} name="projectStartTime" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt"> 竣工时间</div>
                        <input value={UpdataInfos.projectOverTime} name="projectOverTime" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt" >项目集</div>
                        <input value={UpdataInfos.projectSet} name="projectSet" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-detail">
                        <div className="pro-txt" >项目状态</div>
                        <input value={UpdataInfos.projectStatus} name="projectStatus" onChange={e => _self.onChange(e)} />
                    </div>
                    {/* <div className="pro-detail">
                   <div className="pro-txt">公司名称</div>
                   <input/>
               </div> */}
                    <div className="pro-detail">
                        <div className="pro-txt"  >项目定位</div>
                        <input value={UpdataInfos.desc} name="desc" onChange={e => _self.onChange(e)} />
                    </div>
                    <div className="pro-pic">
                        <img src={Imgurl + UpdataInfos.pimg} />
                    </div>
                </div>
                <Combtn Jumpdetail={_self.Getsubmit} />
            </div>
        );
    }
}

export default Projectdetial;
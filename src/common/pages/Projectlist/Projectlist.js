import React, { Component } from 'react';
import './Projectlist.css';
import { Apiurl } from '../api/api.js';
import Tab from "../components/tartop.js"
const ImgUrl = Apiurl + 'bjupload';
class Projectlist extends Component {
    constructor() {
        super();
        this.state = {
            projectlist: [],
            tabtxt:'项目集'
        }
    };
    componentWillMount() {
             const _self = this;
        console.log('aaaa')
                const index = localStorage.getItem('index');
                if (_self.props.location.hasOwnProperty('projectlist')) {
                    const projectlist = JSON.parse(_self.props.location.projectlist);
                    _self.setState({
                        projectlist: projectlist
                    }, () => {
                        localStorage.setItem('projectlist', JSON.stringify(projectlist))
                    });
                } else {
                    _self.setState({
                        projectlist: JSON.parse(localStorage.getItem('projectlist'))
                    },()=>{
                        if(index){
                            const projectlist=_self.state.projectlist;
                            if(_self.props.location.hasOwnProperty('UpdataInfos')){
                                projectlist[index]=_self.props.location.UpdataInfos
                                _self.setState({
                                    projectlist:projectlist 
                                },()=>{
                                    localStorage.setItem('UpdataInfos',JSON.stringify(projectlist))
                                })
                            } else{
                                _self.setState({
                                    projectlist:JSON.parse(localStorage.getItem('UpdataInfos'))
                                })
                            }
                        }
                    });
                };  
    };
    componentWillUnmount(){
        localStorage.removeItem('index');
    }
    JumpIndex=(i)=>{
      const _self=this;
      const projectlist=_self.state.projectlist;
      const theirProjectId=projectlist[i].theirProjectId;
      localStorage.setItem('theirProjectId',theirProjectId)
     _self.props.history.push('/index');
    }
    Jumpdetail = (items, i,e) => {
        const _self = this;
        e.stopPropagation();
        _self.props.history.push({ pathname: '/Projectdetial', item: JSON.stringify(items), index: i })
    }
    render() {
        const _self = this;
        const { projectlist,tabtxt } = _self.state;
        return (
            <div className="container">
                <Tab tabtxt={tabtxt} props={_self.props}/>
                <div className="padding-top:30rpx;box-sizing:border-box;">
                    {projectlist.map((item, i) =>
                        <div className="Project-listcon" onClick={_self.JumpIndex.bind(_self,i)} >
                            <div className="Project-listhead">
                                <div className="Project-listleft">
                                    <div className="Project-line"></div>
                                    <div className="Project-name">{item.name}</div>
                                </div>
                                <div className="Project-check" onClick={(e)=>_self.Jumpdetail(item, i,e)} >编辑</div>
                            </div>
                            <div className="Project-pic"><img src={ImgUrl + item.pimg} /></div>
                            {
                                item.createTime ?  <div className="Project-rules" >创建时间：{item.createTime}</div>:''
                            }
                            {
                                item.project ?   <div className="Project-rules" >项目编号：{item.project}</div>:''
                            }
                            {
                                item.desc ?   <div className="Project-rules">概述：{item.desc}</div>:''
                            }
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
export default Projectlist
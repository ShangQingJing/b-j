import React, { Component } from 'react';
 import  './specialtype.css';
 import select1 from '../../../img/select1.png';
 import select2 from '../../../img/select2.png';
import { get, post } from '../http/http';
import {connect} from 'react-redux';
import {getsecure} from '../redux/action/todolist';
import {securetype} from '../api/api.js';
@connect((state)=>({
    getsucureinformation:state.getsucureinformation
})
)
class Specialtype extends Component{
    constructor(){
        super();
        this.state={
            getPersonType:[],
            securetypeinforemation:[]
        };
    };
    componentDidMount(){
        const _self=this;
        const params={
            pageNumber:0,
            pageSize:15
        };
        const specialProfessionType=_self.props.getsucureinformation.specialProfessionType;
        post(securetype,params).then(res => {
            console.log(res)
            if(res.code==200){
                res.data.row.map((item,i)=>{
                    if(item.typeId==specialProfessionType){
                        return item.flag=true;
                    }else{
                        return item.flag=false;
                    };
                });
                _self.setState({
                    securetypeinforemation:res.data.rows
                });
            };
        });
    };
    Jumpback=(i,flag)=>{
        const _self=this;
        const {securetypeinforemation}=_self.state;
        const params={
            name:flag ? '请选择':securetypeinforemation[i].name,
            specialProfessionType:flag ? 0:securetypeinforemation[i].typeI
        };
        _self.props.dispatch(getsecure({
            type:'SECURE_TYPE',
            text:params
        }));
        if(!flag){
            securetypeinforemation[i].flag=true;
            _self.props.history.goBack();
        }else{
            securetypeinforemation[i].flag=false;
        };
        _self.setState({
            securetypeinforemation:securetypeinforemation
        });
    }
    render(){
        const _self=this;
        const {securetypeinforemation}=_self.state;
        return(
            <div className="container">
                {
                    securetypeinforemation.map((item,i)=>
                    <div className="Specila-con" onClick={_self.Jumpback.bind(_self,i,item.flag)}>
                    <div>{item.name}</div>
                    <img src={item.flag ? select2:select1}/>
                </div>
                        )
                }
                
            </div>
        )
    }
}
export default Specialtype;
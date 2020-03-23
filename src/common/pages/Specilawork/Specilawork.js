import React, { Component } from 'react';
 import  './Specilawork.css';
 import select1 from '../../../img/select1.png';
 import select2 from '../../../img/select2.png';
import { get, post } from '../http/http';
import {connect} from 'react-redux';
import {add} from '../redux/action/todolist';
import {getPersonType} from '../api/api.js';
@connect((state)=>({
    Specialtype:state.Specialtype
})
)
class Specialwork extends Component{
    constructor(){
        super();
        this.state={
            getPersonType:[]
        };
    };
    componentDidMount(){
        const _self=this;
        const param={};
        const personTypeId=_self.props.Specialtype.personTypeId;
        console.log(_self.props);
        get(getPersonType).then(res => {
            console.log(res)
            if(res.code==200){
                res.data.map((item,i)=>{
                    if(item.personTypeId==personTypeId){
                        return item.flag=true;
                    }else{
                        return item.flag=false;
                    };
                });
                _self.setState({
                    getPersonType:res.data
                },()=>{console.log(_self.state.getPersonType)});
            };
        });
    };
    Jumpback=(i,flag)=>{
        const _self=this;
        const getPersonType=_self.state.getPersonType;
        const params={
            name:flag ? '请选择':getPersonType[i].name,
            personTypeId:flag ? 0:getPersonType[i].personTypeId
        };
        _self.props.dispatch(add({
            type:'ADD',
            text:params
        }));
        if(!flag){
            getPersonType[i].flag=true;
            _self.props.history.goBack();
        }else{
            getPersonType[i].flag=false;
        };
        _self.setState({
            getPersonType:getPersonType
        },()=>{console.log(_self.state.getPersonType)})
    }
    render(){
        const _self=this;
        const {getPersonType}=_self.state;
        return(
            <div className="container">
                {
                    getPersonType.map((item,i)=>
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
export default Specialwork;
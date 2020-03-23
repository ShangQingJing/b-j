import React, { Component } from 'react';
 import  './company.css';
 import select1 from '../../../img/select1.png';
 import select2 from '../../../img/select2.png';
import { get, post } from '../http/http';
import {connect} from 'react-redux';
import {choosecompany} from '../redux/action/todolist';
import {findAll} from '../api/api.js';
@connect((state)=>({
    companyinformation:state.companyinformation
})
)
class Company extends Component{
    constructor(){
        super();
        this.state={
            getPersonType:[],
            Getcompanyinformation:[]
        };
    };
    componentDidMount(){
        const _self=this;
        const param={};
        const companyId=_self.props.companyinformation.companyId;
        const params={     
            pageNumber: 0,
            pageSize: 15
        };
        post(findAll,params).then(res => {
            if(res.code===200){
                res.data.rows.map((item,i)=>{
                    if(item.id===companyId){
                        return item.flag=true;
                    }else{
                        return item.flag=false;
                    };
                });
                _self.setState({
                    Getcompanyinformation: res.data.rows
                });
            }
        });
    };
    Jumpback=(i,flag)=>{
        const _self=this;
        const Getcompanyinformation=_self.state.Getcompanyinformation;
        debugger
        console.log(Getcompanyinformation)
        const params={
            name:flag ? '请选择':Getcompanyinformation[i].name,
            companyId:flag ? 0:Getcompanyinformation[i].id
        };
        _self.props.dispatch(choosecompany({
            type:'CHOOSE_COMPANY',
            text:params
        }));
        if(!flag){
            Getcompanyinformation[i].flag=true;
            _self.props.history.goBack();
        }else{
            Getcompanyinformation[i].flag=false;
        };
        _self.setState({
            Getcompanyinformation:Getcompanyinformation
        },()=>{console.log(_self.state.Getcompanyinformation)})
    }
    render(){
        const _self=this;
        const {Getcompanyinformation}=_self.state;
        return(
            <div className="container">
                {
                    Getcompanyinformation.map((item,i)=>
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
export default Company;
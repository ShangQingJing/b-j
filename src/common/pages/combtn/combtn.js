import React, { Component } from 'react';
import './combtn.css';

class Combtn extends Component {
    constructor(){
        super();
        this.state={}
    }
    componentWillReceiveProps(nextProps){
        const _self=this;
         _self.list(nextProps)
      }
      componentDidMount(){
        const _self=this;
      
        _self.list()
        _self.setState({
            list:this.props.list
        })
      }
      shouldComponentUpdate(nextProps){
console.log(nextProps,'test')
      }
     list=(props)=>{
        const _self=this;
        if(!props){
            _self.setState({
                list:this.props.list
            });
        }else{
            _self.setState({
                list:props.list
            }); 
        }
       
     }
    render() {
        const _self = this;
        return (
                <div className="combtn">
                    <div className="combtn-con" onClick={_self.props.Jumpdetail}>
                        {this.state.list}
                    </div>
                </div>
        )
    }
}
export default Combtn;
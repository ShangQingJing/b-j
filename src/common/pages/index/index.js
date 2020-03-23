import React, { Component } from 'react';
import './index.css';
import left from '../../../img/left.png';
import { findUserInfo, Apiurl } from '../api/api.js';
import { get, post } from '../http/http';
import tab1 from '../../../img/tab1.png';
import tab2 from '../../../img/tab2.png';
import tab4 from '../../../img/tab4.png';
import tab6 from '../../../img/tab6.png';
import Tab from '../components/tartop.js';
import Bottom from '../bottom/bottom.js';
import { connect } from 'react-redux';
import { shownav,hiddenav } from '../redux/action/todolist.js';
@connect(state => ({
  shownav:state.shownav
}))
class Index extends Component {
  constructor() {
    super();
    this.state = {
      Number: 1,
      list: { name: 1 },
      arry: [{ name: 1 }]
    }
  };
  handleClick = () => {
    const preNumber = this.state.Number;
    const list = { name: 2 }
    this.setState({
      Number: this.state.Number,
      list: list,
      arry: [{ name: 2 }]
    })
  };
  componentDidMount() {
    const _self = this;
    _self.props.dispatch(shownav({
      type: 'SHOW_NAV',
    }));
    console.log(_self.props)
  };
  componentWillUnmount(){
    const _self = this;
    _self.props.dispatch(hiddenav({
      type: 'HIDE_NAV'
    }));
  };
  render() {
    console.log(this.state.Number)
    return (<h1 onClick={this.handleClick} style={{ margin: 30 }}>
      {this.state.Number}
    </h1>)
  }
}
export default Index;
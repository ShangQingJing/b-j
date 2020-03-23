import React, { Component } from 'react';
import './my.css';
import left from '../../../img/left.png';
import { findUserInfo, Apiurl } from '../api/api.js';
import { get, post } from '../http/http';
import tab1 from '../../../img/tab1.png';
import tab2 from '../../../img/tab2.png';
import tab4 from '../../../img/tab4.png';
import tab6 from '../../../img/tab6.png';
import Bottom from '../bottom/bottom.js';
import { connect } from 'react-redux';
import { shownav, hiddenav } from '../redux/action/todolist.js';
@connect(state => ({}))
class My extends Component {
  constructor() {
    super();
    this.state = {
      PersonalInfos: '',
      Imgurls: '',
      Txt: '我的',
      Tabcon: [{ txt: '切换项目', img: tab1 }, { txt: '我的消息', img: tab2 }, { txt: '使用说明', img: tab4 }, { txt: '退出登录', img: tab6 }]
    };
  };
  Jumpdetail = (i) => {
    const _self = this;
    if (i == 0) {
      _self.props.history.push('/worker');
    }
  };
  componentDidMount() {
    const _self = this;
    const param = {};
    const token = localStorage.getItem('token');
    _self.shownav();
    post(findUserInfo, param).then(res => {
      console.log(res);
      if (res.code == 200) {
        _self.setState({
          Imgurls: Apiurl + 'bjupload' + res.data.avatar,
          PersonalInfos: res.data
        });
      }
    });
  };
  shownav = () => {
    const _self = this;
    _self.props.dispatch(shownav({
      type: 'SHOW_NAV'
    }))
  };
  componentWillUnmount() {
    const _self = this;
    _self.hidenav();
  };
  hidenav = () => {
    const _self = this;
    _self.props.dispatch(shownav({
      type: 'hiddenav'
    }))
  };
  render() {
    const _self = this;
    const { PersonalInfos, Imgurls, Tabcon, Txt } = _self.state;
    return (
      <div className={`container ${Imgurls ? '' : 'ishide'}`}>
        <div className="Personalmain">
          <div className="PersonalLeft">
            <div className="Personalparto">
              <img src={Imgurls} />
            </div>
            <div className="Personalpartt">
              <div>{PersonalInfos.nickname}</div>
              <div>{PersonalInfos.phone}</div>
            </div>
          </div>
          <div className="PersonalRight"><img src={left} /></div>
        </div>
        {Tabcon.map((item, i) =>
          <div className={`PersonTab ${i == 3 ? 'active' : ''}`} onClick={_self.Jumpdetail.bind(this, i)}>
            <div className="Personal-tab1">
              <img src={item.img} style={{ width: '0.43rem', height: '0.39rem' }} />
              <div style={{ color: (i == 3) ? '#FF3F4A' : '#999' }}>{item.txt}</div>
            </div>
            <div className="Personal-tab2"><img src={left} /></div>
          </div>
        )}

      </div>
    )
  }
}
export default My;
import React, { Component } from 'react';
import './bottom.css';
import { withRouter, Link } from 'react-router-dom';
import work1 from '../../../img/work1.png';
import work2 from '../../../img/work2.png';
import mySelf1 from '../../../img/mySelf1.png';
import mySelf2 from '../../../img/mySelf2.png';
import { connect } from 'react-redux';
@connect(state => ({
  shownav: state.shownav
}))
class Bottom extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      TabIndex: '',
      Tabcon: [{ img: work1, txt: '工作', img1: work2, path: '/index' }, { img: mySelf1, txt: '我的', img1: mySelf2, path: '/my' }]
    }
  };
  Gettab = (i, path) => {
    const _self = this;
    _self.setState({
      TabIndex: i
    }, () => {
      console.log(_self.state.TabIndex, path, 'TabIndex');
    });
  }
  componentDidMount() {
    const _self = this;
    const pathname = window.location.pathname;
    const Tabcon = _self.state.Tabcon;
    const TabIndex = Tabcon.findIndex(item => item.path === pathname);
    _self.setState({
      TabIndex: TabIndex,
      pathname: pathname
    });
  };
 componentWillReceiveProps(nextProps){
console.log(nextProps,'nextProps')
 };
  render() {
    const _self = this;
    const { Tabcon, TabIndex, pathname } = _self.state;
    console.log(pathname, 'pathname');
    return (
      <div className={`Navbottom ${!_self.props.shownav ? 'active' : ''}`} key={this.props.shownav}>
        {Tabcon.map((item, i) =>
          <div className="Leftbottom" onClick={_self.Gettab.bind(this, i)}  >
            <Link to={item.path}>
              <div className="Bottomcenter">
                {
                  TabIndex == i ? <img src={item.img1} /> : <img src={item.img} />
                }
                <div className="text">{item.txt}</div>
              </div>
            </Link>
          </div>
        )
        }
      </div>
    )
  }
}
export default Bottom;
import React, { Component } from 'react';
import './project.css';
import Tab from '../components/tartop.js';
import { findProjectSet, Apiurl } from '../api/api.js';
import { get, post } from '../http/http';
const ImgUrl = Apiurl + 'bjupload';
class Project extends Component {
  constructor() {
    super();
    this.state = {
      ProjectSet: []
    }
  };
  componentDidMount() {
    const _self = this;
    const param = {};
    console.log(_self.props)
    post(findProjectSet, param).then(res => {
      console.log(res);
      if (res.code == 200) {
        const ProjectSet = [];
        for (let v in res.data) {
          ProjectSet.push(res.data[v])
        };
        _self.setState({
          ProjectSet: ProjectSet
        });
        console.log(ProjectSet);
      }
    });
  };
  Jumpdetail = (i) => {
    const _self=this;
    const ProjectSet=_self.state.ProjectSet;
    _self.props.history.push({pathname:'/projectlist',projectlist:JSON.stringify(ProjectSet[i])})
  }
  render() {
    const _self = this;
    const { ProjectSet } = _self.state;
    return (
      <div className="container">
        {ProjectSet.map((item, i) =>
          <div className="Project-main" onClick={_self.Jumpdetail.bind(_self, i)}>
            <div className="Project-con">
              <div className="Project-head">
                <div className="Project-listleft">
                  <div className="Project-line"></div>
                  <div className="Project-name">{item[0].name}</div>
                </div>
                <div className="project-num">{item.length}</div>
              </div>
              <div className="Project-pic"><img src={ImgUrl + item[0].pimg} /></div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Project;
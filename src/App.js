import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import 'antd/dist/antd.css';
import Bottom from './common/pages/bottom/bottom.js';
import Index from './common/pages/index/index.js';
import Usercenter from './common/pages/usercenter/usercenter.js';
import Log from './common/pages/log/log.js';
import Project from './common/pages/project/project.js';
import Personal from './common/pages/Personaldata/Personaldata';
import Projectlist from './common/pages/Projectlist/Projectlist';
import Projectdetial from './common/pages/projectdetail/projectdetail';
import Worker from './common/pages/worker/worker.js';
import Specialwork from './common/pages/Specilawork/Specilawork.js';
import My from './common/pages/my/my.js';
import { connnect } from 'react-redux';
import Top from "./common/pages/top/top.js";
import Specialtype from './common/pages/specialtype/specialtype.js';
import Company from './common/pages/company/company.js';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/index" component={Index}></Route>
          <Route exact path="/" render={() => {
            if (localStorage.getItem('token')) {
              if (localStorage.getItem('theirProjectId')) {
                return <Redirect to="/index"></Redirect>
              } else {
                return <Redirect to="/project"></Redirect>
              };

            } else {
              return <Redirect to="/center"></Redirect>
            }
          }}></Route>
          <Route path="/center" component={Usercenter}></Route>
          <Route path="/project" component={Project}></Route>
          <Route path="/personal" component={Personal}></Route>
          <Route path="/projectlist" component={Projectlist}></Route>
          <Route path="/projectdetial" component={Projectdetial} />
          <Route path="/worker" component={Worker} />
          <Route path="/special" component={Specialwork} />
          <Route path="/my" component={My} />.
          <Route path="/company" component={Company}/>
          <Route path="/securetype" component={Specialtype}/>
          <Bottom />
        </div>
      </Router>
    )
  }
}

export default App;


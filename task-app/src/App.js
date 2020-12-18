import React, { Component } from 'react'
import './App.css'
import './styles.css'

import Welcome from './components/Welcome'
import Tasks from './components/Tasks'
import Categories from './components/Categories'
import Taskview from './components/Taskview'
import Categoryview from './components/Categoryview'
import {HashRouter as Router, Switch, Route} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
      <Switch>
        <Route name="home" path="/" exact component={Welcome}></Route>
        <Route path="/tasks" exact component={Tasks}></Route>
        <Route path="/categories" exact component={Categories}></Route>
        <Route path="/categories/new" exact component={Categoryview}></Route>
        {/* params passed in link, query excessive for a task manager */}
        <Route path="/categories/:category_id" exact component={Tasks}></Route>
        <Route path="/categories/update/:category_id" exact component={Categoryview}></Route>
        <Route path="/tasks/update/:category_id/:task_id?" component={Taskview}></Route>
        <Route path="/tasks/new" component={Taskview}></Route>
      </Switch>
      </Router>
    );
  }
}

export default App;
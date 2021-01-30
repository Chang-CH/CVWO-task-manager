import React, { Component } from 'react'
import Navbar from './Navbar'

// import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import update from 'immutability-helper'
import { Link } from 'react-router-dom'
import * as Constants from './../constants'

class Tasks extends Component {
    constructor(props){
        super(props)
        this.state = {
            tasks: [],
            category_id: props.match !== undefined && "category_id" in props.match.params 
                ? Number(props.match.params.category_id) 
                : Constants.NULL_INDEX
        }
    }

    createTask(event, category_id) {
        if (event.key === 'Enter' && !(event.target.value === '')) {
            axios.post(Constants.RAILS_TASK_URL, 
                {task: {title: event.target.value, category_id: category_id, done: false}})
            .then(response => {
              const tasks = update(this.state.tasks, {
                //   add the new task to the front of the list
                $splice: [[0, 0, response.data]]
              })
              this.setState({
                tasks: tasks,
                inputValue: ''
              })
            })
            .catch(error => console.log(error))      
        }    
    }

    // input-done
    updateTask(event, id){
        axios.put(Constants.RAILS_TASK_URL + String(id), {task: {done: event.target.checked}})
        .then(response => {
            const taskIndex = this.state.tasks.findIndex(x => x.id === response.data.id)
            const tasks = update(this.state.tasks, {
                [taskIndex]: {$set: response.data}
            })
            this.setState({
                tasks: tasks
            })
        })
        .catch(error => console.log(error))  
    }

    // btn-delete
    deleteTask(id){
        axios.delete(Constants.RAILS_TASK_URL + String(id))
            .then(response => {
                const taskIndex = this.state.tasks.findIndex(x => x.id === id)
                const tasks = update(this.state.tasks, {$splice: [[taskIndex, 1]]})
                this.setState({tasks: tasks})
            }).catch(error => console.log(error))
    }

    // init methods
    getTasks(){
        axios.get(Constants.RAILS_TASK_URL)
        .then(response => {
            this.setState({
                tasks: this.state.category_id === Constants.NULL_INDEX 
                    ? response.data
                    : response.data.filter(x => x.category_id === this.state.category_id)
            })
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        this.getTasks()
    }

    render(){
        return (
            <div>
                <Navbar text="Task manager"/>
                <Link to={this.state.category_id === Constants.NULL_INDEX 
                    ? {pathname: "/tasks/new"} 
                    : {pathname: `/tasks/update/${this.state.category_id}`}}>
                <div className="generic-container flex-centered col-view">
                    <label className="label-task">Create new task</label>
                </div>
                </Link>
                <div>
                {this.state.tasks.map((task) => {
                    return (
                    <div className={"generic-container flex-centered" + (task.done ?  " col-done" : " col-container")} key={task.id}>
                    <input className="input-done" type="checkbox" checked={task.done}
                        onChange={(event) => this.updateTask(event, task.id)}/>
                    <label className="space-right">{task.title}</label>
                    <table className="table-edit-controls">
                    <tbody>
                    <tr>
                    <td>
                        {/* <Link to={{pathname: `/tasks/update/`, query: {edit: true, task_id: task.id, category_id:task.category_id, task_title: task.title}}}> */}
                        <Link to={{pathname: `/tasks/update/${task.category_id}/${task.id}`}}>
                        <button className="btn col-edit full-width">
                            Edit
                        </button>
                        </Link>
                    </td>
                    <td>
                        <button className="btn col-delete full-width" 
                        onClick={(event) => this.deleteTask(task.id)}>Delete</button>
                    </td>
                    </tr>
                    </tbody>
                    </table>
                    </div>);
                })}
                </div>
            </div>
        )
    }
}

export default Tasks;
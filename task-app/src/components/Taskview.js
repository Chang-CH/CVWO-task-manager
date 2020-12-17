import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import * as Constants from './../constants'

class Taskview extends Component {
    constructor(props){
        super(props)
        console.log(props)
        let init_category = props.match.params.category_id !== undefined 
            ? Number(props.match.params.category_id) 
            : Constants.GENERAL_CATEGORY
        this.state = {
            tasks: [],
            categories: [],
            inputValue: "",
            task_id: props.match.params.task_id !== undefined ? Number(props.match.params.task_id) : Constants.NULL_INDEX,
            category_id: init_category,
            category_to: init_category
        }
        
    }

    // init methods
    getTasks(){
        axios.get(Constants.RAILS_TASK_URL).then(response => {
            this.setState({
                tasks: response.data.filter(x => x.id === this.state.task_id)
            })
            this.setState({inputValue: this.state.tasks[0].title})
        }).catch(error => console.log(error))
    }

    getCategories() {
        axios.get(Constants.RAILS_CATEGORY_URL).then(response => {
            this.setState({
                categories: response.data
            })
        }).catch(error => console.log(error))
        console.log(this.state.inputValue)
    }

    componentDidMount() {
        if (this.state.task_id !== Constants.NULL_INDEX){
            console.log(this.state.task_id)
            this.getTasks()
        }
        this.getCategories()
    }

    // input handler
    // lambda used so this can work
    handleInputChange = (event) => {
        this.setState({inputValue: event.target.value});
    }

    // category handler
    handleCategoryChange = (event) => {
        this.setState({category_to: event.target.value});
    }
    
    // saves to done === false by default
    updateTask = (event)  => {
            const updated = {
                title: this.state.inputValue,
                category_id: this.state.category_to,
                done: false
            }
            if (this.state.task_id !== Constants.NULL_INDEX){
                axios.put(Constants.RAILS_TASK_URL + String(this.state.task_id), {task: updated})
                .then(this.props.history.push("/categories/" + String(this.state.category_id)))
                .catch(error => console.log(error))
            } else {
                axios.post(Constants.RAILS_TASK_URL, {task: updated})
                .then(this.props.history.push("/categories/" + String(this.state.category_id)))
                .catch(error => console.log(error))
            }
        }
    
    deleteTask = (event) => {
            axios.delete(Constants.RAILS_TASK_URL + String(this.state.task_id))
            .then(this.props.history.push("/categories/" + String(this.state.category_id)))
            .catch(error => console.log(error))
        }

    render(){
        var op_task = Constants.NULL_INDEX
        if (this.state.tasks !== [] && this.state.tasks[0] !== undefined){
            op_task = this.state.tasks[0]
        }
        const html_render = (
            <div>
                {/* <Navbar text={op_task === Constants.NULL_INDEX 
                    ? "Create task" 
                    : "Edit: " + op_task.title}/> */}
                <Navbar text="Task manager"/>
                <div>
                {
                <div className="generic-container col-container">
                <div className="full-width">
                <div className="flex-inline full-width">
                <input type="text" className="input-text full-width" value={this.state.inputValue} 
                    onChange={this.handleInputChange} placeholder="Enter task title"/>
                <select className="input-text" value={this.state.category_to} 
                    onChange={this.handleCategoryChange}>
                    {this.state.categories.map((category) => {
                        return <option key={category.id} value={category.id}>{category.name}</option>
                    })}
                </select>
                </div>
                <table className="table-edit-controls">
                <tbody>
                <tr>
                <td>
                    <button className="btn col-edit full-width" 
                    onClick={this.updateTask}>
                        {this.state.task_id === Constants.NULL_INDEX ? "Create": "Save"}
                    </button>
                </td>
                <td>
                    <button className="btn col-delete full-width" 
                    onClick={(event) => {this.props.history.push("/categories/" + String(this.state.category_id))}}>Cancel</button>
                </td>
                </tr>
                </tbody>
                </table>
                </div>
                </div>
                }
                </div>
            </div>
        )
        return html_render
    }
}

export default Taskview;
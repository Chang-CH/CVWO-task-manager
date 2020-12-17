import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
// import update from 'immutability-helper'
import { Link } from 'react-router-dom'
import * as Constants from './../constants'

class Taskview extends Component {
    constructor(props){
        // Category 0 is used as an "all" category
        super(props)
        let init_category = props.match.params.category_id !== undefined 
            ? Number(props.match.params.category_id) 
            : Constants.NULL_INDEX
        this.state = {
            inputValue: "",
            category_id: init_category,
            category_name: ""
        }
        
    }

    getCategory() {
        axios.get(Constants.RAILS_CATEGORY_URL)
        .then(response => {
            var input = ""
            response.data.forEach((category) => {
                if (category.id === this.state.category_id){
                    input = category.name
                }
            })
            this.setState({inputValue: input, category_name: input})
        }).catch(error => console.log(error))
    }

    componentDidMount() {
        if (this.state.category_id === Constants.GENERAL_CATEGORY){
            throw new Error("Categoryview error: General Category cannot be modified");
        }
        else if (this.state.category_id !== Constants.NULL_INDEX){
            this.getCategory()
        }
        
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
    updateCategory = (event)  => {
        const updated = {
            name: this.state.inputValue
        }
        if (this.state.category_id === Constants.NULL_INDEX){
            axios.post(Constants.RAILS_CATEGORY_URL, {category: updated})
            .catch(error => console.log(error))
        }
        else if (this.state.category_id !== Constants.GENERAL_CATEGORY){
            axios.put(Constants.RAILS_CATEGORY_URL + String(this.state.category_id), {task: updated})
            .catch(error => console.log(error))
        } else {
            console.log("Categoryview updateCategory error: changing general category")
        }
    }
    
    deleteCategory(category_id){
        axios.delete(Constants.RAILS_CATEGORY_URL + String(category_id)).catch(error => console.log(error))
        axios.get(Constants.RAILS_TASK_URL)
        .then(response => {
            response.data.forEach((task) => {
                if(task.category_id === category_id){
                    axios.delete(Constants.RAILS_TASK_URL + String(task.id)).catch(error => console.log(error))
                }
            })
        }).catch(error => console.log(error))
    }

    render(){
        const html_render = (
            <div>
            {/* <Navbar text={this.state.category_id === Constants.NULL_INDEX 
                ? "Create category" 
                : "Edit: " + this.state.category_name}/> */}
            <Navbar text="Task manager"/>
            <div>
            {
            <div className="generic-container col-container">
            <div className="full-width">
            <div className="flex-inline full-width">
                <input type="text" className="input-text full-width" value={this.state.inputValue} 
                    onChange={this.handleInputChange} placeholder="Enter category name"/>
            </div>
            <table className="table-edit-controls">
            <tbody>
            <tr>
            <td>
                <Link to={"/categories/"}>
                    <button className="btn col-edit full-width" 
                    onClick={this.updateCategory}>
                        {this.state.category_id === Constants.NULL_INDEX ? "Create": "Save"}
                    </button>
                </Link>
            </td>
            <td>
                <Link to={"/categories/"}>
                    <button className="btn full-width col-delete">Cancel</button>
                </Link>
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
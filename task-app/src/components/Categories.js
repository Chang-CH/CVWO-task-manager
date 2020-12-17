import React, { Component } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import update from 'immutability-helper'
import { Link } from 'react-router-dom'
import * as Constants from './../constants'

class Categories extends Component {
    constructor(props){
        super(props)
        this.state = {
            categories: []
        }
    }

    // init methods
    getCategories(){
        axios.get(Constants.RAILS_CATEGORY_URL)
        .then(response => {
            this.setState({
                categories: response.data
            })
        }).catch(error => console.log(error))
    }

    componentDidMount(){
        this.getCategories()
    }

    deleteCategory(category_id){
        axios.delete(Constants.RAILS_CATEGORY_URL + String(category_id))
        .then(response => {
            const categoryIndex = this.state.categories.findIndex(x => x.id === category_id)
            const categories = update(this.state.categories, {
                $splice: [[categoryIndex, 1]]
            })
            this.setState({
                categories: categories
            })
        }).catch(error => console.log(error))
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
        return (
            <div>
            <Navbar text="Task manager"/>
            <div>
            <Link to={{pathname: "/categories/new"}}>
            <div className="generic-container flex-centered col-view">
                <label>Create new category</label>
            </div>
            </Link>
            {this.state.categories.map((category) => {
                return (
                <div className="generic-container col-container flex-centered" key={category.id}>
                <label className="space-right">{category.name}</label>
                <table className="table-edit-controls">
                <tbody>
                <tr>
                <td>
                    <Link to={{pathname: `/categories/update/${category.id}`}}>
                        <button className={"btn full-width " + (category.id === Constants.GENERAL_CATEGORY 
                            ? "col-done" 
                            : "col-edit")}
                        disabled={category.id === Constants.GENERAL_CATEGORY}>
                            Edit
                        </button>
                    </Link>
                </td>
                <td>
                    <Link to={{pathname: `/categories/${category.id}`}}>
                        <button className="btn full-width col-view">
                            View
                        </button>
                    </Link>
                </td>
                <td>
                    <button className={"btn full-width " + (category.id === Constants.GENERAL_CATEGORY 
                            ? "col-done" 
                            : "col-delete")}
                    onClick={(event) => this.deleteCategory(category.id)} 
                    disabled={category.id === Constants.GENERAL_CATEGORY}>Delete</button>
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

export default Categories;
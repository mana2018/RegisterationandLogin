import React, {Component} from 'react';
import Task from './Task.js'
import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
import { withTracker } from 'meteor/react-meteor-data';


class App2 extends Component{
    constructor(props) {
        super(props);
     
        this.state = {
          hideCompleted: false,
        };
      }
handleSubmit(event) {
    event.preventDefault();

    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    
    Tasks.insert({
        text,
        createdAt: new Date(), // current time

    });
    
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
}
toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

getTasks()
{
    return[
        {_id:1, text:'Clean Desk'},
        {_id:2, text:'Complete Assignment'}
    ];
}
renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
render(){
    return(
        <div className="container">
        <header>
          <h1>Todo List</h1>
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            Hide Completed Tasks
          </label>
        
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
        </header>
    <ul>
        {this.renderTasks()}
    </ul>
    </div>
    );
}
}
export default withTracker(() => {
    return {

        tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
        incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    };
  })(App2);

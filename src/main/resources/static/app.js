'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
const when = require('when');
const client = require('./client');

const follow = require('./follow'); // function to hop multiple links by "rel"

const stompClient = require('./websocket-listener');

const root = '/api';

var CreateDialog = React.createClass({
  render: function() {
    var inputs = this.props.attributes.map(attribute =>
        <p key={attribute}>
            <input type="text" placeholder={attribute} ref={attribute} className="field" />
        </p>
    );
    return (
        <div>
            <a href="#createEmployee">Create</a>

            <div id="createEmployee" className="modalDialog">
                <div>
                    <a href="#" title="Close" className="close">X</a>

                    <h2>Create new employee</h2>

                    <form>
                        {inputs}
                        <button onClick={this.handleSubmit}>Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
  }
});

var Employee = React.createClass({
  render: function() {
    return (
      <tr className="employee">
        <td>{this.props.employee.firstName}</td>
        <td>{this.props.employee.lastName}</td>
        <td>{this.props.employee.description}</td>
        <td>{this.props.employee.manager.name}</td>
        <td></td>
        <td></td>
      </tr>
    );
  }
});

var EmployeeList = React.createClass({
  render: function() {
    var employeeNodes = this.props.data.map(function(employee) {
      return (
        <Employee key={employee._links.self.href}
            employee={employee} />
      );
    });
    return (
      <div className="employeeList">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Description</th>
              <th>Manager</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {employeeNodes}
          </tbody>


        </table>
      </div>
    );
  }
});

var EmployeeBox = React.createClass({
  loadFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data._embedded.employees});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadFromServer();
  },
  render: function() {
    return (
      <div>
        <EmployeeList data={this.state.data} />
      </div>
    );
  }
});

ReactDOM.render(
  <EmployeeBox url="/api/employees" />,
  document.getElementById('content')
);
import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import {deepBlue500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepBlue500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      open: false,
    };
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    var updatedEmployee = {};
    this.props.attributes.forEach(attribute => {
          updatedEmployee[attribute] = this.refs[attribute].getValue().trim();
    });
    this.props.onUpdate(this.props.employee, updatedEmployee);
    window.location = "#";
    this.handleRequestClose();
  }

  render() {
    const standardActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />,
      <FlatButton
          label="Update"
          primary={true}
          onTouchTap={this.handleSubmit}
        />
    ];

    var inputs = this.props.attributes.map(attribute =>
        <TextField
          key={this.props.employee.entity[attribute]}
          type="text"
          fullWidth={true}
          hintText={attribute}
          defaultValue={this.props.employee.entity[attribute]}
          ref={attribute}
        />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <FlatButton
            label="Update"
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
          <Dialog
            open={this.state.open}
            title="Update Employee"
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
            {inputs}
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
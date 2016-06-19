import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
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
    var newEmployee = {};
    this.props.attributes.forEach(attribute => {
          newEmployee[attribute] = this.refs[attribute].getValue().trim();
    });
    this.props.onCreate(newEmployee);
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
          label="Create"
          primary={true}
          onTouchTap={this.handleSubmit}
        />
    ];

    var inputs = this.props.attributes.map(attribute =>
        <TextField
          key={attribute}
          type="text"
          fullWidth={true}
          hintText={attribute}
          ref={attribute}
        />
    );
    // remove id from list
    for(var i= 0, l = inputs.length; i < l; i++){
    	if (inputs[i].key == 'id') {
    	   inputs.splice(i, 1);
    	}
    }

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <RaisedButton
            label="Create"
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
          <Dialog
            open={this.state.open}
            title="Create Employee"
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
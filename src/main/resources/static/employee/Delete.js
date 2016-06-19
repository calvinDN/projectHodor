import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import Dialog from 'material-ui/Dialog';
import {deepOrange500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
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
      this.props.onDelete(this.props.employee);
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
          label="Delete"
          primary={true}
          onTouchTap={this.handleSubmit}
        />
    ];

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <FlatButton
            label="Delete"
            secondary={true}
            onTouchTap={this.handleTouchTap}
          />
          <Dialog
            open={this.state.open}
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
            Delete employee?
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
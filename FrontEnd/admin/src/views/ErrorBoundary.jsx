import React, { Fragment } from "react";
import { Alert, Box } from "@mui/material";

class ErrorBoundary extends React.Component {
  state = {
    errorMessage: null,
  };

  handleClosedAlert() {
    this.setState({ error: null });
  }

  static getDerivedStateFromError(error) {
    console.error(error);
    return { errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    setTimeout(this.handleClosedAlert.bind(this), 3000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.errorMessage == nextState.errorMessage) return false;
    else return true;
  }

  render() {
    return (
      <Fragment>
        {this.state.error && (
          <Box position="fixed" right={8} top={64}>
            <Alert color="error" severity="error">
              {this.state.error.message}
            </Alert>
          </Box>
        )}

        {this.props.children}
      </Fragment>
    );
  }
}

export default ErrorBoundary;

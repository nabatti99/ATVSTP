import React from "react";
import { Alert } from "@mui/material";

class ErrorBoundary extends React.Component {
  state = {
    error: null,
  };

  handleClosedAlert() {
    this.setState({ hasError: false });
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    setTimeout(this.handleClosedAlert, 3000);
  }

  render() {
    if (this.state.error)
      return (
        <Alert color="error" severity="error">
          {this.state.error}
        </Alert>
      );
    else return this.props.children;
  }
}

export default ErrorBoundary;

import React, { Fragment } from "react";
import { Alert, Box } from "@mui/material";
import { connectAppContext } from "contexts/appContext/appContext";
import { deleteAccessToken } from "contexts/appContext/appActions";

class ErrorBoundary extends React.Component {
  state = {
    errorMessage: null,
  };

  handlePromiseRejection = ({ reason }) => {
    const { Message, authenticated } = reason.response.data;

    if (authenticated == false) {
      const { dispatch } = this.props;
      dispatch(deleteAccessToken());
    }

    this.setState({
      errorMessage: Message,
    });
  };

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.handlePromiseRejection);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.handlePromiseRejection);
  }

  static getDerivedStateFromError(error) {
    return { errorMessage: error.message };
  }

  componentDidCatch(error, info) {
    console.error(error);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.errorMessage == nextState.errorMessage) return false;
    else return true;
  }

  render() {
    return (
      <Fragment>
        {this.state.errorMessage && (
          <Box position="fixed" right={16} top={72}>
            <Alert color="error" severity="error" onClose={() => this.setState({ errorMessage: null })}>
              {this.state.errorMessage}
            </Alert>
          </Box>
        )}

        {this.props.children}
      </Fragment>
    );
  }
}

export default connectAppContext(ErrorBoundary);

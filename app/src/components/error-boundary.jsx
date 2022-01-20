
import React from "react";
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
width: 100%;
min-height: 100%;
text-align: center;
vertical-align: middle;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center`;


export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>Oops</div>
      );
    }
    return this.props.children;
  }
}

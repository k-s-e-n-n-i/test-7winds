import React from 'react';
import { Props, State } from './interfaces';

class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>ERROR</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

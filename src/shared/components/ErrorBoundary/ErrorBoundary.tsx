import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    error: null
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('ErrorBoundary caught an error', { error, errorInfo });
  }

  render() {
    if (this.state.error)
      return (
        <div
          style={{
            color: 'red',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          Something went wrong!
        </div>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;

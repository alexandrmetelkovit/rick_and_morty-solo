import { Component, type ReactNode } from 'react';

import './ErrorBoundary.scss';

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
    if (this.state.error) {
      return (
        <div className='errorBoundary'>
          <p className='errorBoundary__text'>
            An unexpected error occurred. Please try again or refresh the
            page.😔
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

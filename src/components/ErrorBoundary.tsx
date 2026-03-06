import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorState } from './states/ErrorState';

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-full h-full min-h-[300px]">
          <ErrorState error={this.state.error} message={this.props.fallbackMessage} />
        </div>
      );
    }

    return this.props.children;
  }
}

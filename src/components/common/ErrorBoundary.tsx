import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-center gap-4 px-6">
          <p className="text-gray-500 text-sm">Something went wrong.</p>
          <button
            className="px-6 py-2.5 border border-gray-900 bg-gray-900 text-white text-sm font-semibold cursor-pointer hover:bg-gray-800"
            onClick={() => { this.setState({ hasError: false }); window.location.href = '/'; }}
            type="button"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

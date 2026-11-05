import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';
import { Logo } from './Logo';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
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
    console.error('ErrorBoundary capturou um erro não tratado:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#060B18] text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full bg-[#0C162E] border border-[#1B2F5C] rounded-3xl p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="flex justify-center">
              <Logo inverted={true} className="h-12 w-auto" />
            </div>

            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <AlertTriangle size={28} />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-bold text-white tracking-wide">
                Continuidade de Serviço • UNDD Academy
              </h2>
              <p className="text-xs text-gray-300 leading-relaxed">
                Ocorreu uma instabilidade pontual durante a renderização do módulo. Clique no botão abaixo para restaurar sua sessão de estudos.
              </p>
            </div>

            <button
              onClick={this.handleReset}
              className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCw size={16} />
              <span>Recarregar a Plataforma</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

import React from "react";
import { FolderSearch } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  actionLabel, 
  onAction,
  icon = <FolderSearch className="w-12 h-12 text-slate-300" />
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center p-12 text-center bg-white border border-slate-200 border-dashed rounded-2xl">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <button 
          onClick={onAction}
          className="h-10 px-5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-medium rounded-full shadow-sm transition-all"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

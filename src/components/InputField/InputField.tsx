import React from 'react';

// Props interface from the assignment PDF [cite: 18-29]
export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean; // Added loading prop
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const InputField = ({ 
  label, 
  placeholder, 
  size = 'md', 
  variant = 'outlined',
  disabled = false,
  invalid = false,
  loading = false,
  helperText,
  errorMessage,
  ...props 
}: InputFieldProps) => {
  // --- Base classes ---
  const baseClasses = "mt-1 block w-full rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500";

  // --- Size classes ---
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  // --- Variant classes ---
  const variantClasses = {
    outlined: 'border border-gray-300',
    filled: 'bg-gray-100 border-transparent',
    ghost: 'border-transparent bg-transparent hover:bg-gray-100',
  };
  
  // --- State classes ---
  const disabledClasses = "disabled:bg-gray-200 disabled:cursor-not-allowed";
  const invalidClasses = "border-red-500 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500";
  const loadingPadding = "pr-10"; // Padding to make space for the spinner

  // --- Combine all classes ---
  const combinedClasses = `
    ${baseClasses} 
    ${sizeClasses[size]} 
    ${variantClasses[variant]}
    ${(disabled || loading) ? disabledClasses : ''}
    ${invalid ? invalidClasses : ''}
    ${loading ? loadingPadding : ''}
  `;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', width: '300px' }}>
      <label className="text-gray-700">{label}</label>
      <div className="relative">
        <input 
          placeholder={placeholder}
          className={combinedClasses}
          disabled={disabled || loading}
          {...props}
        />
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="h-5 w-5 border-4 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {helperText && !invalid && <p className="mt-2 text-sm text-gray-500">{helperText}</p>}
      {errorMessage && invalid && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
};
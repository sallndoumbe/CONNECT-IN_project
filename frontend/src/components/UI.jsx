export function Alert({ message, type = 'info', closable = false, onClose }) {
  const types = {
    error: 'border-red-500 bg-red-50 text-red-800',
    success: 'border-green-500 bg-green-50 text-green-800',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-800',
    info: 'border-blue-500 bg-blue-50 text-blue-800',
  }
  
  const icons = {
    error: '❌',
    success: '✅',
    warning: '⚠️',
    info: 'ℹ️',
  }

  return (
    <div className={`fade-in rounded-xl border-l-4 ${types[type]} p-4 text-sm shadow-sm flex items-start justify-between gap-2`}>
      <div className="flex items-start gap-2 flex-1">
        <span className="text-lg flex-shrink-0">{icons[type]}</span>
        <span className="flex-1">{message}</span>
      </div>
      {closable && (
        <button
          onClick={onClose}
          className="text-lg font-bold hover:opacity-50 transition flex-shrink-0"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export function Error({ message }) {
  return <Alert message={message} type="error" />
}

export function Success({ message }) {
  return <Alert message={message} type="success" />
}

export function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-[#e2d9cf] border-t-[#1f3b3b]"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 animate-pulse rounded-full bg-[#1f3b3b] opacity-20"></div>
        </div>
      </div>
    </div>
  )
}

export function Button({ children, onClick, disabled, variant = 'primary', type = 'button', className = '', size = 'md' }) {
  const baseClasses = "rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  }
  
  const variants = {
    primary: "bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] text-[#f6f1e9] hover:from-[#0f2f2f] hover:to-[#1f3b3b] hover:shadow-xl",
    secondary: "bg-[#e2d9cf] text-[#1f3b3b] hover:bg-[#d2c9bf] hover:shadow-md",
    danger: "bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800",
    ghost: "bg-transparent text-[#1f3b3b] border-2 border-[#e2d9cf] hover:bg-[#f6f1e9] hover:border-[#1f3b3b]",
    success: "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}

export function Badge({ children, variant = 'primary', size = 'md' }) {
  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  }
  
  const variants = {
    primary: "bg-gradient-to-r from-[#1f3b3b] to-[#2d5555] text-[#f6f1e9]",
    secondary: "bg-[#e2d9cf] text-[#1f3b3b]",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
  }

  return (
    <span className={`inline-flex items-center rounded-full font-semibold ${sizes[size]} ${variants[variant]}`}>
      {children}
    </span>
  )
}

export function Input({ label, type = 'text', value, onChange, placeholder, required = false, error, disabled = false }) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-base font-bold text-[#1f3b3b]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`w-full rounded-xl border-2 bg-white px-5 py-4 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 hover:border-[#d2c9bf] disabled:opacity-50 disabled:cursor-not-allowed ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-[#e2d9cf] focus:border-[#1f3b3b] focus:ring-[#1f3b3b]'
        }`}
      />
      {error && <p className="text-sm text-red-500 font-medium">⚠️ {error}</p>}
    </div>
  )
}

export function Textarea({ label, value, onChange, placeholder, rows = 4, required = false, error, disabled = false }) {
  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-base font-bold text-[#1f3b3b]">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className={`w-full rounded-xl border-2 bg-white px-5 py-4 text-base transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-20 hover:border-[#d2c9bf] resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
            : 'border-[#e2d9cf] focus:border-[#1f3b3b] focus:ring-[#1f3b3b]'
        }`}
      />
      {error && <p className="text-sm text-red-500 font-medium">⚠️ {error}</p>}
    </div>
  )
}

export function Card({ children, className = '', variant = 'default', clickable = false }) {
  const variants = {
    default: "rounded-2xl border border-[#e2d9cf] bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300",
    elevated: "rounded-2xl bg-white p-6 shadow-xl hover:shadow-2xl transition-all duration-300",
    flat: "rounded-2xl bg-[#fdfaf5] border border-[#f0ebe5] p-6",
    outline: "rounded-2xl border-2 border-[#e2d9cf] bg-transparent p-6 hover:border-[#1f3b3b] transition-colors",
  }

  const baseClass = `fade-in ${clickable ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`

  return (
    <div className={`${baseClass} ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}

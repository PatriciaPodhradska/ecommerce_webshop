export default function Button({ children, variant = 'primary', size = 'md', isLoading, ...props }) {
    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
        danger: 'bg-red-600 text-white hover:bg-red-700'
    };
    
    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    };
    
    return (
        <button
            className={`${variants[variant]} ${sizes[size]} rounded-lg font-semibold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? 'Loading...' : children}
        </button>
    );
}
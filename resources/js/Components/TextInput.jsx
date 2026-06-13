export default function TextInput({ id, type = 'text', className, ...props }) {
    return (
        <input id={id} type={type} className={`rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${className}`} {...props} />
    );
}

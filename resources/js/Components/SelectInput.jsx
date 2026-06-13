export default function SelectInput({ id, className, children, ...props }) {
    return (
        <select id={id} className={`rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 ${className}`} {...props}>
            {children}
        </select>
    );
}

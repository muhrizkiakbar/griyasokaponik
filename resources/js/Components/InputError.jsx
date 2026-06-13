// InputError.jsx
export default function InputError({ message }) {
    return message ? <p className="mt-1 text-sm text-red-600">{message}</p> : null;
}

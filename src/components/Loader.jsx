export default function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-slate-600 font-medium">{message}</p>
    </div>
  );
}
// eslint-disable-next-line react/prop-types
export const Button = ({ text, loading = false, onClick = null }) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-95 disabled:opacity-80"
    >
      {loading ? "Loading" : text}
    </button>
  );
};

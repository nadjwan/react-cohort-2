function Child({ callback }) {
  return (
    <button
      type="button"
      class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      onClick={() => callback("Hello from Child Component!")}
    >
      Child Component
    </button>
  );
}

export default Child;

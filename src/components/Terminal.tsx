export const Terminal = () => {
  return (
    <div className="bg-black font-mono px-4 py-3 rounded-sm border border-b-black border-fuchsia-500 h-full overflow-y-auto">
      <div className="flex">
        <span className="text-green-400 select-none mr-1">crudius@root:~$</span>
        <input
          type="text"
          name="command"
          className="bg-black text-white flex-1 border-0 focus:outline-none focus:ring-0"
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
    </div>
  );
};

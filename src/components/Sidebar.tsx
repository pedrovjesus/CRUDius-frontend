interface SidebarProps {
  entities: string[];
  setEntities: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ entities, setEntities }) => {
  return (
    <aside className="w-64 bg-neutral-950 p-1 text-gray-300 border-r border-fuchsia-500 rounded-r-[3px] flex flex-col justify-between h-screen">
      <div>
        <div className="flex items-center justify-between h-9 border-b border-b-gray-700 mb-2 p-2">
          <img
            src="/crudius2.svg"
            alt="Logo"
            className="w-5 h-5 object-contain"
          />
          <h2 className="text-sm font-bold">Crudius Studio</h2>
          <div className="text-xs">
            <i className="fa fa-undo cursor-pointer mr-3" title="Undo"></i>
            <i className="fa fa-redo cursor-pointer" title="Redo"></i>
          </div>
        </div>

        <div className="flex items-center gap-2 px-2 pb-2 border-b border-gray-700 mb-2">
          <input
            type="text"
            placeholder="Nova entidade"
            className="w-full px-2 py-1 bg-neutral-900 text-sm text-white border border-fuchsia-500 rounded outline-none focus:ring-1 focus:ring-fuchsia-400"
          />
          <button
            className="px-2 py-1 cursor-pointer bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded text-sm"
            title="Adicionar entidade"
          >
            <i className="fa fa-plus" />
          </button>
        </div>

        <div className="px-2 flex flex-col gap-1">
          {entities.map((entity, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-sm px-2 py-1 bg-neutral-900 rounded hover:bg-neutral-800 transition-colors"
            >
              <span>{entity}</span>
              <i
                className="fa fa-ellipsis-v text-gray-500 text-xs cursor-pointer"
                title="Opções"
              ></i>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-700 px-2 py-3">
        <button className="flex items-center gap-2 text-sm cursor-pointer text-gray-400 hover:text-white">
          <i className="fa fa-cog" />
          Configurações
        </button>
      </div>
    </aside>
  );
};

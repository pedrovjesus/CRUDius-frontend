import { Sidebar } from "./Sidebar";
import { Terminal } from "./Terminal";

interface ILayoutProps {
  title: string;
  children: React.ReactNode;
}
export const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-800 text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex flex-col pb-0 flex-1 p-2 justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <div className="p-6">{children}</div>
          </div>

          <div className="h-50">
            <Terminal />
            </div>
        </div>
      </div>
    </div>
  );
};

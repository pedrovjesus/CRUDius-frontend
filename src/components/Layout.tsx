import { Sidebar } from "./Sidebar";

interface ILayoutProps {
  title: string;
  children: React.ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ title, children }) => {
  return (
    <div className="flex min-h-screen bg-neutral-800 text-white">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="p-6 rounded-lg shadow">{children}</div>
      </div>
    </div>
  );
};

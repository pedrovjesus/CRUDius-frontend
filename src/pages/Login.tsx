export const Login: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-900 to-gray-800">
      <div className="w-96 bg-gray-900 rounded-2xl shadow-2xl p-10 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <img src="/crudius2.svg" alt="Logo" className="w-12 h-12 mb-2" />
          <h1 className="text-3xl font-bold text-white">Crudius Studio</h1>
        </div>

        <form className="flex flex-col w-full gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-inner transition"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            className="px-4 py-3 rounded-xl bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 shadow-inner transition"
            required
          />

          <button
            type="submit"
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Entrar
          </button>
        </form>

        <p className="text-gray-400 text-xs text-center mt-6">
          © 2025 Crudius Studio
        </p>
      </div>
    </div>
  );
};

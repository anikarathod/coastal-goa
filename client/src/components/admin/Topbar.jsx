const Topbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <h1 className="text-xl font-semibold">Admin Dashboard</h1>

      <div className="font-medium text-gray-600">
        Welcome, Admin
      </div>
    </header>
  );
};

export default Topbar;
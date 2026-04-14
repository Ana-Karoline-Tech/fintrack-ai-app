import Sidebar from "./_components/sidebar";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex flex-1 items-center justify-center p-10">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
          Conteudo principal
        </div>
      </main>
    </div>
  );
}

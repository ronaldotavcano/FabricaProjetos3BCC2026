export default function Footer() {
  return (
    <footer className="bg-[#07090f] border-t border-slate-800/50 py-8">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="text-slate-500 text-md">
          © DESENVOLVIDO EM {new Date().getFullYear()} <span className="text-slate-300 font-medium"></span> 
        </div>

        <div className="flex gap-6 items-center">
          <span> <img src="../../public/github.png" alt="Github icon" className="bg-[#FFFFFF] h-8 w-8 rounded-3xl" /> </span>
          <a href="https://github.com/ronaldotavcano/FabricaProjetos3BCC2026" className="text-slate-500 hover:text-blue-400 transition-colors text-md">GitHub</a>
        </div>

      </div>
    </footer>
  );
}
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, Home, BookOpen, Users, Calendar, MapPin, LogOut, Sun, Moon } from "lucide-react";


const navItems = [
  { to: "/", label: "Dashboard", icon: <Home size={16} /> },
  { to: "/courses", label: "Courses", icon: <BookOpen size={16} /> },
  { to: "/faculty", label: "Faculty", icon: <Users size={16} /> },
  { to: "/students", label: "Students", icon: <Users size={16} /> },
  { to: "/rooms", label: "Rooms", icon: <MapPin size={16} /> },
  { to: "/timetable", label: "Timetable", icon: <Calendar size={16} /> },
];

export default function Layout() {
  const [open, setOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(true); // 🌌 Default dark mode
  const navigate = useNavigate();

  return (
    <div className={`relative flex min-h-screen overflow-hidden ${darkMode ? "app-grid-bg" : "app-grid-light"}`}>
      {/* Sidebar */}
      <aside
        className={`relative z-10 backdrop-blur-md ${darkMode ? "bg-glass text-white" : "bg-white/70 text-gray-800"} 
        border-r shadow-lg transition-all duration-200 ease-in-out ${open ? "w-64" : "w-16"}`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-600 text-white w-8 h-8 flex items-center justify-center font-bold">
              N
            </div>
            {open && <div className="text-lg font-semibold">NEP Timetable</div>}
          </div>
          <button
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
        </div>

        <nav className="mt-3">
          {navItems.map((it) => (
            <NavLink
             key={it.to}
             to={it.to}
             end={it.to === "/"}
             className={({ isActive }) =>
               `flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-200 ${
                isActive
                ? "bg-gray-800 text-white"        // active → dark background + white text
                : "text-gray-300 hover:bg-gray-700 hover:text-white" // inactive → lighter text
           }`
         }
       >
           <div>{it.icon}</div>
           {open && <div className="text-sm">{it.label}</div>}
          </NavLink>

          ))}
        </nav>

        <div className="mt-auto px-4 py-4 border-t">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
          >
            <LogOut size={16} />
            {open && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-h-screen flex flex-col relative z-10">
        {/* Header */}
        <header
          className={`h-16 flex items-center justify-between px-6 backdrop-blur-md border-b shadow-sm ${
            darkMode ? "bg-glass text-white" : "bg-white/80 text-gray-800"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="hidden md:block">Search / Filters (coming)</div>
          </div>

          <div className="flex items-center gap-4">
            {/* 🌞 / 🌙 Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="text-sm">Admin</div>
            <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}





// export default function Layout() {
//   const [open, setOpen] = useState(true);
//   const navigate = useNavigate();

//   return (
//     <div className="relative flex min-h-screen app-grid-bg overflow-hidden">
//       {/* 🌊 Optional Waves Background on top of grid */}
//       <div className="absolute bottom-0 left-0 w-full -z-0 opacity-70">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-40">
//           <path
//             fill="rgba(161, 185, 205, 1)"
//             fillOpacity="1"
//             d="M0,96L0,256L180,256L180,32L360,32L360,0L540,0L540,128L720,128L720,192L900,192L900,32L1080,32L1080,96L1260,96L1260,192L1440,192L1440,320L1260,320L1260,320L1080,320L1080,320L900,320L900,320L720,320L720,320L540,320L540,320L360,320L360,320L180,320L180,320L0,320L0,320Z"
//           ></path>
//         </svg>
//       </div>

//       {/* Sidebar */}
//       <aside
//         className={`relative z-10 bg-card backdrop-blur-md border-r shadow-lg transition-all duration-200 ease-in-out ${
//           open ? "w-64" : "w-16"
//         }`}
//       >
//         <div className="h-16 flex items-center justify-between px-4 border-b">
//           <div className="flex items-center gap-3">
//             <div className="rounded-full bg-blue-600 text-white w-8 h-8 flex items-center justify-center font-bold">
//               N
//             </div>
//             {open && <div className="text-lg font-semibold">NEP Timetable</div>}
//           </div>
//           <button
//             onClick={() => setOpen((s) => !s)}
//             className="p-2 rounded hover:bg-glass"
//             aria-label="Toggle sidebar"
//           >
//             <Menu size={18} />
//           </button>
//         </div>

//         <nav className="mt-3">
//           {navItems.map((it) => (
//             <NavLink
//               key={it.to}
//               to={it.to}
//               end={it.to === "/"}
//               className={({ isActive }) =>
//                 `flex items-center gap-3 px-4 py-3 hover:bg-glass ${
//                   isActive ? "bg-glass font-medium" : ""
//                 }`
//               }
//             >
//               <div className="text-muted">{it.icon}</div>
//               {open && <div className="text-sm">{it.label}</div>}
//             </NavLink>
//           ))}
//         </nav>

//         <div className="mt-auto px-4 py-4 border-t">
//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               navigate("/login");
//             }}
//             className="flex items-center gap-2 w-full text-left p-2 rounded hover:bg-glass"
//           >
//             <LogOut size={16} />
//             {open && <span>Logout</span>}
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <div className="flex-1 min-h-screen flex flex-col relative z-10">
//         {/* Header */}
//         <header className="h-16 flex items-center justify-between px-6 bg-glass backdrop-blur-md border-b shadow-sm">
//           <div className="flex items-center gap-4">
//             <div className="hidden md:block text-muted">Search / Filters (coming)</div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="text-sm text-muted">Admin</div>
//             <div className="w-8 h-8 rounded-full bg-gray-200"></div>
//           </div>
//         </header>

//         {/* Page content */}
//         <main className="p-6">
//           <div className="bg-card rounded-xl p-6 shadow-lg">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

import { NavLink } from 'react-router';

const navItems = [
  { to: '/', label: '이력서' },
  { to: '/cover-letter', label: '자기소개서' },
];

function FloatingRouteNav() {
  return (
    <nav
      aria-label="페이지 이동"
      className="fixed right-4 bottom-4 z-20 flex rounded-lg border border-zinc-300 bg-white p-1 shadow-lg shadow-zinc-900/15 sm:right-6 sm:bottom-6"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            [
              'flex h-11 min-w-20 items-center justify-center rounded-md px-3 text-sm font-bold transition',
              isActive ? 'bg-zinc-950 text-white' : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950',
            ].join(' ')
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}

export default FloatingRouteNav;

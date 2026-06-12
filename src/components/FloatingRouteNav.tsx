import { Link, useLocation } from 'react-router';

const routes = [
  { to: '/', label: '이력서' },
  { to: '/cover-letter', label: '자기소개서' },
  { to: '/portfolio', label: '포트폴리오' },
  { to: '/job-radar', label: '채용 레이더' },
];

function FloatingRouteNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="페이지 이동"
      className="fixed right-4 bottom-4 left-4 z-20 flex justify-center sm:right-6 sm:bottom-6 sm:left-auto"
    >
      <div className="flex max-w-full gap-1 rounded-full border border-zinc-800 bg-zinc-950 p-1 shadow-lg shadow-zinc-900/20">
        {routes.map((route) => {
          const isActive = pathname === route.to;

          return (
            <Link
              key={route.to}
              to={route.to}
              aria-current={isActive ? 'page' : undefined}
              className={`inline-flex h-10 items-center justify-center rounded-full px-3 text-xs font-bold transition sm:px-4 sm:text-sm ${
                isActive ? 'bg-white text-zinc-950' : 'text-white hover:bg-zinc-800'
              }`}
            >
              {route.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default FloatingRouteNav;

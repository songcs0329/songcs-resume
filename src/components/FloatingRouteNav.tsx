import { Link, useLocation } from 'react-router';

const routeMap = {
  '/': { to: '/cover-letter', label: '자기소개서' },
  '/cover-letter': { to: '/', label: '이력서' },
};

function FloatingRouteNav() {
  const { pathname } = useLocation();
  const nextRoute = routeMap[pathname as keyof typeof routeMap] ?? routeMap['/'];

  return (
    <Link
      to={nextRoute.to}
      aria-label={`${nextRoute.label} 페이지로 이동`}
      className="fixed right-4 bottom-4 z-20 inline-flex h-12 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950 px-5 text-sm font-bold text-white shadow-lg shadow-zinc-900/20 transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-xl sm:right-6 sm:bottom-6"
    >
      {nextRoute.label}
    </Link>
  );
}

export default FloatingRouteNav;

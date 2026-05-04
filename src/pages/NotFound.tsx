import { Link } from 'react-router';

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f3ee] px-5 py-8 text-zinc-900 sm:px-8">
      <section className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-teal-700">404 Not Found</p>
        <h1 className="mt-3 text-2xl font-bold tracking-normal text-zinc-950 sm:text-3xl">페이지를 찾을 수 없습니다</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-600">주소를 다시 확인해 주세요.</p>
        <Link
          to="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          이력서로 돌아가기
        </Link>
      </section>
    </main>
  );
}

export default NotFound;

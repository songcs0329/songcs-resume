import { Link } from 'react-router';
import useCounterStore from '@/stores/useCounterStore';
import Button from '@/components/Button';

function Home() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-zinc-50 px-5">
      <div className="grid gap-6">
        <div className="flex items-center justify-center gap-2.5">
          <Button variant="minus" onClick={decrement}>
            -
          </Button>
          <strong className="text-2xl leading-none font-bold text-gray-800">{count}</strong>
          <Button variant="plus" onClick={increment}>
            +
          </Button>
        </div>
        <Link
          to="/todos"
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-emerald-500 hover:text-emerald-700"
        >
          Todo form
        </Link>

        <Link
          to="/todos/1"
          className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:border-emerald-500 hover:text-emerald-700"
        >
          Todo Detail
        </Link>
      </div>
    </div>
  );
}

export default Home;

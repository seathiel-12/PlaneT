export const LoadingSkeleton = () => (
  <div className="grid lg:grid-cols-[repeat(3,1fr)] gap-10 my-5">
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden animate-pulse">
        <div className="h-56 w-full bg-gray-200" />
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-5 w-20 rounded-full bg-gray-200" />
            <div className="h-4 w-24 rounded-full bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full rounded-full bg-gray-200" />
            <div className="h-4 w-4/5 rounded-full bg-gray-200" />
          </div>

          <div className="flex gap-2">
            <div className="h-7 w-16 rounded-full bg-gray-200" />
            <div className="h-7 w-20 rounded-full bg-gray-200" />
            <div className="h-7 w-14 rounded-full bg-gray-200" />
          </div>

          <div className="h-px w-full bg-gray-200" />

          <div className="flex items-center justify-between">
            <div className="h-4 w-20 rounded-full bg-gray-200" />
            <div className="h-10 w-24 rounded-md bg-gray-200" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

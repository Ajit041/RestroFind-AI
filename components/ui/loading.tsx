// Loading spinner component
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-lg text-gray-600">
        Loading...
      </p>
    </div>
  );
}

// Skeleton loader for content placeholders
export function SkeletonLoader({
  width = '100%',
  height = '1rem',
  className = ''
}: {
  width?: string | number;
  height?: string | number;
  className?: string;
}) {
  return (
    <div
      className={`${className} h-[${typeof height === 'number' ? `${height}px` : height}] w-[${typeof width === 'number' ? `${width}px` : width}] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-[loading_1.5s_ease-in-out_infinite] rounded`}
      style={{ backgroundSize: '200% 100%', animation: 'loading 1.5s ease-in-out infinite' }}
    >
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

// Skeleton card for restaurant listings
export function RestaurantSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <SkeletonLoader width={96} height={96} className="rounded-lg" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="flex items-start space-x-3">
            <SkeletonLoader width={60} height={20} className="mb-1" />
            <SkeletonLoader width={40} height={16} className="mt-1" />
          </div>
          <SkeletonLoader width={100} height={16} />
          <div className="flex flex-wrap gap-2">
            <SkeletonLoader width={60} height={16} className="mr-2 mb-2" />
            <SkeletonLoader width={60} height={16} className="mr-2 mb-2" />
            <SkeletonLoader width={40} height={16} className="mr-2 mb-2" />
          </div>
          <SkeletonLoader width={100} height={16} className="mb-2" />
          <div className="flex space-x-3">
            <SkeletonLoader width={80} height={32} />
            <SkeletonLoader width={80} height={32} />
            <SkeletonLoader width={80} height={32} />
          </div>
        </div>
      </div>
    </div>
  );
}
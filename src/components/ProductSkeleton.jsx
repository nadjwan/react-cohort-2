import React from "react";

function ProductSkeleton() {
  // Array of 4 items to render 4 placeholder cards
  const skeletonCards = [1, 2, 3, 4];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {skeletonCards.map((item) => (
        <div
          key={item}
          className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm animate-pulse"
        >
          {/* 1. Image Skeleton */}
          <div className="aspect-square w-full rounded-lg bg-gray-200" />

          <div className="mt-4 flex flex-1 flex-col">
            {/* Category Skeleton */}
            <div className="h-3 w-1/4 rounded bg-gray-200 mb-2" />

            {/* 2. Title Skeleton */}
            <div className="h-5 w-3/4 rounded bg-gray-200 mb-4" />

            {/* 3. Price and Button Skeleton */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="h-6 w-1/3 rounded bg-gray-200" />
              <div className="h-9 w-9 rounded-lg bg-gray-200" />
            </div>

            {/* 4. Other Information (Tags / Reviews / Dimensions) */}
            <div className="mt-4 pt-3 border-t border-gray-50 space-y-2">
              <div className="flex gap-2">
                <div className="h-4 w-12 rounded bg-gray-200" />
                <div className="h-4 w-16 rounded bg-gray-200" />
              </div>
              <div className="h-3 w-2/3 rounded bg-gray-200" />
              <div className="h-3 w-1/2 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductSkeleton;

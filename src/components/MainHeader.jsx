import { useState } from "react";

function MainHeader() {
  return (
    <>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <p class="mt-1 text-sm text-gray-500">
            Explore our latest arrivals crafted for everyday use.
          </p>
        </div>
        <a
          href="#product"
          class="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
        >
          View all &rarr;
        </a>
      </div>
    </>
  );
}

export default MainHeader;

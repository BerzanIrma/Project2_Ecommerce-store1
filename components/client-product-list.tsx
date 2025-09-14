"use client";

import { useEffect, useState } from "react";
import { Product } from '@/types';
import NoResults from '@/components/ui/no-results';
import ProductCard from '@/components/ui/product-card';

interface ClientProductListProps {
  title: string;
  items: Product[];
}

const ClientProductList: React.FC<ClientProductListProps> = ({ title, items }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render anything until the component has mounted on the client
  if (!isMounted) {
    return (
      <div className="space-y-3">
        <h3 className="font-bold text-xl sm:text-2xl">{title}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {/* Show loading placeholders */}
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 animate-pulse">
              <div className="aspect-square rounded-xl bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Ensure items is always an array to prevent hydration issues
  const safeItems = Array.isArray(items) ? items : [];

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-xl sm:text-2xl">{title}</h3>
      {safeItems.length === 0 && <NoResults />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {safeItems.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default ClientProductList;

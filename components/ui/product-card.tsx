"use client";

import { Product } from "@/types";
import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/components/ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";
import usePreviewModal from "@/hooks/use-preview.modal";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  data: Product;
}




const ProductCard: React.FC<ProductCardProps> = ({
    data
}) => {
      const cart = useCart();
      const previewModal = usePreviewModal();
      const router = useRouter();
      const [isMounted, setIsMounted] = useState(false);

      useEffect(() => {
        setIsMounted(true);
      }, []);

      // Early return if no data to prevent hydration issues
      if (!data || !data.id) {
        return null;
      }

      // Show loading placeholder while mounting to prevent hydration mismatch
      if (!isMounted) {
        return (
          <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4 animate-pulse">
            <div className="aspect-square rounded-xl bg-gray-200"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        );
      }

      const handleClick =() =>{
        router.push(`/product/${data.id}`);
      }

      const onPreview: MouseEventHandler<HTMLButtonElement> = (event) =>{
        event.stopPropagation();

        previewModal.onOpen(data);
      }

      const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) =>{
        event.stopPropagation();

        cart.addItem(data);
      }

    return(
        <div  onClick={handleClick} 
        className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
          <div className="aspect-square rounded-xl bg-gray-100 relative">
             {data?.images?.[0]?.url ? (
             <Image
               src={data.images[0].url} 
               fill
               alt={data.name || "Product"}
               className="aspect-square object-cover rounded-md"
               sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
               priority={false}
               loading="lazy"
               quality={75}
               placeholder="blur"
               blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
             />
           ) : (
             <div className="aspect-square flex items-center justify-center bg-gray-200 text-gray-400">
               No Image
             </div>
           )}
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5 ">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
          </div>
           <div>
        <p className="font-semibold text-lg">{data.name || 'Product'}</p>

        <p className="text-sm text-gray-500">{data.category?.name || 'Category'}</p>
      </div>
       <div className="flex items-center justify-between">
        <Currency value={data.price || '0'} />
      </div>
        </div>
    );
}

export default ProductCard;
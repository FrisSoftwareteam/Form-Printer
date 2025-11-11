"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const Loader = () => {
  return (
    <div className="flex flex-col space-y-3 mb-10 mt-10">
      <Skeleton className="lg:h-[125px] lg:w-[600px] rounded-xl sm:w-[10px]" />
      <div className="space-y-2">
        <Skeleton className="lg:h-4 lg:w-[600px] sm:w-auto" />
        <Skeleton className="lg:h-4 lg:w-[600px] sm:w-auto" />
      </div>
    </div>
  );
};

export default Loader;

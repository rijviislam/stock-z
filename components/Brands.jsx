import { Badge } from "@/components/ui/badge";

export default function Brands() {
  return (
    <div className=" border-2 border-black flex items-center justify-center ">
      <div className="w-[1200px]">
        <h1 className="text-2xl  font-semibold text-gray-700 text-shadow-lg bg-transparent">
          Browse More Brands
        </h1>
        <div></div>
        <Badge variant="outline">Badge</Badge>
      </div>
    </div>
  );
}

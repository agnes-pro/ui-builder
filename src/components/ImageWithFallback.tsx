import { useState } from "react";
import { Bitcoin } from "lucide-react";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackClassName?: string;
}

export default function ImageWithFallback({ fallbackClassName, className, alt, ...props }: Props) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center gradient-orange/20 bg-secondary ${fallbackClassName || className}`}>
        <Bitcoin className="h-12 w-12 text-primary/40" />
      </div>
    );
  }

  return (
    <img
      className={className}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}

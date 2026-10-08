import Image from "next/image";
import type React from "react";
import logoImage from "@/assets/icons/Logo.png"; // 1. Import the image directly (or use relative path: '../icons/Logo.png')

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
  altText?: string;
  style?: React.CSSProperties;
}

const Logo: React.FC<LogoProps> = ({
  className = "",
  width = 200,
  height = 60, // Provided a numeric default to satisfy Next.js <Image />
  altText = "Load Shedding & Power Management System Logo",
  style,
}) => {
  return (
    <div
      className={`logo-container ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      <Image
        src={logoImage} // 2. Pass the imported variable here
        alt={altText}
        width={width}
        height={height}
        style={{
          maxWidth: "100%",
          height: "auto",
          display: "block",
          padding: "10px",
        }}
      />
    </div>
  );
};

export default Logo;

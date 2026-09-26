import Image from "next/image";
import logo1 from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-[#08090b]">
      <div className="mx-auto flex min-h-[70px] max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Image
            src={logo1}
            alt="FitLog Logo"
            width={55}
            height={25}
            className="h-7 w-auto object-contain"
          />

          <span className="text-2xl font-extrabold text-white">
            FIT<span className="text-lime-400">LOG</span>
          </span>
        </div>

        <p className="text-[10px] text-gray-600">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
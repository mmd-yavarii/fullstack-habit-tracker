import Link from 'next/link';
import { HiOutlineChevronLeft } from 'react-icons/hi';

export default function Header({ title = 'Dashboard', href = '/', isHome }) {
    return (
        <header className="fixed top-5 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2">
            <div className="flex items-center justify-between">
                {/* Back Button */}
                <Link
                    href={href}
                    className="
            relative

            flex items-center justify-center

            h-12 w-12

            rounded-full

            border border-white/[0.10]

            bg-white/[0.05]

            backdrop-blur-[40px]
            backdrop-saturate-[180%]

            shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)]

            overflow-hidden

            transition-all duration-300

            hover:scale-105
            hover:bg-white/[0.08]
          "
                >
                    {/* glass highlight */}
                    <div
                        className="
              absolute inset-0

              bg-gradient-to-b
              from-white/[0.18]
              via-transparent
              to-transparent
            "
                    />

                    <HiOutlineChevronLeft className="relative z-10 h-5 w-5 text-white/90" />
                </Link>

                {/* Title Pill */}
                <div
                    className="
            relative

            px-5
            py-2

            rounded-full

            border border-white/[0.10]

            bg-white/[0.05]

            backdrop-blur-[40px]
            backdrop-saturate-[180%]

            shadow-[0_10px_30px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.25)]

            overflow-hidden
          "
                >
                    {/* highlight */}
                    <div
                        className="
              absolute inset-0

              bg-gradient-to-b
              from-white/[0.16]
              via-transparent
              to-transparent
            "
                    />

                    <span
                        className="
              relative z-10

              text-sm
              font-semibold

              text-white

              tracking-wide

              drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]
            "
                    >
                        {title}
                    </span>
                </div>
            </div>
        </header>
    );
}

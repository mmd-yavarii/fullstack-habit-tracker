import Link from 'next/link';
import { HiOutlineChevronLeft } from 'react-icons/hi';

export default function Header({ title = 'Dashboard', href = '/' }) {
    return (
        <header
            className="
        fixed top-6 left-1/2 z-50
        w-[92%] max-w-md
        -translate-x-1/2
      "
        >
            <div className="flex items-center justify-between">
                {/* BACK BUTTON (match footer style) */}
                <Link
                    href={href}
                    className="
            relative
            flex items-center justify-center

            h-12 w-12

            rounded-[28px]

            border border-white/[0.08]
            bg-white/[0.03]

            backdrop-blur-[40px]
            backdrop-saturate-[180%]

            shadow-[0_10px_50px_rgba(0,0,0,0.45)]

            overflow-hidden

            transition-all duration-300
            hover:scale-105 hover:bg-white/[0.06]
          "
                >
                    {/* top shine like footer */}
                    <div className="absolute top-0 left-2 right-2 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.12] via-transparent to-transparent" />

                    <HiOutlineChevronLeft className="relative z-10 h-5 w-5 text-white/90" />
                </Link>

                {/* TITLE (same glass pill as footer base) */}
                <div
                    className="
            relative

            px-5 py-2

            rounded-[32px]

            border border-white/[0.08]
            bg-white/[0.03]

            backdrop-blur-[40px]
            backdrop-saturate-[180%]

            shadow-[0_10px_50px_rgba(0,0,0,0.45)]

            overflow-hidden
          "
                >
                    {/* shine line */}
                    <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                    {/* glow */}
                    <div className="absolute -top-10 left-1/2 h-20 w-40 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />

                    <span className="relative z-10 text-sm font-semibold text-white tracking-wide">{title}</span>
                </div>
            </div>
        </header>
    );
}

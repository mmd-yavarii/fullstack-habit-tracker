'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiCommand } from 'react-icons/fi';
import { HiOutlineHome, HiOutlineChartBar, HiOutlineCalendar, HiOutlineUser, HiPlus } from 'react-icons/hi';

const links = [
    { title: 'Home', icon: HiOutlineHome, href: '/' },
    { title: 'Add Habit', icon: HiPlus, href: '/add' },
    { title: 'Daily Habits', icon: FiCommand, href: '/day-habits' },
    { title: 'Profile', icon: HiOutlineUser, href: '/profile' },
];

export default function Footer() {
    const pathname = usePathname();

    return (
        <footer
            className="
        fixed bottom-6 left-1/2 z-50
        -translate-x-1/2

        w-[92%]
        max-w-md

        rounded-[32px]

        border border-white/[0.08]
        bg-white/[0.03]

        backdrop-blur-[40px]
        backdrop-saturate-[180%]

        shadow-[0_10px_50px_rgba(0,0,0,0.45)]

        px-3
        py-2

        overflow-visible
      "
        >
            {/* top shine line */}
            <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

            {/* soft glow */}
            <div className="absolute -top-16 left-1/2 h-24 w-48 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex items-center justify-between">
                {links.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.title}
                            href={item.href}
                            className={`
                relative flex flex-col items-center gap-1
                px-4 py-2

                transition-all duration-500

                ${
                    isActive
                        ? `
                      -translate-y-2 scale-110
                      text-white
                    `
                        : `
                      text-slate-400 hover:text-white hover:scale-105
                    `
                }
              `}
                        >
                            {/* DROP EFFECT */}
                            {isActive && (
                                <>
                                    {/* glow blob */}
                                    <span
                                        className="
                                        absolute -bottom-2 left-1/2 -translate-x-1/2
                                        w-14 h-14
                                        bg-white/10
                                        blur-2xl
                                        rounded-full
                                        -z-10
                                        "
                                    />

                                    {/* small connector dot */}
                                    <span
                                        className="
                                        absolute bottom-[1px] left-1/2 -translate-x-1/2
                                        w-1 h-1
                                        bg-white/30
                                        rounded-full
                                        "
                                    />
                                </>
                            )}

                            <Icon
                                className={`
                  h-5 w-5 transition-all duration-300
                  ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : ''}
                `}
                            />

                            <span
                                className={`
                  text-[10px] font-medium
                  ${isActive ? 'text-white' : 'text-slate-400'}
                `}
                            >
                                {item.title}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </footer>
    );
}

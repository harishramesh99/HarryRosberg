"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface MenuItem {
  _key: string;
  text: string;
  href: string;
  isExternal?: boolean;
  order?: number;
}

interface NavbarData {
  logo?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  logoText?: string;
  menuItems: MenuItem[];
}

interface NavbarProps {
  data?: NavbarData | null;
}

export default function Navbar({ data }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Safely handle null/undefined data
  const sortedMenuItems = data?.menuItems 
    ? [...data.menuItems].sort((a, b) => (a.order || 0) - (b.order || 0))
    : []; // Fallback to empty array if no menu items

  // Generate the valid sections from menu items
  const validSections = sortedMenuItems.map(item => ({
    section: item.href.replace('/', '')
  }));

  return (
    <header className="fixed top-0 left-0 right-0 py-4 md:py-6 px-4 md:px-16 border-b border-zinc-800 z-30 bg-black/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 md:gap-3">
  <h4 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-orange-500 to-orange-800 bg-clip-text text-transparent">
    {data?.logoText || "My Portfolio"} {/* Fallback to default text */}
  </h4>
</Link>

        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-x-4 md:gap-x-8">
            {sortedMenuItems.map((item) => (
              <li key={item._key}>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-orange-500 transition-colors duration-300 text-sm md:text-base"
                  >
                    {item.text}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={`text-zinc-400 hover:text-orange-500 transition-colors duration-300 text-sm md:text-base ${
                      pathname === item.href ? 'text-orange-500' : ''
                    }`}
                  >
                    {item.text}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-zinc-400 hover:text-orange-500"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

          {/* Mobile Menu Overlay */}
          <div 
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Mobile Menu Panel */}
          <div 
            className={`fixed top-0 right-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="pt-20 px-6">
              {sortedMenuItems.map((item) => (
                <div key={item._key} className="mb-4">
                  {item.isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-zinc-400 hover:text-orange-500 transition-colors duration-300"
                    >
                      {item.text}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-zinc-400 hover:text-orange-500 transition-colors duration-300 ${
                        pathname === item.href ? 'text-orange-500' : ''
                      }`}
                    >
                      {item.text}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
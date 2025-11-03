// ============================================
// IMPORTS
// ============================================
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { StrapiImage } from "../StrapiImage/StrapiImage";

// ============================================
// CUSTOM HOOKS
// ============================================

// useDropdown - Manages desktop dropdown state and interactions
function useDropdown() {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [openNestedDropdown, setOpenNestedDropdown] = useState(null);
    const [openThirdLevelDropdown, setOpenThirdLevelDropdown] = useState(null);
    const hoverTimeoutRef = useRef(null);

    const clearHoverTimeout = useCallback(() => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
        }
    }, []);

    const handleMouseEnter = useCallback(
        (itemId) => {
            clearHoverTimeout();
            setOpenDropdown(itemId);
            setOpenNestedDropdown(null);
            setOpenThirdLevelDropdown(null);
        },
        [clearHoverTimeout]
    );

    const handleMouseLeave = useCallback(() => {
        hoverTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
            setOpenNestedDropdown(null);
            setOpenThirdLevelDropdown(null);
        }, 150);
    }, []);

    const handleNestedMouseEnter = useCallback(
        (subItemId) => {
            clearHoverTimeout();
            setOpenNestedDropdown(subItemId);
            setOpenThirdLevelDropdown(null);
        },
        [clearHoverTimeout]
    );

    const handleThirdLevelMouseEnter = useCallback(
        (thirdLevelId) => {
            clearHoverTimeout();
            setOpenThirdLevelDropdown(thirdLevelId);
        },
        [clearHoverTimeout]
    );

    const closeAll = useCallback(() => {
        setOpenDropdown(null);
        setOpenNestedDropdown(null);
        setOpenThirdLevelDropdown(null);
    }, []);

    useEffect(() => {
        return () => clearHoverTimeout();
    }, [clearHoverTimeout]);

    return {
        openDropdown,
        openNestedDropdown,
        openThirdLevelDropdown,
        handleMouseEnter,
        handleMouseLeave,
        handleNestedMouseEnter,
        handleThirdLevelMouseEnter,
        clearHoverTimeout,
        closeAll,
    };
}

// useMobileMenu - Manages mobile menu state and interactions with smooth animation
function useMobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [openItem, setOpenItem] = useState(null);
    const [openNested, setOpenNested] = useState(null);
    const [openThirdLevel, setOpenThirdLevel] = useState(null);

    const toggleMenu = useCallback(() => {
        if (isOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsClosing(false);
                setOpenItem(null);
                setOpenNested(null);
                setOpenThirdLevel(null);
            }, 400); // Match animation duration
        } else {
            setIsOpen(true);
            setIsClosing(false);
        }
    }, [isOpen]);

    const closeMenu = useCallback(() => {
        setIsClosing(true);
        setTimeout(() => {
            setIsOpen(false);
            setIsClosing(false);
            setOpenItem(null);
            setOpenNested(null);
            setOpenThirdLevel(null);
        }, 400); // Match animation duration
    }, []);

    const toggleItem = useCallback((itemId) => {
        setOpenItem((prev) => (prev === itemId ? null : itemId));
        setOpenNested(null);
        setOpenThirdLevel(null);
    }, []);

    const toggleNested = useCallback((nestedId) => {
        setOpenNested((prev) => (prev === nestedId ? null : nestedId));
        setOpenThirdLevel(null);
    }, []);

    const toggleThirdLevel = useCallback((thirdLevelId) => {
        setOpenThirdLevel((prev) =>
            prev === thirdLevelId ? null : thirdLevelId
        );
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return {
        isOpen,
        isClosing,
        openItem,
        openNested,
        openThirdLevel,
        toggleMenu,
        closeMenu,
        toggleItem,
        toggleNested,
        toggleThirdLevel,
    };
}

// useHeaderTheme - Determines header styling based on current route
function useHeaderTheme(pathname) {
    return useMemo(() => {
        const transparentPages = [
            "/",
            "/en",
            "/de",
            "/snorkeling",
            "/en/snorkeling",
            "/de/snorkeling",
            "/diving",
            "/en/diving",
            "/de/diving",
        ];

        const isTransparent = transparentPages.includes(pathname);

        return {
            isTransparent,
            headerClass: isTransparent
                ? "bg-white/0 absolute top-0 left-0 right-0 z-50"
                : "bg-white border-b border-neutral-200",
            textClass: isTransparent ? "text-neutral-50" : "text-neutral-500",
        };
    }, [pathname]);
}

// ============================================
// UI COMPONENTS
// ============================================

function NavItem({
    item,
    theme,
    isOpen,
    onMouseEnter,
    onMouseLeave,
    onClose,
    children,
}) {
    if (!item.items?.length) {
        return (
            <li>
                <Link
                    href={item.path}
                    className={`leading-xs ${theme.textClass} hover:opacity-80 transition-opacity`}
                >
                    {item.title}
                </Link>
            </li>
        );
    }

    return (
        <li className="relative">
            <div
                onMouseEnter={() => onMouseEnter(item.id)}
                onMouseLeave={onMouseLeave}
            >
                <Link
                    href={item.path}
                    className={`leading-xs flex items-center gap-1 ${theme.textClass} cursor-pointer hover:opacity-80 transition-opacity`}
                >
                    {item.title}
                    <ChevronIcon isOpen={isOpen} />
                </Link>
                {isOpen && children}
            </div>
        </li>
    );
}

// ChevronIcon Component
function ChevronIcon({ isOpen, direction = "down" }) {
    const rotation =
        direction === "down"
            ? isOpen
                ? "rotate(180deg)"
                : "rotate(0deg)"
            : isOpen
            ? "rotate(90deg)"
            : "rotate(0deg)";

    const path = direction === "down" ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7";

    return (
        <svg
            className="w-4 h-4 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ transform: rotation }}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={path}
            />
        </svg>
    );
}

// ArrowIcon Component
function ArrowIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M20 15H8.5C8 15 8.5 9.5 8.5 5.5"
                stroke="#4B4B4B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M17 12C17 12 20 14.2095 20 15C20 15.7906 17 18 17 18"
                stroke="#4B4B4B"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// Dropdown Component
function Dropdown({
    items,
    onMouseEnter,
    onMouseLeave,
    onClose,
    openNested,
    openThirdLevel,
    onNestedEnter,
    onThirdLevelEnter,
}) {
    return (
        <div
            className="absolute top-full left-0 mt-4 w-72 bg-white rounded-t-md border-t-blue-700 z-50 divide-y divide-neutral-200/40 border-t-sm dropdown-arrow shadow-sm"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {items.map((subItem) => (
                <DropdownItem
                    key={subItem.id}
                    item={subItem}
                    onClose={onClose}
                    isOpen={openNested === subItem.id}
                    openThirdLevel={openThirdLevel}
                    onMouseEnter={() =>
                        subItem.items?.length && onNestedEnter(subItem.id)
                    }
                    onThirdLevelEnter={onThirdLevelEnter}
                />
            ))}
        </div>
    );
}

// DropdownItem Component
function DropdownItem({
    item,
    onClose,
    isOpen,
    openThirdLevel,
    onMouseEnter,
    onThirdLevelEnter,
}) {
    if (!item.items?.length) {
        return (
            <div className="hover:bg-blue-50 px-4 first:rounded-t-md">
                <Link
                    href={item.path}
                    className="block text-xs leading-xs text-neutral-900 font-semibold hover:text-blue-700 transition-colors duration-200 py-3"
                    onClick={onClose}
                >
                    {item.title}
                </Link>
            </div>
        );
    }

    return (
        <div
            className="hover:bg-blue-50 px-4 first:rounded-t-md"
            onMouseEnter={onMouseEnter}
        >
            <div className="w-full text-left flex items-center justify-between text-xs leading-xs text-neutral-900 font-semibold transition-colors duration-200 py-3 cursor-pointer">
                {item.title}
                <ChevronIcon isOpen={isOpen} direction="right" />
            </div>
            {isOpen && (
                <NestedDropdown
                    items={item.items}
                    onClose={onClose}
                    openThirdLevel={openThirdLevel}
                    onThirdLevelEnter={onThirdLevelEnter}
                />
            )}
        </div>
    );
}

// NestedDropdown Component
function NestedDropdown({ items, onClose, openThirdLevel, onThirdLevelEnter }) {
    return (
        <div className="absolute left-full top-0 ml-0 w-64 bg-white border-t-sm rounded-t-md border-l-4 border-blue-700 z-60 divide-y divide-neutral-200/40 border-s border-s-blue-100 shadow-sm">
            {items.map((item) => (
                <NestedDropdownItem
                    key={item.id}
                    item={item}
                    onClose={onClose}
                    isOpen={openThirdLevel === item.id}
                    onMouseEnter={() =>
                        item.items?.length && onThirdLevelEnter(item.id)
                    }
                />
            ))}
        </div>
    );
}

// NestedDropdownItem Component (for third level)
function NestedDropdownItem({ item, onClose, isOpen, onMouseEnter }) {
    if (!item.items?.length) {
        return (
            <Link
                href={item.path}
                className="block text-xs leading-xs text-neutral-900 font-semibold hover:bg-blue-50 transition-colors duration-200 py-3 first:rounded-t-md px-4"
                onClick={onClose}
            >
                {item.title}
            </Link>
        );
    }

    return (
        <div
            className="hover:bg-blue-50 px-4 first:rounded-t-md"
            onMouseEnter={onMouseEnter}
        >
            <div className="w-full text-left flex items-center justify-between text-xs leading-xs text-neutral-900 font-semibold transition-colors duration-200 py-3 cursor-pointer">
                {item.title}
                <ChevronIcon isOpen={isOpen} direction="right" />
            </div>
            {isOpen && (
                <ThirdLevelDropdown items={item.items} onClose={onClose} />
            )}
        </div>
    );
}

// ThirdLevelDropdown Component
function ThirdLevelDropdown({ items, onClose }) {
    return (
        <div className="absolute left-full top-0 ml-0 w-64 bg-white border-t-sm rounded-t-md border-l-4 border-blue-700 z-70 divide-y divide-neutral-200/40 border-s border-s-blue-100 shadow-sm">
            {items.map((item) => (
                <Link
                    key={item.id}
                    href={item.path}
                    className="block text-xs leading-xs text-neutral-900 font-semibold hover:bg-blue-50 transition-colors duration-200 py-3 first:rounded-t-md px-4"
                    onClick={onClose}
                >
                    {item.title}
                </Link>
            ))}
        </div>
    );
}

// CTAButtons Component
function CTAButtons({
    ctas,
    className = "gap-3 hidden xl:flex",
    onClick,
    isMobile = false,
}) {
    return (
        <div className={className}>
            {ctas?.map((cta) => (
                <Link
                    key={cta.id}
                    href={cta?.href}
                    className={`transition-all duration-300 h-12 flex items-center ${
                        isMobile ? "justify-center w-full" : ""
                    } leading-sm px-6 py-2.5 rounded-full ${
                        cta.type === "secondary"
                            ? "border border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-white"
                            : cta.type === "primary"
                            ? "bg-blue-700 text-neutral-50 hover:bg-blue-900"
                            : ""
                    }`}
                    onClick={onClick}
                >
                    {cta.label}
                </Link>
            ))}
        </div>
    );
}

// ============================================
// MAIN LAYOUT COMPONENTS
// ============================================

// DesktopHeader Component
function DesktopHeader({ data, navData, theme, headerRef, dropdown }) {
    return (
        <header
            ref={headerRef}
            className={`py-2 sm:py-3 w-full hidden sm:block ${theme.headerClass}`}
        >
            <div className="container flex items-center justify-between gap-6">
                <div className="flex items-center gap-8 xl:gap-10 2xl:gap-12">
                    <Link href="/">
                        <StrapiImage
                            src={data?.logo?.image?.url}
                            alt={data?.logo?.image?.alternativeText}
                            width={72}
                            height={72}
                        />
                    </Link>

                    <nav className="hidden sm:block">
                        <ul className="flex gap-4 xl:gap-8">
                            {navData?.map((item) => (
                                <NavItem
                                    key={item.id}
                                    item={item}
                                    theme={theme}
                                    isOpen={dropdown.openDropdown === item.id}
                                    onMouseEnter={dropdown.handleMouseEnter}
                                    onMouseLeave={dropdown.handleMouseLeave}
                                    onClose={dropdown.closeAll}
                                >
                                    <Dropdown
                                        items={item.items}
                                        onMouseEnter={
                                            dropdown.clearHoverTimeout
                                        }
                                        onMouseLeave={dropdown.handleMouseLeave}
                                        onClose={dropdown.closeAll}
                                        openNested={dropdown.openNestedDropdown}
                                        openThirdLevel={
                                            dropdown.openThirdLevelDropdown
                                        }
                                        onNestedEnter={
                                            dropdown.handleNestedMouseEnter
                                        }
                                        onThirdLevelEnter={
                                            dropdown.handleThirdLevelMouseEnter
                                        }
                                    />
                                </NavItem>
                            ))}
                        </ul>
                    </nav>
                </div>

                <div className="items-center gap-4 hidden sm:flex">
                    <LanguageSwitcher />
                    <CTAButtons ctas={data?.cta} />
                </div>
            </div>
        </header>
    );
}

// MobileHeader Component with smooth animations
function MobileHeader({ data, navData, mobileMenu }) {
    return (
        <>
            <header className="sm:hidden z-70">
                <div className="inline-flex fixed z-50 right-2 top-2 items-center justify-between px-2 sm:px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full overflow-hidden">
                    <button
                        onClick={mobileMenu.toggleMenu}
                        className="relative z-[60]"
                        aria-label="Toggle menu"
                    >
                        <MenuIcon isOpen={mobileMenu.isOpen} />
                    </button>
                </div>

                {(mobileMenu.isOpen || mobileMenu.isClosing) && (
                    <>
                        {/* Backdrop overlay with fade animation */}
                        <div
                            className={`fixed inset-0 z-40 ${
                                mobileMenu.isClosing
                                    ? "animate-fade-out"
                                    : "animate-fade-in"
                            }`}
                            onClick={mobileMenu.closeMenu}
                        />

                        <MobileNav
                            data={data}
                            navData={navData}
                            mobileMenu={mobileMenu}
                        />
                    </>
                )}
            </header>
        </>
    );
}

// MenuIcon Component
function MenuIcon({ isOpen }) {
    return isOpen ? (
        <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    ) : (
        <svg
            className="w-6 h-6 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    );
}

// MobileNavItem Component
function MobileNavItem({ item, mobileMenu }) {
    const {
        openItem,
        openNested,
        openThirdLevel,
        toggleItem,
        toggleNested,
        toggleThirdLevel,
        closeMenu,
    } = mobileMenu;
    const isOpen = openItem === item.id;

    if (!item.items?.length) {
        return (
            <li>
                <Link
                    href={item.path}
                    className="block py-3 text-neutral-900 font-medium px-2 transition-all duration-200 bg-white hover:bg-blue-50"
                    onClick={closeMenu}
                >
                    {item.title}
                </Link>
            </li>
        );
    }

    return (
        <li>
            <button
                onClick={() => toggleItem(item.id)}
                className="w-full flex items-center justify-between py-3 text-neutral-900 font-medium px-2 transition-all duration-200 bg-white hover:bg-blue-50"
            >
                <span>{item.title}</span>
                <ChevronIcon isOpen={isOpen} />
            </button>

            {isOpen && (
                <ul className="pl-4 space-y-1 mt-1">
                    {item.items.map((subItem) => (
                        <MobileSubItem
                            key={subItem.id}
                            item={subItem}
                            isOpen={openNested === subItem.id}
                            openThirdLevel={openThirdLevel}
                            onToggle={toggleNested}
                            onToggleThirdLevel={toggleThirdLevel}
                            onClose={closeMenu}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

// MobileSubItem Component
function MobileSubItem({
    item,
    isOpen,
    openThirdLevel,
    onToggle,
    onToggleThirdLevel,
    onClose,
}) {
    if (!item.items?.length) {
        return (
            <li>
                <Link
                    href={item.path}
                    className="flex items-center gap-2 py-2.5 text-xs text-neutral-700 px-2 transition-all duration-200 bg-white hover:bg-blue-50"
                    onClick={onClose}
                >
                    <ArrowIcon />
                    {item.title}
                </Link>
            </li>
        );
    }

    return (
        <li>
            <button
                onClick={() => onToggle(item.id)}
                className="w-full flex items-center justify-between py-2.5 text-xs text-neutral-700 px-2 transition-all duration-200 bg-white hover:bg-blue-50"
            >
                <span className="flex items-center gap-2">
                    <ArrowIcon />
                    {item.title}
                </span>
                <ChevronIcon isOpen={isOpen} direction="right" />
            </button>

            {isOpen && (
                <ul className="pl-4 space-y-1 mt-1">
                    {item.items.map((nestedItem) => (
                        <MobileThirdLevelItem
                            key={nestedItem.id}
                            item={nestedItem}
                            isOpen={openThirdLevel === nestedItem.id}
                            onToggle={onToggleThirdLevel}
                            onClose={onClose}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

// MobileThirdLevelItem Component
function MobileThirdLevelItem({ item, isOpen, onToggle, onClose }) {
    if (!item.items?.length) {
        return (
            <li>
                <Link
                    href={item.path}
                    className="flex items-center gap-2 py-2 text-xs text-neutral-600 px-2 transition-all duration-200 bg-white hover:bg-blue-50"
                    onClick={onClose}
                >
                    <ArrowIcon />
                    {item.title}
                </Link>
            </li>
        );
    }

    return (
        <li>
            <button
                onClick={() => onToggle(item.id)}
                className="w-full flex items-center justify-between py-2 text-xs text-neutral-600 px-2 transition-all duration-200 bg-white hover:bg-blue-50"
            >
                <span className="flex items-center gap-2">
                    <ArrowIcon />
                    {item.title}
                </span>
                <ChevronIcon isOpen={isOpen} direction="right" />
            </button>

            {isOpen && (
                <ul className="pl-4 space-y-1 mt-1">
                    {item.items.map((fourthLevelItem) => (
                        <li key={fourthLevelItem.id}>
                            <Link
                                href={fourthLevelItem.path}
                                className="flex items-center gap-2 py-2 text-xs text-neutral-500 px-2 transition-all duration-200 bg-white hover:bg-blue-50"
                                onClick={onClose}
                            >
                                <ArrowIcon />
                                {fourthLevelItem.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

// MobileNav Component with smooth staggered animations
function MobileNav({ data, navData, mobileMenu }) {
    const animationClass = mobileMenu.isClosing
        ? "animate-slide-down"
        : "animate-slide-up";

    return (
        <div
            className={`fixed inset-0 top-0 bg-white overflow-y-auto z-50 ${animationClass}`}
        >
            <button
                onClick={mobileMenu.toggleMenu}
                className="z-[60] right-0 absolute p-3"
                aria-label="Toggle menu"
            >
                <MenuIcon isOpen={mobileMenu.isOpen} />
            </button>
            <nav className=" px-2 sm:px-4 sm:py-6 py-3 flex flex-col h-full justify-between">
                <ul className="space-y-1 pt-12">
                    {navData?.map((item, index) => (
                        <div
                            key={item.id}
                            className={`${
                                mobileMenu.isClosing ? "" : "animate-fade-in-up"
                            }`}
                            style={{
                                animationDelay: mobileMenu.isClosing
                                    ? "0ms"
                                    : `${index * 50}ms`,
                            }}
                        >
                            <MobileNavItem
                                item={item}
                                mobileMenu={mobileMenu}
                            />
                        </div>
                    ))}
                </ul>

                <div
                    className={`mt-8 pt-6 space-y-4 ${
                        mobileMenu.isClosing ? "" : "animate-fade-in-up"
                    }`}
                    style={{
                        animationDelay: mobileMenu.isClosing
                            ? "0ms"
                            : `${(navData?.length || 0) * 50}ms`,
                    }}
                >
                    <div className="flex items-center justify-center gap-2">
                        <LanguageSwitcher />
                    </div>
                    <CTAButtons
                        ctas={data?.cta}
                        className="space-y-3"
                        onClick={mobileMenu.closeMenu}
                        isMobile={true}
                    />
                </div>
            </nav>
        </div>
    );
}

// ============================================
// MAIN HEADER COMPONENT
// ============================================

export default function Header({ data, navData }) {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);
    const headerRef = useRef(null);

    const theme = useHeaderTheme(pathname);
    const dropdown = useDropdown();
    const mobileMenu = useMobileMenu();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                headerRef.current &&
                !headerRef.current.contains(event.target)
            ) {
                dropdown.closeAll();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdown]);

    if (!isMounted) {
        return (
            <header className={`py-2 sm:py-3 w-full ${theme.headerClass}`}>
                <div className="container flex items-center justify-between gap-6">
                    <Link href="/">
                        <StrapiImage
                            src={data?.logo?.image?.url}
                            alt={data?.logo?.image?.alternativeText}
                            width={72}
                            height={72}
                        />
                    </Link>
                </div>
            </header>
        );
    }

    return (
        <>
            <DesktopHeader
                data={data}
                navData={navData}
                theme={theme}
                headerRef={headerRef}
                dropdown={dropdown}
            />
            <MobileHeader
                data={data}
                navData={navData}
                mobileMenu={mobileMenu}
            />
        </>
    );
}

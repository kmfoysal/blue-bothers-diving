import Image from "next/image";
import Link from "next/link";
import { StrapiImage } from "../StrapiImage/StrapiImage";

const footerMenus = [
    {
        id: 1,
        title: "About",
        menu: [
            {
                id: 1,
                label: "Team",
                link: "/our-team",
            },
            {
                id: 2,
                label: "Our Dive Center",
                link: "/our-dive-center",
            },
            {
                id: 3,
                label: "Our Boat",
                link: "/our-boat",
            },
            {
                id: 4,
                label: "Our Speedboat",
                link: "/our-speedboats",
            },
            {
                id: 5,
                label: "Gallery",
                link: "/our-gallery",
            },
        ],
    },
    {
        id: 2,
        title: "Menu",
        menu: [
            {
                id: 1,
                label: "Snorkeling",
                link: "/snorkeling",
            },
            {
                id: 2,
                label: "Diving",
                link: "/diving",
            },
            {
                id: 3,
                label: "Prices",
                link: "/price-list",
            },
            {
                id: 4,
                label: "About Us",
                link: "/about-us",
            },
            {
                id: 5,
                label: "FAQ",
                link: "/faq",
            },
        ],
    },
];

const aboutMenu = footerMenus.find((menu) => menu.id === 1);
const menus = footerMenus.find((menu) => menu.id === 2);

export default function Footer({ data }) {
    return (
        <section className="bg-blue-1000 pt-12 sm:pt-20 relative z-20 before:absolute before:content-[''] before:w-full before:h-full before:bg-gradient-to-t before:from-blue-700/40 before:to-blue-700/0 before:top-0 before:left-0 before:z-10 overflow-hidden">
            {/* Footer background shape */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full sm:w-auto -z-20 text-center">
                <Image
                    src="/images/footer-bg-shape.svg"
                    alt="Footer Background"
                    width={982}
                    height={360}
                    className=" w-full sm:max-w-[982px]"
                />
            </div>
            <div className="container relative z-20">
                {/* Footer top */}
                <div className="flex flex-col sm:flex-row justify-between gap-6 sm:gap-10 md:gap-20 lg:gap-24 pb-6 sm:pb-8">
                    {/* Footer logo widget */}
                    <div className="w-full sm:max-w-[382px]">
                        <Link href="/">
                            <StrapiImage
                                src={data?.logo?.image?.url}
                                alt={data?.logo?.image?.alternativeText}
                                width={100}
                                height={100}
                                className={
                                    "w-full max-w-[58px] sm:max-w-[90px]"
                                }
                            />
                        </Link>
                        <p className="text-neutral-50 text-2xs sm:text-xs font-medium leading-3xs sm:leading-xs mt-3 sm:mt-6">
                            {data?.description}
                        </p>
                    </div>

                    <div className="w-full flex  gap-5 justify-between">
                        {/* Footer menu widget  */}
                        {data?.linkWidget?.map((widget) => (
                            <div
                                key={widget?.id}
                                className="w-auto sm:w-full sm:min-w-[124px]"
                            >
                                <h4 className="text-neutral-50 text-xs sm:text-sm leading-xs sm:leading-md font-semiBold tracking-xs mb-4 sm:mb-6">
                                    {widget?.title}
                                </h4>
                                <ul className=" leading-xs flex flex-col gap-3 sm:gap-4">
                                    {widget?.navItem.map((menu) => (
                                        <li key={menu.id}>
                                            <Link
                                                href={menu?.href}
                                                className="text-neutral-50 text-2xs sm:text-xs leading-3xs sm:leading-xs font-medium transition-colors duration-200 hover:text-blue-300"
                                            >
                                                {menu.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Footer contact widget */}
                    <div className="max-w-full sm:max-w-[244px]">
                        <h4 className="text-neutral-50 text-xs sm:text-sm leading-xs sm:leading-md font-semiBold tracking-xs mb-4 sm:mb-6">
                            Contact Us
                        </h4>
                        <ul className="flex flex-col gap-3 sm:gap-4">
                            <li className="flex gap-4 items-start">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 20.8995L16.9497 15.9497C19.6834 13.2161 19.6834 8.78392 16.9497 6.05025C14.2161 3.31658 9.78392 3.31658 7.05025 6.05025C4.31658 8.78392 4.31658 13.2161 7.05025 15.9497L12 20.8995ZM12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364L12 23.7279ZM12 13C13.1046 13 14 12.1046 14 11C14 9.89543 13.1046 9 12 9C10.8954 9 10 9.89543 10 11C10 12.1046 10.8954 13 12 13ZM12 15C9.79086 15 8 13.2091 8 11C8 8.79086 9.79086 7 12 7C14.2091 7 16 8.79086 16 11C16 13.2091 14.2091 15 12 15Z"
                                        fill="#FCFCFC"
                                    />
                                </svg>

                                <span className="text-neutral-50 text-2xs sm:text-xs leading-3xs sm:leading-xs font-medium">
                                    Cook's Club - El Gouna Red Sea - Egypt
                                </span>
                            </li>
                            <li className="flex gap-4 items-start group">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"
                                        fill="#FCFCFC"
                                        className="transition-colors duration-200 group-hover:fill-blue-400"
                                    />
                                </svg>
                                <Link
                                    href="tel:+201066654101"
                                    className="text-neutral-50 text-2xs sm:text-xs leading-3xs sm:leading-xs font-medium transition-colors duration-200 group-hover:text-blue-400"
                                >
                                    +20 10 666 54 101
                                </Link>
                            </li>
                            <li className="flex gap-4 items-start group">
                                <svg
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z"
                                        fill="#FCFCFC"
                                        className="transition-colors duration-200 group-hover:fill-blue-400"
                                    />
                                </svg>

                                <Link
                                    href="mailto:basis@bluebrothersdiving.de"
                                    className="text-neutral-50 text-xs leading-xs font-medium transition-colors duration-200 group-hover:text-blue-400"
                                >
                                    basis@bluebrothersdiving.de
                                </Link>
                            </li>
                        </ul>

                        {/* Social links */}
                        <div className="flex items-center gap-3 mt-4 sm:mt-6">
                            <Link
                                href="https://www.facebook.com/BlueBrothersDiving/"
                                target="_blank"
                                className="inline-flex h-9 w-9 items-center justify-center border border-neutral-200 rounded-full transition-colors duration-200 hover:bg-blue-700 hover:border-blue-700 group"
                            >
                                <svg
                                    width="7"
                                    height="14"
                                    viewBox="0 0 7 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.78694 14V7.43079H0V5.06556H1.78694V3.04535C1.78694 1.45785 2.84249 0 5.2747 0C6.25947 0 6.98766 0.09177 6.98766 0.09177L6.93028 2.30049C6.93028 2.30049 6.18764 2.29347 5.37725 2.29347C4.50015 2.29347 4.35963 2.68638 4.35963 3.33851V5.06556H7L6.88511 7.43079H4.35963V14H1.78694Z"
                                        fill="#D4D4D4"
                                        className="transition-colors duration-200 group-hover:fill-neutral-50"
                                    />
                                </svg>
                            </Link>
                            <Link
                                href="https://www.instagram.com/bluebrothersdiving/"
                                target="_blank"
                                className="inline-flex h-9 w-9 items-center justify-center border border-neutral-200 rounded-full transition-colors duration-200 hover:bg-blue-700 hover:border-blue-700 group"
                            >
                                
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.66699 8.0013C1.66699 5.01574 1.66699 3.52296 2.59449 2.59546C3.52199 1.66797 5.01477 1.66797 8.00033 1.66797C10.9859 1.66797 12.4787 1.66797 13.4062 2.59546C14.3337 3.52296 14.3337 5.01574 14.3337 8.0013C14.3337 10.9868 14.3337 12.4796 13.4062 13.4072C12.4787 14.3346 10.9859 14.3346 8.00033 14.3346C5.01477 14.3346 3.52199 14.3346 2.59449 13.4072C1.66699 12.4796 1.66699 10.9868 1.66699 8.0013Z"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                        strokeLinejoin="round"
                                        className="transition-colors duration-200 group-hover:stroke-neutral-50"
                                    />
                                    <path
                                        d="M11 8C11 9.65687 9.65687 11 8 11C6.34315 11 5 9.65687 5 8C5 6.34315 6.34315 5 8 5C9.65687 5 11 6.34315 11 8Z"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.2"
                                        className="transition-colors duration-200 group-hover:stroke-neutral-50"
                                    />
                                    <path
                                        d="M11.672 4.33203H11.666"
                                        stroke="#D4D4D4"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="transition-colors duration-200 group-hover:stroke-neutral-50"
                                    />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer copyright */}
                <div className="py-6 sm:py-8 text-center flex flex-col-reverse sm:flex-row justify-center items-center sm:justify-between gap-2 border-t border-neutral-100/10">
                    <p className="text-3xs sm:text-2xs leading-3xs tracking-md font-medium text-neutral-50">
                        {data?.copyright}
                    </p>
                    <div className="text-neutral-50 text-3xs sm:text-2xs leading-3xs tracking-md font-medium flex gap-7">
                        {data?.footerBottomLinks?.map((nav) => (
                            <Link
                                key={nav.id}
                                href={nav.href}
                                className="transition-colors duration-200 hover:text-blue-400 relative before:absolute before:content-[''] before:w-1 before:h-1 before:rounded-full before:bg-neutral-50 before:top-1/2 before:-translate-y-1/2 before:-left-4 first:before:hidden"
                            >
                                {nav.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

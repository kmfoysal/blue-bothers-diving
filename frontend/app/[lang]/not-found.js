import BlueButton from "@/components/Buttons/BlueButton";
import Image from "next/image";

export default function NotFound() {
    return (
        <section className="section-padding container flex flex-col items-center justify-center">
            <Image
                src="/images/not-found-404.svg"
                alt="404"
                width={657}
                height={265}
                className="max-w-[657px] max-h-[265px]"
            />
            <h3 className="text-ml leading-ml font-semiBold tracking-xs text-neutral-500 mt-16 mb-8">
                Oops! it seems you follow backlink
            </h3>
            <BlueButton href="/" label="Back To Home" />
        </section>
    );
}

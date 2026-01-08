import { Accordion } from "../Accordion/Accordion";
import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function Questions({ heading, faqData }) {
  // Data Destructuring
  const { section_image, section_heading } = heading || {};

  return (
    <section>
      {/* Divider */}
      <div className="container">
        <div className="border-b border-neutral-200"></div>
      </div>
      <div className="section-padding bg-gradient-to-b from-[rgba(243,250,255,0)] to-[#F3FAFF]">
        <div className="container grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <div className="col-span-1 flex items-start">
            <StrapiImage
              src={section_image?.url || ""}
              alt={section_image?.alternativeText || "Question Icon"}
              width={840}
              height={884}
              className="w-auto rounded-md object-cover min-w-full"
            />
          </div>
          <div className="col-span-1">
            <div className="w-full sm:max-w-[808px] sm:pl-12 sm:px-0">
              {/* section heading */}
              <div className="text-left">
                <span className="text-blue-700 text-2xs sm:text-sm font-medium leading-3xs sm:leading-md tracking-xl mb-[2px]">
                  {section_heading?.sub_title}
                </span>
                <h2 className="text-lg sm:text-xl text-neutral-950 leading-ml sm:leading-xl font-bold tracking-xs mb-[2px]">
                  {section_heading?.title}
                </h2>
                <p className="text-xs sm:text-sm font-medium text-neutral-500 leading-sm sm:leading-md">
                  {section_heading?.description}
                </p>
              </div>

              {/* Accordion */}
              <div className="mt-6">
                <Accordion accordionItem={faqData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

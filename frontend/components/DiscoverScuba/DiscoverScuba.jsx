import { StrapiImage } from "../StrapiImage/StrapiImage";

export default function DiscoverScuba({ data }) {
  return (
    <section className="sm:pt-16 md:pt-20 lg:pt-24 xl:pt-[120px] -mb-[120px]">
      <div className="container flex flex-col sm:grid sm:grid-cols-12 gap-8 sm:gap-7">
        {data?.map((item, index) => (
          <div
            key={item?.id}
            className={` ${index === 1 ? "sm:col-span-6" : "sm:col-span-3"}`}
          >
            <StrapiImage
              src={item?.image?.url}
              width={`${index === 1 ? 726 : 350}`}
              height={422}
              alt={item?.image?.alternativeText || "Alt text"}
              className="w-full rounded-md sm:rounded-lg sm:object-cover "
            />
          </div>
        ))}
      </div>
    </section>
  );
}

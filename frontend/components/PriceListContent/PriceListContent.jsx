import Tab from "../Tab/Tab";

export default function PriceListContent({ data }){
    return (
        <section className="container bg-neutral-50 md:p-8 p-3 rounded-lg shadow-[0px_4px_40px_0px_rgba(0,0,0,0.08)] -mt-[400px] mb-[120px]">
            <Tab tabData={data} />
        </section>
    );
}
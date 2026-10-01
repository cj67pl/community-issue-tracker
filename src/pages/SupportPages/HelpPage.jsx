
import FAQList from "../../components/HelpSupport/FAQlist.jsx";
import ContactSupport from "../../components/HelpSupport/ContactsSupport.jsx";

function HelpSupport() {
    return (
        <div className="p-4 sm:p-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Help &amp; Support
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                    Find answers to common questions or get in touch with Tugon support.
                </p>
            </div>

            <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="min-w-0 flex-1">
                    <FAQList />
                </div>

                <div className="w-full lg:w-[25rem] lg:shrink-0">
                    <ContactSupport />
                </div>
            </div>
        </div>
    );
}

export default HelpSupport;


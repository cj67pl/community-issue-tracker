import FAQList from "../../../components/HelpSupport/FAQlist/FAQlist.jsx";
import ContactSupport from "../../../components/HelpSupport/ContactsSupport/ContactsSupport.jsx";

function HelpSupport() {
    return (
        <div className="p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900">Help &amp; Support</h2>
            <p className="mt-1 text-sm text-neutral-500">Answers to common questions about using Tugon.</p>

            <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start">
                <div className="lg:flex-1 sm:min-w-100">
                    <FAQList />
                </div>
                <div className="lg:w-100 lg:shrink-0">
                    <ContactSupport />
                </div>
            </div>
        </div>
    );
}

export default HelpSupport;
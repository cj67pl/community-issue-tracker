import { X } from "lucide-react";
import IssueDetails from "../../../components/IssuesPage/IssueDetails/IssueDetails.jsx"



function IssueDetailsModal({ isOpen, onClose, isSelected, onDeleteIssue, onEditIssueStatus, status }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-8">

            
            <div className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-xl">


                <button
                    type="button"
                    onClick={() => {
                        onClose()
                    }}
                    className="absolute right-4 top-4 z-10 rounded-full p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
                >
                    <X size={20} />
                </button>

                <IssueDetails 
                    issue={isSelected}
                    onClose={onClose}
                    onDeleteIssue={onDeleteIssue}
                    onEditIssueStatus={onEditIssueStatus}
                    //  showBackButton={false}  
                    
                    style="" />
                    
            </div>
        </div>
    );
}

export default IssueDetailsModal;
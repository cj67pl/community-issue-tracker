import { getInitials } from "../../../../utils/stringHelpers.js";
import { formatDate } from "../../../../utils/dateHelper.js";
import Note from "./Note.jsx"



function Notes({ notes }) {
    // console.log(notes[1].key);
    
    return (
        
        <div className="my-5 w-full min-w-md lg:min-w-0 rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">Notes</h3>
            </div>

            <div className="flex flex-col gap-3 p-4">
                {!notes || notes.length === 0 ? 
                (
                    <div>No Notes Yet</div>
                ) : (
                    
                
                    notes.map((note) => (
                        <Note
                            key={note.id}
                            initials={getInitials(note.user_name)}
                            userName={note.user_name}
                            note={note.content}
                            postDate={formatDate(note.updated_at)}
                            
                        />
                    ))
                )}
            </div>

            <div className="flex items-center gap-3 border-t border-slate-200 p-4">
                <input
                    type="text"
                    placeholder="Add an update or note..."
                    className="
            h-11 flex-1 rounded-lg border border-slate-200 px-4 text-sm
            outline-none placeholder:text-slate-400
            focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20
          "
                />
                <button className="h-11 shrink-0 rounded-lg bg-teal-700 px-6 text-sm font-bold text-white hover:bg-teal-800">
                    Post
                </button>
            </div>
        </div>
    );
}
export default Notes;
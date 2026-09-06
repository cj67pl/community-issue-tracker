import { useState } from "react";
import { Pencil, X, Check, Trash2 } from "lucide-react";

function Note({ id, initials, userName, note, postDate, isOwner, onEditComment, onDeleteComment }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(note);

    const handleEdit = () => { 
        setIsEditing(true); 
        setEditValue(note); 
    };
    const handleCancel = () => { 
        setIsEditing(false); 
        setEditValue(note); 
    };
    const handleSave = async () => { 
        if (!editValue.trim()) return; 
        await onEditComment(id, editValue); 
        setIsEditing(false); 

    };
    const handleDelete = async() => {
        await onDeleteComment(id);
        setIsEditing(false); 
    }
    return (
        <div className="flex flex-col rounded-xl border border-stone-200 bg-[#F8F6F1] p-4">
            <div className="flex gap-3">
                <div className="flex self-center h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-700/10 text-xs font-semibold text-emerald-800">
                    {initials}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                        <h5 className="font-semibold text-gray-900">{userName}</h5>
                        <span className="shrink-0 text-xs text-gray-400">{postDate}</span>
                    </div>

                    {/* highlighted = a soft green wash behind the text, like the
              top note in the screenshot — meant for the newest/latest note */}
                    {isEditing ? (
                        <textarea
                            value={editValue} 
                            onChange={(e) => setEditValue(e.target.value)} 
                            autoFocus 
                            className=" mt-2 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 " rows={3} />
                        ) : (
                        <p
                            className={`mt-1 text-sm text-gray-700`}
                        >
                            {note}
                        </p>
                        )
                    }
                </div>
                
            </div>
            {/* {isOwner && (
                <button 
                    type="button"
                    class="flex h-8 w-8 shrink-0 items-center justify-center
                        rounded-lg
                        text-slate-500
                        transition
                        hover:text-green-700
                        cursor-pointer
                        font-bold
                        self-end
                        "

                    title="Edit comment"
                    >
                        
                        Edit
                        
                </button>
                )} */}

            {isOwner && (
                <div className="mt-3 flex justify-end gap-2"> 
                    {!isEditing ? (
                        <>
                            <button 
                                type="button"
                                onClick={handleDelete}
                                className=" flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-red-500 transition hover:border-red-200 hover:bg-red-500/10 hover:text-red-700 cursor-pointer " title="Edit comment" > 
                                <Trash2 size={14} /> Delete
                            </button>
                            <button 
                                type="button"
                                onClick={handleEdit} 
                                className=" flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-green-500 transition hover:border-green-200 hover:bg-green-500/10 hover:text-green-700 cursor-pointer " title="Edit comment" > 
                                <Pencil size={14} /> Edit 
                            </button>                        
                        </>

                    ) : (
                        <> 
                            <button 
                                type="button" 
                                onClick={handleCancel} 
                                className=" flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer " > 
                                
                                <X size={14} />
                                    Cancel 
                            </button> 
                            <button 
                                type="button" 
                                onClick={handleSave} 
                                className=" flex h-8 items-center gap-1.5 rounded-lg bg-teal-700 px-3 text-xs font-semibold text-white hover:bg-teal-800 cursor-pointer " > 
                                
                                <Check size={14} /> 
                                    Save 
                            </button> 
                        </>
                    )} 
                </div>
            )} 
            

        </div>
    );
}


export default Note;
function Description({description}) {
    return(
        <div className="my-5 w-full max-w-3xl  min-w-sm rounded-xl border border-gray-200 bg-white shadow-sm">


            <div className="border-b border-slate-200 px-6 py-4">
                <h3 className="text-lg font-bold text-gray-900">
                    Issues Information
                </h3>
            </div>
            <p className="p-5">{description}</p>
        </div>
    )
}

export default Description;
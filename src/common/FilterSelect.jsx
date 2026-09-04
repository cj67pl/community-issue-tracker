import { ChevronDown } from 'lucide-react';

function FilterSelect({ name, placeholder, options = [], value, onChange }) {
    // console.log("OPTIONS:", options);
    // console.log("VALUE: ", value);
    
    return (
        <div className='relative flex justify-between w-full sm:w-auto'>
            <select
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
            
                    cursor-pointer

                    h-9 w-full 
                    appearance-none
                    rounded-md border border-slate-200
                    bg-white pl-3 pr-10 text-sm text-slate-700
                    outline-none
                    focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20
                "
            >
                <option key="placeholder" value="">{placeholder}</option>
                {options.map((option, index) => {
                    const optionValue = typeof option === "object" ? option.value : option; 
                    const optionLabel = typeof option === "object" ? option.label : option;
                    return(
                        <option key={`${name}-${optionValue}-${index}`} value={option.value}>
                            {optionLabel}
                        </option>

                    )
                    
                })}
            </select> 
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                <ChevronDown className="h-5 w-5" />
            </div>
        </div>
        
    );
}

export default FilterSelect;

function CurrencyCard({ label, currency, setCurrency, amount, setAmount, optionList, isDisabled = false }) {
    
    function changeAmount(value) {
        const num = Number(value);

        if (value === "") {
            setAmount("");
            return;
        }

        if (num >= 0) {
            setAmount(num);
        }
    }   
    
    return (
        <div className="w-full bg-slate-50/60 hover:bg-slate-50/90 border border-slate-100 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 rounded-2xl p-4.5 transition-all duration-300 shadow-sm">
            <div className="flex justify-between items-center mb-2.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 select-none">
                    {label}
                </label>
                <div className="relative">
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="appearance-none bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 py-1.5 pl-3 pr-8 rounded-xl text-xs font-bold uppercase shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer transition-all duration-200"
                    >
                        {optionList?.map((opt) => (
                            <option value={opt} key={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                    </div>
                </div>
            </div>
            
            <div className="flex items-center">
                <input
                    type="number"
                    value={amount}
                    disabled={isDisabled}
                    onChange={(e) => changeAmount(e.target.value)}
                    onKeyDown={(e) => {
                        if (["e", "E", "+", "-"].includes(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    className="w-full text-2xl font-bold text-slate-800 focus:outline-none bg-transparent placeholder-slate-300"
                    placeholder="0.00"
                />
            </div>
        </div>
    );
}

export default CurrencyCard;
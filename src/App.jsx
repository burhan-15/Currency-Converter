import { useState , useEffect } from 'react'
import useCurrencyInfo from './service/service'
import CurrencyCard from './components/CurrecyCard'
import './App.css'

function App() {
  const [from , setFrom] = useState('usd')
  const [to, setTo] = useState('pkr')
  const [amountFrom , setAmountFrom] = useState(0)
  const [amountTo , setAmountTo] = useState(0);
  
  const currentDate = new Date().toISOString().split('T')[0];

  const [chosenDate , setChosenDate] = useState(currentDate);

  const { data: currencyInfo, error, loading, retry } = useCurrencyInfo(from, chosenDate);
  const options = currencyInfo ? Object.keys(currencyInfo) : [];
  

  useEffect(() => {
    if (loading || error || !currencyInfo) return;

    const factor = currencyInfo[to];
    if (factor === undefined) return;

    const result = amountFrom * factor;

    setAmountTo(
      result < 1
        ? Number(result.toPrecision(3))
        : Number(result.toFixed(2))
    );
    
  } , [currencyInfo, loading, error, amountFrom, to, chosenDate] )


  function swapCurrency(){
    if (loading || error) return;
    setFrom(to)
    setTo(from)
  }


  
  return (
    <div className='min-h-screen w-full flex justify-center items-center p-4 bg-black/5'>
      <div className='w-full max-w-md bg-white/92 backdrop-blur-xl border border-white/60 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.12)] p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden'>
        
        {/* Top gradient stripe indicator */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        
        {/* Header */}
        <div className="flex flex-col gap-1.5 mt-2">
          <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            Currency Converter
          </h1>
          <p className="text-xs text-slate-400 font-medium leading-relaxed pl-1">
            Convert currency pairs instantly with real-time exchange rates.
          </p>
        </div>

        {/* Card Body */}
        <div className="flex flex-col relative gap-2.5 mt-2">
          {error && (
            <div className="bg-rose-50/95 border border-rose-200/80 rounded-2xl p-4 flex flex-col gap-3 shadow-[0_4px_20px_rgba(244,63,94,0.06)] transition-all duration-300">
              <div className="flex items-start gap-3">
                <span className="p-2 bg-rose-100 text-rose-600 rounded-xl mt-0.5 shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </span>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-rose-800">Connection Error</h3>
                  <p className="text-xs text-rose-600/90 font-medium leading-relaxed mt-0.5">
                    {error}
                  </p>
                </div>
              </div>
              <div className="flex justify-end border-t border-rose-100/50 pt-2.5">
                <button 
                  onClick={retry}
                  className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold rounded-xl transition-all duration-200 shadow-sm shadow-rose-600/10 cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          <CurrencyCard 
            label='from' 
            currency={from} 
            setCurrency={setFrom} 
            amount={amountFrom} 
            setAmount={setAmountFrom} 
            optionList={options} 
            isDisabled={loading || !!error}
            isSelectDisabled={loading || !!error}
          />
          
          {/* Overlapping Swap Button */}
          <div className="flex justify-center -my-3.5 z-10">
            <button 
              disabled={loading || !!error}
              className="flex items-center gap-2 px-5 py-2.5 bg-white disabled:bg-slate-100 disabled:text-slate-400 disabled:border-slate-200/50 disabled:shadow-none disabled:cursor-not-allowed hover:bg-slate-50 text-indigo-600 font-bold rounded-full border border-slate-200/80 shadow-md hover:shadow-lg active:scale-95 hover:scale-105 cursor-pointer transition-all duration-200 select-none text-xs md:text-sm" 
              onClick={swapCurrency}
            >
              <svg className="w-4 h-4 text-indigo-500 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              Swap Currency
            </button>
          </div>
          
          <CurrencyCard 
            label='to' 
            currency={to} 
            setCurrency={setTo} 
            amount={amountTo} 
            setAmount={setAmountTo} 
            optionList={options} 
            isDisabled={true}
            isSelectDisabled={loading || !!error}
          />
        </div>

        {/* Live Status Footer */}
        <div className="mt-2 bg-slate-50/50 rounded-xl p-3 border border-slate-100/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            {loading ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                <span className="text-blue-500 font-semibold">Updating rates...</span>
              </>
            ) : error ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                <span className="text-rose-500 font-semibold font-medium">Offline / Error</span>
              </>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live exchange rates active</span>
              </>
            )}
          </span>
          <div className="flex items-center gap-1.5">
            <label htmlFor="start-date" className="text-slate-400 select-none">Date:</label>
            <input 
              type="date" 
              id="start-date" 
              min='2024-03-06' 
              max={currentDate} 
              value={chosenDate} 
              disabled={loading}
              className="bg-transparent border-0 font-semibold text-slate-600 focus:outline-none focus:ring-0 cursor-pointer disabled:cursor-not-allowed"
              onChange={(e) => setChosenDate(e.target.value)}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default App

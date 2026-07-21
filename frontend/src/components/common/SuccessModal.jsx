import { useEffect } from "react";
import { CheckCircle2, X, ArrowRight, Mail } from "lucide-react";

export default function SuccessModal({open,title,description,infoCard,primaryAction,secondaryAction,onClose}) {
  useEffect(()=>{
    if(!open) return;
    const prev=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const esc=(e)=>e.key==="Escape"&&onClose?.();
    window.addEventListener("keydown",esc);
    return ()=>{document.body.style.overflow=prev;window.removeEventListener("keydown",esc);}
  },[open,onClose]);

  if(!open) return null;

  const rows=[
    ["Professional",infoCard?.professional],
    ["Date",infoCard?.date],
    ["Time",infoCard?.time],
    ["Status",infoCard?.status],
  ];

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center sm:justify-center">
      <button className="absolute inset-0 bg-black/45" onClick={onClose}/>
      <div className="relative z-10 w-full sm:max-w-[520px] overflow-hidden rounded-t-[30px] sm:rounded-[30px] bg-[#FAFAF7] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="sm:hidden flex justify-center pt-3"><div className="w-10 h-1 rounded-full bg-black/15"/></div>
        <div className="relative overflow-hidden bg-[#C7F36B] px-6 py-8">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-[36px] border-black/[0.04]"/>
          <div className="absolute -left-10 -bottom-10 h-32 w-32 rounded-full border-[24px] border-black/[0.04]"/>
          <button onClick={onClose} className="absolute right-5 top-5 h-9 w-9 rounded-full bg-black/10 flex items-center justify-center"><X size={16}/></button>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="h-16 w-16 rounded-full bg-black text-[#C7F36B] flex items-center justify-center"><CheckCircle2 size={34}/></div>
            <h2 className="mt-5 text-3xl font-bold">{title}</h2>
            <p className="mt-2 max-w-sm text-sm text-black/65">{description}</p>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-hidden rounded-[22px] border border-black/5 bg-white">
            {rows.map(([l,v])=>(
              <div key={l} className="flex justify-between border-b last:border-b-0 border-black/5 px-5 py-4">
                <span className="text-xs uppercase tracking-wider text-neutral-400">{l}</span>
                <span className="font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-[22px] bg-[#F2F2EF] p-5">
            <div className="flex gap-3">
              <Mail size={18}/>
              <div>
                <h3 className="font-semibold">Email Updates</h3>
                <p className="mt-1 text-sm text-black/65">We'll notify you by email as soon as the professional confirms your appointment. You'll also receive updates if your appointment is cancelled or rescheduled.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse sm:flex-row gap-3">
            <button onClick={secondaryAction?.onClick} className="h-12 rounded-2xl bg-[#EFEFEB] px-5 font-semibold">{secondaryAction?.label}</button>
            <button onClick={primaryAction?.onClick} className="flex-1 h-12 rounded-2xl bg-black text-white font-semibold flex items-center justify-center gap-2">{primaryAction?.label}<ArrowRight size={16}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}

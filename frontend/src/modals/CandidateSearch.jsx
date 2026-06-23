import React from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, Sparkles } from 'lucide-react';

export default function SearchModal({ 
  isOpen, 
  onClose, 
  formData, 
  onChangeInput, 
  onSubmit, 
  isLoading 
}) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-neutral-900/60 z-[999] flex items-center justify-center p-4 md:p-6 backdrop-blur-sm animate-overlay-fade-in">
      
      {/* Box Modal dengan Max Height agar tidak terpotong di layar kecil */}
      <form onSubmit={onSubmit} className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden animate-modal-scale-in">
        
        {/* Header Modal - Diperjelas dengan Ikon Sparkles */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-olive-dark/10 text-olive-dark rounded-xl">
              <Sparkles className="w-4 h-4 fill-olive-dark/20" />
            </div>
            <div>
              <h4 className="text-base font-bold text-neutral-950 tracking-tight">AI Deep Search Engine</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Trigger agent workflows.</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer active:scale-95"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body - Dibuat Scrollable jika layar pendek */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          
          <div>
            <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Target Role</label>
            <input 
              type="text" 
              name="role"
              required
              value={formData.role}
              onChange={onChangeInput}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark focus:bg-white transition-all font-medium h-[42px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Job Description</label>
            <textarea 
              name="jobDescription"
              value={formData.jobDescription}
              onChange={onChangeInput}
              rows={3}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl p-3.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark focus:bg-white transition-all font-medium resize-none min-h-[80px] max-h-[140px] leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Required Skills</label>
            <input 
              type="text" 
              name="skills"
              value={formData.skills}
              onChange={onChangeInput}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark focus:bg-white transition-all font-medium h-[42px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Preferred Location</label>
            <input 
              type="text" 
              name="location"
              value={formData.location}
              onChange={onChangeInput}
              className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark focus:bg-white transition-all font-medium h-[42px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Experience (Years)</label>
              <input 
                type="text" 
                name="minExperience"
                value={formData.minExperience}
                onChange={onChangeInput}
                className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark focus:bg-white transition-all font-medium h-[42px]"
              />
            </div>
            
            <div>
              <label className="block text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-2">Num Result</label>
              <input 
                type="number" 
                name="numResult"
                value={formData.numResult}
                onChange={onChangeInput}
                className="w-full bg-neutral-50/50 border border-neutral-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-olive-dark/20 focus:border-olive-dark focus:bg-white transition-all font-medium h-[42px]"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons - Tetap di posisi bawah */}
        <div className="flex gap-3 px-6 py-4 bg-neutral-50 border-t border-neutral-100 flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer active:scale-[0.98]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-olive-dark hover:bg-olive-dark/90 text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-olive-dark/10 transition-all cursor-pointer active:scale-[0.98] flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Invoking Agent...
              </>
            ) : (
              'Launch Search'
            )}
          </button>
        </div>

      </form>
    </div>,
    document.body
  );
}
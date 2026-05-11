'use client'

import { useState, useEffect } from 'react'
import { ShieldCheck, CheckCircle2, ChevronRight, RefreshCw } from 'lucide-react'

interface CopingStep {
  step: number
  instruction: string
  duration?: string
}

interface CopingCardProps {
  title: string
  steps: CopingStep[]
  encouragement: string
}

export function CopingCard({ title, steps, encouragement }: CopingCardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const reset = () => {
    setCurrentStep(0)
    setIsCompleted(false)
  }

  return (
    <div className="resource-card rounded-xl p-5 max-w-sm mt-2 border-indigo-400/20 bg-indigo-500/5">
      <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-3">
        <ShieldCheck className="w-5 h-5 text-indigo-400" />
        <h3 className="text-[#F8FAFC] font-semibold text-base">
          {title}
        </h3>
      </div>

      {!isCompleted ? (
        <div className="min-h-[120px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-indigo-300 uppercase tracking-wider">
                Step {steps[currentStep].step} of {steps.length}
              </span>
              {steps[currentStep].duration && (
                <span className="text-xs bg-indigo-500/20 text-indigo-200 px-2 py-0.5 rounded-full">
                  {steps[currentStep].duration}
                </span>
              )}
            </div>
            <p className="text-sm text-[#F8FAFC] leading-relaxed mb-4">
              {steps[currentStep].instruction}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="self-end flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-sm font-medium transition-all"
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Next Step'}
            {currentStep !== steps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-4 animate-in fade-in zoom-in duration-300">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-[#F8FAFC] font-medium text-sm mb-1">{encouragement}</p>
          <button 
            onClick={reset}
            className="flex items-center gap-1.5 mt-4 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Restart Exercise</span>
          </button>
        </div>
      )}
    </div>
  )
}

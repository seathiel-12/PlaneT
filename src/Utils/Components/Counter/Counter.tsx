import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface CounterProps {
  end: number
  atEndValue: string
  duration?: number
  suffix?: string
  snap?: number
  compact?: boolean
  className?: string
}

const Counter: React.FC<CounterProps> = ({ end, atEndValue, duration = 2, suffix = '', snap = 1, compact = false, className = '' }) => {
  const [count, setCount] = useState(0)
  const counterRef = useRef<HTMLSpanElement>(null)
  const hasAnimatedRef = useRef(false)
  const [showEndValue, setShowEndValue] = useState(false)

  const formatCount = (value: number) => {
    if (!compact || value < 1000) {
      return value.toLocaleString(undefined, { maximumFractionDigits: snap < 1 ? 2 : 0 })
    }

    if (value >= 1000000) return `${Math.floor(value / 1000000)}M`
    return `${Math.floor(value / 1000)}k`
  }

  useEffect(() => {
    if (hasAnimatedRef.current) return

    let animation: gsap.core.Tween | undefined
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            
            const animatedValue = { value: 0 }
            animation = gsap.to(animatedValue, {
              value: end,
              duration: duration,
              ease: 'power2.out',
              snap: { value: snap },
              onUpdate: function () {
                const value = this.targets()[0].value as number
                const decimals = snap < 1 ? Math.max(0, String(snap).split('.')[1]?.length ?? 0) : 0
                setCount(Number(value.toFixed(decimals)))
              },
              onComplete: () => {
                setShowEndValue(true)
              },
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current)
      }
      animation?.kill()
    }
  }, [end, duration, snap])

  return (
    <div>
      <span ref={counterRef} className={className}>
        { showEndValue ? atEndValue : formatCount(count) }
      </span>
      <span>{suffix}</span>
    </div>
  )
}

export default Counter

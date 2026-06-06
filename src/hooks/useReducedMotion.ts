import { useMemo } from 'react'

export function useReducedMotion(): boolean {
  return useMemo(
    () =>
      typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false,
    []
  )
}

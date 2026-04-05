import { useCallback } from 'react';
import { trackEvent } from '@/lib/analytics';

export function useTrackClick(
  action: string,
  params: Record<string, unknown> = {}
) {
  return useCallback(() => {
    trackEvent(action, params);
  }, [action, JSON.stringify(params)]);
}

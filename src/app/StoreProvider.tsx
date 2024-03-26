'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { setupListeners } from '@reduxjs/toolkit/query';
import { Provider } from 'react-redux';

import { makeStore, AppStore } from '@/store';

interface Props {
  readonly children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StoreProvider = ({ children }: Props) => {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    if (storeRef.current != null) {
      // configure listeners using the provided defaults
      // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
      const unsubscribe = setupListeners(storeRef.current.dispatch);
      return unsubscribe;
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
};

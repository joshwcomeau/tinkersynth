'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';

import Spacer from '../components/Spacer';

export type ToastMessage = React.ReactNode;

export type ToastItem = {
  id: string;
  title?: string;
  message: ToastMessage;
};

type AppStateContextValue = {
  toasts: ToastItem[];
  addToast: (toast: ToastItem) => void;
  dismissToast: (toastId: string) => void;
  machineHasBeenBroken: boolean;
  breakMachineWithKeyboard: (triggerRef: HTMLElement | null) => void;
  rememberFocus: (el: HTMLElement | null) => void;
  restoreFocus: () => void;
};

const AppStateContext = createContext<AppStateContextValue | null>(null);

const MACHINE_BROKEN_KEY = 'tinkersynth-machine-has-been-broken';

function readMachineBroken(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(MACHINE_BROKEN_KEY) === 'true';
  } catch {
    return false;
  }
}

function writeMachineBroken(value: boolean) {
  if (typeof window === 'undefined') return;
  try {
    if (value) {
      localStorage.setItem(MACHINE_BROKEN_KEY, 'true');
    } else {
      localStorage.removeItem(MACHINE_BROKEN_KEY);
    }
  } catch {
    // ignore
  }
}

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [machineHasBeenBroken, setMachineHasBeenBroken] = useState(
    () => readMachineBroken()
  );
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const addToast = useCallback((toast: ToastItem) => {
    setToasts(prev => {
      if (prev.some(t => t.id === toast.id)) return prev;
      return [...prev, toast];
    });
  }, []);

  const dismissToast = useCallback((toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
    if (returnFocusRef.current) {
      returnFocusRef.current.focus();
    }
  }, []);

  const rememberFocus = useCallback((el: HTMLElement | null) => {
    returnFocusRef.current = el;
  }, []);

  const restoreFocus = useCallback(() => {
    if (returnFocusRef.current) {
      returnFocusRef.current.focus();
    }
  }, []);

  const breakMachineWithKeyboard = useCallback((triggerRef: HTMLElement | null) => {
    returnFocusRef.current = triggerRef;
    setMachineHasBeenBroken(true);
    writeMachineBroken(true);
    setToasts(prev => {
      const id = 'break-machine-keyboard';
      if (prev.some(t => t.id === id)) return prev;
      return [
        ...prev,
        {
          id,
          title: '😮 Surprise!',
          message: (
            <span>
              You've discovered a neat trick. Using the keyboard allows you to{' '}
              <strong>exceed the range of some controls</strong>.<br />
              <Spacer size={8} />
              What will you do with your new powers?
            </span>
          ),
        },
      ];
    });
  }, []);

  const value: AppStateContextValue = {
    toasts,
    addToast,
    dismissToast,
    machineHasBeenBroken,
    breakMachineWithKeyboard,
    rememberFocus,
    restoreFocus,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}

/** Use when the component may render outside AppStateProvider (e.g. Slider in isolation). */
export function useAppStateOptional(): AppStateContextValue | null {
  return useContext(AppStateContext);
}

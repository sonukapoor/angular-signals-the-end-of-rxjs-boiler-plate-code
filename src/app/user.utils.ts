import { linkedSignal, Signal } from '@angular/core';

export function formatUserId(userId: Signal<number>): Signal<string> {
  return linkedSignal(() => {
    const id = userId();
    return id ? `User-${id}` : 'Unknown User';
  });
}

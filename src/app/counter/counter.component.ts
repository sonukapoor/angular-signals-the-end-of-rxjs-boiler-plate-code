import { Component, computed, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-counter',
  template: `
    <h2>Counter</h2>
    <div>
      <h2>Simple Counter Example</h2>
      <p>Count: {{ count() }}</p>
      <p>Double Count: {{ doubleCount() }}</p>
      <button (click)="increment()">Increment</button>
    </div>
  `,
})
export class CounterComponent {
  count = signal(0);
  doubleCount = computed(() => this.count() * 2);
  query = signal('');

  debouncedQuery = toSignal(toObservable(this.query).pipe(debounceTime(300)), {
    initialValue: '',
  });

  constructor() {
    effect(() => {
      console.log(`Double count is now: ${this.doubleCount()}`);
    });
  }

  increment() {
    this.count.update((c) => c + 1);
  }
}

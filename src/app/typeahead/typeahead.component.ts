import { Component, effect, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-typeahead',
  standalone: true,
  template: `
    <h2>Typeahead Search Example</h2>
    <input
      #searchInput
      type="text"
      [value]="query()"
      (input)="updateQuery(searchInput.value)"
      placeholder="Search..."
    />
    @if(loading()) {
    <p>Loading...</p>
    }
    <ul>
      @for(item of results(); track item) {
      <li>{{ item }}</li>
      }
    </ul>
  `,
})
export class TypeaheadComponent {
  query = signal('');
  loading = signal(false);

  // Using toSignal to convert the observable to a signal
  // This allows us to use the debounced query in the template
  // and automatically update the results when the query changes.
  debouncedQuery = toSignal(toObservable(this.query).pipe(debounceTime(300)), {
    initialValue: '',
  });

  results = signal<string[]>([]);

  constructor() {
    effect(() => {
      const search = this.debouncedQuery();
      if (!search) {
        this.results.set([]);
        return;
      }

      this.loading.set(true);

      // Simulate an HTTP request to fetch search results
      // Replace with your actual API endpoint
      // For example: this.http.get<string[]>(`/api/search?q=${search}`)
      // Here we use a mock API endpoint for demonstration purposes
      // In a real application, you would replace this with your actual API call.
      // The API should return an array of strings as search results.
      // For example, if you have an API that returns search results based on the query,
      // you would call it like this:
      // this.http.get<string[]>(`/api/search?q=${search}`).subscribe((response) => {
      //   this.results.set(response);
      //   this.loading.set(false);
      // });

      const mockResults = [
        'Apple',
        'Banana',
        'Cherry',
        'Date',
        'Elderberry',
        'Fig',
        'Grape',
        'Honeydew',
      ];

      // Simulating a delay to mimic an HTTP request
      setTimeout(() => {
        this.results.set(
          mockResults.filter((item) =>
            item.toLowerCase().includes(search.toLowerCase())
          )
        );

        this.loading.set(false);
      }, 3000);
    });
  }

  updateQuery(value: string) {
    this.query.set(value);
  }
}

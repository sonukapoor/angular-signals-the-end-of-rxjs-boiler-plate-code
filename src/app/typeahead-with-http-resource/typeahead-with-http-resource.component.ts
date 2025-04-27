import { httpResource } from '@angular/common/http';
import { Component, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-typeahead-with-http-resource',
  imports: [],
  template: `
    <h2>Typeahead with HTTP Resource</h2>
    <p>
      This component demonstrates a typeahead search feature that fetches
      results from an HTTP resource. The search input is debounced to reduce the
      number of requests made to the server. Search for something like "iPhone"
      or "Samsung" to see the results.
    </p>
    <input
      #searchInput
      type="text"
      [value]="query()"
      (input)="updateQuery(searchInput.value)"
      placeholder="Search..."
    />

    @if (isLoading()) {
    <p>Loading...</p>
    } @else if (error()) {
    <p>Error loading results.</p>
    } @else {
    <ul>
      @for(item of products() || []; track item) {
      <li>{{ item }}</li>
      }
    </ul>
    }
  `,
})
export class TypeaheadWithHttpResourceComponent {
  query = signal('');
  debouncedQuery = toSignal(toObservable(this.query).pipe(debounceTime(300)), {
    initialValue: '',
  });

  #searchResource = httpResource<{ products: { id: number; title: string }[] }>(
    () => {
      if (!this.debouncedQuery()) {
        return undefined; // Skip the request if the query is empty
      }

      const query = encodeURIComponent(this.debouncedQuery());
      const url = `https://dummyjson.com/products/search?q=${query}`;
      return url;
    }
  );

  isLoading = computed(() => this.#searchResource.isLoading());

  error = computed(() => this.#searchResource.error());

  data = this.#searchResource.value;

  products = computed(() => {
    return this.data()?.products.map((product) => product.title) || [];
  });

  updateQuery(value: string) {
    this.query.set(value);
  }
}

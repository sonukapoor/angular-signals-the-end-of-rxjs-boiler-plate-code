import { Component, input, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  template: `
    <h3>Item Detail</h3>
    <p>Item ID: {{ itemId() }}</p>
    <p>Detail: {{ itemDetail() }}</p>
  `,
  standalone: true,
})
export class ItemDetailComponent {
  itemId = input<number>(0);
  itemDetail = linkedSignal(() => {
    return `Detail for Item ${this.itemId()}`;
  });
}

@Component({
  selector: 'app-dashboard',
  template: `
    <h2>Dashboard</h2>
    <app-item-detail [itemId]="selectedId()"> </app-item-detail>
    <button (click)="selectNext()">Next Item</button>
  `,
  standalone: true,
  imports: [ItemDetailComponent],
})
export class DashboardComponent {
  selectedId = signal(1);

  selectNext() {
    this.selectedId.set(this.selectedId() + 1);
  }
}

import { Component, input, signal } from '@angular/core';
import { formatUserId } from '../user.utils';

@Component({
  selector: 'app-user-display',
  template: `
    <h3>User Display Using LinkedSignal</h3>
    <p>User Id: {{ userId() }}</p>
    <p>Formatted Name: {{ formattedName() }}</p>
  `,
})
export class UserDisplayComponent {
  userId = input<number>(0);
  // Using a linkedSignal to format the user ID
  // This is an alternative to using a function directly in the template
  // formattedName = linkedSignal(() => {
  //   const userId = this.userId();
  //   return userId ? `User-${userId}` : 'Unknown User';
  // });

  // Using a utility function to format the user ID
  // This is a more explicit way to handle formatting
  // and can be easier to test and maintain
  // This approach is more straightforward
  // and uses the linkedSignal function under the hood
  formattedName = formatUserId(this.userId);
}

@Component({
  selector: 'app-user-parent',
  imports: [UserDisplayComponent],
  standalone: true,
  template: `
    <h2>User Parent Component</h2>
    <app-user-display [userId]="userId()"></app-user-display>
    <button (click)="changeUserId()">Change User ID</button>
  `,
})
export class UserParentComponent {
  userId = signal(1);

  changeUserId() {
    this.userId.set(this.userId() + 1);
  }
}

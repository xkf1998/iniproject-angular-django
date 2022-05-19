import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activateIdx?: number;
  title = 'Tour of Heroes';
  selectNav(id: number): void {
    this.activateIdx = id;
  }
}

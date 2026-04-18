import { Component } from '@angular/core';
import { PlayerComponent } from './components/player/player.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PlayerComponent],
  template: `<app-player></app-player>`
})
export class AppComponent {}
import { Routes } from '@angular/router';
import { PlayerComponent } from './components/player/player.component';
import { UploadStartComponent } from './components/upload-start/upload-start.component';

export const routes: Routes = [
  { path: '', component: UploadStartComponent },
  { path: 'voices', component: PlayerComponent },
  { path: '**', redirectTo: '' }
];

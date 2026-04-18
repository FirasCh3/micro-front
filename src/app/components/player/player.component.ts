import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioService } from '../../services/audio.service';
import { Speaker } from '../../models/speaker.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, OnDestroy {
  speakers: Speaker[] = [];
  isLoading = true;
  private sub!: Subscription;

  constructor(private audioService: AudioService) {}

  ngOnInit(): void {
    this.sub = this.audioService.speakers$.subscribe(speakers => {
      this.speakers = speakers;
      this.isLoading = false;
    });
    this.load();
  }

  load(): void {
    this.isLoading = true;
    this.audioService.loadSpeakers();
  }

  togglePlay(speaker: Speaker): void {
    this.audioService.togglePlay(speaker);
  }

  onVolumeChange(speaker: Speaker, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioService.setVolume(speaker, parseFloat(input.value));
  }

  onSeek(speaker: Speaker, event: Event): void {
    const input = event.target as HTMLInputElement;
    this.audioService.seek(speaker, parseFloat(input.value));
  }

  stopAll(): void {
    this.audioService.stopAll();
  }

  formatTime(seconds: number): string {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
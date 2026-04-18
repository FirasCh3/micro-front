import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Speaker } from '../models/speaker.model';
import { ApiService, ResultFileResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private speakers = new BehaviorSubject<Speaker[]>([]);
  speakers$ = this.speakers.asObservable();

  private colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];

  constructor(private apiService: ApiService) {}

  loadSpeakers(): void {
    this.apiService.getSeparatedFiles().subscribe({
      next: (files) => {
        const speakers: Speaker[] = files.map((file, index) => ({
          id: index + 1,
          filename: file.filename,
          displayName: `Locuteur ${index + 1}`,
          url: file.url,  // URL directe du backend /result/filename
          isPlaying: false,
          color: this.colors[index % this.colors.length],
          volume: 1,
          currentTime: 0,
          duration: 0,
          progress: 0
        }));
        this.speakers.next(speakers);
      },
      error: (err) => {
        console.error('Erreur chargement:', err);
        // Si erreur, mettre liste vide pour afficher "Aucun fichier"
        this.speakers.next([]);
      }
    });
  }

  togglePlay(speaker: Speaker): void {
    // Arrêter les autres locuteurs
    this.speakers.value.forEach(s => {
      if (s.id !== speaker.id && s.isPlaying) {
        this.pauseSpeaker(s);
      }
    });

    if (!speaker.audioElement) {
      speaker.audioElement = new Audio(speaker.url);
      speaker.audioElement.volume = speaker.volume;
      
      speaker.audioElement.addEventListener('timeupdate', () => {
        speaker.currentTime = speaker.audioElement!.currentTime;
        speaker.duration = speaker.audioElement!.duration || 0;
        speaker.progress = speaker.duration ? (speaker.currentTime / speaker.duration) * 100 : 0;
        this.updateSpeaker(speaker);
      });

      speaker.audioElement.addEventListener('ended', () => {
        speaker.isPlaying = false;
        speaker.progress = 0;
        speaker.currentTime = 0;
        this.updateSpeaker(speaker);
      });
    }

    if (speaker.isPlaying) {
      speaker.audioElement.pause();
      speaker.isPlaying = false;
    } else {
      speaker.audioElement.play().catch(err => console.error('Erreur:', err));
      speaker.isPlaying = true;
    }
    
    this.updateSpeaker(speaker);
  }

  setVolume(speaker: Speaker, volume: number): void {
    speaker.volume = volume;
    if (speaker.audioElement) {
      speaker.audioElement.volume = volume;
    }
    this.updateSpeaker(speaker);
  }

  seek(speaker: Speaker, percent: number): void {
    if (speaker.audioElement && speaker.duration) {
      speaker.audioElement.currentTime = (percent / 100) * speaker.duration;
    }
  }

  stopAll(): void {
    this.speakers.value.forEach(s => {
      if (s.audioElement) {
        s.audioElement.pause();
        s.audioElement.currentTime = 0;
      }
      s.isPlaying = false;
      s.progress = 0;
      s.currentTime = 0;
    });
    this.speakers.next([...this.speakers.value]);
  }

  private pauseSpeaker(speaker: Speaker): void {
    if (speaker.audioElement) {
      speaker.audioElement.pause();
    }
    speaker.isPlaying = false;
    this.updateSpeaker(speaker);
  }

  private updateSpeaker(updated: Speaker): void {
    const list = this.speakers.value.map(s => 
      s.id === updated.id ? updated : s
    );
    this.speakers.next(list);
  }
}
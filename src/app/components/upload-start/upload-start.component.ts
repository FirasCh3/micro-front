import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, UploadFileResponse } from '../../services/api.service';

@Component({
  selector: 'app-upload-start',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './upload-start.component.html',
  styleUrls: ['./upload-start.component.scss']
})
export class UploadStartComponent implements OnInit {
  uploadFile?: UploadFileResponse;
  isLoading = true;
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getLatestUpload().subscribe({
      next: (file) => {
        this.uploadFile = file;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No uploaded WAV file was found.';
        this.isLoading = false;
      }
    });
  }
}

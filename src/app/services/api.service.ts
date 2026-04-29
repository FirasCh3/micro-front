import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AudioFileResponse {
  filename: string;
  url: string;
}

export type ResultFileResponse = AudioFileResponse;
export type UploadFileResponse = AudioFileResponse;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getLatestUpload(): Observable<UploadFileResponse> {
    return this.http.get<UploadFileResponse>(`${this.apiUrl}/upload/latest`);
  }

  getSeparatedFiles(): Observable<ResultFileResponse[]> {
    return this.http.get<ResultFileResponse[]>(`${this.apiUrl}/result`);
  }
}

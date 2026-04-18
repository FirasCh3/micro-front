import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResultFileResponse {
  filename: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // Récupère la liste des fichiers séparés (endpoint /result du backend)
  getSeparatedFiles(): Observable<ResultFileResponse[]> {
    return this.http.get<ResultFileResponse[]>(`${this.apiUrl}/result`);
  }
}
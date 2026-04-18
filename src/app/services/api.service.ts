import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface SeparatedFile {
  filename: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Récupère la liste des fichiers séparés depuis le backend
  getSeparatedFiles(): Observable<SeparatedFile[]> {
    return this.http.get<SeparatedFile[]>(`${this.apiUrl}/speakers`);
  }
}
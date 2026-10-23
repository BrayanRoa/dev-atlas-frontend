import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { TopicCreatePayload, TopicCreateResponse } from '../interfaces/topics.interfaces';


@Injectable({
  providedIn: 'root',
})
export class TopicService {
  
  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/topics`;

  /**
   * Crea un nuevo topic
   * @param topic - El topic a crear
   * @returns Observable<TopicCreateResponse>
   */
  createTopic(topic: TopicCreatePayload): Observable<TopicCreateResponse> {
    return this.http.post<TopicCreateResponse>(`${this.baseUrl}`, topic);
  }
}

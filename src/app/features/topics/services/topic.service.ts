import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ITopic, ITopicCreatePayload, ITopicCreateResponse, ITopicListResponse } from '../../../shared/interfaces/topics.interfaces';


@Injectable({
  providedIn: 'root',
})
export class TopicService {
  
  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/topics`;

  private _currentTopic: ITopic | null = null;

  public get currentTopic(): ITopic | null {
    return this._currentTopic;
  }

  public set currentTopic(topic: ITopic | null) {
    this._currentTopic = topic;
  }

  /**
   * Crea un nuevo topic
   * @param topic - El topic a crear
   * @returns Observable<ITopicCreateResponse>
   */
  createTopic(topic: ITopicCreatePayload): Observable<ITopicCreateResponse> {
    return this.http.post<ITopicCreateResponse>(`${this.baseUrl}`, topic);
  }

  getAllTopics(workspaceId: string): Observable<ITopicListResponse> {
    return this.http.get<ITopicListResponse>(`${this.baseUrl}?workSpaceId=${workspaceId}`);
  }
}

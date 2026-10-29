import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ITopic, ITopicCreatePayload, ITopicCreateResponse, ITopicDetailResponse, ITopicListItem, ITopicListResponse } from '../interfaces/topics.interfaces';
import { IBaseResponse } from '../../../shared/interfaces/base.response';


@Injectable({
  providedIn: 'root',
})
export class TopicService {
  
  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/topics`;

  private _currentTopic: ITopicListItem | null = null;

  public get currentTopic(): ITopicListItem | null {
    return this._currentTopic;
  }

  public set currentTopic(topic: ITopicListItem | null) {
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

  getTopic(topicId: string): Observable<ITopicDetailResponse> {
    return this.http.get<ITopicDetailResponse>(`${this.baseUrl}/${topicId}`);
  }
}

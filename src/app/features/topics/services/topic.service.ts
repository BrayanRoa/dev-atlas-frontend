import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { ITopicCreatePayload, ITopicCreateResponse, ITopicDeleteResponse, ITopicDetailResponse, ITopicListItem, ITopicListResponse, ISubtopicsResponse } from '../interfaces/topics.interfaces';

@Injectable({
  providedIn: 'root',
})
export class TopicService {
  
  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/topics`;
  readonly topicSaved = signal(0);
  readonly topicRemoved = signal(0);

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
    return this.http.post<ITopicCreateResponse>(`${this.baseUrl}`, topic).pipe(
      tap(()=> this.topicSaved.update(prev => prev + 1))
    );
  }

  /**
   * Actualiza un topic existente.
   * notify=false evita disparar topicSaved (útil al guardar solo el markdown).
   */
  updateTopic(
    topic: ITopicCreatePayload,
    topicId: string,
    notify = true,
  ): Observable<ITopicCreateResponse> {
    return this.http.put<ITopicCreateResponse>(`${this.baseUrl}/update/${topicId}`, topic).pipe(
      tap(() => {
        if (notify) {
          this.topicSaved.update((prev) => prev + 1);
        }
      }),
    );
  }

  /**
   * Elimina un topic
   * @param topicId - El ID del topic a eliminar
   * @returns Observable<ITopicDeleteResponse>
   */
  deleteTopic(topicId: string): Observable<ITopicDeleteResponse> {
    return this.http.delete<ITopicDeleteResponse>(`${this.baseUrl}/delete/${topicId}`).pipe(
      tap(() => this.topicRemoved.update((prev) => prev + 1))
    );
  }

  /**
   * Obtiene todos los topics de un workspace
   * @param workspaceId - El ID del workspace
   * @returns Observable<ITopicListResponse>
   */
  getAllTopics(workspaceId: string): Observable<ITopicListResponse> {
    return this.http.get<ITopicListResponse>(`${this.baseUrl}?workSpaceId=${workspaceId}`);
  }

  /**
   * Obtiene un topic por su ID
   * @param topicId - El ID del topic
   * @returns Observable<ITopicDetailResponse>
   */
  getTopic(topicId: string): Observable<ITopicDetailResponse> {
    return this.http.get<ITopicDetailResponse>(`${this.baseUrl}/${topicId}`);
  }

  /**
   * Obtiene todos los subtopics de un topic
   * @param topicId - El ID del topic
   * @returns Observable<ISubtopicsResponse>
   */
  getSubtopics(topicId: string): Observable<ISubtopicsResponse> {
    return this.http.get<ISubtopicsResponse>(`${this.baseUrl}/subtopics/${topicId}`);
  }
}

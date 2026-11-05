import { IBaseResponse } from './../../../shared/interfaces/base.response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ITag, ITagCreateOrUpdateRequest, ITagPayload } from '../interfaces/tag.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  createTag(request: ITagPayload): Observable<ITagCreateOrUpdateRequest> {
    return this.http.post<ITagCreateOrUpdateRequest>(`${this.apiUrl}/tags`, request);
  }

  updateTag(id: string, request: ITagPayload): Observable<ITagCreateOrUpdateRequest> {
    return this.http.put<ITagCreateOrUpdateRequest>(`${this.apiUrl}/tags/${id}`, request);
  }

  deleteTag(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/tags/${id}`);
  }

  getTags(workSpaceId: string): Observable<IBaseResponse<ITag[]>> {
    return this.http.get<IBaseResponse<ITag[]>>(`${this.apiUrl}/tags?workspaceId=${workSpaceId}`);
  }
}

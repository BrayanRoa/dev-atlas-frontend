import { IBaseResponse } from './../../../shared/interfaces/base.response';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ITag, ITagCreateRequest, ITagPayload } from '../interfaces/tag.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  createTag(request: ITagPayload): Observable<ITagCreateRequest> {
    return this.http.post<ITagCreateRequest>(`${this.apiUrl}/tags`, request);
  }

  getTags(workSpaceId: string): Observable<IBaseResponse<ITag[]>> {
    return this.http.get<IBaseResponse<ITag[]>>(`${this.apiUrl}/tags?workspaceId=${workSpaceId}`);
  }
}

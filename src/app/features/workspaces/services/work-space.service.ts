import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { WorkspaceCreateResponse, WorkspaceListResponse } from '../interfaces/workspace.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkSpaceService {

  private readonly http = inject(HttpClient);
  
  /**
   * Crea un nuevo workspace
   * @param workspace - El workspace a crear
   * @returns Observable<WorkspaceResponse>
   */
  createWorkspace(workspace: { name: string }): Observable<WorkspaceCreateResponse> {
    return this.http.post<WorkspaceCreateResponse>(`${environment.apiUrl}/workspaces`, workspace);
  }

  /**
   * Obtiene la lista de workspaces
   * @returns Observable<WorkspaceResponse[]>
   */
  getWorkspaces(): Observable<WorkspaceListResponse> {
    return this.http.get<WorkspaceListResponse>(`${environment.apiUrl}/workspaces`);
  }
}

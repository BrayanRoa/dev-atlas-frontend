import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Workspace, WorkspaceCreateResponse, WorkspaceListResponse } from '../interfaces/workspace.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkSpaceService {

  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/workspaces`;

  private _currentWorkspace: Workspace | null = null;

  public get currentWorkspace(): Workspace | null {
    return this._currentWorkspace;
  }

  public set currentWorkspace(workspace: Workspace | null) {
    this._currentWorkspace = workspace;
  }

  /**
   * Crea un nuevo workspace
   * @param workspace - El workspace a crear
   * @returns Observable<WorkspaceResponse>
   */
  createWorkspace(workspace: { name: string }): Observable<WorkspaceCreateResponse> {
    return this.http.post<WorkspaceCreateResponse>(`${this.baseUrl}`, workspace);
  }

  /**
   * Obtiene la lista de workspaces
   * @returns Observable<WorkspaceResponse[]>
   */
  getWorkspaces(): Observable<WorkspaceListResponse> {
    return this.http.get<WorkspaceListResponse>(`${this.baseUrl}`);
  }
}

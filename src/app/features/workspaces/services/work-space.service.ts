import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IWorkspace, IWorkspaceCreateRequest, IWorkspaceCreateResponse, IWorkspaceListResponse } from '../interfaces/workspace.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkSpaceService {

  private readonly http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/workspaces`;

  private _currentWorkspace: IWorkspace | null = null;

  public get currentWorkspace(): IWorkspace | null {
    return this._currentWorkspace;
  }

  public set currentWorkspace(workspace: IWorkspace | null) {
    this._currentWorkspace = workspace;
  }

  /**
   * Crea un nuevo workspace
   * @param workspace - El workspace a crear
   * @returns Observable<WorkspaceResponse>
   */
  createWorkspace(workspace: IWorkspaceCreateRequest): Observable<IWorkspaceCreateResponse> {
    return this.http.post<IWorkspaceCreateResponse>(`${this.baseUrl}`, workspace);
  }

  /**
   * Obtiene la lista de workspaces
   * @returns Observable<WorkspaceResponse[]>
   */
  getWorkspaces(): Observable<IWorkspaceListResponse> {
    return this.http.get<IWorkspaceListResponse>(`${this.baseUrl}`);
  }
}

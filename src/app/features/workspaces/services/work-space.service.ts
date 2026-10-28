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
  private _workspaces: IWorkspace[] = [];

  /**
   * Obtiene la lista de workspaces
   * @returns IWorkspace[]
   */
  public get workspaces(): IWorkspace[] {
    return this._workspaces;
  }

  /**
   * Establece la lista de workspaces
   * @param workspaces - La lista de workspaces
   */
  public set workspaces(workspaces: IWorkspace[]) {
    this._workspaces = workspaces;
  }

  /**
   * Obtiene el workspace actual
   * @returns IWorkspace | null
   */
  public get currentWorkspace(): IWorkspace | null {
    return this._currentWorkspace;
  }
  
  /**
   * Establece el workspace actual
   * @param workspace - El workspace a establecer
   */
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

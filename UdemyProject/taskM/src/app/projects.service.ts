import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Project } from './project';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  jsonserver: string = "http://localhost:3000"
  base: string = "http://localhost:54573"
  //public MySubject: Subject<boolean>;
  public MySubject: BehaviorSubject<boolean>;


  constructor(private httpClient: HttpClient) {
    //this.MySubject = new Subject<boolean>();
    this.MySubject = new BehaviorSubject<boolean>(false);
  }

  //hideDetails: boolean = false;

  toggleDetails() {
    //this.hideDetails = !this.hideDetails;
    //this.MySubject.next(this.hideDetails);
    this.MySubject.next(!this.MySubject.value);

  }

  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.base + "/api/projects", { responseType: "json" })
      .pipe(map(
        (data: Project[]) => {
          for (let i = 0; i < data.length; i++) {
            //data[i].teamSize = data[i].teamSize * 100;
          }

          return data;
        }
      ));

  }

  getProjectByProjectID(ProjectID: number): Observable<Project> {
    return this.httpClient.get<Project>(this.base + "/api/projects/searchbyprojectid/" + ProjectID, { responseType: "json" });
  }

  insertProject(newProject: Project): Observable<Project> {
    //var requestHeaders = new HttpHeaders();
    //requestHeaders = requestHeaders.set("X-XSRF-TOKEN", sessionStorage.XSRFRequestToken);
    // return this.httpClient.post<Project>(this.base + "/api/projects", newProject, { headers: requestHeaders, responseType: "json" });

    return this.httpClient.post<Project>(this.base + "/api/projects", newProject, { responseType: "json" });
  }

  updateProject(existingProject: Project): Observable<Project> {
    return this.httpClient.put<Project>(this.base + "/api/projects", existingProject, { responseType: "json" });
  }

  deleteProject(ProjectID: number): Observable<string> {
    return this.httpClient.delete<string>(this.base + "/api/projects?ProjectID=" + ProjectID);
  }

  SearchProjects(searchBy: string, searchText: string): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.base + "/api/projects/search/" + searchBy + "/" + searchText, { responseType: "json" });
  }
}




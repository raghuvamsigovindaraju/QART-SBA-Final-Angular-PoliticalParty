import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from 'src/environments/environment';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable({ providedIn: 'root' })
export class CoreService {
  private static service_url = environment.service_url;

  constructor(private http: HttpClient) { }

  getLeadersList() {
    return this.http.get(
     // `${CoreService.service_url}/politician-ratings/leaders/all`,
      `${CoreService.service_url}/politics/api/v1/leader/all`,
      { headers }
    )
  }

  getLeaderDevelopments(leaderId: number) {
    return this.http.get(
     // `${CoreService.service_url}/politician-ratings/leaders/get-development-by/${leaderId}`,
      `${CoreService.service_url}/politics/api/v1/development/get-development-by/${leaderId}`,
      { headers }
    )
  }
}
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'https://localhost:44316/api/game';
  constructor(private http: HttpClient) { }

  public simulateGames(numGames: number, changeDoor: boolean): Observable<number> {
    const params = new HttpParams().set('SimulationCount', numGames).set('IsDoorChange', changeDoor);
    return this.http.get<number>(this.apiUrl, {params});
  }
}

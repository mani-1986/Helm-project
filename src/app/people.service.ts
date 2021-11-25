import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }
  url: string = 'https://jsonplaceholder.typicode.com/users';
  public getPeople(): Observable<Array<any>> {
    return this.http.get<{ people: any[] }>(this.url).pipe(
      map((users: any) => users)
    )
  }
}

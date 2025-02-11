import { Injectable } from '@angular/core';
import { Hero } from './hero.interface';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private url = 'https://gateway.marvel.com/v1/public';

  constructor(private http: HttpClient) {}

  public getHeroes(): Observable<Hero[]> {
    const offset = Math.floor(Math.random() * 1564);

    return this.http
      .get<Hero[]>(`${this.url}/characters`, {
        params: {
          apikey: '06f1c915f17bf6a59b637e6b8ba49871',
          ts: 'juan',
          hash: 'b87b42b3a738b4bf3da0a5aec4185498',
          limit: '12',
          offset: offset.toString(),
        },
      })
      .pipe(map((response: any) => response.data.results));
  }

  public getPaginatedHeroes(
    page: number,
    itemsPerPage: number
  ): Observable<{ heroes: Hero[]; total: number }> {
    const offset = (page - 1) * itemsPerPage;

    return this.http
      .get<{ data: { results: Hero[]; total: number } }>(
        `${this.url}/characters`,
        {
          params: {
            apikey: '06f1c915f17bf6a59b637e6b8ba49871',
            ts: 'juan',
            hash: 'b87b42b3a738b4bf3da0a5aec4185498',
            limit: itemsPerPage.toString(),
            offset: offset.toString(),
          },
        }
      )
      .pipe(
        map((heroe) => ({
          heroes: heroe.data.results,
          total: heroe.data.total,
        })),
        catchError((error) => {
          console.error('Error al obtener héroes:', error);
          return of({ heroes: [], total: 0 });
        })
      );
  }

  public getHero(id: number): Observable<Hero> {
    return this.http
      .get<Hero>(`${this.url}/characters/${id}`, {
        params: {
          apikey: '06f1c915f17bf6a59b637e6b8ba49871',
          ts: 'juan',
          hash: 'b87b42b3a738b4bf3da0a5aec4185498',
        },
      })
      .pipe(map((data: any) => data.data.results[0]));
  }

  public searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Hero[]>(`${this.url}/characters`, {
      params: {
        nameStartsWith: term.trim(),
        apikey: '06f1c915f17bf6a59b637e6b8ba49871',
        ts: 'juan',
        hash: 'b87b42b3a738b4bf3da0a5aec4185498',
      },
    }).pipe(map((response: any) => response.data.results));
  }
}

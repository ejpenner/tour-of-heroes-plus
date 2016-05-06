
import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Hero }           from './hero';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
    constructor (private http: Http) {}
    private heroesUrl = 'https://ionic-joke-api-ejpenner.c9users.io/api/v1/heroes';  // URL to web api


    getHeroes (): Observable<Hero[]> {
        return this.http.get(this.heroesUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        let body = res.json();
        return body[0].data || { };
    }

    private $extractData(res: Response) {
      if (res.status < 200 || res.status >= 300) {
        throw new Error('Bad response status: ' + res.status);
      }
      let body = res.json();
      return body.data || { };
    }

    private handleError (error: any) {
        // In a real world app, we might send the error to remote logging infrastructure
        let errMsg = error.message || 'Server error';

        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }

    addHero (name: string): Observable<Hero>  {
      let body = JSON.stringify({ name });
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      return this.http.post(this.heroesUrl, body, options)
        .map(this.$extractData)
        .catch(this.handleError);
   }

    removeHero (hero: Hero) : Observable<Response> {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let id = JSON.stringify(hero.id);
      return this.http.delete(this.heroesUrl + '/' + id, options).map(this.$extractData).catch(this.handleError);
    }



    getHero(id: number): Observable<Hero> {
      return this.http.get(this.heroesUrl + '/' + id)
        .map(this.$extractData)
        .catch(this.handleError);
    }
}

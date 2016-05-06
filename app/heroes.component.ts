import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import {Hero} from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls:  ['app/heroes.component.css'],
    directives: [HeroDetailComponent],
    providers: [],
})

export class HeroesComponent implements OnInit {
  heroes: Hero[];
  //title = 'Tour of Heroes';
  selectedHero: Hero;
  selectedIndex: number;
  errorMessage: Error;
  message: string;

    constructor(
        private router: Router,
        private heroService: HeroService) {

        this.getHeroes();
    }
    getHeroes() {
       return this.heroService.getHeroes().subscribe( res => this.heroes = res);//.then(heroes => this.heroes = heroes);
    }
    ngOnInit() {
        this.getHeroes();
    }
    onSelect(hero: Hero) {
      this.selectedHero = hero;
      this.selectedIndex = this.heroes.indexOf(hero);
      console.log(this.selectedIndex)
    }

    gotoDetail() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
    }

    addHero (name: string) {
      if (!name) {return;}
      this.heroService.addHero(name)
        .subscribe(
          hero  => this.heroes.push(hero),
          error =>  this.errorMessage = <any>error);
    }

    removeHero () {
      console.log(this.selectedHero.id);
      this.heroService.removeHero(this.selectedHero).subscribe(error =>  this.errorMessage = <any>error); //, message => this.message = message);
      this.heroes.splice(this.selectedIndex, 1);
    }
}




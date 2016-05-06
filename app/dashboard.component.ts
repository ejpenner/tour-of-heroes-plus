/**
 * Created by epenner on 5/4/2016.
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-dashboard',
    templateUrl: 'app/dashboard.component.html',
    styleUrls: ['app/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    ngOnInit() {
        this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(0,8));
    }

    gotoDetail(hero: Hero) {
        let link = ['HeroDetail', { id: hero.id }];
        this.router.navigate(link);
    }
}

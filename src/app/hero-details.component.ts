import { Component, Input, OnInit } from '@angular/core';
import { Hero } from './hero';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from './hero.service';
import 'rxjs/add/operator/switchMap';

@Component({
    moduleId:module.id,
    selector:'my-hero-detail', //decorator where we specify the selecotr name that indetifies this component's element
    templateUrl:`./hero-details.component.html`,
    styleUrls:['./hero-details.component.css']
})

export class HeroDetailsComponent implements OnInit{
    @Input()
    hero:Hero;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ){}

    ngOnInit():void{
        this.route.params.
        switchMap((params:Params)=> this.heroService.getHero(+params['id'])) //+ is for converting string into a number
        .subscribe(hero=>this.hero=hero);
    }

    goBack():void {
        this.location.back();
    }

    save():void {
        this.heroService.update(this.hero).then(()=>this.goBack);
    }
}
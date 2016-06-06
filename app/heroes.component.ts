import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router-deprecated';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.Service';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  directives: [HeroDetailComponent],
  providers: [HeroService],
  styleUrls:['app/heroes.component.css']
})

export class HeroesComponent implements OnInit{
  ngOnInit() {
    this.getHeroes();
  }
  constructor(private router: Router, private heroService: HeroService) { }
  title = 'Tour of Heroes';
  heros:Hero[];
  selectedHero: Hero;
  onSelect(hero: Hero){
    this.selectedHero = hero;
  }
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heros = heroes);
  }
  gotoDetail(){
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}

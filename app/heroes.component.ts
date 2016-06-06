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
  constructor(private router: Router,
     private heroService: HeroService) {
      }
  title = 'Tour of Heroes';
  heros:Hero[];
  selectedHero: Hero;
  addingHero = false;
  error:any;

  onSelect(hero: Hero){
    this.selectedHero = hero;
  }
  getHeroes() {
    this.heroService
        .getHeroes()
        .then(heroes => this.heros = heroes)
        .catch(error => this.error = error); // TODO: Display error message
  }
  gotoDetail(){
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }
  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heros = this.heros.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }
}

import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    this.heroService.getList().subscribe(heroes => this.heroes = heroes);
  }

  create(name: string) {
    name = name.trim();

    if(name) {
      this.heroService.create({ name } as Hero).subscribe((result) => {
        this.heroes.push(result);
      });
    }
  }

  delete(hero: Hero) {
    this.heroService.delete(hero).subscribe(() => {
      this.heroes = this.heroes.filter((currentHero: Hero) => {
        return currentHero.id !== hero.id;
      });
    });
  }
}

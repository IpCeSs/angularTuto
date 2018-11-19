import { Component, OnInit } from '@angular/core';
// on importe la classe hero
import { Hero } from '../hero';
// HeroService gère les données
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-heroes-component',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    /** The parameter simultaneously defines a private heroService property and identifies it as a HeroService injection site. */
    constructor(private heroService: HeroService) { }

    ngOnInit() {
        // On appelle la méthode getHeoes onInit (lifecycle Hook)
        this.getHeroes();
    }

    // getHeroes utilise la methode getHeroes du hero service qui s'occupe d'accéder aux données
    // adatptée pour recevoir un observable
    getHeroes(): void {
        // partie entre parenthèses => callback
        this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
    }
    add(name: string): void {
        name = name.trim();
        if (!name) { return; }
        this.heroService.addHero({ name } as Hero)
          .subscribe(hero => {
            this.heroes.push(hero);
          });
      }
      delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
      }
}

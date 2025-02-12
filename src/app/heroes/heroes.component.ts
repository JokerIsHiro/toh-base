import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  imports: [RouterModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  loading = false;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes();
  }

  loadHeroes(): void {
    this.loading = true;
    this.heroService.getPaginatedHeroes(this.currentPage).subscribe((heroe) => {
      this.heroes = heroe;
      this.totalPages = Math.ceil(this.heroService.totalHeroes / 20);
      this.loading = false;
    },)
  }

  changePage(page: number): void {
    if (page > 0) {
      this.currentPage = page;
      this.loadHeroes();
    }
  }
}

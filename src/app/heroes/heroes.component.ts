import { Component, OnInit } from '@angular/core';
import { HeroService } from '../hero.service';
import { Hero } from '../hero.interface';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-heroes',
  imports: [RouterModule, MatProgressSpinnerModule],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss',
})
export class HeroesComponent implements OnInit {
  public heroes: Hero[] = [];
  currentPage: number = 1;
  totalPages: number = 0;
  isLoading = false;

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.loadHeroes(this.currentPage);
  }

  loadHeroes(page: number): void {
    this.isLoading = true;
    this.heroService.getPaginatedHeroes(this.currentPage).subscribe((heroe) => {
      this.heroes = heroe;
      this.totalPages = Math.ceil(this.heroService.totalHeroes / 20);
      this.isLoading = false;
    },)
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadHeroes(this.currentPage);
    }
  }
}

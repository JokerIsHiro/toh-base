import { Component, input, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
} from 'rxjs';
import { Hero } from '../hero.interface';
import { HeroService } from '../hero.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-hero-search',
  imports: [RouterModule, CommonModule, MatProgressSpinnerModule],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.scss',
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  lastTerm: string = '';

  constructor(private heroService: HeroService) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}

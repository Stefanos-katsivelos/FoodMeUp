import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  searchTerm = '';

  router = inject(Router);
  navigateByUrl: any;

  constructor(activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if (params.searchTerm) this.searchTerm = params.searchTerm;
    });
  }

  search(value: string): void {
    if (value) this.router.navigateByUrl('/search/' + value);
  }
}

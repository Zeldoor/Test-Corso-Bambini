import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'app-insegnanti',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './insegnanti.component.html',
    styleUrl: './insegnanti.component.css'
})
export class InsegnantiComponent {
    config = inject(ConfigService);

    constructor() {
      effect(() => {
        console.log('Insegnanti data:', this.config.insegnanti());
        console.log('Is Loading:', this.config.isLoading());
        console.log('Full config:', this.config.fullConfig());
      });
    }
}


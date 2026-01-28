import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../services/config.service';
import { Progetto } from '../../models/site-config.model';

@Component({
    selector: 'app-progetti',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './progetti.component.html',
    styleUrl: './progetti.component.css'
})
export class ProgettiComponent {
    config = inject(ConfigService);
    selectedProject = signal<Progetto | null>(null);

    openLightbox(progetto: Progetto) {
        this.selectedProject.set(progetto);
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        this.selectedProject.set(null);
        document.body.style.overflow = '';
    }
}

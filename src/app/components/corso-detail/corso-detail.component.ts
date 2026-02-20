import { Component, inject, computed, signal, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { ConfigService } from '../../services/config.service';
import { Corso } from '../../models/site-config.model';

@Component({
    selector: 'app-corso-detail',
    standalone: true,
    imports: [CommonModule, MarkdownComponent],
    templateUrl: './corso-detail.component.html',
    styleUrl: './corso-detail.component.css'
})
export class CorsoDetailComponent implements OnInit, AfterViewInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    config = inject(ConfigService);

    corsoId = signal<string>('');
    corso = computed<Corso | null>(() => {
        const id = this.corsoId();
        if (!id) return null;
        return this.config.getCorsoById(id) ?? null;
    });

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.corsoId.set(params.get('id') ?? '');
        });
    }

    ngAfterViewInit() {
        // Scroll to top after the view has been fully rendered
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }

    tornaAiCorsi() {
        this.router.navigate(['/']).then(() => {
            setTimeout(() => {
                const el = document.getElementById('corsi');
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    }
}

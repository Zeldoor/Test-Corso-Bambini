import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    private router = inject(Router);
    mobileOpen = signal(false);

    navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'corsi', label: 'I Corsi' },
        { id: 'insegnanti', label: 'Insegnanti' },
        { id: 'progetti', label: 'Progetti' },
        { id: 'contatto', label: 'Contattaci' }
    ];

    toggleMobile() {
        this.mobileOpen.update(v => !v);
    }

    scrollTo(event: Event, elementId: string) {
        event.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
            // We're on the home page, just scroll
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            // We're on a sub-page (e.g. course detail), navigate home first
            this.router.navigate(['/']).then(() => {
                setTimeout(() => {
                    const el = document.getElementById(elementId);
                    if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 150);
            });
        }
    }
}

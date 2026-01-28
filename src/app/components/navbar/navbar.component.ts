import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {
    mobileOpen = signal(false);

    navLinks = [
        { id: 'home', label: 'Home' },
        { id: 'info', label: 'Il Corso' },
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
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

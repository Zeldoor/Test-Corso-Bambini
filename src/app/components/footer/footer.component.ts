import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { ConfigService } from '../../services/config.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [CommonModule, MarkdownComponent],
    templateUrl:'./footer.component.html',
    styleUrl:'./footer.component.css'
})
export class FooterComponent {
    config = inject(ConfigService);
    currentYear = new Date().getFullYear();
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, MarkdownComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  config = inject(ConfigService);
  private router = inject(Router);

  apriCorso(corsoId: string) {
    this.router.navigate(['/corso', corsoId]);
  }
}

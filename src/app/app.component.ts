import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { InsegnantiComponent } from './components/insegnanti/insegnanti.component';
import { ProgettiComponent } from './components/progetti/progetti.component';
import { ContattoComponent } from './components/contatto/contatto.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HomeComponent,
    InfoComponent,
    InsegnantiComponent,
    ProgettiComponent,
    ContattoComponent,
    FooterComponent
  ],
  templateUrl:'./app.component.html',
  styleUrl:'./app.component.css'
})
export class AppComponent {
  title = 'Corso di Illustrazione per Bambini';
}

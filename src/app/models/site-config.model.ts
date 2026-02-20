// Interface definitions for type safety

export interface Hero {
    titolo: string;
    sottotitolo: string;
    descrizione: string;
}

export interface Corso {
    id: string;
    titolo: string;
    immagine: string;
    colore: string;
    eta: string;
    descrizione: string;
    struttura: string;
    orario: string;
    sede: string;
}

export interface Insegnante {
    nome: string;
    ruolo: string;
    bio: string;
    immagine: string;
}

export interface Progetto {
    immagine: string;
    titolo: string;
    descrizione: string;
}

export interface Contatti {
    telefono: string;
    email: string;
    indirizzo: string;
    instagram: string;
    facebook: string;
    whatsapp: string;
}

export interface SiteConfig {
    hero: Hero;
    corsi: Corso[];
    insegnanti: Insegnante[];
    progetti: Progetto[];
    contatti: Contatti;
}

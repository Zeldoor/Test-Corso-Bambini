// Interface definitions for type safety
export interface Corso {
    titolo: string;
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
}

export interface SiteConfig {
    corso: Corso;
    insegnanti: Insegnante[];
    progetti: Progetto[];
    contatti: Contatti;
}

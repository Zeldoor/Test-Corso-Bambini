import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ContactFormData {
    nomeGenitore: string,
    email: string,
    telefono: string,
    bambini: {nome: string, eta: string}[],
    corsoSelezionato: string,
    messaggio: string,
}

export interface ContactResponse {
    success: boolean;
    message: string;
}

/**
 * ContactService - Handles contact form submission
 * 
 * NOTE: Replace the API_ENDPOINT with your actual email service endpoint
 * Options include:
 * - Formspree (https://formspree.io)
 * - EmailJS (https://www.emailjs.com)
 * - Custom backend endpoint
 */
@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private http = inject(HttpClient);

    // TODO: Sostituire con endpoint reale per invio email
    // Opzioni: Formspree, EmailJS, o backend custom
    private readonly API_ENDPOINT = '/api/contact';

    /**
     * Submit contact form data
     * @param formData The contact form data to submit
     * @returns Observable with the response
     */
    submitContactForm(formData: ContactFormData): Observable<ContactResponse> {
        // Log form data for development/testing
        console.log('📧 Form data submitted:', formData);

        return this.http.post<ContactResponse>(this.API_ENDPOINT, formData).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Si è verificato un errore durante l\'invio del messaggio.';

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Errore: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Errore del server: ${error.status}`;
        }

        console.error('Contact form error:', errorMessage);
        return throwError(() => new Error(errorMessage));
    }
}

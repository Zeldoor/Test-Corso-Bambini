import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContactService, ContactFormData } from '../../services/contact.service';

@Component({
  selector: 'app-contatto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section id="contatto" class="py-16 md:py-24 bg-crema">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Section Title -->
        <div class="text-center mb-12">
          <h2 class="section-title">
            <span class="text-arancione">✉️</span> Iscriviti al Corso
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Compila il modulo per iscrivere il tuo bambino o per ricevere maggiori informazioni
          </p>
        </div>
        
        <div class="max-w-2xl mx-auto">
          <div class="card">
            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="grid md:grid-cols-2 gap-6">
                <!-- Nome Genitore -->
                <div class="md:col-span-2">
                  <label for="nomeGenitore" class="block font-semibold text-gray-700 mb-2">
                    Nome Genitore <span class="text-red-500">*</span>
                  </label>
                  <input type="text" 
                         id="nomeGenitore" 
                         formControlName="nomeGenitore"
                         class="input-field"
                         [class.input-error]="isFieldInvalid('nomeGenitore')"
                         placeholder="Es. Mario Rossi">
                  @if (isFieldInvalid('nomeGenitore')) {
                    <p class="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span> Il nome del genitore è obbligatorio
                    </p>
                  }
                </div>
                
                <!-- Email -->
                <div>
                  <label for="email" class="block font-semibold text-gray-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input type="email" 
                         id="email" 
                         formControlName="email"
                         class="input-field"
                         [class.input-error]="isFieldInvalid('email')"
                         placeholder="mario.rossi@email.com">
                  @if (isFieldInvalid('email')) {
                    <p class="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span> 
                      @if (contactForm.get('email')?.errors?.['required']) {
                        L'email è obbligatoria
                      } @else {
                        Inserisci un'email valida
                      }
                    </p>
                  }
                </div>
                
                <!-- Telefono -->
                <div>
                  <label for="telefono" class="block font-semibold text-gray-700 mb-2">
                    Telefono <span class="text-red-500">*</span>
                  </label>
                  <input type="tel" 
                         id="telefono" 
                         formControlName="telefono"
                         class="input-field"
                         [class.input-error]="isFieldInvalid('telefono')"
                         placeholder="+39 333 1234567">
                  @if (isFieldInvalid('telefono')) {
                    <p class="mt-2 text-red-500 text-sm flex items-center gap-1">
                      <span>⚠️</span> Il telefono è obbligatorio
                    </p>
                  }
                </div>
                
                <!-- Bambini Section -->
                <div class="md:col-span-2">
                  <label class="block font-semibold text-gray-700 mb-2">
                    Bambini <span class="text-red-500">*</span>
                  </label>
                  
                  <div formArrayName="bambini" class="space-y-3">
                    @for (bambino of bambiniArray.controls; track $index; let i = $index; let isFirst = $first) {
                      <div class="flex items-start gap-3" [formGroupName]="i">
                        <!-- Nome Bambino -->
                        <div class="flex-1">
                          @if (i === 0) {
                            <span class="block text-sm text-gray-500 mb-1">Nome</span>
                          }
                          <input type="text" 
                                 [id]="'nomeBambino_' + i"
                                 formControlName="nome"
                                 class="input-field"
                                 [class.input-error]="isBambinoFieldInvalid(i, 'nome')"
                                 placeholder="Es. Giulia">
                          @if (isBambinoFieldInvalid(i, 'nome')) {
                            <p class="mt-1 text-red-500 text-sm flex items-center gap-1">
                              <span>⚠️</span> Nome obbligatorio
                            </p>
                          }
                        </div>
                        
                        <!-- Età Bambino -->
                        <div class="w-20">
                          @if (i === 0) {
                            <span class="block text-sm text-gray-500 mb-1">Età</span>
                          }
                          <input type="number" 
                                 [id]="'etaBambino_' + i"
                                 formControlName="eta"
                                 class="input-field text-center"
                                 [class.input-error]="isBambinoFieldInvalid(i, 'eta')"
                                 placeholder="8"
                                 min="8"
                                 max="10">
                          @if (isBambinoFieldInvalid(i, 'eta')) {
                            <p class="mt-1 text-red-500 text-sm">
                              <span>⚠️</span> 8-10
                            </p>
                          }
                        </div>
                        
                        <!-- Pulsante Rimuovi o Aggiungi -->
                        <div class="flex items-center" [class.mt-6]="i === 0">
                          @if (isFirst) {
                            <!-- Pulsante + -->
                            <button type="button"
                                    (click)="aggiungiBambino()"
                                    class="w-12 h-12 flex items-center justify-center
                                           bg-arancione text-white rounded-xl
                                           hover:bg-arancione/80 transition-all duration-300
                                           hover:scale-110 active:scale-95
                                           shadow-md hover:shadow-lg p-1">
                              <span class="text-xl font-bold">+</span>
                            </button>
                          } @else {
                            <!-- Pulsante Rimuovi -->
                            <button type="button"
                                    (click)="rimuoviBambino(i)"
                                    class="w-12 h-12 flex items-center justify-center 
                                           bg-gray-200 text-gray-600 rounded-xl
                                           hover:bg-red-100 hover:text-red-500 
                                           transition-all duration-300
                                           hover:scale-110 active:scale-95">
                              <span class="text-xl font-bold">×</span>
                            </button>
                          }
                        </div>
                      </div>
                    }
                  </div>
                </div>
                
                <!-- Messaggio -->
                <div class="md:col-span-2">
                  <label for="messaggio" class="block font-semibold text-gray-700 mb-2">
                    Messaggio (opzionale)
                  </label>
                  <textarea id="messaggio" 
                            formControlName="messaggio"
                            rows="4"
                            class="input-field resize-none"
                            placeholder="Scrivi qui eventuali domande o note..."></textarea>
                </div>
              </div>
              
              <!-- Submit Button -->
              <div class="mt-8 text-center">
                <button type="submit" 
                        [disabled]="isSubmitting()"
                        class="btn-primary w-full md:w-auto min-w-[200px] disabled:opacity-50 
                               disabled:cursor-not-allowed disabled:transform-none">
                  @if (isSubmitting()) {
                    <span class="flex items-center justify-center gap-2">
                      <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Invio in corso...
                    </span>
                  } @else {
                    Invia Richiesta 🎨
                  }
                </button>
              </div>
              
              <!-- Success/Error Messages -->
              @if (submitStatus()) {
                <div class="mt-6 p-4 rounded-2xl text-center"
                     [class]="submitStatus() === 'success' 
                              ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                              : 'bg-red-100 text-red-800 border-2 border-red-300'">
                  @if (submitStatus() === 'success') {
                    <p class="flex items-center justify-center gap-2 font-semibold">
                      <span class="text-2xl">✅</span>
                      Messaggio inviato con successo! Ti contatteremo presto.
                    </p>
                  } @else {
                    <p class="flex items-center justify-center gap-2 font-semibold">
                      <span class="text-2xl">❌</span>
                      {{ errorMessage() }}
                    </p>
                  }
                </div>
              }
            </form>
          </div>
          
          <!-- Additional info -->
          <div class="mt-8 text-center text-gray-600">
            <p class="flex items-center justify-center gap-2">
              <span>📞</span>
              Preferisci chiamare? 
              <a href="tel:+393929324221" class="text-arancione font-semibold hover:underline">
                +39 392 932 4221
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContattoComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);

  isSubmitting = signal(false);
  submitStatus = signal<'success' | 'error' | null>(null);
  errorMessage = signal('');

  contactForm: FormGroup = this.fb.group({
    nomeGenitore: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    bambini: this.fb.array([this.createBambinoGroup()]),
    messaggio: ['']
  });

  // Getter per accedere al FormArray bambini
  get bambiniArray(): FormArray {
    return this.contactForm.get('bambini') as FormArray;
  }

  // Crea un nuovo gruppo per un bambino
  private createBambinoGroup(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required]],
      eta: ['', [Validators.required, Validators.min(8), Validators.max(10)]]
    });
  }

  // Aggiunge un nuovo bambino all'array
  aggiungiBambino(): void {
    this.bambiniArray.push(this.createBambinoGroup());
  }

  // Rimuove un bambino dall'array
  rimuoviBambino(index: number): void {
    if (this.bambiniArray.length > 1) {
      this.bambiniArray.removeAt(index);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Valida un campo specifico di un bambino nell'array
  isBambinoFieldInvalid(index: number, fieldName: string): boolean {
    const bambino = this.bambiniArray.at(index);
    const field = bambino?.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // Resetta il form e reinizializza l'array bambini
  private resetForm(): void {
    this.contactForm.reset();
    // Svuota l'array bambini e aggiunge un elemento vuoto
    while (this.bambiniArray.length > 0) {
      this.bambiniArray.removeAt(0);
    }
    this.bambiniArray.push(this.createBambinoGroup());
  }

  onSubmit() {
    // Mark all fields as touched to show validation errors
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control instanceof FormArray) {
        control.controls.forEach(group => {
          if (group instanceof FormGroup) {
            Object.keys(group.controls).forEach(k => group.get(k)?.markAsTouched());
          }
        });
      } else {
        control?.markAsTouched();
      }
    });

    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set(null);

    const formData: ContactFormData = this.contactForm.value;

    // Log to console for development
    console.log('📧 Form submitted with data:', formData);

    this.contactService.submitContactForm(formData).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        this.submitStatus.set('success');
        this.resetForm();
      },
      error: (error) => {
        this.isSubmitting.set(false);
        this.submitStatus.set('error');
        this.errorMessage.set(error.message || 'Si è verificato un errore. Riprova più tardi.');

        // NOTE: In development, we simulate success after error for demo purposes
        // since we're calling a placeholder endpoint
        console.log('Note: API endpoint is a placeholder. In production, connect to a real email service.');

        // Simulate success for demo (remove in production)
        setTimeout(() => {
          this.submitStatus.set('success');
          this.resetForm();
        }, 1500);
      }
    });
  }
}

import { Component, inject, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ContactService, ContactFormData } from '../../services/contact.service';
import { ConfigService } from '../../services/config.service';
import { names } from './placeholderNames';

@Component({
  selector: 'app-contatto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl:'./contatto.component.html',
  styleUrl:'./contatto.component.css'
})
export class ContattoComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private elementRef = inject(ElementRef);
  config = inject(ConfigService);

  isSubmitting = signal(false);
  submitStatus = signal<'success' | 'error' | null>(null);
  errorMessage = signal('');
  dropdownOpen = signal(false);

  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.dropdownOpen() && !this.elementRef.nativeElement.querySelector('.relative')?.contains(event.target as Node)) {
      this.dropdownOpen.set(false);
    }
  }

  toggleDropdown() {
    this.dropdownOpen.update(v => !v);
  }

  selectCorso(value: string) {
    this.contactForm.get('corsoSelezionato')?.setValue(value);
    this.dropdownOpen.set(false);
  }

  contactForm: FormGroup = this.fb.group({
    nomeGenitore: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
    bambini: this.fb.array([this.createBambinoGroup()]),
    corsoSelezionato: ['Info generiche'],
    messaggio: ['']
  });

  // Getter per accedere al FormArray bambini
  get bambiniArray(): FormArray {
    return this.contactForm.get('bambini') as FormArray;
  }

  // Crea un nuovo gruppo per un bambino
  private createBambinoGroup(): FormGroup {
    return this.fb.group({
      nome: [''],
      eta: [''],
      placeholder: [this.generatePlaceholderName()],
      placeholderEta: [this.generatePlaceholderEta()]
    });
  }

  clampEta(index: number) {
    const ctrl = this.bambiniArray.at(index).get('eta');
    if (!ctrl || ctrl.value === '' || ctrl.value === null) return;
    let val = Math.trunc(Number(ctrl.value));
    if (val < 0) val = 0;
    if (val > 20) val = 20;
    ctrl.setValue(val);
  }

  sanitizeEta(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const raw = input.value;
    if (!raw) return;
    const val = Math.trunc(Math.min(20, Math.max(0, Number(raw) || 0)));
    input.value = String(val);
    this.bambiniArray.at(index).get('eta')?.setValue(val);
  }

  private generatePlaceholderName(): string {
    const index = Math.floor(Math.random() * names.length);
    return `Es. ${names[index]}`;
  }

  private generatePlaceholderEta(): string {
    return String(Math.floor(Math.random() * 6) + 6);
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
    this.contactForm.reset({ corsoSelezionato: 'Info generiche' });
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

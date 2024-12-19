import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage = signal<string>("");

  constructor() { }

  setError(error: string, timeout: number = 5000) {
    this.errorMessage.set(error);
  }

  getErrorSignal() {
    return this.errorMessage();
  }

  clearError() {
    this.errorMessage.set("");
  }
}
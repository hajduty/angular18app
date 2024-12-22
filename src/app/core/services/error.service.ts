import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  errorMessage = signal<string>("");
  isErrorVisible = signal<boolean>(false);

  constructor() { }

  setError(error: string, timeout: number = 5000) {
    this.errorMessage.set(error);
    this.isErrorVisible.set(true);

    setTimeout(() => {
      this.isErrorVisible.set(false);
      setTimeout(() => this.clearError(), 1000);
    }, timeout);
  }

  getErrorSignal() {
    return this.errorMessage();
  }

  clearError() {
    this.errorMessage.set("");
    this.isErrorVisible.set(false);
  }
}
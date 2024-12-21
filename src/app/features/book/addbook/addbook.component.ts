import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { BookComponent } from '../book.component';
import { AuthService } from '../../../core/services/auth.service';
import { ErrorService } from '../../../core/services/error.service';

// @ts-ignore
const $: any = window['$']
@Component({
  selector: 'app-addbook',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddbookComponent {
  constructor(private bookService: BookService, private bookComponent: BookComponent,
    private changeDetectorRef: ChangeDetectorRef, private authService: AuthService, private errorService: ErrorService) { }

  @ViewChild('modal') modal?: ElementRef;
  @ViewChild('bookForm') bookForm!: NgForm;
  @Input() mode: 'add' | 'edit' = 'add';

  isModalVisible: boolean = false;
  currentYear: number = new Date().getFullYear();

  book: Book = {
    author: '',
    title: '',
    released: 0,
    description: '',
    id: 0
  };

  async submitForm(): Promise<void> {
    if (this.bookForm.form.valid) {
      const bookCopy = { ...this.book };
      if (this.mode === 'add') {
        const book = await this.bookService.addBook(bookCopy);
        if (book != null) {
          this.bookComponent.addBook(book);
        } else {
          this.errorService.setError('Error adding obok!');
        }
      } else {
        const editedBook = await this.bookService.editBook(bookCopy);
        if (editedBook) {
          this.bookComponent.editBook(bookCopy);
        } else {
          this.errorService.setError('Error editing book!');
        }
      }

      this.bookForm.resetForm();
      this.closeModal();
    }
  }


  openModal(bookToEdit?: Book) {
    this.clearModal();
    if (!this.authService.isAuthenticated()) {
      this.errorService.setError('You need to be logged in do to this!');
      return;
    }
    if (bookToEdit) {
      this.mode = 'edit';
      this.book = {
        id: bookToEdit.id,
        author: bookToEdit.author,
        title: bookToEdit.title,
        released: bookToEdit.released,
        description: bookToEdit.description
      };
    } else {
      this.mode = 'add';
    }

    this.isModalVisible = true;
    this.changeDetectorRef.detectChanges();
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal() {
    this.isModalVisible = false;
    $(this.modal?.nativeElement).modal('hide');
  }

  clearModal() {
    this.book = {
      id: 0,
      author: "",
      title: "",
      released: 2024,
      description: ""
    };
  }
}

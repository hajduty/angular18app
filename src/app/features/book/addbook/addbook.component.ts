import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Book } from '../../../core/models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { BookService } from '../../../core/services/book.service';
import { BookComponent } from '../book.component';

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
  constructor(private bookService: BookService, private bookComponent: BookComponent, private changeDetectorRef: ChangeDetectorRef) { }

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
      if (this.mode === 'add') {
        if (await this.bookService.addBook(this.book)) {
          this.bookComponent.addBook(this.book);
        }

      } else {
        if (await this.bookService.editBook(this.book)) {
          this.bookComponent.editBook(this.book);
        }
      }
      this.closeModal();
    }
  }

  openModal(bookToEdit?: Book) {
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
    this.bookForm.resetForm();
  }

  closeModal() {
    this.isModalVisible = false;
    $(this.modal?.nativeElement).modal('hide');
  }
}

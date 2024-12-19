import { Component, ViewChild } from '@angular/core';
import { Book } from '../../core/models/book.model';
import { BookService } from '../../core/services/book.service';
import { CommonModule } from '@angular/common';
import { AddbookComponent } from "./addbook/addbook.component";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, AddbookComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  @ViewChild(AddbookComponent) modal?: AddbookComponent;

  openAddModal() {
    this.modal?.openModal();
  }

  openEditModal(book: Book) {
    this.modal?.openModal(book);
  }

  addBook(book: Book) {
    this.books.push(book);
  }

  editBook(updatedBook: Book) {
    const index = this.books.findIndex(book => book.id === updatedBook.id);
    if (index !== -1) {
      this.books[index] = { ...updatedBook };
    }
  }

  async ngOnInit(): Promise<void> {
    this.repopulateBooks();
  }

  async removeBook(book: Book) {
    if (await this.bookService.deleteBook(book)) {
      this.repopulateBooks();
    }
  }

  async repopulateBooks() {
    await this.bookService.populateBooks();
    this.books = this.bookService.getBooks();
  }
}

import { Routes } from '@angular/router';
import { BookComponent } from './features/book/book.component';

export const routes: Routes = [
    { path: "", redirectTo: "/book", pathMatch: "full"},
    { path: 'book', component: BookComponent }
];

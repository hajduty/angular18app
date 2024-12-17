import { Routes } from '@angular/router';
import { BookComponent } from './features/book/book.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
    { path: "", redirectTo: "/book", pathMatch: "full"},
    { path: 'book', component: BookComponent },
    { path: 'login', component: LoginComponent }
];

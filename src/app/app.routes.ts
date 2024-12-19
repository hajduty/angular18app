import { Routes } from '@angular/router';
import { BookComponent } from './features/book/book.component';
import { LoginComponent } from './features/login/login.component';
import { QuoteComponent } from './features/quote/quote.component';

export const routes: Routes = [
    { path: "", redirectTo: "/books", pathMatch: "full" },
    { path: 'books', component: BookComponent },
    { path: 'login', component: LoginComponent },
    { path: 'quotes', component: QuoteComponent }
];

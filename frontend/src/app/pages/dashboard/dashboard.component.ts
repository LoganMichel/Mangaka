import {Component, OnInit} from '@angular/core';
import {BreadcrumbComponent} from "../../components/breadcrumb/breadcrumb.component";
import {NgForOf} from "@angular/common";
import {Book} from "../../models/book";

@Component({
  selector: 'app-dashboard',
  imports: [
    BreadcrumbComponent,
    NgForOf,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  title?: string | undefined;
  public books: Book[] = [];
  constructor() {
    // @TODO Aller chercher les données dans la BDD backend
    this.books = [
      {
        title: "Fairy Tail",
        cover: "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
        scan_nb: 27,
        book_nb: 3,
        progress: 45
      },
      {
        title: "Naruto",
        cover: "https://cdn.myanimelist.net/images/manga/3/249658.jpg",
        scan_nb: 12,
        book_nb: 0,
        progress: 100
      },
      {
        title: "Demon Slayer",
        cover: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        scan_nb: 16,
        book_nb: 7,
        progress: 2
      },
      ];
  }
  ngOnInit(): void {
    this.title = "Ma collection de manga";
  }
}

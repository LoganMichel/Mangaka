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
        number: 27,
        progress: 45
      },
      {
        title: "Naruto",
        cover: "https://cdn.myanimelist.net/images/manga/3/249658.jpg",
        number: 12,
        progress: 100
      },
      {
        title: "Demon Slayer",
        cover: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        number: 3,
        progress: 2
      },
      ];
  }
  ngOnInit(): void {
    this.title = "Ma collection de manga";
  }
}

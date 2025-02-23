import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbComponent} from "../../../components/breadcrumb/breadcrumb.component";
import {Manga} from '../../../models/manga';
import {NgForOf} from '@angular/common';
import {environment} from '../../../../environments/environment';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [
    BreadcrumbComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  @Input() id: number | undefined;
  title?: string;
  breadcrumb: { [key: string]: string } = {};
  protected manga: Manga | undefined

  constructor() {
    // @TODO Aller chercher les données dans la BDD backend based on the id in the URL
    this.manga = {
      id: 1,
      title: "Fairy Tail",
      cover: "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
      scan_nb: 27,
      book_nb: 3,
      progress: 45,
      books: [
        {
          id: 1,
          title: "Fairy Tail - Tome 1",
          cover: "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
          scan: true,
          book: true,
          progress: 0,
          number: 1,
          file: ""
        },
        {
          id: 2,
          title: "Fairy Tail - Tome 2",
          cover: "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
          scan: true,
          book: false,
          progress: 0,
          number: 2,
          file: ""
        }
      ]
    };
    this.title = this.manga.title;
  }

  ngOnInit(): void {
    this.breadcrumb = {
      ['/manga/' + this.manga?.id + '/list']: this.manga?.title || ''
    };
  }


  protected readonly environment = environment;
}

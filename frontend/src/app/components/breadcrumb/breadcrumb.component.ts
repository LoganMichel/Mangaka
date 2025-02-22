import {Component, Input} from '@angular/core';
import {KeyValuePipe, NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [
    NgForOf,
    RouterLink,
    KeyValuePipe
  ],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  @Input() data: { [key: string]: string } = {};
}

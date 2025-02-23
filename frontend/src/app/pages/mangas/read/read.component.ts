import {Component, HostListener, Input, OnInit, signal} from '@angular/core';
import {BreadcrumbComponent} from '../../../components/breadcrumb/breadcrumb.component';
import {Manga} from '../../../models/manga';
import {Book} from '../../../models/book';
import {environment} from '../../../../environments/environment';
import JSZip from 'jszip';
import {Router} from '@angular/router';

@Component({
  selector: 'app-read',
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit {
  breadcrumb: { [key: string]: string } = {};
  @Input() id: number | undefined;
  @Input() bookid: number | undefined;
  title?: string;
  protected manga: Manga | undefined;
  protected book: Book | undefined;
  images = signal<string[]>([]);
  currentPage = signal(0);
  error = signal<string>('');
  isLoading = signal(true);
  showControls = signal(true);
  controlsTimeout: any;

  constructor(private router: Router) {
    // Écouter le scroll pour mettre à jour la page courante
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    // @TODO Aller chercher les données dans la BDD backend based on the id in the URL
    this.manga = {
      id: 1,
      title: "Fairy Tail",
      cover: "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
      scan_nb: 27,
      book_nb: 3,
      progress: 45,
      books: []
    };
    this.book = {
      id: 2,
      title: "Fairy Tail - Tome 2",
      cover: "https://cdn.myanimelist.net/images/anime/5/18179.jpg",
      scan: true,
      book: false,
      progress: 0,
      number: 2,
      file: environment.CBZ_TEST_URL
    };
    this.title = this.book.title;
  }

  async ngOnInit() {
    this.breadcrumb = {
      ['/manga/' + this.manga?.id + '/list']: this.manga?.title || '',
      ['/manga/' + this.manga?.id + '/' + this.book?.id + '/read']: this.title || ''
    };

    await this.loadBook();
  }

  private handleScroll = () => {
    if (typeof window === 'undefined') return;

    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const images = document.querySelectorAll('img');

    images.forEach((img, index) => {
      const rect = img.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= windowHeight) {
        this.currentPage.set(index);
      }
    });
  }

  handleMouseMove() {
    this.setControlsVisibility(true);
  }

  setControlsVisibility(visible: boolean) {
    clearTimeout(this.controlsTimeout);
    this.showControls.set(visible);

    if (visible) {
      this.controlsTimeout = setTimeout(() => {
        this.showControls.set(false);
      }, 2000);
    }
  }

  private async fetchFileAsArrayBuffer(filePath: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.arrayBuffer();
    } catch (error) {
      throw new Error(`Erreur lors du chargement du fichier: ${this.error}`);
    }
  }

  async loadBook() {
    if (!this.book?.file) {
      this.error.set('Aucun fichier spécifié');
      return;
    }

    try {
      this.isLoading.set(true);
      const arrayBuffer = await this.fetchFileAsArrayBuffer(this.book.file);

      const zip = new JSZip();
      const zipContent = await zip.loadAsync(arrayBuffer, {
        optimizedBinaryString: true
      });

      const imageFiles = Object.values(zipContent.files).filter(file =>
        !file.dir && /\.(jpg|jpeg|png|gif)$/i.test(file.name)
      );

      imageFiles.sort((a, b) => a.name.localeCompare(b.name));

      const imageUrls = await Promise.all(
        imageFiles.map(async (file) => {
          const blob = await file.async('blob');
          return URL.createObjectURL(blob);
        })
      );

      if (imageUrls.length === 0) {
        throw new Error('Aucune image trouvée dans le fichier CBZ');
      }

      this.images.set(imageUrls);
      this.currentPage.set(0);
      this.error.set('');
    } catch (error) {
      this.error.set(`Erreur lors de la lecture du fichier CBZ: ${this.error}`);
      this.images.set([]);
      this.currentPage.set(0);
    } finally {
      this.isLoading.set(false);
    }
  }

  handleImageLoad() {
    // Mettre à jour le scroll si nécessaire
    this.handleScroll();
  }

  exitFullscreen() {
    this.router.navigate(['/manga/' +this.manga?.id + '/list']);
    // Ici vous pouvez implémenter la logique pour quitter le mode plein écran
    // Par exemple, émettre un événement ou naviguer vers une autre route
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    // Optionnel : Ajouter des raccourcis clavier
    switch(event.key) {
      case 'Escape':
        this.exitFullscreen();
        break;
    }
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.images().forEach(url => URL.revokeObjectURL(url));
    clearTimeout(this.controlsTimeout);
  }
}

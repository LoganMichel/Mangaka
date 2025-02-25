import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [
    BreadcrumbComponent,
    ReactiveFormsModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  title = 'Mon compte';
  breadcrumb: { [key: string]: string } = {};
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      username: [''],
      databaseUrl: ['']
    });
  }

  ngOnInit(): void {
    this.breadcrumb = {
      '/account/profile': 'Mon compte'
    };
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
      // Ici, vous pourrez ajouter la logique pour sauvegarder les modifications
    }
  }
}

import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { SpinnerService } from './shared/services/spinner.service';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly currentYear = new Date().getFullYear();
  public spinnerService: SpinnerService = inject(SpinnerService);
}

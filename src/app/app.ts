import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; // Add these

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet], // Add these to imports
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App { }
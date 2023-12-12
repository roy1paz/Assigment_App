import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Assignment.Client';
  
  menuItems: MenuItem[] = [
    {
      label: 'Assignments',
      icon: 'pi pi-list',
      routerLink: ['/assignments'],
      routerLinkActiveOptions: { exact: true },
    },
  ];
  
}

import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNoteView = true;
  constructor(private routerService: RouterService) {
  }

  switchToNoteView() {
    this.routerService.routeToNoteView();
    this.isNoteView = true;
  }

  switchToListView() {
    this.routerService.routeToListView();
    this.isNoteView = false;
  }
}

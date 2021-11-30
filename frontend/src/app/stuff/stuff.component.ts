import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../_services/state.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-stuff',
  templateUrl: './stuff.component.html',
  styleUrls: ['./stuff.component.scss']
})
export class StuffComponent implements OnInit, OnDestroy {

  //Déclaration de composants
  constructor(private state: StateService,
              private auth: AuthService) { }

  ngOnInit() {}

  ngOnDestroy() {
  }
}
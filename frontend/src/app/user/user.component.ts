import { Component } from '@angular/core';
import { StateService } from '../_services/state.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  //Déclaration des composants 
  constructor(private state: StateService,
    private auth: AuthService) { }

}
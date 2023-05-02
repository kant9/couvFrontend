import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SocketioService } from './services/socketio.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'SerreFront';
  showLogin: boolean = false;
  localStatus = localStorage.getItem('currentUser');
  constructor(private auth: UserService, private router: Router, private http: HttpClient, private socketService: SocketioService) {

    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/login' || event.url === '/') {
          this.showLogin = true;
        } else {
          this.showLogin = false;
          // setTimeout(()=>{
          //   if(!this.localStatus){
          //     window.location.pathname=''
          //   } 
          // }, 1000);
          
        }
      }
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.socketService.setupSocketConnection();
  }

}

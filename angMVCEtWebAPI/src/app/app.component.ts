import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [HttpClientModule, FormsModule]
})
export class AppComponent {
  result: string = '';
  private readonly baseUrl: string = 'https://localhost:7236/api/Account';

  registerData = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  private async callApi(endpoint: string, headers?: HttpHeaders) {
    try {
      let options = headers ? { headers } : {};
      let data = await lastValueFrom(this.http.get<any>(`${this.baseUrl}/${endpoint}`, options));
      this.result = JSON.stringify(data, null, 2);
    } catch (error: any) {
      this.result = 'Erreur: ' + error.message;
    }
  }

  testPublic() {
    this.callApi('PublicTest');
  }

  testPrivate() {
    let token = sessionStorage.getItem("token");
    if (token) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.callApi('PrivateTest', headers);
    } else {
      this.result = 'Erreur: Vous devez être connecté pour accéder à cette ressource';
    }
  }

  async register() {
    try {
      let data = await lastValueFrom(this.http.post<any>(`${this.baseUrl}/Register`, this.registerData));
      console.log(data);
      this.result = 'Enregistrement réussi';
    } catch (error : any) {
      this.result = 'Erreur: ' + error.message;
    }
  }

  async login() {
    try {
      let data = await lastValueFrom(this.http.post<any>(`${this.baseUrl}/Login`, this.loginData));
      console.log(data);
      sessionStorage.setItem("token", data.token);
      this.result = 'Connexion réussie';
    } catch (error : any) {
      this.result = 'Erreur: ' + error.message;
    }
  }

  logout() {
    sessionStorage.removeItem("token");
    this.result = 'Déconnexion réussie';
  }

}

// Bootstrap the application
bootstrapApplication(AppComponent);
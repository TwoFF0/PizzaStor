import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css'],
})
export class TestErrorsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {}

  get404() {
    this.httpClient.get(this.baseUrl + 'buggy/not-found').subscribe(
      (x) => {
        console.log(x);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get401() {
    this.httpClient.get(this.baseUrl + 'buggy/auth').subscribe(
      (x) => {
        console.log(x);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400() {
    this.httpClient.get(this.baseUrl + 'buggy/bad-request').subscribe(
      (x) => {
        console.log(x);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get500() {
    this.httpClient.get(this.baseUrl + 'buggy/server-error').subscribe(
      (x) => {
        console.log(x);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get400Validation() {
    this.httpClient.post(this.baseUrl + 'account/register', {}).subscribe(
      (x) => {
        console.log(x);
      },
      (error) => {
        console.log(error);
        this.validationErrors = error;
      }
    );
  }
}

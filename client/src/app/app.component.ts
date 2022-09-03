import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'client';
  pizzas$: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getPizzas();
  }

  getPizzas() {
    this.httpClient.get("https://localhost:5001/api/pizzas")
    .subscribe
    (resp => { this.pizzas$ = resp; },
      err => {console.log(err)})
  };
}

export interface IPizza
{
  id: number
  name: string
}

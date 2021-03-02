import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  imag1: string;
  imag2: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tiles: Tile[] = [
    {imag1: 'assets/img/footer/facebook_logo.png', imag2:'assets/img/footer/twitter_logo.png', text:'Social', cols: 1, rows: 1, color: 'white'},
    {imag1: 'assets/img/footer/facebook_logo.png', imag2:'assets/img/footer/twitter_logo.png', text:'About us', cols: 1, rows: 1, color: 'white'},
    {imag1: 'assets/img/footer/facebook_logo.png', imag2:'assets/img/footer/twitter_logo.png', text:'About us', cols: 1, rows: 1, color: 'white'},
    {imag1: 'assets/img/footer/facebook_logo.png', imag2:'assets/img/footer/twitter_logo.png', text:'About us', cols: 1, rows: 1, color: 'white'},

  ];
}

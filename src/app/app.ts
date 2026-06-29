import { Component, signal } from '@angular/core';
import { Cancha } from "./components/cancha/cancha";
import { BancoSuplentes } from "./components/banco-suplentes/banco-suplentes";

@Component({
  selector: 'app-root',
  imports: [Cancha, BancoSuplentes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('scaloneta-app');
}

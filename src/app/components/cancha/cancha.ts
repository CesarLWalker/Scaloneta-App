import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../../services/equipo';
import { Jugador } from '../../models/jugador';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cancha',
  imports: [CommonModule],
  templateUrl: './cancha.html',
  styleUrl: './cancha.css',
})
export class Cancha implements OnInit{
  titulares: Jugador[] = [];

  get arquero() {
    return this.titulares.filter(j => j.posicion === 'POR');
  }

  get defensores() {
    return this.titulares.filter(j => j.posicion === 'DEF');
  }

  get mediocampistas() {
    return this.titulares.filter(j => j.posicion === 'MED');
  }

  get delanteros() {
    return this.titulares.filter(j => j.posicion === 'DEL');
  }

  constructor(private equipoService: EquipoService) {}

  ngOnInit(): void {
    // Escuchamos los cambios en tiempo real
    this.equipoService.jugadores$.subscribe(jugadores => {
      this.titulares = jugadores.filter(j => j.esTitular);
    });
  }

  mandarAlBanco(id: number) {
    this.equipoService.cambiarEstadoTitular(id, false);
  }

  moverEnLinea(id: number, direccion: 'izq' | 'der', evento: Event) {
    evento.stopPropagation(); // Evitamos que el clic mande al jugador al banco
    this.equipoService.moverHorizontal(id, direccion);
  }

}

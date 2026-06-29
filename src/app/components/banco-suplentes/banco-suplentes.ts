import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../models/jugador';
import { EquipoService } from '../../services/equipo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banco-suplentes',
  imports: [CommonModule],
  templateUrl: './banco-suplentes.html',
  styleUrl: './banco-suplentes.css',
})
export class BancoSuplentes implements OnInit {
  suplentes: Jugador[] = [];

  constructor(private equipoService: EquipoService) {}

  ngOnInit(): void {
    // Escuchamos los cambios y filtramos los que NO son titulares
    this.equipoService.jugadores$.subscribe(jugadores => {
      this.suplentes = jugadores
      .filter(j => !j.esTitular)
      .sort((a,b) => a.numero - b.numero); // Ordena de menor a mayor
    });
  }

  // Esta función se ejecuta al hacer clic en un botón en el HTML
  mandarALaCancha(id: number) {
    this.equipoService.cambiarEstadoTitular(id, true);
  }
}

import { Component, OnInit } from '@angular/core';
import { EquipoService } from '../../services/equipo';
import { Jugador } from '../../models/jugador';
import { CommonModule } from '@angular/common';
import { CdkDragEnd, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cancha',
  imports: [CommonModule, DragDropModule],
  templateUrl: './cancha.html',
  styleUrl: './cancha.css',
})
export class Cancha implements OnInit{
guardarPosicion($event: CdkDragEnd<any>,_t15: Jugador) {
throw new Error('Method not implemented.');
}
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

  mandarAlBanco(id: number, evento: Event) {
    evento.stopPropagation(); // Evita que Angular CDK intente arrastrar

    // Lo sacamos de la cancha
    this.equipoService.cambiarEstadoTitular(id, false);

    // Reseteamos sus coordenadas para cuando vuelva a entrar en el futuro
    this.equipoService.actualizarCoordenadas(id, 0, 0);
  }

  actualizarCoordenadas(id: number, evento: Event) {
    
  }


}

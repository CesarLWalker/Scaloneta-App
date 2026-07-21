import { Jugador } from './../models/jugador';
import { Injectable } from '@angular/core';
import { BehaviorSubject, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  actualizarCoordenadas(id: number, arg1: number, arg2: number) {
    throw new Error('Method not implemented.');
  }
  // Base de datos temporal (Mock)
  private mockJugadores: Jugador[] = [
    { id: 1, nombre: 'Emiliano', apellido: 'Martínez', numero: 23, posicion: 'POR', esTitular: true },
    { id: 2, nombre: 'Cristian', apellido: 'Romero', numero: 13, posicion: 'DEF', esTitular: true },
    { id: 3, nombre: 'Lionel', apellido: 'Messi', numero: 10, posicion: 'DEL', esTitular: true },
    { id: 4, nombre: 'Julián', apellido: 'Álvarez', numero: 9, posicion: 'DEL', esTitular: false },
    { id: 5, nombre: 'Lautaro', apellido: 'Martínez', numero: 22, posicion: 'DEL', esTitular: true },
    { id: 6, nombre: 'Rodrigo', apellido: 'De Paul', numero: 7, posicion: 'MED', esTitular: true },
    { id: 7, nombre: 'Alexis', apellido: 'Mac Allister', numero: 20, posicion: 'MED', esTitular: true },
    { id: 8, nombre: 'Leandro', apellido: 'Paredes', numero: 5, posicion: 'MED', esTitular: true },
    { id: 9, nombre: 'Nicolás', apellido: 'Tagliafico', numero: 3, posicion: 'DEF', esTitular: true },
    { id: 10, nombre: 'Gonzalo', apellido: 'Montiel', numero: 4, posicion: 'DEF', esTitular: true },
    { id: 11, nombre: 'Lisandro', apellido: 'Martínez', numero: 6, posicion: 'DEF', esTitular: true },
    { id: 12, nombre: 'Thiago', apellido: 'Almada', numero: 16, posicion: 'DEL', esTitular: true },
    { id: 13, nombre: 'Valentín', apellido: 'Barco', numero: 8, posicion: 'MED', esTitular: false },
    { id: 14, nombre: 'Nicolás', apellido: 'González', numero: 15, posicion: 'DEL', esTitular: false },
    { id: 15, nombre: 'Giuliano', apellido: 'Simeone', numero: 17, posicion: 'DEL', esTitular: false },
    { id: 16, nombre: 'José', apellido: 'López', numero: 21, posicion: 'DEL', esTitular: false },
    { id: 17, nombre: 'Enzo', apellido: 'Fernández', numero: 24, posicion: 'MED', esTitular: false },
    { id: 18, nombre: 'Giovanni', apellido: 'Lo Celso', numero: 11, posicion: 'MED', esTitular: false },
    { id: 19, nombre: 'Nicolás', apellido: 'Paz', numero: 18, posicion: 'MED', esTitular: false },
    { id: 20, nombre: 'Exequiel', apellido: 'Palacios', numero: 14, posicion: 'MED', esTitular: false },
    { id: 21, nombre: 'Nahuel', apellido: 'Molina', numero: 26, posicion: 'DEF', esTitular: false },
    { id: 22, nombre: 'Marcos', apellido: 'Senesi', numero: 2, posicion: 'DEF', esTitular: false },
    { id: 23, nombre: 'Facundo', apellido: 'Medina', numero: 25, posicion: 'DEF', esTitular: false },
    { id: 24, nombre: 'Nicolás', apellido: 'Otamendi', numero: 19, posicion: 'DEF', esTitular: false },
    { id: 25, nombre: 'Juan', apellido: 'Musso', numero: 1, posicion: 'POR', esTitular: false },
    { id: 26, nombre: 'Gerónimo', apellido: 'Rulli', numero: 12, posicion: 'POR', esTitular: false }
    // ... aquí puedes agregar el resto de los convocados
  ];

  // Estado reactivo
  private jugadoresSubject = new BehaviorSubject<Jugador[]>(this.mockJugadores);
  jugadores$ = this.jugadoresSubject.asObservable();

  constructor() {}

  // Método para hacer cambios (entra/sale un jugador)
  cambiarEstadoTitular(id: number, esTitular: boolean) {
    const jugadoresActualizados = this.mockJugadores.map(jugador =>
      jugador.id === id ? {...jugador, esTitular } : jugador
    );
    this.mockJugadores = jugadoresActualizados;
    this.jugadoresSubject.next(this.mockJugadores);
  }

  // Método principal que llamaremos desde el HTML
  moverHorizontal(id: number, direccion: 'izq' | 'der') {
    const jugador = this.mockJugadores.find(j => j.id === id);
    if (!jugador) return;

    // Buscamos a los compañeros que están en su misma línea y en la cancha
    const companeros = this.mockJugadores.filter(j => j.posicion === jugador.posicion && j.esTitular);
    const indexActual = companeros.findIndex(j => j.id === id);

    // Si movemos a la izquierda y no es el primero de la línea
    if (direccion === 'izq' && indexActual > 0) {
      const idCompanero = companeros[indexActual - 1].id;
      this.intercambiarEnArray(id, idCompanero);
    }
    // Si movemos a la derecha y no es el último de la línea
    else if (direccion === 'der' && indexActual < companeros.length - 1) {
      const idCompanero = companeros[indexActual + 1].id;
      this.intercambiarEnArray(id, idCompanero);
    }
  }

  // Método privado auxiliar para hacer el "swap" (intercambio)
  private intercambiarEnArray(id1: number, id2: number) {
    const index1 = this.mockJugadores.findIndex(j => j.id === id1);
    const index2 = this.mockJugadores.findIndex(j => j.id === id2);

    // Intercambio clásico de variables en JavaScript
    const temp = this.mockJugadores[index1];
    this.mockJugadores[index1] = this.mockJugadores[index2];
    this.mockJugadores[index2] = temp;

    // Avisamos a toda la app que hubo un cambio
    this.jugadoresSubject.next(this.mockJugadores);
  }
}

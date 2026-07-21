export interface Jugador {

    id: number;
    nombre: string;
    apellido: string;
    numero: number;
    posicion: string; // 'POR', 'DEF', 'MED', 'DEL'
    esTitular: boolean;
    coordenadaY: number;
    coordenadaX: number;
}

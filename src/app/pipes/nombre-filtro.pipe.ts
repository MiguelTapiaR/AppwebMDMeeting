import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombreFiltro'
})
export class NombreFiltroPipe implements PipeTransform {

  transform(array: any[], terminoBusqueda: string): unknown {
    if (!array || !terminoBusqueda) {
      return array;
  }
    return array.filter(evento =>

      String(evento.nombre).toLocaleLowerCase().indexOf(terminoBusqueda.toLocaleLowerCase()) !== -1);
}

}

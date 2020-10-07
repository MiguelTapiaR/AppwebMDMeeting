
export interface Evento{
    id?: string;
    descripcion: string;
    fechaFin: number;
    fechaInicio: number;
    idUsuario: string;
    imagenPromocional: string;
    institucionOrganizadora: string;
    linkPaginaEvento: string;
    lugar: string;
    nombre: string;
    nombreCategoriaEN: string;
    nombreCategoriaES: string;
    idCategoria: string;
    nombreTipoEN: string;
    nombreTipoES: string;
    idTipoEvento: string;
    programaActividades: string;
    estadoPublicacion: number;
    fechaCreacion: number;
}

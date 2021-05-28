declare namespace Express {
  export interface User {
    roles: Array<{ rol_id: number; rol: string }>
    usuario_id: string
  }
}

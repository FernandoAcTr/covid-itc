declare namespace Express {
  export interface User {
    roles: Array<{ rol_id: number; rol: string }>
  }
}

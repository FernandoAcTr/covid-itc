# Covid_ITC

Covid_ITC es un proyecto para final de la asignatura Topicos Especializados de Desarrollo Web, de la Ingenieria en Sistemas Computacionales del Instituto Tecnologico de Celaya.  
Covid_ITC es un API REST desarrollado en TypeScript

## Instalacion

Usar el instalador de paquetes de node [npm](https://www.npmjs.com/) para instalar este proyecto.
El API usa el motor de base de datos postgres. Usted debe crear una base de datos llamada covid19_itc en el servidor postgres.

```bash
git clone git@github.com:FernandoAcTr/covid-itc.git
cd covid_itc
npm install
```

Una vez clonado el respositorio debe renombrar el archivo .env.example por .env y modificar los valores con la configuracion de su entorno.
Tambien debe renombrar el archivo ormconfig.json.example por ormconfig.json y modificar los valores para que
coincidan con su entorno de trabajo. Este archivo sirve solamente para desarrollo y no se versiona, funciona solamente como configuracion para typeorm si es que desea correr las migraciones usando el cli de typeorm

```bash
npm run migrations:run
```

Adicionalmente, el proyecto da por hecho que su motor de base de datos tiene el modulo pgcrypto, que utiliza para generar campos uuid. Si no lo tiene puede agregarlo a su motor usando la siguiente sentencia como administrador, dentro de su motor de base de datos postgres. 

```
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

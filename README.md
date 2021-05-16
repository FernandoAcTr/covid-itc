# Covid_ITC

Covid_ITC es un proyecto para final de la asignatura Topicos Especializados de Desarrollo Web, de la Ingenieria en Sistemas Computacionales del Instituto Tecnologico de Celaya.  
Covid_ITC es un API REST desarrollado en TypeScript

## Instalacion

Usar el instalador de paquetes de node [npm](https://www.npmjs.com/) para instalar este proyecto.
El API usa el motor de base de datos mysql. Usted debe crear una base de datos llamada covid_itc en el servidor mysql.

```bash
git clone repository_dir
cd covid_itc
npm install
```

Una vez clonado el respositorio debe renombrar el archivo .env.example por .env y modificar los valores con la configuracion de su entorno.

```bash
npm run migrations:run
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

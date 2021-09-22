# ¡Reclutemos Mutantes! - Prueba técnica MELI

Magneto ha pedido la delicada labor de crear un servidor que tenga la capacidad de identificar mutantes a través de su ADN (DNA) y que siguiendo una estricta secuencia, se puedan identificar claramente y sin errores. 
Aquí toda la propuesta y servicio ya en producción: 


# Tecnologías usadas

Para cumplir con lo solicitado, se ha usado las siguientes tecnologías:

- Lenguaje de backend: *Node.js*
- Tipo de base de datos: *NoSql*
- Gestor de base de datos: *MongoDB*
- ODM para MongoDB: *Mongoose*
- Framework Backend: *Express*
- Middlewares de validaciones: *Joi and Boom*
- Pruebas Unitarias: *Jest & Supertest*
- Otros recursos:
		- Prettier
		- Eslint
		- Nodemon

## Arquitectura de la Aplicación

La arquitectura está basada en una *Arquitectura Limpia* bajo la abstracción de Javascript. Para agregar elementos más allá de lo solicitados, se uso un uso a alto nivel del paradigma Funcional de JS con el cual se mezcló con el pertinente patrón de arquitectura. 

Este patrón de arquitectura, ajustado al proyecto en mención, contiene las siguientes características.

* **Inyección de dependencias:**  El patrón de inyección de dependencias permite que la aplicación maneje un bajo nivel de acople entre módulos y estos puedan ser cambiados según la necesidad sin afectar otro tipo de procesos. Una de las mayores ventajas de esto es en la realización también de pruebas unitarias, ya que evita el acople de generar demasiados *mocks* a través de librerías externas, sino que sea manejadas a nivel de desarrollador e inyectadas a demanda.

* **Definición de Responsabilidades:** Las responsabilidades de cada módulo según la las necesidades se establece según la forma como las carpetas están distribuidas, y además de esto la definición por desarrollo y diseño del sistema que se plantea:
	* **Server**:  Esta capa tiene como finalidad cargar las dependencias del Framework de Node.js y realizar las diferentes configuraciones del mismo servidor y de las diferentes dependencias, como las rutas, puerto, conexión de base de datos, etc.
	*  **Modules**: En esta capa están las diferentes entidades que puedan confluir en el proyecto, para el caso solo existe una. En esta se resuelven los diferentes controladores que puedan existir por cada entidad.
	*  **Services**: La capa de servicios tiene como finalidad alojar parte de la lógica de negocio. Se entiende bajo esta arquitectura lógica de negocio como todo el proceso de algoritmia que involucre consultas, peticiones, manejo de errores, validaciones post controlador, y demás que necesite el ejercicio. No es responsabilidad de los servicios hacer transformación de datos. 
	* **Dal**: Esta capa es conocida como *Data Access Layer*(Capa de Acceso de Datos). En esta sección se almacena todo lo que tiene que ver con los servicios de almacenamiento de datos (Bases de datos), configuración y dependencias internas. Lo ideal es que quede aislado de otras capas para que tenga su propio comportamiento. 
	*  **Routes**: Esta capa tiene como finalidad almacenar las diferentes rutas de cada entidad, construidas de manera genérica, pero que la arquitectura responde a un escalamiento según estructuras de rutas que puedan resultar.
	*  **Middlewares**: Esta capa almacena las validaciones pre-controlador. 
	* **Utils**: Esta capa aloja funciones trasversales a todas las otras capas, es decir funciones en común entre capas o que tienen la finalidad la transformación y entrega de datos, ya sea para un servicio, un dal u otra capa.

* **Estructura de las carpetas (Árbol de directorios)**:
```
	api-magneto
	|--__test__
	|--.vscode
	|--coverage
	|--src
		|-- config
		|-- dal
		|-- middleware
		|-- modules
		|-- routes
		|-- server
		|-- services
		|-- utils
		|--index.js
	|--.env.example
	|--jest.config.js
	|--.gitignore
	|--package.json
	|--package-lock.json
``` 

* **Ventajas**:
	* Escalamiento para micro-servicios
	* Acople reducido
	* Facilidad de pruebas unitarias
	* Fácil Comprensión

* **Consideraciones:**
	* Esta arquitectura bien es basada a todo lo que se puede hacer con el paradigma orientada a objetos, pero se quiso mostrar un poco del paradigma funcional y como acoplar grandes técnicas del diseño de software.
	* Se hace uso de grandes potenciasles que tiene JS, como: *Closures*, *Recursividad*, *Mapeo de datos*, *Scopes*, etc.

## Infraestructura de la Aplicación (DevOps)

Para la configuración de la infraestructura de la aplicación, se tuvieron en cuenta varios factores pedidos en la prueba técnica y otros temas relevantes. Las tecnologías DevOps utilizadas fueron

- Sistema de control de versiones: *Git*
- Repositorio: *Github*
- IaaS: *Digital Ocean*
- Proxy Invertido: *NGINX*
- Balanceador de carga: *Nginx + Load Balancer Digital Ocean*
- Sistema Operativo de los servidores: *Linux Ubuntu*
- Servidor Base de Datos: *Mongo Atlas Serverless*

Para construir la infraestructura se tuvo en cuenta parte de los requerimientos de la prueba técnica enviada, donde se pudiesen soportar varias peticiones recurrentes en un solo segundo, y los servidores pudieran soportarlo adecuadamente. Esto es gracias al balanceador de carga, que permite el escalamiento horizontal para este tipo de pruebas de estrés, aunque también *Digital Ocean* ofrece servicios para escalamiento vertical. El Nginx se usó como enrutador amigable y balanceador de carga junto con la arquitectura dada por Digital Ocean. 

## Corramos el servidor en local: 

Para correr el servidor en local, simplemente se deben dar los siguientes pasos: 

```git clone https://github.com/sebastotustuus/mutants-magneto-api ```

``` cd mutants-magneto-api ```

``` npm install  ```

- Modo producción: ``` npm start ```

- Modo Desarrollo:  ``` npm run start:dev ```

- Pruebas unitarias y de integración: ```  npm test ```

## Servidor en Producción: 

Para ver el servidor en producción, solo es necesario acceder a esta IP: *164.90.255.20*
Con esta IP se puede ver el mensaje de bienvenida y según la documentación de la API acceder a los servicios expuestos. 

## Documentación de la API

La documentación de la API podrás encontrarla aquí. Realizada a través de POSTMAN
[Magneto API (getpostman.com)](https://documenter.getpostman.com/view/14692179/UUxwBoF6)


# Planteamiento y solución del problema

Después de pensar detenidamente varias veces el problema, tuve varias posibles soluciones unas más fáciles que otras, y otras más optimas. 

Entre las posibles soluciones, y que a tentación, podría uno emplearla, y es usar *Loops* anidados, ya que finalmente la estrutura del DNA es una matriz a grandes rasgos. Esta solución a nivel de código podría llegar a ser fácil de implementar, sin embargo genera un gran problema y es un O(n^2) por lo que esta solución quedaba descartada.

Luego pensé en otra solución relacionado a obtener las columnas, diagonales (Izq-Der) y diagonales (Der-Izq), y vectores separados y compararlos cada uno a traves de un regex según la condifición especificaba, y aunque era tentativa la solución, no me sentía convencido en tener que recorrer varias veces la misma matriz, además para que la solución fuera óptima tenía que asegurar que en ningún punto generara Loops Anidados. 

Finalmente llegué a la solución expuesta en este repositorio, y es que el problema se podía reducir basicamente en una búsqueda de coincidencias, y existe una estructura de datos excelente para estos casos, conocida como **Tablas de Hash**. A este punto, decidí utilizar el paradigma funcional con el cuál javascript tiene bastante potecial, por lo que se usaron recursividad y funciones lambdas de JS, generando una cantidad de ventajas:

1. La matriz se recorre una sola vez a través de recursividad, sin uso de Loops como estructuras de control o como *High Order Functions*
2. La búsqueda por hash tiene la ventaja de que no tiene que recorrer toda la matriz para arrojar resultados. Si antes de terminar la ejecución encuentra al menos las 2 coincidencias, se detiene y devuelve el resultado, evitando recorrer posiciones innecesarias.
3. Cada posición la recorre una sola vez, y hace comparaciones únicas una sola vez, esto permite que no se desaproveche parte de la memoria y recursos, y aquello que se compare sea útil. Esto ayuda a que la optimización tienda a un O(n).

## Aspectos de mejora detectados

1. Crear CI/CD hacia Digital Ocean

## Restricciones

Validaciones hechas en la aplicación:
1. Solo se puede enviar una matriz de cadenas de texto
2. La matriz debe de ser Matriz Cuadrada  NxN
3. El tamaño de la matriz debe de ser mínimo de 4x4.
4. Solo se guardará en la base de datos un registro por DNA. Basta con cambiar una letra para tomarlo como DNA diferente.
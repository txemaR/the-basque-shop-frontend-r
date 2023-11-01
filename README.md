# The Basque Shop - Frontend de Mi Aplicación Web

**Descripción**:
El Frontend de Mi Aplicación Web es la interfaz de usuario de "The Basque Shop", mi Proyecto Final de Ecommerce para el Curso Full Stack Developer. Este frontend está construido con React.js y se comunica con el servidor para proporcionar a los usuarios una experiencia interactiva y atractiva.

**Características Destacadas**:

- **Páginas Principales**: El frontend proporciona varias páginas principales, incluyendo la página de inicio, la página de productos, la página de autenticación y la página del carrito de compras.

- **Barra de Búsqueda de Productos**: Incluye una barra de búsqueda que permite a los usuarios buscar productos de manera eficiente. Los productos se filtran en tiempo real a medida que se ingresa el término de búsqueda.

- **Proceso de Pago Simulado**: Incluye un proceso de pago simulado que permite a los usuarios ingresar información de pago ficticia antes de completar una compra. El componente PaymentModal recopila detalles de pago, valida los datos y genera un número de orden aleatorio, proporcionando a los usuarios una experiencia realista de compra.

- **Comunicación con el Servidor**: Utiliza Axios para comunicarse con el servidor, permitiendo a los usuarios registrarse, iniciar sesión, ver productos, administrar su carrito de compras y completar un proceso de pago simulado.

- **Manejo de Sesiones**: Verifica el estado de inicio de sesión de los usuarios y muestra contenido personalizado según su estado de autenticación.

- **Estilos Responsivos**: El frontend utiliza media queries para garantizar una experiencia de usuario óptima en dispositivos móviles con un ancho máximo de 767px. Los estilos se adaptan automáticamente para mantener la usabilidad y el aspecto visual en pantallas más pequeñas.

**Tecnologías Utilizadas**:
- React.js: Biblioteca de JavaScript para construir interfaces de usuario.
- React Router: Para la navegación entre páginas.
- Axios: Cliente HTTP para realizar solicitudes al servidor.
- SCSS (Sass): Utiliza estilos SCSS con variables y mixins para una gestión eficiente de estilos.

**Licencia**:
Este proyecto está bajo la Licencia MIT, lo que significa que es de código abierto y puedes utilizarlo y modificarlo según tus necesidades, siempre y cuando sigas los términos de la licencia.
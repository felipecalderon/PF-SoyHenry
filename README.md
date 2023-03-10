# PF-SoyHenry

Les presento nuestro proyecto: Fusionajobs. Este es un portal de empleos que se presenta como el nexo entre empresas y trabajadores. Nuestra idea es crear una plataforma que facilite la búsqueda de trabajo y la contratación de personal.

Para ello, nos enfocamos en el desarrollo de ciertos requisitos tecnológicos que consideramos esenciales para el correcto funcionamiento de la plataforma. En primer lugar, el despliegue es un requisito excluyente, para lo cual utilizaremos Railway para la base de datos, y Vercel para el Front y el Back.

La autenticación de terceros es otro requisito excluyente. Para ello, utilizaremos Passport como middleware node. Además, contaremos con una pasarela de pagos, que en nuestro caso será MercadoPago.

En cuanto a los requisitos no excluyentes, implementaremos filtros combinados para la búsqueda de trabajo, que incluyen la posibilidad de filtrar por antiguo/nuevo, tipo de trabajo (remoto, presencial o híbrido), ubicación, salario e idiomas. También, incluiremos la opción de carga de archivos mediante Multer y el almacenamiento local/persistente, utilizando LocalStorage y Redux Toolkit.

Por último, tendremos la opción de reviews y puntuación, así como un dashboard de administrador y notificaciones a través de mail y socket.io. Si bien el borrado lógico no es un requisito excluyente, lo tendremos en cuenta como una posible mejora a futuro.

En resumen, Fusionajobs es una plataforma que busca facilitar la búsqueda de trabajo y la contratación de personal, mediante la implementación de diversos requisitos tecnológicos que aseguran un correcto funcionamiento de la plataforma. Esperamos poder contar con su apoyo para llevar a cabo este proyecto. Muchas gracias.

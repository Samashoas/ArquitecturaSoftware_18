import { useState, useEffect, useRef } from "react";

/* ===================================================================
   CONTENIDO — idéntico a la versión HTML
   =================================================================== */
const CONTENIDO = {
  tema: "Fundamentos de Arquitectura de Software · Capítulos 1–8",

  escalera: [
    { nivel: 1, nombre: "Principiante — el vocabulario",
      descripcion: "Aquí dejas de confundir arquitectura con «la parte difícil del código». Al terminar reconoces las cuatro dimensiones que definen la arquitectura de un sistema y puedes leer un diagrama sin perderte. Todavía no vas a decidir nada: solo nombrar lo que ves.",
      conceptos: ["Estructura", "Características arquitectónicas", "Decisiones arquitectónicas", "Principios de diseño", "Expectativas del rol de arquitecto"],
      ejercicio: "Toma un sistema que uses todos los días (el portal de notas de tu universidad, tu app de banca en línea) y escribe media página separando lo que crees que es estructura, características arquitectónicas, decisiones y principios. No investigues nada: es tu hipótesis inicial y la vas a corregir en el nivel 2.",
      hito: "Puedes explicar en dos minutos, sin leer notas, por qué decir «usamos microservicios» describe solo una de las cuatro dimensiones de una arquitectura.",
      autoevaluacion: ["Nombro las cuatro dimensiones sin verlas", "Distingo una decisión arquitectónica de una preferencia de estilo de código", "Puedo dar un ejemplo propio de característica arquitectónica y decir a qué categoría pertenece"] },

    { nivel: 2, nombre: "Básico — arquitectura, diseño y trade-offs",
      descripcion: "El nivel donde aparece la idea que sostiene todo el resto: en arquitectura no hay respuestas correctas, solo intercambios. Empiezas a ver que lo que vuelve arquitectónica a una decisión no es su dificultad técnica sino cuánto cuesta revertirla y a cuánto alcanza su impacto.",
      conceptos: ["Arquitectura vs diseño", "Costo y reversibilidad del cambio", "El trade-off como forma de pensar", "Amplitud vs profundidad técnica", "Características explícitas e implícitas"],
      ejercicio: "Escoge una decisión técnica de un proyecto tuyo del semestre pasado (el motor de base de datos, el framework, monolito o servicios). Escríbela en dos columnas: qué ganaste y qué perdiste, con al menos tres puntos en cada una. Si una columna quedó vacía, no hiciste un análisis: escribiste una justificación.",
      hito: "Frente a cualquier propuesta técnica tu primera pregunta es «a cambio de qué», y sabes responderla tú mismo antes de preguntarle a alguien más.",
      autoevaluacion: ["Explico por qué una decisión difícil de programar puede no ser arquitectónica", "Identifico al menos una característica implícita en un requerimiento que no la menciona", "Sostengo un trade-off sin caer en «depende» como respuesta final"] },

    { nivel: 3, nombre: "Práctico — medir en lugar de opinar",
      descripcion: "Modularidad deja de ser un adjetivo y pasa a ser algo que se mide. Aprendes a razonar sobre acoplamiento con precisión, a nombrar el tipo exacto de dependencia que tienen dos piezas, y a escribir la primera prueba que reprueba automáticamente un cambio que rompe la arquitectura.",
      conceptos: ["Cohesión y acoplamiento", "Connascence: fuerza, localidad y grado", "Complejidad ciclomática", "Abstracción, inestabilidad y distancia de la secuencia principal", "Funciones de aptitud (fitness functions)"],
      ejercicio: "Sobre un repositorio propio de al menos 15 clases: calcula la complejidad ciclomática con una herramienta real (SonarQube, radon, lizard), dibuja el grafo de dependencias entre paquetes, y escribe una prueba automatizada que falle si un paquete de dominio importa algo de la capa de presentación. Hay herramientas listas para eso: ArchUnit en Java, import-linter en Python, dependency-cruiser en JavaScript.",
      hito: "Tienes en tu repositorio una prueba que falla cuando alguien viola la arquitectura, y falla de verdad: lo comprobaste rompiéndola a propósito y viendo el pipeline en rojo.",
      autoevaluacion: ["Distingo cohesión de acoplamiento con un ejemplo de mi propio código", "Identifico el tipo de connascence entre dos módulos y digo si es fuerte o débil", "Escribí una función de aptitud que corre en CI y la vi fallar"] },

    { nivel: 4, nombre: "Solucionador — diagnosticar sistemas que ya duelen",
      descripcion: "Nivel de autopsia. Te dan un sistema que funciona pero que nadie quiere tocar, y encuentras el problema estructural: qué está acoplado por lo que no debería, qué componente creció por agrupar entidades, cuál característica arquitectónica nadie declaró y ahora se cobra cada fin de mes.",
      conceptos: ["La trampa de la entidad", "Granularidad de componentes", "Quantum arquitectónico", "Gobernanza de características", "Diagnóstico a partir de síntomas de despliegue"],
      ejercicio: "Caso: un sistema de facturación donde cambiar la tasa de un impuesto obliga a desplegar los ocho módulos y a esperar la ventana de mantenimiento del sábado. Escribe el diagnóstico en una página: qué característica arquitectónica está ausente, cuál es el acoplamiento culpable, y dos cambios estructurales ordenados por costo de ejecución.",
      hito: "Puedes mirar el historial de despliegues y los tiempos de build de un sistema y deducir de ahí su arquitectura real, que casi nunca es la del diagrama en la wiki.",
      autoevaluacion: ["Detecto la trampa de la entidad en un diseño que me presentan", "Cuento cuántos quanta tiene un sistema y justifico el número", "Propongo un arreglo estructural indicando qué se rompe al aplicarlo"] },

    { nivel: 5, nombre: "Experto — decidir y defender",
      descripcion: "Decides con información incompleta, dejas por escrito el intercambio que aceptaste, y defiendes la decisión ante alguien que quiere otra cosa. También reconoces cuándo la respuesta correcta es «todavía no», y cuándo una decisión tuya anterior debe revertirse porque cambió el contexto.",
      conceptos: ["Elegir entre monolito y distribuido con criterio", "Partición técnica vs partición por dominio", "El límite práctico de cuántas características optimizar", "Defensa de la decisión y gobernanza continua"],
      ejercicio: "Toma un kata de nealford.com/katas y produce en 90 minutos: diagrama de componentes, las tres características arquitectónicas prioritarias con la medida concreta de cada una, cuántos quanta tiene tu propuesta, y una página de trade-offs que incluya la alternativa que descartaste y por qué. Después preséntalo a alguien con instrucciones de intentar tumbarlo.",
      hito: "Sostienes la decisión frente a objeciones sin ceder por presión ni defenderla por orgullo: cambias de posición solo cuando aparece información nueva, y lo dices en voz alta cuando pasa.",
      autoevaluacion: ["Justifico un monolito sin sonar a excusa y microservicios sin sonar a moda", "Limito mis prioridades a un puñado de características y explico qué dejé fuera", "Documenté una decisión con su intercambio y alguien más la entendió sin mi ayuda"] }
  ],

  plan: [
    { sesion: 1, titulo: "Qué es, y qué no es, la arquitectura",
      objetivo: "Terminas con las cuatro dimensiones de la definición y las expectativas del rol escritas con tus palabras, más las leyes de la arquitectura de software anotadas con un ejemplo propio de cada una.",
      conceptos: ["Estructura", "Características", "Decisiones", "Principios", "Leyes de la arquitectura"],
      ejercicio: "Reescribe la definición de arquitectura sin usar ninguna palabra del libro, en máximo 60 palabras. Luego compárala con la original y anota qué dejaste fuera.",
      recurso: "Capítulo 1 completo (Introduction), incluidas las expectativas del arquitecto y las leyes." },

    { sesion: 2, titulo: "Arquitectura vs diseño y el cono de conocimiento",
      objetivo: "Puedes clasificar diez decisiones reales en arquitectónicas o de diseño usando dos criterios explícitos: costo de revertir y alcance del impacto. También entiendes por qué al arquitecto le conviene amplitud sobre profundidad.",
      conceptos: ["Arquitectura vs diseño", "Reversibilidad", "Amplitud técnica", "Conocimiento obsoleto"],
      ejercicio: "Lista diez decisiones del último proyecto de tu curso y clasifícalas. Para las tres más discutibles, escribe qué información te haría cambiar la clasificación.",
      recurso: "Capítulo 2, secciones sobre arquitectura versus diseño y amplitud técnica." },

    { sesion: 3, titulo: "Análisis de trade-offs y mantenerse técnico",
      objetivo: "Sales con un análisis de intercambios escrito y con una postura propia sobre cuánto código debe seguir escribiendo un arquitecto, defendible con argumentos que no sean tu preferencia personal.",
      conceptos: ["Trade-off", "«Todo tiene un costo»", "Equilibrio entre arquitectura y código"],
      ejercicio: "Analiza el intercambio de una decisión real que puedas investigar: por qué Stack Overflow mantuvo un monolito, o por qué el equipo de monitoreo de Prime Video volvió a empaquetar todo en un solo proceso. Escribe las dos columnas.",
      recurso: "Capítulo 2, secciones de análisis de trade-offs y de equilibrio con el trabajo hands-on." },

    { sesion: 4, titulo: "Modularidad: cohesión y acoplamiento",
      objetivo: "Distingues módulo de componente, y puedes señalar en código propio un caso de cohesión baja y uno de acoplamiento innecesario, explicando el síntoma que produce cada uno.",
      conceptos: ["Modularidad", "Cohesión", "Acoplamiento", "De módulos a componentes"],
      ejercicio: "Encuentra en tu código el módulo con menor cohesión (buena pista: el que se llama «utils», «helpers» o «common») y propón cómo repartirlo. Estima cuántos archivos habría que tocar.",
      recurso: "Capítulo 3, primera mitad: definición de modularidad, cohesión y acoplamiento." },

    { sesion: 5, titulo: "Connascence y métricas de modularidad",
      objetivo: "Puedes nombrar el tipo de connascence entre dos piezas de código y decidir si vale la pena atacarla, usando los tres ejes: qué tan fuerte es, qué tan lejos están las piezas y a cuántas afecta.",
      conceptos: ["Connascence estática y dinámica", "Fuerza, localidad y grado", "Complejidad ciclomática", "Distancia de la secuencia principal"],
      ejercicio: "Toma dos servicios o dos módulos que se comuniquen en tu proyecto e identifica todos los tipos de connascence que encuentres. Ordénalos por fuerza y decide cuál atacarías primero.",
      recurso: "Capítulo 3, segunda mitad: medición de la modularidad y connascence." },

    { sesion: 6, titulo: "El catálogo de características arquitectónicas",
      objetivo: "Manejas las tres categorías (operacionales, estructurales y transversales) con ejemplos propios, y entiendes por qué ningún sistema puede optimizar todas: la lista completa se contradice consigo misma.",
      conceptos: ["Características operacionales", "Estructurales", "Transversales", "La arquitectura «menos mala»"],
      ejercicio: "Para un sistema que conozcas, escribe las cinco características que más importan y, junto a cada una, cuál sacrificas al perseguirla. Si no encuentras el sacrificio, no la entendiste.",
      recurso: "Capítulo 4 completo, incluida la sección de trade-offs y arquitectura menos mala." },

    { sesion: 7, titulo: "Extraer características del dominio y de los requerimientos",
      objetivo: "Sabes traducir lo que dice un interesado del negocio a características arquitectónicas, separando las explícitas de las implícitas, y aceptas que solo puedes priorizar unas pocas.",
      conceptos: ["Preocupaciones del dominio", "Características explícitas", "Características implícitas", "Priorización"],
      ejercicio: "Toma tres frases textuales de un cliente o profesor («que aguante la matrícula», «que no se caiga en cierre de mes», «que podamos venderlo a otra universidad») y traduce cada una a características con nombre técnico, marcando las implícitas.",
      recurso: "Capítulo 5 completo: extracción desde el dominio y desde los requerimientos." },

    { sesion: 8, titulo: "Medir y gobernar lo que declaraste",
      objetivo: "Cada característica que declaras queda con una medida concreta y con una forma automática de vigilarla. Terminas con una función de aptitud escrita y corriendo.",
      conceptos: ["Medidas operacionales, estructurales y de proceso", "Gobernanza", "Funciones de aptitud", "Automatización en CI"],
      ejercicio: "Escribe y ejecuta dos funciones de aptitud sobre un repositorio propio: una estructural (una regla de dependencias entre capas) y una operacional (un umbral de tiempo de respuesta en una prueba). Rómpelas a propósito para confirmar que fallan.",
      recurso: "Capítulo 6 completo: medición y gobernanza de características." },

    { sesion: 9, titulo: "Alcance: quantum arquitectónico",
      objetivo: "Puedes contar los quanta de un sistema y explicar por qué una base de datos compartida une lo que el diagrama muestra separado. Entiendes qué aporta el contexto acotado a ese razonamiento.",
      conceptos: ["Quantum arquitectónico", "Acoplamiento estático y dinámico", "Contexto acotado", "Alcance por característica"],
      ejercicio: "Dibuja el sistema de tu proyecto y traza el límite de cada quantum. Donde dos servicios comparten base de datos, márcalo y explica qué característica arquitectónica pierdes ahí.",
      recurso: "Capítulo 7 completo, incluida la sección de quanta y granularidad." },

    { sesion: 10, titulo: "Pensamiento por componentes: identificar, particionar, dimensionar",
      objetivo: "Cierras el recorrido produciendo un diseño de componentes propio: los identificas, asignas requerimientos, revisas su granularidad y justificas si particionas por dominio o por capa técnica.",
      conceptos: ["Alcance del componente", "Partición técnica vs por dominio", "Flujo de identificación de componentes", "Granularidad", "La trampa de la entidad"],
      ejercicio: "Aplica el flujo completo de identificación de componentes a un caso nuevo: propón componentes iniciales, asígnales requerimientos, revisa características, reestructura, y verifica que ninguno sea solo el nombre de una tabla de la base de datos.",
      recurso: "Capítulo 8 completo, incluido el caso de estudio de descubrimiento de componentes." }
  ],

  quiz: [
    { pregunta: "Un equipo discute si el sistema nuevo usará PostgreSQL o MySQL. ¿A cuál de las cuatro dimensiones de la arquitectura pertenece esa discusión?",
      opciones: ["A la estructura del sistema", "A las características arquitectónicas", "A las decisiones arquitectónicas", "A los principios de diseño"],
      correcta: 2, area: "Qué es arquitectura",
      explicacion: "Elegir un motor concreto es una decisión: restringe lo que los equipos podrán hacer después y es costosa de revertir.",
      reexplicacion: "Las cuatro dimensiones no son sinónimos. La estructura es la forma del sistema (capas, servicios, tuberías). Las características son los atributos que debe cumplir, como disponibilidad o escalabilidad. Las decisiones son reglas duras y concretas, como «los servicios no acceden a la base de datos de otro servicio». Los principios son guías con margen, como «preferir mensajería asíncrona cuando se pueda». PostgreSQL o MySQL es una regla dura sobre una tecnología: decisión." },

    { pregunta: "¿Cuál de estas es una característica arquitectónica operacional?",
      opciones: ["Mantenibilidad", "Disponibilidad", "Portabilidad", "Autorización"],
      correcta: 1, area: "Características arquitectónicas",
      explicacion: "La disponibilidad describe cómo se comporta el sistema mientras está corriendo, y se mide en operación.",
      reexplicacion: "Las tres categorías se distinguen por dónde se manifiestan. Las operacionales ocurren en tiempo de ejecución: disponibilidad, rendimiento, escalabilidad, recuperación. Las estructurales tienen que ver con la forma del código y lo que puedes hacerle: mantenibilidad, portabilidad, extensibilidad. Las transversales atraviesan todo el sistema sin pertenecer a una capa: autorización, seguridad, privacidad, accesibilidad. Ubicar una característica en la categoría correcta es lo que te dice cómo medirla." },

    { pregunta: "Un módulo llamado «Utilidades» contiene funciones para formatear fechas, validar NIT, enviar correos y comprimir archivos. ¿Cuál es el problema principal?",
      opciones: ["Acoplamiento alto con el dominio", "Cohesión baja", "Connascence de posición", "Complejidad ciclomática alta"],
      correcta: 1, area: "Modularidad y acoplamiento",
      explicacion: "Nada relaciona esas funciones entre sí más que no haber sabido dónde ponerlas. Eso es cohesión baja.",
      reexplicacion: "Cohesión es cuánto se pertenecen entre sí las partes que están juntas; acoplamiento es cuánto dependen unas piezas de otras. Son ejes distintos y se confunden todo el tiempo. Un módulo «utils» suele tener cohesión bajísima, y además provoca acoplamiento alto de rebote, porque medio sistema termina importándolo. El síntoma clásico: cualquier cambio ahí obliga a revisar módulos que no tienen nada que ver entre ellos." },

    { pregunta: "El equipo propone microservicios para un sistema interno de 200 usuarios, con un solo equipo de cuatro desarrolladores. Como arquitecto, ¿cuál respuesta refleja mejor el pensamiento arquitectónico?",
      opciones: ["Aceptar: es la arquitectura estándar hoy y facilita contratar gente", "Rechazar: para ese tamaño los microservicios siempre son excesivos", "Preguntar qué característica arquitectónica se busca lograr y qué se paga a cambio", "Delegar la decisión al equipo, que conoce el código mejor que nadie"],
      correcta: 2, area: "Trade-offs y rol del arquitecto",
      explicacion: "La respuesta arquitectónica no es sí ni no, es exigir el criterio: qué característica se persigue y cuál es el costo aceptado.",
      reexplicacion: "«Siempre» y «nunca» son las dos formas de no pensar. Los microservicios compran despliegue independiente, escalado por parte y aislamiento de fallas; pagan con complejidad operativa, latencia de red y consistencia eventual. Con cuatro desarrolladores el costo suele ser grande y el beneficio pequeño, pero eso es una conclusión, no un punto de partida. Delegar tampoco funciona: quien conoce el código no necesariamente conoce el costo de operar diez despliegues." },

    { pregunta: "Tres módulos se despliegan juntos en un solo artefacto y comparten la misma base de datos. ¿Cuántos quanta arquitectónicos hay?",
      opciones: ["Tres, uno por módulo", "Uno", "Dos: la aplicación y la base de datos", "Depende de cuántos equipos los mantengan"],
      correcta: 1, area: "Componentes y alcance",
      explicacion: "Un quantum es una unidad desplegable de forma independiente, con alto acoplamiento funcional y sus propios datos. Si comparten despliegue y base, no pueden evolucionar por separado: es uno.",
      reexplicacion: "El quantum es la unidad de alcance de las características arquitectónicas, y la base de datos compartida es lo que más gente pasa por alto al contarlos. Puedes dibujar tres servicios bonitos y separados: si los tres escriben en la misma base, un cambio de esquema los detiene a todos y la disponibilidad de la base es el techo de los tres. El diagrama miente; el acoplamiento de datos manda." },

    { pregunta: "El cliente dice: «necesitamos que el sistema aguante la semana de asignación, cuando treinta mil estudiantes entran en dos días». ¿Cuál es la característica explícita, y cuál la implícita que nadie mencionó?",
      opciones: ["Explícita escalabilidad; implícita portabilidad", "Explícita elasticidad; implícita disponibilidad", "Explícita disponibilidad; implícita usabilidad", "Explícita rendimiento; implícita seguridad"],
      correcta: 1, area: "Características arquitectónicas",
      explicacion: "Un pico repentino y acotado pide elasticidad. Y si el sistema se cae justamente esos dos días el daño es total, aunque nadie pidió disponibilidad por escrito.",
      reexplicacion: "Elasticidad y escalabilidad se usan como sinónimos y no lo son. Escalabilidad es sostener un crecimiento gradual: pasas de mil a diez mil usuarios en un año. Elasticidad es absorber una ráfaga: de cien a treinta mil en una hora, y luego volver a bajar. Piden arquitecturas distintas. Las características implícitas son las que nunca aparecen en el documento de requerimientos pero cuya ausencia arruina el sistema: disponibilidad, seguridad y recuperación casi siempre son implícitas." },

    { pregunta: "Dos servicios se comunican con un arreglo JSON donde la posición 0 es el NIT y la posición 1 es el monto. ¿Qué tipo de connascence hay y por qué preocupa?",
      opciones: ["De nombre: ambos lados usan los mismos nombres de campo", "De posición: el significado depende del orden, y cambiarlo rompe el otro lado en silencio", "De ejecución: importa el orden en que se llaman los servicios", "De identidad: los dos comparten una misma referencia en memoria"],
      correcta: 1, area: "Modularidad y acoplamiento",
      explicacion: "El contrato está en el orden, no en los nombres. Si alguien invierte los campos, nada falla al compilar y el error aparece en producción con montos atribuidos al NIT equivocado.",
      reexplicacion: "La connascence se juzga en tres ejes. Fuerza: qué tan fácil es detectarla y arreglarla, y la de posición es más fuerte (peor) que la de nombre, porque el compilador no la ve. Localidad: cuanto más lejos están las piezas, más duele el mismo acoplamiento, y dos servicios distintos con despliegues distintos están lejísimo. Grado: a cuántos elementos afecta. La receta práctica es empujar la connascence hacia formas más débiles y hacia piezas más cercanas: aquí, cambiar el arreglo por un objeto con campos nombrados degrada de posición a nombre casi gratis." },

    { pregunta: "¿Cuál de estas decisiones es la MENOS arquitectónica?",
      opciones: ["Partir el sistema en servicios que se despliegan por separado", "Publicar los cambios del catálogo por eventos en lugar de llamadas sincrónicas", "Renombrar y reordenar los parámetros de un método privado de una clase", "Darle a cada servicio su propia base de datos"],
      correcta: 2, area: "Qué es arquitectura",
      explicacion: "Es un cambio local y reversible en minutos: nada fuera de esa clase lo nota. Las otras tres reconfiguran el sistema completo y revertirlas cuesta meses.",
      reexplicacion: "El criterio no es la dificultad técnica sino dos preguntas: cuánto cuesta revertir la decisión y hasta dónde llega su impacto. Un algoritmo interno puede ser dificilísimo de programar y seguir siendo diseño, porque lo cambias sin tocar nada más. Partir el sistema en servicios puede ser conceptualmente simple y ser profundamente arquitectónico, porque después de hacerlo el equipo, el despliegue, el monitoreo y los datos ya son otra cosa. Difícil no es lo mismo que estructural." },

    { pregunta: "Un sistema está organizado en capas: controladores, servicios, repositorios. Cada cambio en «reservas» obliga a tocar las tres capas y a coordinar tres equipos. ¿Qué está pasando?",
      opciones: ["Es partición técnica: los componentes se agruparon por rol técnico, así que un cambio de dominio atraviesa todos los grupos", "Es la trampa de la entidad: hay un componente por cada tabla", "El acoplamiento entre capas es demasiado bajo y hay que integrarlas más", "Los componentes son demasiado pequeños: falta granularidad"],
      correcta: 0, area: "Componentes y alcance",
      explicacion: "En una partición técnica el dominio queda repartido en rebanadas horizontales. La consecuencia no es un error de implementación: viene incluida en la elección del estilo.",
      reexplicacion: "Hay dos formas básicas de particionar el nivel superior de un sistema. Técnica: agrupas por rol, todos los controladores juntos, todos los repositorios juntos, y cualquier cambio de negocio cruza todas las capas. Por dominio: agrupas por área de negocio, «reservas» contiene su propia entrada, su lógica y su acceso a datos, y el cambio se queda dentro. La técnica facilita la separación de responsabilidades y el reuso de infraestructura; la de dominio favorece la agilidad y la evolución independiente. Ninguna es gratis, pero hay que saber cuál escogiste y por qué." },

    { pregunta: "Un sistema de facturación electrónica depende de un certificador externo que a veces no responde. El equipo propone dos caminos: (a) encolar las facturas y confirmarlas de forma asíncrona; (b) reintentar sincrónicamente hasta tres veces y mostrar error. ¿Cuál es la respuesta arquitectónicamente correcta?",
      opciones: ["(a), porque desacopla del certificador y es más resiliente", "(b), porque es más simple y conserva la respuesta inmediata al usuario", "Ninguna por sí sola: depende de qué característica se priorice, y eso hay que declararlo y medirlo", "(a) siempre: la mensajería asíncrona es la práctica correcta en sistemas modernos"],
      correcta: 2, area: "Trade-offs y rol del arquitecto",
      explicacion: "Las dos opciones son defendibles. Lo que no es defendible es elegir sin nombrar la característica que se prioriza ni cómo se va a vigilar.",
      reexplicacion: "Desglosa el intercambio. La cola compra resiliencia y capacidad de absorber caídas del certificador; paga con complejidad operativa, consistencia eventual y la necesidad de explicarle al usuario que su factura «va en camino». El reintento sincrónico compra simplicidad y respuesta inmediata; paga con disponibilidad percibida, porque cuando el tercero se cae el usuario ve el error. La decisión sale del contexto: volumen, cuánto tolera el negocio una factura en tránsito, qué tan seguido falla el certificador. Y sea cual sea, se acompaña de una medida vigilada automáticamente, no de una buena intención." }
  ],

  cheatsheet: {
    definicion: "La arquitectura de software es el conjunto de decisiones estructurales que son caras de revertir. Se describe en cuatro dimensiones: la estructura del sistema, las características arquitectónicas que debe cumplir, las decisiones que restringen a los equipos, y los principios que los orientan. Los primeros ocho capítulos del libro de Richards y Ford construyen una idea central: no existe la arquitectura correcta, existe la menos mala para un contexto, y el trabajo del arquitecto es hacer explícito el intercambio que se está aceptando y luego vigilarlo de forma automática.",
    conceptos: [
      { termino: "Las cuatro dimensiones", definicion: "Estructura, características arquitectónicas, decisiones y principios de diseño. Decir «usamos microservicios» describe solo la primera." },
      { termino: "Arquitectura vs diseño", definicion: "No se separan por dificultad sino por costo de revertir y alcance del impacto. Un algoritmo difícil puede ser diseño; partir el despliegue es arquitectura." },
      { termino: "Trade-off", definicion: "Toda decisión arquitectónica compra algo y paga con algo. Si no encuentras qué pagas, no analizaste: justificaste." },
      { termino: "Características arquitectónicas", definicion: "Lo que el sistema debe cumplir además de sus funciones. Se dividen en operacionales (en ejecución), estructurales (en el código) y transversales (atraviesan todo)." },
      { termino: "Explícitas e implícitas", definicion: "Las explícitas están en el requerimiento. Las implícitas nadie las pide pero su ausencia hunde el sistema: disponibilidad, seguridad, recuperación." },
      { termino: "Elasticidad vs escalabilidad", definicion: "Escalabilidad es crecer sostenidamente; elasticidad es absorber una ráfaga y volver a bajar. Piden arquitecturas distintas." },
      { termino: "Cohesión", definicion: "Cuánto se pertenecen entre sí las partes que están juntas en un módulo. Un módulo «utils» es el caso típico de cohesión baja." },
      { termino: "Acoplamiento", definicion: "Cuánto depende una pieza de otra. Poco acoplamiento y mucha cohesión es el objetivo; ambos extremos tienen costo." },
      { termino: "Connascence", definicion: "Dos piezas están en connascence si cambiar una obliga a cambiar la otra para que el sistema siga correcto. Se juzga por fuerza, localidad y grado." },
      { termino: "Función de aptitud", definicion: "Una prueba automatizada que verifica que una característica arquitectónica se sigue cumpliendo. Es la diferencia entre gobernar la arquitectura y desearla." },
      { termino: "Quantum arquitectónico", definicion: "Unidad desplegable de forma independiente, con alto acoplamiento funcional y sus propios datos. Una base compartida convierte varios servicios en un solo quantum." },
      { termino: "Componente", definicion: "El bloque con el que se construye la estructura: un módulo con identidad y un rol claro. Su tamaño correcto se descubre iterando, no se adivina." },
      { termino: "Partición técnica vs por dominio", definicion: "Agrupar por rol técnico (capas) o por área de negocio. La primera reparte cada cambio de negocio entre todas las capas; la segunda lo contiene." },
      { termino: "Trampa de la entidad", definicion: "Crear un componente por cada tabla o entidad del modelo de datos. Produce componentes sin comportamiento propio y un sistema que se mueve en bloque." },
      { termino: "Arquitectura menos mala", definicion: "Ninguna arquitectura optimiza todas las características, porque se contradicen entre sí. Se eligen pocas, a conciencia." }
    ],
    ejemplos: [
      { titulo: "Netflix y Chaos Monkey — una característica convertida en prueba", texto: "Netflix liberó Chaos Monkey en 2011: un proceso que apaga instancias en producción a propósito. Es el ejemplo canónico de función de aptitud. La resiliencia deja de ser una promesa del diagrama y pasa a ser algo que el sistema demuestra todos los días, o falla." },
      { titulo: "Amazon y el mandato de 2002 — partición por dominio impuesta", texto: "El relato más citado de la ingeniería de Amazon, difundido públicamente por Steve Yegge en 2011, describe una directiva interna: los equipos solo pueden exponer sus datos y funciones a través de interfaces de servicio, sin atajos por base de datos compartida. Es una decisión arquitectónica en estado puro: restringe a todos los equipos y su costo de revertir es enorme." },
      { titulo: "Knight Capital, 1 de agosto de 2012 — gobernanza ausente", texto: "Un servidor quedó sin actualizar durante un despliegue y siguió ejecutando código viejo que llevaba años desactivado. En unos 45 minutos la firma perdió alrededor de 440 millones de dólares y dejó de existir como empresa independiente. El código funcionaba; lo que faltaba era gobernanza automatizada del despliegue y un interruptor de emergencia." },
      { titulo: "Prime Video, marzo de 2023 — el trade-off que se revierte", texto: "El equipo de análisis de calidad de video pasó su servicio de monitoreo de una arquitectura distribuida sin servidores a un solo proceso, y reportó una reducción de costos de infraestructura de más del 90%. Cuidado con el titular: el cambio fue en un servicio, no en Prime Video completo, y lo hicieron después de topar con un límite de escalado. Es un caso de revisar una decisión cuando cambia la escala, no una prueba de que los microservicios estén mal." },
      { titulo: "Segment, 2018 — de microservicios de vuelta al monolito", texto: "Segment publicó su experiencia consolidando una constelación de microservicios en un solo repositorio y despliegue. El motivo no fue técnico en abstracto: el costo operativo de mantener decenas de despliegues con un equipo pequeño se comió el beneficio de la independencia. El intercambio se movió y la decisión se movió con él." },
      { titulo: "Stack Overflow — el monolito como decisión deliberada", texto: "Stack Overflow sirvió durante años uno de los sitios más visitados del mundo con un monolito sobre un puñado de servidores, optimizando rendimiento de forma obsesiva. Sirve para desarmar la idea de que monolito equivale a atraso: fue una elección coherente con las características que priorizaron." },
      { titulo: "Healthcare.gov, 2013 — características implícitas que nadie declaró", texto: "El portal de salud de Estados Unidos colapsó en su lanzamiento ante una carga que hoy resulta modesta. La funcionalidad existía; la elasticidad y la disponibilidad nunca se trataron como características arquitectónicas con una medida y un dueño. Es el ejemplo de manual de característica implícita ignorada." },
      { titulo: "Ariane 5, vuelo 501, 1996 — connascence a través del tiempo", texto: "El cohete se destruyó unos 40 segundos después del despegue. La causa fue software de referencia inercial reutilizado del Ariane 4, donde una conversión numérica desbordó porque la nueva trayectoria producía valores mayores. Nadie cambió el código; cambió el supuesto. Es connascence de significado entre un módulo y un contexto que ya no existía." },
      { titulo: "Twitter y la línea de tiempo — la estructura sigue a la característica", texto: "Twitter movió partes críticas de su procesamiento de líneas de tiempo desde un monolito en Ruby hacia servicios en la JVM cuando la escalabilidad y la latencia se volvieron su restricción dominante. La estructura cambió porque cambió la característica que mandaba, no porque hubiera una arquitectura más moderna." },
      { titulo: "Shopify — modularidad sin distribución", texto: "Shopify documentó la componentización interna de su monolito de Rails: límites explícitos entre componentes y reglas que impiden que uno alcance las tripas de otro, sin partir el despliegue. Demuestra que modularidad y microservicios no son la misma cosa; puedes tener lo primero sin pagar lo segundo." },
      { titulo: "Uber y la arquitectura orientada a dominios", texto: "Uber describió en 2020 su reorganización de miles de servicios en dominios con límites y dependencias explícitas. Es partición por dominio aplicada a escala, y una confesión útil: los servicios muy pequeños sin límites de dominio producen un sistema imposible de razonar." },
      { titulo: "Facturación electrónica FEL en Guatemala — el quantum que no controlas", texto: "Un sistema que emite documentos tributarios electrónicos depende de un certificador externo. Esa dependencia define características que ningún requerimiento funcional menciona: resiliencia ante la caída del tercero, recuperación de documentos en tránsito y trazabilidad fiscal. La decisión de encolar o reintentar no es un detalle de implementación, es arquitectura." },
      { titulo: "El módulo «utils» de cualquier proyecto universitario", texto: "El ejemplo más cercano y más honesto. Empieza con dos funciones, termina con cuarenta que no tienen nada en común, y medio sistema lo importa. Cohesión baja produciendo acoplamiento alto de rebote, en un repositorio que puedes abrir ahora mismo." }
    ],
    errores: [
      { error: "Usar «arquitectura» como sinónimo de «la parte difícil del código»", correccion: "El criterio es costo de revertir y alcance del impacto, no dificultad técnica." },
      { error: "Nombrar características sin una medida: «que sea escalable»", correccion: "Cada característica declarada lleva un número y una forma de verificarlo: cuántos usuarios concurrentes, en qué percentil de latencia, comprobado por qué prueba." },
      { error: "Intentar optimizar diez características a la vez", correccion: "La lista completa se contradice consigo misma. Se eligen unas pocas y se dice en voz alta qué se dejó fuera." },
      { error: "Confundir cohesión con acoplamiento", correccion: "Cohesión es qué tan bien se pertenecen las partes de un módulo; acoplamiento es cuánto dependen los módulos entre sí. Son ejes independientes." },
      { error: "Creer que tener servicios separados da despliegue independiente", correccion: "Si comparten base de datos, comparten quantum: un cambio de esquema los detiene a todos. Cuenta los quanta, no las cajas del diagrama." },
      { error: "Crear un componente por cada tabla del modelo de datos", correccion: "Es la trampa de la entidad. Los componentes salen del flujo de trabajo y de los requerimientos, no del esquema de la base." },
      { error: "Decidir por moda o por autoridad («microservicios porque Netflix»)", correccion: "El contexto de Netflix incluye su escala, su presupuesto y su tolerancia a complejidad operativa. Copia el razonamiento, no la conclusión." },
      { error: "Documentar la arquitectura una vez y suponer que se respeta", correccion: "Sin funciones de aptitud en el pipeline, la arquitectura real es la que permita el compilador. Automatiza la vigilancia o acepta la deriva." },
      { error: "Dejar de escribir código al volverse arquitecto", correccion: "El conocimiento técnico se vuelve obsoleto rápido y un arquitecto sin práctica pierde la capacidad de evaluar el costo real de lo que propone." }
    ]
  },

  recursos: [
    { nombre: "Fundamentals of Software Architecture — Mark Richards y Neal Ford (O'Reilly, 2020)", tipo: "libro",
      url: "https://fundamentalsofsoftwarearchitecture.com/",
      porQue: "Es la fuente de estos ocho capítulos y el único recurso de la lista que trata las características arquitectónicas como un catálogo con medidas en lugar de adjetivos. El sitio incluye material complementario. Lee el libro; esta app te dice dónde poner atención y cómo comprobar que entendiste, no lo reemplaza.",
      nivel: "intermedio" },
    { nombre: "Architectural Katas — Neal Ford, sobre la idea original de Ted Neward", tipo: "práctica",
      url: "https://nealford.com/katas/",
      porQue: "Lo único de la lista que te obliga a decidir con información incompleta, en grupo y contra reloj, y después defenderlo. Leer sobre trade-offs no produce esa habilidad; ejecutar un kata sí. Está diseñado para grupos de 3 a 5, que es exactamente el tamaño de un equipo de proyecto universitario.",
      nivel: "intermedio" },
    { nombre: "martinfowler.com — sección de arquitectura", tipo: "documentación",
      url: "https://martinfowler.com/architecture/",
      porQue: "Gratis, corto y con los contraargumentos que un solo libro no te da, incluido cuándo no conviene partir un monolito. Úsalo para contrastar: si dos autores respetados discrepan, ahí está el trade-off que necesitas entender.",
      nivel: "principiante" },
    { nombre: "Building Evolutionary Architectures — Ford, Parsons, Kua y Sadalage", tipo: "libro",
      porQue: "El capítulo 6 introduce las funciones de aptitud en unas páginas; este libro es donde se vuelven una práctica completa, con tipos, ejemplos y cómo meterlas al pipeline. Ve aquí solo después de haber escrito tu primera función de aptitud a mano.",
      nivel: "avanzado" },
    { nombre: "Software Architecture: The Hard Parts — Ford, Richards, Sadalage y Dehghani", tipo: "libro",
      porQue: "Retoma justo donde terminan estos ocho capítulos: cómo descomponer un sistema existente y qué hacer con los datos, que es el problema que el capítulo 8 deja abierto. Es el siguiente paso natural, no un sustituto.",
      nivel: "avanzado" }
  ],

  plan7dias: [
    { dia: "Día 1", actividad: "Capítulos 1 y 2. Reescribe la definición de arquitectura con tus palabras y clasifica diez decisiones propias en arquitectónicas o de diseño.", recurso: "Fundamentals of Software Architecture", tiempo: "90 min" },
    { dia: "Día 2", actividad: "Capítulo 3. Sobre un repositorio tuyo: encuentra el módulo con menor cohesión e identifica los tipos de connascence entre dos módulos que se comuniquen.", recurso: "Fundamentals of Software Architecture", tiempo: "90 min" },
    { dia: "Día 3", actividad: "Capítulos 4 y 5. Escribe las cinco características que más importan en un sistema que conozcas y, junto a cada una, qué sacrificas al perseguirla.", recurso: "Fundamentals of Software Architecture", tiempo: "75 min" },
    { dia: "Día 4", actividad: "Lee dos o tres artículos de arquitectura de Fowler, en particular los que discuten monolito frente a microservicios, y anota en qué discrepan del libro.", recurso: "martinfowler.com — arquitectura", tiempo: "45 min" },
    { dia: "Día 5", actividad: "Capítulos 6 y 7. Escribe dos funciones de aptitud reales sobre tu repositorio y rómpelas a propósito para confirmar que fallan.", recurso: "Fundamentals of Software Architecture + Building Evolutionary Architectures", tiempo: "90 min" },
    { dia: "Día 6", actividad: "Capítulo 8. Aplica el flujo de identificación de componentes a un sistema propio y verifica que ningún componente sea solo el nombre de una tabla.", recurso: "Fundamentals of Software Architecture", tiempo: "75 min" },
    { dia: "Día 7", actividad: "Un kata completo en grupo de 3 a 5 personas: diseño, características con medida, quanta y una página de trade-offs. Preséntenlo y déjense objetar.", recurso: "Architectural Katas", tiempo: "120 min" }
  ],

  feynman: {
    explicacionSimple: "Cuando un equipo construye un sistema, casi todo lo que decide se puede cambiar después sin mayor drama: el nombre de una función, el color de un botón, cómo está escrito un cálculo. Pero unas pocas decisiones son distintas: en cuántas piezas se parte el sistema, si esas piezas se instalan juntas o por separado, si comparten la misma base de datos, qué se hace cuando un servicio del que dependes no responde. Esas son las decisiones arquitectónicas, y lo que las distingue no es que sean difíciles de programar, es que revertirlas cuesta meses y afecta a todo el mundo. Además, un sistema no solo tiene que hacer cosas: tiene que aguantar el pico de matrícula, seguir de pie durante el cierre de mes, poder modificarse sin miedo. A esas exigencias se les llama características arquitectónicas, y aquí está lo incómodo: no se pueden lograr todas al mismo tiempo, porque se estorban entre sí. Perseguir una siempre significa pagar con otra. Por eso el trabajo consiste en elegir a conciencia unas pocas, dejar escrito qué se está sacrificando, y poner pruebas automáticas que avisen cuando el sistema deje de cumplirlas.",
    analogia: "Piensa en un edificio. Cualquier fin de semana puedes cambiar la pintura, los muebles o las lámparas: eso es diseño. Mover un muro de carga o el ducto principal de agua es otra cosa, porque hay que tocar todo lo que está alrededor y el costo no se parece en nada: eso es arquitectura. Y la analogía aguanta un paso más, que es donde se pone interesante: no puedes decir si un edificio está bien hecho sin preguntar para qué es. Un hospital y una bodega tienen requisitos incompatibles, y nadie diseña un edificio que sea excelente hospital y excelente bodega al mismo tiempo. Los sistemas de software funcionan igual: la arquitectura correcta no existe en abstracto, existe la mejor para lo que ese sistema tiene que aguantar.",
    conceptosClave: [
      { concepto: "trade-off", sinonimos: ["intercambio", "sacrificio", "sacrificas", "a cambio de", "cuesta algo", "compensacion", "no se puede todo", "pagar con"],
        pista: "explica por qué mejorar algo en un sistema siempre empeora otra cosa, con un ejemplo concreto" },
      { concepto: "características arquitectónicas", sinonimos: ["caracteristica", "atributos de calidad", "requisitos no funcionales", "escalabilidad", "disponibilidad", "rendimiento", "aguantar", "exigencias"],
        pista: "di qué debe cumplir el sistema además de sus funciones, y nombra al menos dos ejemplos" },
      { concepto: "costo de revertir", sinonimos: ["reversibilidad", "revertir", "deshacer", "dificil de cambiar", "caro de cambiar", "cuesta meses", "no se puede volver atras"],
        pista: "explica qué hace que una decisión sea arquitectónica y no simple diseño" },
      { concepto: "acoplamiento", sinonimos: ["acopladas", "acoplado", "dependencia", "dependen", "depende de", "amarradas", "atadas", "coupling"],
        pista: "describe qué pasa cuando cambias una parte del sistema y otra se rompe" },
      { concepto: "estructura", sinonimos: ["piezas", "partes", "modulos", "componentes", "servicios", "monolito", "microservicios", "como se organiza", "se divide"],
        pista: "cuenta en qué se divide un sistema y cómo se relacionan esas divisiones" },
      { concepto: "gobernanza automatizada", sinonimos: ["funcion de aptitud", "funciones de aptitud", "fitness function", "prueba automatica", "pruebas automatizadas", "medir", "verificar", "vigilar", "monitorear"],
        pista: "explica cómo se comprueba que el sistema sigue cumpliendo lo que prometió, sin depender de que alguien lo recuerde" }
    ],
    preguntasGuia: ["¿Qué decide un arquitecto que no decide un programador?", "¿Por qué no se puede tener todo a la vez?", "¿Qué pasa si nadie vigila la arquitectura?", "¿Cómo sabes si una decisión fue buena?"]
  }
};

/* ===================================================================
   Estilos — cianotipo de plano técnico, todo dentro de .arqapp
   =================================================================== */
const CSS = `
.arqapp{
  --bg:#0a2239; --surface:#0f3050; --surface-2:#164464; --line:#2b6488;
  --ink:#eaf4fb; --ink-soft:#9dc0d8; --accent:#6ec6e8; --accent-2:#f2934a; --danger:#e4695f;
  --grid:rgba(110,198,232,.055);
  --radius:14px; --step:clamp(1rem,.6rem + 1.2vw,1.3rem);
  --font-display:ui-monospace,"SFMono-Regular","Cascadia Mono",Consolas,"DejaVu Sans Mono",monospace;
  --font-body:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  background-color:var(--bg);color:var(--ink);font-family:var(--font-body);line-height:1.6;min-height:100vh;
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:32px 32px;
}
.arqapp *{box-sizing:border-box}
.arqapp h1,.arqapp h2,.arqapp h3{font-family:var(--font-display);line-height:1.22;margin:0 0 .4em;letter-spacing:-.02em;font-weight:600}
.arqapp button{font:inherit;cursor:pointer;border:0;border-radius:10px}
.arqapp a{color:var(--accent)}
.arqapp p{margin:0 0 .6em}

.arqapp .shell{display:grid;grid-template-columns:280px 1fr}
.arqapp .side{background:var(--surface);border-right:1px solid var(--line);padding:22px 18px;position:sticky;top:0;align-self:start;max-height:100vh;overflow-y:auto}
.arqapp .brand{font-family:var(--font-display);font-size:1.1rem;letter-spacing:-.02em;margin-bottom:2px}
.arqapp .brand small{display:block;font-family:var(--font-body);font-size:.76rem;color:var(--ink-soft);font-weight:400;letter-spacing:0}
.arqapp .gauge{margin:18px 0 8px;font-size:.8rem;color:var(--ink-soft)}
.arqapp .bar{height:8px;background:var(--surface-2);border-radius:99px;overflow:hidden;margin-top:6px}
.arqapp .bar>i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--accent-2));transition:width .5s cubic-bezier(.4,0,.2,1)}
.arqapp .nav{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:6px}
.arqapp .nav button{width:100%;text-align:left;display:flex;gap:10px;align-items:flex-start;padding:11px 12px;background:transparent;color:var(--ink-soft);transition:background .2s,color .2s}
.arqapp .nav button:hover:not(:disabled){background:var(--surface-2);color:var(--ink)}
.arqapp .nav button[aria-current="true"]{background:var(--surface-2);color:var(--ink);box-shadow:inset 3px 0 0 var(--accent)}
.arqapp .nav button:disabled{opacity:.42;cursor:not-allowed}
.arqapp .nav .n{font-family:var(--font-display);font-weight:700;opacity:.7}
.arqapp .nav .t{font-size:.9rem}
.arqapp .nav .done{margin-left:auto;color:var(--accent)}

.arqapp main{padding:34px clamp(18px,4vw,54px);max-width:900px}
.arqapp .stage{animation:arqin .45s cubic-bezier(.2,.7,.3,1)}
@keyframes arqin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@media (prefers-reduced-motion:reduce){.arqapp *{animation:none!important;transition:none!important}}
.arqapp .eyebrow{display:flex;align-items:center;gap:12px;font-family:var(--font-display);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin-bottom:8px}
.arqapp .eyebrow::after{content:"";height:1px;flex:1;background:var(--line)}
.arqapp .lead{color:var(--ink-soft);font-size:var(--step);margin-top:0}

.arqapp .card{background:var(--surface);border:1px solid var(--line);border-radius:var(--radius);padding:20px;margin:14px 0}
.arqapp .card.locked{opacity:.55}
.arqapp .card h3{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.arqapp .tag{font-family:var(--font-display);font-size:.7rem;letter-spacing:.08em;text-transform:uppercase;background:var(--surface-2);color:var(--ink-soft);padding:3px 9px;border-radius:99px}
.arqapp .chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}
.arqapp .chips span{background:var(--surface-2);padding:4px 10px;border-radius:99px;font-size:.82rem}
.arqapp .field{margin:10px 0}
.arqapp .field b{display:block;font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-2);margin-bottom:2px;font-family:var(--font-display)}
.arqapp .cta{background:var(--accent);color:#07223a;font-weight:650;padding:11px 18px}
.arqapp .cta:hover:not(:disabled){filter:brightness(1.08)}
.arqapp .cta.ghost{background:transparent;color:var(--ink);border:1px solid var(--line)}
.arqapp .cta:disabled{opacity:.45;cursor:not-allowed;filter:none}
.arqapp .check{display:flex;gap:9px;align-items:flex-start;padding:5px 0;font-size:.92rem}
.arqapp .check input{margin-top:5px;accent-color:var(--accent);flex:0 0 auto}
.arqapp textarea{width:100%;min-height:170px;background:var(--bg);color:var(--ink);border:1px solid var(--line);border-radius:10px;padding:12px;font:inherit;resize:vertical}
.arqapp textarea:focus-visible,.arqapp button:focus-visible{outline:2px solid var(--accent-2);outline-offset:2px}
.arqapp .opt{display:block;width:100%;text-align:left;background:var(--surface-2);color:var(--ink);padding:13px 15px;margin:7px 0;border:1px solid transparent;transition:transform .15s,border-color .2s}
.arqapp .opt:hover:not(:disabled){transform:translateX(4px);border-color:var(--accent)}
.arqapp .opt.ok{border-color:var(--accent);background:rgba(110,198,232,.16)}
.arqapp .opt.bad{border-color:var(--danger);background:rgba(228,105,95,.16)}
.arqapp .fb{border-left:3px solid var(--accent);padding:12px 15px;margin-top:14px;background:var(--surface-2);border-radius:0 10px 10px 0}
.arqapp .fb.miss{border-color:var(--danger)}
.arqapp table{width:100%;border-collapse:collapse;font-size:.9rem}
.arqapp td,.arqapp th{border-bottom:1px solid var(--line);padding:8px 6px;text-align:left;vertical-align:top}
.arqapp pre{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:12px;overflow-x:auto;font-size:.85rem}
.arqapp .grid2{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.arqapp .gate{margin-top:22px;padding-top:18px;border-top:1px dashed var(--line);display:flex;gap:12px;align-items:center;flex-wrap:wrap}
.arqapp .gate p{margin:0;font-size:.85rem;color:var(--ink-soft)}

.arqapp .seg{display:inline-flex;background:var(--surface-2);border-radius:99px;padding:3px;gap:3px}
.arqapp .seg button{background:transparent;color:var(--ink-soft);padding:7px 15px;border-radius:99px;font-size:.85rem;transition:background .2s,color .2s}
.arqapp .seg button[aria-pressed="true"]{background:var(--accent);color:#07223a;font-weight:650}
.arqapp .keyrow{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-top:12px}
.arqapp .hint{font-size:.78rem;color:var(--ink-soft);margin:6px 0 0}
.arqapp .spin{display:inline-block;width:14px;height:14px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:arqsp .7s linear infinite;vertical-align:-2px;margin-right:8px}
@keyframes arqsp{to{transform:rotate(360deg)}}
.arqapp .st{display:flex;gap:10px;align-items:flex-start;padding:8px 0;border-bottom:1px solid var(--line);font-size:.9rem}
.arqapp .st:last-child{border-bottom:0}
.arqapp .pill{font-family:var(--font-display);font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:99px;flex:0 0 auto;margin-top:3px}
.arqapp .pill.claro{background:rgba(110,198,232,.22);color:var(--accent)}
.arqapp .pill.vago{background:rgba(242,147,74,.22);color:var(--accent-2)}
.arqapp .pill.ausente{background:rgba(228,105,95,.22);color:var(--danger)}
.arqapp .src{font-size:.75rem;color:var(--ink-soft)}

@media (max-width:820px){
  .arqapp .shell{grid-template-columns:1fr}
  .arqapp .side{position:static;max-height:none;border-right:0;border-bottom:1px solid var(--line)}
  .arqapp .nav{grid-template-columns:1fr 1fr}
}
@media print{
  .arqapp{background:#fff;background-image:none;--bg:#fff;--surface:#fff;--surface-2:#f4f4f7;--ink:#111;--ink-soft:#444;--line:#bbb}
  .arqapp .side,.arqapp .gate,.arqapp .no-print{display:none!important}
  .arqapp .shell{display:block}
  .arqapp main{max-width:none;padding:0}
  .arqapp .card{break-inside:avoid;border-color:#ccc}
}
`;

/* ===================================================================
   Motor
   =================================================================== */
const ETAPAS = [
  { id: "escalera", t: "Escalera de aprendizaje", eyebrow: "Etapa 1", h: "Escalera de aprendizaje", lead: "Cinco niveles, de cero a poder resolver problemas nuevos. Cada nivel se desbloquea al completar el anterior." },
  { id: "plan", t: "Plan de 20 horas", eyebrow: "Etapa 2", h: "Plan de 20 horas", lead: "Diez sesiones de dos horas contra los capítulos 1 al 8. Marca cada una al terminarla." },
  { id: "quiz", t: "Quiz adaptativo", eyebrow: "Etapa 3", h: "Quiz adaptativo", lead: "Diez preguntas, de más fácil a más difícil, con feedback inmediato." },
  { id: "cheat", t: "Cheat sheet", eyebrow: "Etapa 4", h: "Cheat sheet", lead: "Todo el tema en una página, con trece casos reales, lista para imprimir." },
  { id: "recursos", t: "Recursos clave", eyebrow: "Etapa 5", h: "Recursos clave", lead: "Los cinco que valen tu tiempo, y un plan de 7 días para usarlos." },
  { id: "feynman", t: "Loop Feynman", eyebrow: "Etapa 6", h: "Loop Feynman", lead: "Si no lo puedes explicar simple, no lo entendiste. Repite hasta que salga claro." },
];

const UMBRAL_SESIONES = 5;
const UMBRAL_QUIZ = 6;
const MODELO = "claude-sonnet-4-6";

const norm = (s) =>
  String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9ñ ]/g, " ").replace(/\s+/g, " ");

/* Revisión local: determinista, sin red. Exportable y testeable. */
export function calcularLocal(txt) {
  const t = " " + norm(txt) + " ";
  const pal = txt.trim().split(/\s+/).filter(Boolean).length;
  const ok = [], falta = [], avisos = [];
  CONTENIDO.feynman.conceptosClave.forEach((c) => {
    const cubierto = [c.concepto, ...(c.sinonimos || [])].some((k) => t.includes(norm(k)));
    if (cubierto) ok.push(c.concepto); else falta.push(c);
  });
  const pct = Math.round((ok.length / CONTENIDO.feynman.conceptosClave.length) * 100);
  if (pal < 80) avisos.push(`Solo escribiste ${pal} palabras: demasiado corto para explicar el tema de verdad.`);
  if (!/porque|así|es decir|por ejemplo|imagina|como si|sirve para/i.test(txt))
    avisos.push("No aparece ninguna causa, ejemplo ni analogía. Explicar es conectar, no enumerar.");
  const ini = norm(CONTENIDO.feynman.explicacionSimple).slice(0, 90);
  if (ini && t.includes(ini)) avisos.push("Parece copiado de la explicación de arriba. Reescríbelo con tus propias palabras.");
  const aprobado = pct >= 80 && pal >= 80 && avisos.length === 0;
  return {
    fuente: "local", pct, ok, falta, avisos, aprobado,
    veredicto: aprobado ? "Tu explicación se sostiene sola."
      : pct >= 50 ? "Vas bien, pero hay huecos visibles." : "Todavía falta lo esencial.",
  };
}

export function promptFeynman(txt) {
  const f = CONTENIDO.feynman;
  return `Eres un evaluador exigente y justo. Un estudiante de ingeniería en software intenta explicar "${CONTENIDO.tema}" con sus propias palabras, siguiendo la técnica Feynman.

Conceptos que su explicación debe demostrar que entiende:
${f.conceptosClave.map((c, i) => `${i + 1}. ${c.concepto} — señal de dominio: ${c.pista}`).join("\n")}

Explicación de referencia (NO es la respuesta esperada; si el estudiante la parafrasea casi igual, márcalo como copia en errores):
"""${f.explicacionSimple}"""

Explicación del estudiante:
"""${txt}"""

Evalúa comprensión real, no presencia de palabras. Nombrar un concepto sin explicarlo es "vago". Una afirmación incorrecta es más grave que una omisión y va en "errores". Aprueba solo si explica los conceptos con sus propias palabras y no hay errores de fondo. Escribe en español, dirigiéndote al estudiante de tú.

Responde ÚNICAMENTE con este JSON, sin texto antes ni después y sin backticks:
{"cobertura":<0-100>,"aprobado":<true|false>,"veredicto":"<una frase directa>","conceptos":[{"concepto":"<nombre exacto de la lista>","estado":"claro|vago|ausente","comentario":"<una frase>"}],"aciertos":["<lo que explicó bien>"],"errores":["<afirmaciones incorrectas; vacío si no hay>"],"siguientePaso":"<qué reescribir en el próximo intento>"}`;
}

/* ===================================================================
   Piezas de UI
   =================================================================== */
function Gate({ ok, texto, onAvanzar, label = "Desbloquear la siguiente etapa →" }) {
  return (
    <div className="gate">
      <button className="cta" disabled={!ok} onClick={onAvanzar}>{label}</button>
      <p>{texto}</p>
    </div>
  );
}

function Escalera({ niveles, toggle, onAvanzar }) {
  const hechos = niveles.filter(Boolean).length;
  return (
    <>
      {CONTENIDO.escalera.map((n, i) => {
        const abierto = i === 0 || niveles[i - 1];
        return (
          <article className={"card" + (abierto ? "" : " locked")} key={i}>
            <h3>{i + 1}. {n.nombre} <span className="tag">{abierto ? "disponible" : "requiere nivel " + i}</span></h3>
            <p>{n.descripcion}</p>
            <div className="chips">{n.conceptos.map((x, j) => <span key={j}>{x}</span>)}</div>
            <div className="field"><b>Ejercicio</b>{n.ejercicio}</div>
            <div className="field"><b>Hito</b>{n.hito}</div>
            <div className="field"><b>Autoevaluación</b>
              {n.autoevaluacion.map((x, j) => (
                <label className="check" key={j}>
                  <input type="checkbox" disabled checked={!!niveles[i]} readOnly /><span>{x}</span>
                </label>
              ))}
            </div>
            <button className={"cta" + (niveles[i] ? " ghost" : "")} disabled={!abierto} onClick={() => toggle(i)}>
              {niveles[i] ? "✓ Completado" : "Marcar nivel como completado"}
            </button>
          </article>
        );
      })}
      <Gate ok={hechos === 5} onAvanzar={onAvanzar}
        texto={hechos === 5 ? "Los 5 niveles están completos." : `Faltan ${5 - hechos} niveles.`} />
    </>
  );
}

function Plan({ sesiones, toggle, onAvanzar }) {
  const hechas = sesiones.filter(Boolean).length;
  return (
    <>
      <div className="card">
        <h3>Avance: {hechas} de 10 sesiones · {hechas * 2} de 20 horas</h3>
        <div className="bar"><i style={{ width: hechas * 10 + "%" }} /></div>
      </div>
      {CONTENIDO.plan.map((s, i) => (
        <article className="card" key={i}>
          <h3>Sesión {i + 1} · {s.titulo} <span className="tag">2 h</span></h3>
          <div className="bar" style={{ marginBottom: 10 }}><i style={{ width: sesiones[i] ? "100%" : "0%" }} /></div>
          <div className="field"><b>Objetivo</b>{s.objetivo}</div>
          <div className="chips">{s.conceptos.map((x, j) => <span key={j}>{x}</span>)}</div>
          <div className="field"><b>Ejercicio</b>{s.ejercicio}</div>
          <div className="field"><b>Recurso</b>{s.recurso}</div>
          <button className={"cta" + (sesiones[i] ? " ghost" : "")} onClick={() => toggle(i)}>
            {sesiones[i] ? "✓ Sesión hecha" : "Marcar sesión como hecha"}
          </button>
        </article>
      ))}
      <Gate ok={hechas >= UMBRAL_SESIONES} onAvanzar={onAvanzar}
        texto={hechas >= UMBRAL_SESIONES ? "Suficiente base para el quiz."
          : `Completa al menos ${UMBRAL_SESIONES} de las 10 sesiones (llevas ${hechas}).`} />
    </>
  );
}

function Quiz({ q, responder, siguiente, reiniciar, onAvanzar }) {
  const preguntas = CONTENIDO.quiz;
  if (q.i >= preguntas.length) {
    const areas = Object.entries(q.areas)
      .map(([a, v]) => ({ a, pct: Math.round((v.ok / v.n) * 100) }))
      .sort((x, y) => y.pct - x.pct);
    const fuertes = areas.filter((x) => x.pct >= 70);
    const debiles = areas.filter((x) => x.pct < 70);
    return (
      <>
        <div className="card">
          <h3>Puntaje: {q.ok} de {preguntas.length}</h3>
          <div className="bar"><i style={{ width: (q.ok / preguntas.length) * 100 + "%" }} /></div>
          <div className="grid2" style={{ marginTop: 16 }}>
            <div><h3 style={{ fontSize: "1rem" }}>Áreas fuertes</h3>
              {fuertes.length ? fuertes.map((x) => <p key={x.a}>✓ {x.a} — {x.pct}%</p>) : <p>Ninguna sobre 70% todavía.</p>}
            </div>
            <div><h3 style={{ fontSize: "1rem" }}>Áreas por reforzar</h3>
              {debiles.length ? debiles.map((x) => <p key={x.a}>→ {x.a} — {x.pct}%</p>) : <p>Sin áreas débiles.</p>}
            </div>
          </div>
          <button className="cta ghost" style={{ marginTop: 14 }} onClick={reiniciar}>Repetir el quiz</button>
        </div>
        <Gate ok={q.ok >= UMBRAL_QUIZ} onAvanzar={onAvanzar}
          texto={q.ok >= UMBRAL_QUIZ ? "Aprobado." : `Necesitas ${UMBRAL_QUIZ} de 10 para avanzar. Repite el quiz.`} />
      </>
    );
  }
  const it = preguntas[q.i];
  const el = q.resuelta;
  return (
    <div className="card">
      <div className="tag">Pregunta {q.i + 1} de {preguntas.length} · dificultad {q.i + 1}/10 · {it.area}</div>
      <h3 style={{ marginTop: 10 }}>{it.pregunta}</h3>
      {it.opciones.map((o, i) => {
        let cl = "";
        if (el) cl = i === it.correcta ? " ok" : i === q.elegida ? " bad" : "";
        return <button className={"opt" + cl} disabled={el} key={i} onClick={() => responder(i)}>{o}</button>;
      })}
      {el && (
        <div className={"fb" + (q.elegida === it.correcta ? "" : " miss")}>
          <b>{q.elegida === it.correcta ? "Correcto" : "Incorrecto"}</b>
          <p>{it.explicacion}</p>
          {q.elegida !== it.correcta && <p><b>Repasemos el concepto:</b> {it.reexplicacion}</p>}
          <button className="cta" onClick={siguiente}>Siguiente pregunta →</button>
        </div>
      )}
    </div>
  );
}

function Cheat({ onAvanzar }) {
  const c = CONTENIDO.cheatsheet;
  return (
    <>
      <div className="no-print" style={{ marginBottom: 14 }}>
        <button className="cta" onClick={() => window.print()}>Imprimir / guardar como PDF</button>
      </div>
      <div className="card"><h3>Qué es</h3><p>{c.definicion}</p></div>
      <div className="card"><h3>Conceptos clave</h3>
        <table><tbody>
          {c.conceptos.map((x, i) => <tr key={i}><th style={{ width: "30%" }}>{x.termino}</th><td>{x.definicion}</td></tr>)}
        </tbody></table>
      </div>
      <div className="card"><h3>Casos reales</h3>
        {c.ejemplos.map((e, i) => (
          <div className="field" key={i}><b>{e.titulo}</b>{e.codigo ? <pre>{e.codigo}</pre> : e.texto}</div>
        ))}
      </div>
      <div className="card"><h3>Errores comunes</h3>
        <table><thead><tr><th>Error</th><th>Cómo se corrige</th></tr></thead><tbody>
          {c.errores.map((x, i) => <tr key={i}><td>{x.error}</td><td>{x.correccion}</td></tr>)}
        </tbody></table>
      </div>
      <Gate ok onAvanzar={onAvanzar} texto="Ya puedes pasar a los recursos." />
    </>
  );
}

function Recursos({ onAvanzar }) {
  return (
    <>
      {CONTENIDO.recursos.map((r, i) => (
        <article className="card" key={i}>
          <h3>#{i + 1} {r.nombre} <span className="tag">{r.tipo}</span> <span className="tag">{r.nivel}</span></h3>
          <p>{r.porQue}</p>
          {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer">{r.url}</a>}
        </article>
      ))}
      <div className="card"><h3>Plan de 7 días con estos recursos</h3>
        <table>
          <thead><tr><th>Día</th><th>Qué hacer</th><th>Recurso</th><th>Tiempo</th></tr></thead>
          <tbody>{CONTENIDO.plan7dias.map((d, i) => (
            <tr key={i}><td><b>{d.dia}</b></td><td>{d.actividad}</td><td>{d.recurso}</td><td>{d.tiempo}</td></tr>
          ))}</tbody>
        </table>
      </div>
      <Gate ok onAvanzar={onAvanzar} texto="Última etapa: explicarlo con tus palabras." />
    </>
  );
}

function Resultado({ r }) {
  return (
    <div className="card">
      <h3>3 · Qué entendiste y qué falta</h3>
      <div className="bar"><i style={{ width: r.pct + "%" }} /></div>
      <p style={{ marginTop: 8 }}>
        <b>Cobertura: {r.pct}%</b> — {r.veredicto}{" "}
        <span className="src">· {r.fuente === "api" ? "revisado por Claude" : "revisión local"}</span>
      </p>

      {r.fuente === "api" ? (
        <>
          <div className="field"><b>Concepto por concepto</b>
            {(r.conceptos || []).map((c, i) => (
              <div className="st" key={i}>
                <span className={"pill " + c.estado}>{c.estado}</span>
                <span><b>{c.concepto}</b> — {c.comentario}</span>
              </div>
            ))}
          </div>
          {!!(r.aciertos || []).length && (
            <div className="field"><b>Lo que explicaste bien</b>
              {r.aciertos.map((x, i) => <p style={{ margin: "2px 0" }} key={i}>✓ {x}</p>)}
            </div>
          )}
          {!!(r.errores || []).length && (
            <div className="fb miss"><b>Afirmaciones incorrectas</b>
              {r.errores.map((x, i) => <p style={{ margin: "2px 0" }} key={i}>✗ {x}</p>)}
            </div>
          )}
          {r.siguientePaso && <div className="field"><b>Siguiente intento</b>{r.siguientePaso}</div>}
        </>
      ) : (
        <>
          <div className="grid2">
            <div><h3 style={{ fontSize: "1rem" }}>Cubierto</h3>
              {r.ok.length ? r.ok.map((x, i) => <p key={i}>✓ {x}</p>) : <p>Nada todavía.</p>}
            </div>
            <div><h3 style={{ fontSize: "1rem" }}>Falta o está vago</h3>
              {r.falta.length ? r.falta.map((x, i) => <p key={i}>→ <b>{x.concepto}</b>: {x.pista}</p>) : <p>Nada pendiente.</p>}
            </div>
          </div>
          {(r.avisos || []).map((a, i) => <div className="fb miss" key={i}>{a}</div>)}
        </>
      )}

      {r.aprobado ? (
        <div className="fb"><b>Explicación clara y completa.</b> Cerraste el loop: ya puedes enseñar el tema.</div>
      ) : (
        <div className="fb miss">Ajusta tu texto arriba y vuelve a evaluar. El loop se repite hasta que la explicación esté completa.</div>
      )}
    </div>
  );
}

function Feynman({ estado, setEstado, onAprobar }) {
  const f = CONTENIDO.feynman;
  const { texto, modo, res, cargando, errorApi, intentos } = estado;
  const api = modo === "api";

  const aplicar = (r, extra = {}) => {
    setEstado((s) => ({ ...s, res: r, cargando: false, ...extra }));
    if (r.aprobado) onAprobar();
  };

  const evaluarLocal = () => {
    setEstado((s) => ({ ...s, intentos: s.intentos + 1, errorApi: "" }));
    aplicar(calcularLocal(texto));
  };

  const evaluarConAPI = async () => {
    if (texto.trim().split(/\s+/).filter(Boolean).length < 15) {
      setEstado((s) => ({ ...s, intentos: s.intentos + 1, errorApi: "" }));
      aplicar(calcularLocal(texto));
      return;
    }
    setEstado((s) => ({ ...s, intentos: s.intentos + 1, cargando: true, errorApi: "" }));
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: MODELO, max_tokens: 1000,
          messages: [{ role: "user", content: promptFeynman(texto) }],
        }),
      });
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      const data = await resp.json();
      const crudo = (data.content || []).filter((b) => b.type === "text").map((b) => b.text)
        .join("").replace(/```json|```/g, "").trim();
      const j = JSON.parse(crudo.slice(crudo.indexOf("{"), crudo.lastIndexOf("}") + 1));
      if (typeof j.cobertura !== "number" || !Array.isArray(j.conceptos))
        throw new Error("la respuesta no tiene la forma esperada");
      aplicar({
        fuente: "api",
        pct: Math.max(0, Math.min(100, Math.round(j.cobertura))),
        aprobado: j.aprobado === true,
        veredicto: j.veredicto || "",
        conceptos: j.conceptos,
        aciertos: j.aciertos || [],
        errores: j.errores || [],
        siguientePaso: j.siguientePaso || "",
      });
    } catch (e) {
      aplicar(calcularLocal(texto), { errorApi: String((e && e.message) || e) });
    }
  };

  return (
    <>
      <div className="card">
        <h3>1 · Cómo lo explico yo, en simple</h3>
        <p>{f.explicacionSimple}</p>
        <div className="field"><b>Analogía</b>{f.analogia}</div>
      </div>

      <div className="card">
        <h3>2 · Ahora explícalo tú</h3>
        <p className="lead" style={{ fontSize: ".92rem" }}>
          Escribe como si le hablaras a alguien que no estudia software. Sin copiar. Mínimo 80 palabras.
        </p>
        <div className="chips">{f.preguntasGuia.map((p, i) => <span key={i}>{p}</span>)}</div>
        <textarea
          value={texto}
          placeholder="Empieza: «La arquitectura de software sirve para…»"
          onChange={(e) => setEstado((s) => ({ ...s, texto: e.target.value }))}
        />
        <div className="keyrow">
          <div className="seg" role="group" aria-label="Modo de evaluación">
            <button aria-pressed={!api} onClick={() => setEstado((s) => ({ ...s, modo: "local", errorApi: "" }))}>Revisión local</button>
            <button aria-pressed={api} onClick={() => setEstado((s) => ({ ...s, modo: "api", errorApi: "" }))}>Revisión con Claude</button>
          </div>
          <button className="cta" disabled={cargando} onClick={api ? evaluarConAPI : evaluarLocal}>
            {cargando ? <><span className="spin" />Claude está leyendo tu explicación…</> : "Evaluar mi explicación"}
          </button>
          <span className="src">Intento {intentos}</span>
        </div>
        <p className="hint">
          {api
            ? "La revisión con Claude juzga si de verdad entendiste, no si usaste las palabras, y señala afirmaciones incorrectas. Si algo falla, cae automáticamente a la revisión local."
            : "La revisión local es instantánea y funciona sin conexión: mide qué conceptos nombraste, la extensión y si hay razonamiento o ejemplos. No juzga si lo que dijiste es correcto."}
        </p>
      </div>

      {errorApi && (
        <div className="card">
          <div className="fb miss">
            <b>No se pudo usar la revisión con Claude</b>
            <p>{errorApi}</p>
            <p>Abajo tienes la revisión local del mismo texto.</p>
          </div>
        </div>
      )}

      {res && <Resultado r={res} />}
    </>
  );
}

/* ===================================================================
   App
   =================================================================== */
export default function AppArquitectura() {
  const [etapa, setEtapa] = useState(0);
  const [max, setMax] = useState(0);
  const [niveles, setNiveles] = useState(Array(5).fill(false));
  const [sesiones, setSesiones] = useState(Array(10).fill(false));
  const [q, setQ] = useState({ i: 0, ok: 0, areas: {}, resuelta: false, elegida: null });
  const [fey, setFey] = useState({ texto: "", modo: "local", res: null, cargando: false, errorApi: "", intentos: 0 });
  const tope = useRef(null);

  useEffect(() => {
    if (tope.current) tope.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [etapa]);

  const ir = (i) => { if (i <= max) setEtapa(i); };
  const avanzar = () => {
    setMax((m) => Math.max(m, etapa + 1));
    setEtapa((e) => Math.min(e + 1, ETAPAS.length - 1));
  };

  const toggleNivel = (i) => setNiveles((n) => n.map((v, j) => (j === i ? !v : v)));
  const toggleSesion = (i) => setSesiones((s) => s.map((v, j) => (j === i ? !v : v)));

  const responder = (i) => {
    if (q.resuelta) return;
    const it = CONTENIDO.quiz[q.i];
    const acierto = i === it.correcta;
    setQ((prev) => {
      const areas = { ...prev.areas };
      const a = areas[it.area] ? { ...areas[it.area] } : { ok: 0, n: 0 };
      a.n += 1; if (acierto) a.ok += 1;
      areas[it.area] = a;
      return { ...prev, elegida: i, resuelta: true, ok: prev.ok + (acierto ? 1 : 0), areas };
    });
  };
  const siguiente = () => setQ((p) => ({ ...p, i: p.i + 1, resuelta: false, elegida: null }));
  const reiniciar = () => setQ({ i: 0, ok: 0, areas: {}, resuelta: false, elegida: null });

  const E = ETAPAS[etapa];
  const pct = Math.round((max / ETAPAS.length) * 100 + 8);

  return (
    <div className="arqapp">
      <style>{CSS}</style>
      <div className="shell">
        <aside className="side">
          <div className="brand">Arquitectura de Software
            <small>Capítulos 1–8 · Richards &amp; Ford · 6 etapas</small>
          </div>
          <div className="gauge">
            <span>Etapa {etapa + 1} de {ETAPAS.length}</span>
            <div className="bar"><i style={{ width: Math.min(pct, 100) + "%" }} /></div>
          </div>
          <ul className="nav">
            {ETAPAS.map((e, i) => (
              <li key={e.id}>
                <button disabled={i > max} aria-current={i === etapa} onClick={() => ir(i)}>
                  <span className="n">{i + 1}</span>
                  <span className="t">{e.t}</span>
                  {i < max ? <span className="done">✓</span> : i > max ? <span className="done">🔒</span> : null}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main>
          <div ref={tope} />
          <section className="stage" key={E.id}>
            <div className="eyebrow">{E.eyebrow}</div>
            <h1>{E.h}</h1>
            <p className="lead">{E.lead}</p>

            {E.id === "escalera" && <Escalera niveles={niveles} toggle={toggleNivel} onAvanzar={avanzar} />}
            {E.id === "plan" && <Plan sesiones={sesiones} toggle={toggleSesion} onAvanzar={avanzar} />}
            {E.id === "quiz" && <Quiz q={q} responder={responder} siguiente={siguiente} reiniciar={reiniciar} onAvanzar={avanzar} />}
            {E.id === "cheat" && <Cheat onAvanzar={avanzar} />}
            {E.id === "recursos" && <Recursos onAvanzar={avanzar} />}
            {E.id === "feynman" && <Feynman estado={fey} setEstado={setFey} onAprobar={() => setMax(ETAPAS.length)} />}
          </section>
        </main>
      </div>
    </div>
  );
}

# 💣 Buscaminas - Juego Interactivo

Un juego clásico de Buscaminas construido con HTML5, CSS3 y JavaScript puro, sin dependencias externas.

## 🎮 Características

- **Tableros Personalizables**: Elige el tamaño del tablero y el número de minas
- **3 Niveles de Dificultad**:
  - 🟢 **Fácil**: 8x8 con 10 minas
  - 🟡 **Medio**: 12x12 con 40 minas
  - 🔴 **Difícil**: 16x16 con 99 minas
- **Sistema de Temporizador**: Mide tu velocidad y desempeño
- **Tabla de Clasificación**: Guarda tu nombre y tiempo para los 10 mejores jugadores
- **Persistencia**: Los marcadores se guardan en localStorage del navegador
- **Interfaz Responsiva**: Funciona perfectamente en dispositivos móviles y de escritorio

## 🕹️ Cómo Jugar

1. **Click Izquierdo**: Revelar una celda
   - Si contiene una mina, ¡pierdes!
   - Si contiene un número, te muestra cuántas minas hay alrededor
   - Si está vacía (0 minas cercanas), se revelan automáticamente las celdas adyacentes

2. **Click Derecho**: Colocar una bandera 🚩
   - Marca las celdas que crees que contienen minas
   - Ayuda a llevar el control de las minas

3. **Objetivo**: Revelar todas las celdas que NO contienen minas
   - El juego termina cuando encuentras todas las minas (¡ganas!)
   - O cuando pisas una mina (¡pierdes!)

## 📊 Controles

- **Dimensiones del Tablero**: Configura filas y columnas (5-20)
- **Número de Minas**: Ajusta el nivel de dificultad personalizado
- **Tu Nombre**: Guarda tu puntuación con tu nombre en el marcador
- **Selecciona Dificultad**: Atajos rápidos para fácil, medio o difícil

## 📈 Estadísticas en Vivo

El juego muestra en tiempo real:
- **Minas Restantes**: Número de minas menos el número de banderas colocadas
- **Tiempo**: Cronómetro que comienza con el primer click
- **Celdas Reveladas**: Contador del progreso

## 🏆 Tabla de Clasificación

- **Top 10 Mejores Marcas**: Ordenadas por tiempo más rápido
- **Información Guardada**: Nombre, tiempo, dificultad, tamaño del tablero
- **Almacenamiento Local**: Los datos se guardan en tu navegador
- **Limpiar Marcadores**: Opción para resetear la tabla de clasificación

## 🎨 Diseño

- Interfaz moderna con gradientes y sombras
- Colores intuitivos para diferentes estados de las celdas
- Animaciones suaves y transiciones
- Totalmente accesible y responsivo

## 🚀 Cómo Usar

1. Descarga o clona este repositorio
2. Abre `index.html` en tu navegador web
3. ¡Comienza a jugar!

No requiere instalación ni dependencias. Es solo HTML, CSS y JavaScript.

## 📱 Compatibilidad

- Chrome, Firefox, Safari, Edge y otros navegadores modernos
- Escritorio, tablet y dispositivos móviles
- Funciona sin conexión a internet

## 🔧 Estructura del Proyecto

```
buscaminas/
├── index.html      # Estructura HTML y estilos CSS
├── game.js         # Lógica del juego
└── README.md       # Este archivo
```

## 📝 Notas Técnicas

- Primera celda revelada nunca contiene mina (garantizado)
- Las minas se colocan después del primer click
- Las celdas vacías revelan automáticamente vecinos
- Sistema de banderas para marcar minas sospechosas
- Validación de entrada para dimensiones y minas

## 🎯 Tips de Juego

1. **Comienza por los bordes**: Normalmente hay menos minas en los extremos
2. **Usa las banderas**: Marca las minas que identifiques para llevar el control
3. **Mira los patrones**: Los números te dicen exactamente cuántas minas hay cerca
4. **Sé rápido**: La tabla de clasificación ordena por tiempo

¡Diviértete jugando y trata de conseguir el mejor tiempo! 🎮

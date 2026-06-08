# 💀 BUSCAMINAS - Juego de Minas

Un juego clásico de Buscaminas construido con **HTML5, CSS3 y JavaScript puro**, sin dependencias externas.

## 🎮 ¡JUGAR AHORA! 

### ⚡ Opción 1: Abrir Online (SIN descargar) - RECOMENDADO

**👉 [JUGAR BUSCAMINAS AQUÍ](https://dimade0001-dotcom.github.io/buscaminas/)**

> Haz clic en el enlace anterior para jugar directamente en tu navegador

---

### 📥 Opción 2: Descargar y Jugar Localmente

1. **Descarga los archivos:**
   - Ve a: https://github.com/dimade0001-dotcom/buscaminas
   - Click en "Code" → "Download ZIP"

2. **Extrae la carpeta**

3. **Abre el juego:**
   - Busca el archivo `index.html`
   - Haz doble clic para abrir en tu navegador

---

## 🕹️ Cómo Jugar

### Controles Básicos:
- **Click Izquierdo** 🖱️ - Revelar una celda
  - Si contiene una mina, **¡pierdes!**
  - Si contiene un número, muestra cuántas minas hay alrededor
  - Si está vacía (0), se revelan automáticamente las celdas adyacentes

- **Click Derecho** 🖱️ - Colocar/quitar una bandera 🚩
  - Marca las celdas que crees que contienen minas
  - Ayuda a llevar el control

### Objetivo:
✅ Revelar todas las celdas que **NO** contienen minas

---

## 🎯 Niveles de Dificultad

| Nivel | Tamaño | Minas | Dificultad |
|-------|--------|-------|-----------|
| 🟢 Fácil | 8x8 | 10 | Perfecto para principiantes |
| 🟡 Medio | 12x12 | 40 | Desafío moderado |
| 🔴 Difícil | 16x16 | 99 | Para expertos |
| ⚙️ Personalizado | 5-20 | Cualquiera | A tu gusto |

---

## 🎮 Características

✅ **Tableros Personalizables** - Elige el tamaño y número de minas
✅ **3 Niveles Preestablecidos** - Fácil, Medio, Difícil
✅ **Cronómetro** - Mide tu velocidad
✅ **Tabla de Clasificación** - Top 10 mejores puntuaciones
✅ **Almacenamiento Local** - Los marcadores se guardan en tu navegador
✅ **Tema Oscuro** 💀 - Diseño rojo y negro elegante
✅ **Responsivo** - Funciona en móviles y computadoras
✅ **Sin dependencias** - Solo HTML, CSS y JavaScript puro

---

## 📊 Estadísticas en Vivo

El juego muestra en tiempo real:
- 💣 **Minas restantes** - Número de minas menos banderas colocadas
- ⏱️ **Tiempo** - Cronómetro del juego
- 📊 **Celdas reveladas** - Contador de progreso

---

## 🏆 Sistema de Puntuaciones

- **Guardado automático** al ganar
- **Top 10 mejores marcas** ordenadas por tiempo
- **Medallas:** 🥇 Oro (1°) 🥈 Plata (2°) 🥉 Bronce (3°)
- **Información guardada:** Nombre, tiempo, dificultad, tamaño del tablero
- **Persistencia:** Datos guardados en localStorage del navegador

---

## 💡 Tips de Juego

1. **Comienza por los bordes** - Normalmente hay menos minas en los extremos
2. **Usa las banderas** - Marca las minas que identifiques para llevar control
3. **Lee los números** - Te dicen exactamente cuántas minas hay cerca
4. **Sé rápido** - La tabla de clasificación ordena por tiempo más corto
5. **Memoriza patrones** - Con experiencia, identificarás minas más fácilmente

---

## 📱 Compatibilidad

✅ Chrome / Chromium
✅ Firefox
✅ Safari
✅ Edge
✅ Opera
✅ Android (navegadores móviles)
✅ iOS (Safari)
✅ Funciona sin conexión a internet

---

## 📁 Estructura de Archivos

```
buscaminas/
├── index.html      # Estructura HTML y estilos CSS
├── game.js         # Lógica del juego (JavaScript)
├── README.md       # Este archivo (documentación)
└── [otros archivos de GitHub]
```

---

## 🔧 Técnica

- **HTML5** - Semántica moderna
- **CSS3** - Gradientes, animaciones, responsive design
- **JavaScript ES6+** - Clases, arrow functions, spread operator
- **localStorage** - Persistencia de datos en el navegador
- **Sin frameworks** - Código vanilla puro

---

## 🎓 Aprendizaje

Este proyecto es perfecto para aprender:
- Manipulación del DOM
- Event listeners
- Algoritmos de juegos
- CSS moderno y animaciones
- localStorage y JSON
- Programación orientada a objetos (OOP)

---

## 📝 Notas Técnicas

- ✅ Primera celda revelada nunca contiene mina
- ✅ Las minas se colocan tras el primer click
- ✅ Las celdas vacías revelan automáticamente vecinos
- ✅ Sistema robusto de validación de entrada
- ✅ Manejo de errores con try-catch
- ✅ Mensajes de debug en consola para troubleshooting

---

## 🚀 Comienza Ahora

**[👉 JUEGA AQUÍ - HABILITAR GITHUB PAGES](https://dimade0001-dotcom.github.io/buscaminas/)**

*Si el enlace no funciona, habilita GitHub Pages en los Settings del repositorio*

---

*Última actualización: 8 de Junio 2026*

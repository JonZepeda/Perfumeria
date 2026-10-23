# ✦ Catálogo Árabes | Perfumería Árabe · Guatemala

Catálogo web interactivo de perfumería árabe con estética **All-Black & Arabic Gold**, diseñado para consulta rápida de pirámides olfativas (`Salida`, `Corazón`, `Fondo`), filtrado por ocasión (`🌙 Noche` / `☀️ Día`), ordenamiento por precios en Quetzales (`GTQ`) y pedidos directos vía **WhatsApp**.

🌐 **Demo en vivo (GitHub Pages):** `https://jonzepeda.github.io/Perfumeria/`

---

## 📁 Estructura del Proyecto

```text
Perfumeria/
├── index.html                        # Página principal del catálogo (SEO & OpenGraph)
├── .nojekyll                         # Desactiva procesamiento Jekyll en GitHub Pages
├── .github/
│   └── workflows/
│       └── deploy-pages.yml          # Workflow oficial de despliegue en GitHub Pages
├── assets/
│   ├── css/
│   │   └── styles.css                # Hoja de estilos unificada (Diseño Árabe Premium)
│   ├── js/
│   │   └── app.js                    # Buscador sin tildes/mayúsculas, filtros y ordenamiento
│   └── img/
│       ├── favicon.svg               # Ícono vectorial dorado
│       └── products/                 # 25 imágenes optimizadas de fragancias
└── data/
    └── products.json                 # Base de datos estructurada del catálogo (25 perfumes)
```

---

## ✨ Características Principales

- **Búsqueda Inteligente en Tiempo Real**: Filtra por nombre del perfume, casa perfumera o cualquier nota olfativa (ej. *vainilla, oud, cardamomo, café, cereza*) ignorando mayúsculas y tildes.
- **Filtros por Ocasión**: Selección instantánea entre `✦ Todos (25)`, `🌙 Noche (12)` y `☀️ Día (13)`.
- **Ordenamiento Dinámico**: Orden por destacados, precio de menor a mayor (`Q290 → Q345`), mayor a menor (`Q345 → Q290`) o alfabético (`A - Z`).
- **Integración Directa con WhatsApp**: Cada tarjeta genera un enlace personalizado con el nombre y precio del perfume hacia `+502 3569-1502`.
- **Rendimiento Optimizado**: Imágenes desacopladas del HTML con carga diferida nativa (`loading="lazy"`), reduciendo el peso del documento principal de `1.43 MB` a `~21 KB`.

---

## 🚀 Publicación en GitHub Pages

El repositorio incluye soporte tanto para despliegue directo desde la rama `main` como mediante **GitHub Actions**:

1. Ve a **Settings → Pages** en el repositorio `JonZepeda/Perfumeria`.
2. En **Build and deployment → Source**, selecciona **Deploy from a branch** (`main` / `/(root)`) o **GitHub Actions**.
3. El sitio quedará disponible en `https://jonzepeda.github.io/Perfumeria/`.

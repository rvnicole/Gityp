# 🚚 Gityp – Gestión Integral de Transporte y Pagos

Gityp es una aplicación de escritorio desarrollada para la **gestión integral de servicios de transporte, facturación y cobros**, creada para optimizar los procesos operativos y administrativos de la empresa SETTER.

La aplicación fue desarrollada como una **aplicación web con Next.js y React**, posteriormente en **aplicación de escritorio mediante Electron** para su entrega. 

Adicionalmente, se dejó una versión pública desplegada en **https://gityp-sand.vercel.app/** con fines demostrativos.

---

### 🎯 Problema que resuelve

Antes de Gityp, la gestión de servicios se realizaba de forma manual (WhatsApp, correo y llamadas), lo que generaba problemas como:

- Olvido de servicios agendados
- Servicios solapados sin conductor asignado
- Facturas no cobradas
- Servicios sin orden de compra
- Servicios no facturados
- Duplicidad de folios de facturas

Gityp centraliza toda la información y automatiza el seguimiento del proceso completo, desde la cotización hasta el pago.

---

### 🧩 Flujo del proceso

1. 📞 Solicitud del servicio
2. 📄 Generación y envío de presupuesto
3. ✔️ Aprobación y generación de Orden de Servicio
4. 🚚 Ejecución del servicio
5. 🧾 Facturación
6. 💵 Gestión de cobros

---

### 🗂️ Módulos principales

### 📄 Presupuestos
- Crear, editar, eliminar y buscar presupuestos
- Generación de PDF del presupuesto y envío por correo electrónico
- Estados: aprobado, rechazado, en espera

### ✔️ Órdenes de Servicio
- Conversión de presupuestos aprobados
- Control de servicios asociados
- Estados: asignado, en progreso, completado, no realizado

### 🚚 Servicios
- Gestión de servicios agendados
- Asignación de conductor
- Control de estado y costos

### 🧾 Facturación administrativa
- Generación de facturas a partir de órdenes de servicio
- Control de folios y sellado
- Validación de datos fiscales

### 💵 Gestión de Cobros
- Seguimiento de pagos
- Control de IE (Informe de Entrada)
- Estado de cobro: pagado / pendiente

### ⚙️ Configuración
- Carga de emisores y receptores
- Gestión de conductores
- Importación de facturas vía XML

---

### ⚡​Stack tecnológico

### ⭐ Frontend
- React
- Next.js
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Zustand

### 💡 Backend / Lógica
- Node.js
- Mongoose (MongoDB)
- Nodemailer
- Puppeteer

### ⚙️Desktop & Tools
- Electron

---

### 🚀 Características destacadas

- Validaciones con Zod
- Manejo de estado global con Zustand
- Generación y envío de correos automáticos
- Generación de documentos PDF para presupuestos
- Control de estados y flujos administrativos
- Aplicación multiplataforma (Web y Desktop)

---

### 💻 Tipo de proyecto

- Aplicación Web + Aplicación de Escritorio
- Proyecto real entregado a cliente
- Arquitectura modular y escalable
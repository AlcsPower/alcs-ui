# 🏢 Receta: Modernización en .NET (ASP.NET Web Forms, VB.NET, C# y Razor)

Esta guía explica cómo modernizar aplicaciones existentes en el ecosistema **.NET** (desde sistemas heredados en **ASP.NET Web Forms con VB.NET / C#** hasta aplicaciones en **ASP.NET Core MVC / Razor Pages**) utilizando `@alcspower/ui` **sin tener que reescribir la lógica de negocio ni el código de servidor**.

---

## 🧭 Los Tres Enfoques de Integración

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        SISTEMA .NET EXISTENTE                          │
├───────────────────────────────────┬────────────────────────────────────┤
│           Enfoque 1:              │            Enfoque 2:              │
│       Modernización Visual        │         Islas React B2B            │
│       (Zero-JS / Solo CSS)        │     (Widgets Interactivas)         │
├───────────────────────────────────┼────────────────────────────────────┤
│ • .aspx / .master                 │ • .aspx / .cshtml                  │
│ • Controles <asp:Button>, TextBox │ • DataTable, DatePicker, Modales   │
│ • Estilos Craft Minimalist        │ • Datos pasados desde VB.NET / C#  │
│ • 0 cambios en lógica de backend  │ • HiddenField para PostBacks       │
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## Enfoque 1: Modernización Visual Directa (Zero-JS)
*Aplica el diseño Craft Minimalist a tus páginas `.aspx` existentes sin compilar ni requerir JavaScript.*

### 1.1. Incorporar el CSS de `@alcspower/ui`
1. Toma el archivo compilado `dist/styles.css` de `@alcspower/ui` (o compílalo con `pnpm build`).
2. Cópialo en la carpeta de recursos estáticos de tu proyecto .NET (por ejemplo `Content/alcspower-ui.css` o `wwwroot/css/alcspower-ui.css`).
3. Enlázalo en tu `Site.Master` o en el `<head>` de tus formularios `.aspx`:

```html
<head runat="server">
    <title>Sistema de Gestión Corporativo</title>
    <!-- Estilos del Design System @alcspower/ui -->
    <link href="~/Content/alcspower-ui.css" rel="stylesheet" type="text/css" />
</head>
```

### 1.2. Estilizar Controles de Servidor ASP.NET con `CssClass`

Puedes aplicar las clases utilitarias de Tailwind y los tokens semánticos directamente en tus controles de Web Forms:

#### Botones (`<asp:Button>`)
```html
<%-- Botón Primario --%>
<asp:Button ID="btnGuardar" runat="server" Text="Guardar Trámite"
    CssClass="inline-flex items-center justify-center rounded-xl text-sm font-medium bg-primary text-white shadow-2xs hover:bg-primary/90 h-10 px-4 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20" />

<%-- Botón Secundario / Outline --%>
<asp:Button ID="btnCancelar" runat="server" Text="Cancelar"
    CssClass="inline-flex items-center justify-center rounded-xl text-sm font-medium bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 h-10 px-4 transition-all cursor-pointer" />
```

#### Cajas de Texto (`<asp:TextBox>`)
```html
<div class="space-y-1.5 max-w-md">
    <label class="block text-sm font-medium text-slate-700">Número de Identificación Fiscal</label>
    <asp:TextBox ID="txtIdentificacion" runat="server" placeholder="TAX-001234567"
        CssClass="flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
</div>
```

#### Tablas de Datos (`<asp:GridView>`)
```html
<asp:GridView ID="gvRequests" runat="server" AutoGenerateColumns="False"
    CssClass="w-full text-sm text-left border-collapse rounded-xl overflow-hidden border border-slate-200"
    HeaderStyle-CssClass="bg-slate-50 text-slate-700 font-semibold text-xs uppercase tracking-wider border-b border-slate-200 px-4 py-3"
    RowStyle-CssClass="border-b border-slate-100 hover:bg-slate-50/50 transition-colors px-4 py-3 text-slate-800">
    <Columns>
        <asp:BoundField DataField="Codigo" HeaderText="Código" />
        <asp:BoundField DataField="Solicitante" HeaderText="Solicitante" />
        <asp:BoundField DataField="Fecha" HeaderText="Fecha Registro" />
    </Columns>
</asp:GridView>
```

### 1.3. Manipulación Dinámica desde VB.NET y C# (Code-Behind)

Puedes cambiar los estados de badges y alertas directamente desde el código del servidor:

#### En VB.NET (`.aspx.vb`):
```vb
Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
    If Not IsPostBack Then
        Dim estado As String = "APROBADO" ' Obtenido de base de datos
        
        If estado = "APROBADO" Then
            lblEstado.Text = "Aprobado"
            lblEstado.CssClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
        Else
            lblEstado.Text = "Pendiente de Firma"
            lblEstado.CssClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200"
        End If
    End If
End Sub
```

#### En C# (`.aspx.cs`):
```csharp
protected void Page_Load(object sender, EventArgs e)
{
    if (!IsPostBack)
    {
        string estado = "APROBADO";
        if (estado == "APROBADO")
        {
            lblEstado.Text = "Aprobado";
            lblEstado.CssClass = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200";
        }
    }
}
```

---

## Enfoque 2: Islas Interactivas (React Islands en ASP.NET Web Forms)
*Para pantallas que requieren componentes muy ricos: un `DataTable` con filtros en tiempo real, un `DatePicker` bimestral o diálogos modales.*

En este enfoque empaquetamos una librería de *widgets* con Vite y la consumimos desde el Web Form.

### 2.1. Crear el empaquetador de Widgets (`widgets-bundle`)

En un subproyecto o carpeta `frontend-widgets`:
```tsx
// src/widgets.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DataTable, Button, Badge } from '@alcspower/ui';
import '@alcspower/ui/styles.css';

// Exponer en window para que el Web Form de ASP.NET lo invoque
(window as any).AlcsPowerWidgets = {
  renderRequestsTable: (containerId: string, options: { data: any[]; onSelectRow?: (id: string) => void }) => {
    const el = document.getElementById(containerId);
    if (!el) return;

    const columns = [
      { accessorKey: 'id', header: 'Registro' },
      { accessorKey: 'nombre', header: 'Titular' },
      {
        accessorKey: 'estado',
        header: 'Estado',
        cell: ({ getValue }: any) => <Badge variant="secondary">{getValue()}</Badge>,
      },
      {
        id: 'acciones',
        header: 'Acción',
        cell: ({ row }: any) => (
          <Button
            size="sm"
            variant="outline"
            onClick={() => options.onSelectRow?.(row.original.id)}
          >
            Seleccionar
          </Button>
        ),
      },
    ];

    const root = createRoot(el);
    root.render(
      <DataTable
        columns={columns}
        data={options.data}
        searchable
        searchPlaceholder="Filtrar trámites por nombre o número..."
      />
    );
  },
};
```

Compilar con Vite como biblioteca UMD o IIFE:
```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/widgets.tsx',
      name: 'AlcsPowerWidgets',
      fileName: 'alcspower-widgets',
      formats: ['iife'],
    },
    outDir: '../MiProyectoAspNet/Scripts/widgets',
  },
});
```

### 2.2. Conectar la Isla con VB.NET / C# en el archivo `.aspx`

```html
<%@ Page Language="VB" AutoEventWireup="false" CodeFile="ConsultaSolicitudes.aspx.vb" Inherits="ConsultaSolicitudes" MasterPageFile="~/Site.Master" %>

<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
    <!-- Campo oculto para recibir el ID seleccionado desde React y enviarlo al PostBack de VB.NET -->
    <asp:HiddenField ID="hdnSolicitudSeleccionada" runat="server" />
    <asp:Button ID="btnProcesarSeleccion" runat="server" style="display:none;" />

    <div class="p-6 max-w-6xl mx-auto space-y-4">
        <h2 class="text-xl font-bold text-slate-900">Bandeja de Solicitudes</h2>
        
        <!-- Contenedor donde se monta el componente interactivo de @alcspower/ui -->
        <div id="tabla-solicitudes-container" class="min-h-[400px]"></div>
    </div>

    <!-- Script del Widget -->
    <script src="/Scripts/widgets/alcspower-widgets.iife.js"></script>
    <script type="text/javascript">
        document.addEventListener("DOMContentLoaded", function () {
            // Datos serializados inyectados directamente por VB.NET
            var datosDesdeServidor = <%= JsonRequests %>;

            window.AlcsPowerWidgets.renderRequestsTable("tabla-solicitudes-container", {
                data: datosDesdeServidor,
                onSelectRow: function (requestId) {
                    // Escribir en el HiddenField de ASP.NET
                    document.getElementById('<%= hdnSolicitudSeleccionada.ClientID %>').value = requestId;
                    // Disparar el evento de servidor en VB.NET
                    __doPostBack('<%= btnProcesarSeleccion.UniqueID %>', '');
                }
            });
        });
    </script>
</asp:Content>
```

### 2.3. Serialización en VB.NET (`ConsultaSolicitudes.aspx.vb`)

```vb
Imports Newtonsoft.Json

Partial Class ConsultaSolicitudes
    Inherits System.Web.UI.Page

    Public Property JsonRequests As String = "[]"

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As EventArgs) Handles Me.Load
        If Not IsPostBack Then
            ' 1. Obtener datos de la base de datos (SQL Server / Oracle)
            Dim lista = GetRequestsFromDatabase()
            ' 2. Serializar a JSON simple para el componente
            JsonRequests = JsonConvert.SerializeObject(lista)
        End If
    End Sub

    Protected Sub btnProcesarSeleccion_Click(ByVal sender As Object, ByVal e As EventArgs) Handles btnProcesarSeleccion.Click
        ' El valor seleccionado desde el componente React de @alcspower/ui llega aquí
        Dim idSeleccionado As String = hdnSolicitudSeleccionada.Value
        
        ' Ejecutar lógica de negocio existente en VB.NET
        ProcessCorporateRequest(idSeleccionado)
    End Sub
End Class
```

---

## Enfoque 3: ASP.NET Core MVC / Razor Pages con Vite
*Para proyectos modernos de .NET 8 / .NET 9.*

Si tu aplicación corre sobre **ASP.NET Core (MVC o Razor Pages)**:

1. Instala el paquete NuGet comunitario `Vite.AspNetCore`:
   ```bash
   dotnet add package Vite.AspNetCore
   ```
2. En `Program.cs`:
   ```csharp
   builder.Services.AddViteServices();
   // ...
   app.UseStaticFiles();
   ```
3. En tu vista `Index.cshtml`:
   ```cshtml
   @addTagHelper *, Vite.AspNetCore

   <div id="react-root" data-props='@Json.Serialize(Model.Datos)'></div>

   <vite-script src="src/main.tsx" />
   ```

---

## 🎯 Conclusión y Recomendación

* Si buscas un **cambio estético rápido** con **cero riesgo**: Utiliza el **Enfoque 1 (CSS y Tokens)**. En pocas horas puedes reemplazar los estilos obsoletos de tus MasterPages y botones sin modificar código de negocio.
* Si necesitas **funcionalidades modernas avanzadas** (tablas filtrables en tiempo real, calendarios accesibles, modales modernos): Utiliza el **Enfoque 2 (Islas React con HiddenField)** en las páginas de mayor impacto.

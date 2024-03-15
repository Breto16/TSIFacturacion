import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SearchPageComponent } from './countries/pages/search-page/search-page.component';
import { SearchTrackPageComponent } from './countries/pages/search-track-page/search-track-page.component';
import { SearchArtistPageComponent } from './countries/pages/search-artist-page/search-artist-page.component';
import { HomeTestPageComponent } from './countries/pages/home-test-page/home-test-page.component';
import { ByRegionPageComponent } from './countries/pages/by-region-page/by-region-page.component';
import { MesasComponent } from './pages/mesas/mesas.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { CierreComponent } from './pages/cierre/cierre.component';
import { ConsultasComponent } from './pages/consultas/consultas.component';
import { VentaComponent } from './pages/consultas/venta/venta.component';
import { ServicioComponent } from './pages/consultas/servicio/servicio.component';
import { ProductosComponent } from './pages/consultas/productos/productos.component';
import { VentaCrudaComponent } from './pages/consultas/venta-cruda/venta-cruda.component';
import { VentaTotalComponent } from './pages/consultas/venta-total/venta-total.component';
import { ProductoComponent } from './pages/consultas/producto/producto.component';


export const routes: Routes = [
    {
        path:       '',
        component:  HomePageComponent
    },
    {
        path:       'inicio',
        component:  HomePageComponent
    },
    {
        path:       'mesas',
        component:  MesasComponent
    },
    {
        path:       'facturas',
        component:  FacturasComponent
    },
    {
        path:       'cierre',
        component:  CierreComponent
    },
    {
        path:       'productos',
        component:  ProductosComponent
    },
    {
        path:       'consultas',
        component: ConsultasComponent,
        children: [
            {
                path:   'venta',
                component:  VentaComponent
            },
            {
                path:   'servicio',
                component:  ServicioComponent
            },
            {
                path:   'venta/crudo',
                component:  VentaCrudaComponent
            },
            {
                path:   'venta/total',
                component:  VentaTotalComponent
            },
            {
                path:   'alb/:id',
                component:  ProductoComponent
            },
            {
                path:   '**',
                redirectTo: 'consultas'
            }
        ]
    },
    {
        path:       '**',
        redirectTo:  'inicio'
    },

];

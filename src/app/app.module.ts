import { registerLocaleData } from "@angular/common";
import localeES from "@angular/common/locales/es";
import { LOCALE_ID, NgModule } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DataTableColumnCellDirective, DataTableColumnDirective, DataTableColumnHeaderDirective } from "@swimlane/ngx-datatable/release/components/columns";
import { PushNotificationsModule } from "ng-push";
import { ToastModule, ToastOptions } from "ng2-toastr/ng2-toastr";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { PageLoaderComponent } from "./page-loader/page-loader.component";
import { CustomToastrOption } from "./shared/custom-configurations/toastr-custom-options";
import { AmazonService } from "./shared/services/api/amazon.service";
import { ApiService } from "./shared/services/api/api.service";
import { ArancelesService } from "./shared/services/api/aranceles.service";
import { ArticulosService } from "./shared/services/api/articulos.service";
import { AtributoSkumasterService } from "./shared/services/api/atributo-skumaster.service";
import { AtributosService } from "./shared/services/api/atributos.service";
import { BestbuyService } from "./shared/services/api/bestbuy.service";
import { BodegasService } from "./shared/services/api/bodegas.service";
import { CajasService } from "./shared/services/api/cajas.service";
import { CalculadoraService } from "./shared/services/api/calculadora.service";
import { CalculosImportacionService } from "./shared/services/api/calculos-importacion.service";
import { CalculosPlataformaService } from "./shared/services/api/calculos-plataforma.service";
import { CategoriasAmazonService } from "./shared/services/api/categorias-amazon.service";
import { CategoriasBestbuyService } from "./shared/services/api/categorias-bestbuy.service";
import { CategoriasService } from "./shared/services/api/categorias.service";
import { CiudadesService } from "./shared/services/api/ciudades.service";
import { ClientesService } from "./shared/services/api/clientes.service";
import { ComparadorService } from "./shared/services/api/comparador.service";
import { ComprasService } from "./shared/services/api/compras.service";
import { DetallesTarifarioService } from "./shared/services/api/detalles-tarifario.service";
import { EmpresasEnvioService } from "./shared/services/api/empresas-envio.service";
import { EnviosService } from "./shared/services/api/envios.service";
import { ErroresPublicacionService } from "./shared/services/api/errores-publicacion.service";
import { EstadisticasService } from "./shared/services/api/estadisticas.service";
import { ExtrasService } from "./shared/services/api/extras.service";
import { FacturacionesService } from "./shared/services/api/facturaciones.service";
import { FirstAidService } from "./shared/services/api/first-aid.service";
import { ItemsService } from "./shared/services/api/items.service";
import { LogisticasService } from "./shared/services/api/logisticas.service";
import { MailService } from "./shared/services/api/mail.service";
import { MediasService } from "./shared/services/api/medias.service";
import { MercadoLibreService } from "./shared/services/api/mercado-libre.service";
import { MonedasService } from "./shared/services/api/monedas.service";
import { NotasService } from "./shared/services/api/notas.service";
import { NotificacionesService } from "./shared/services/api/notificaciones.service";
import { NotificationsService } from "./shared/services/api/notifications.service";
import { OrdenesService } from "./shared/services/api/ordenes.service";
import { PaisesService } from "./shared/services/api/paises.service";
import { PasarelasService } from "./shared/services/api/pasarelas.service";
import { PlantillasService } from "./shared/services/api/plantillas.service";
import { PlataformasService } from "./shared/services/api/plataformas.service";
import { PreguntasService } from "./shared/services/api/preguntas.service";
import { ProductoVentaService } from "./shared/services/api/producto-venta.service";
import { ProductosService } from "./shared/services/api/productos.service";
import { ProveedoresService } from "./shared/services/api/proveedores.service";
import { ProvinciasService } from "./shared/services/api/provincias.service";
import { PublicacionesService } from "./shared/services/api/publicaciones.service";
import { ReglasPublicacionService } from "./shared/services/api/reglas-publicacion.service";
import { RoleService } from "./shared/services/api/role.service";
import { SitiosService } from "./shared/services/api/sitio.service";
import { SkumastersService } from "./shared/services/api/skumasters.service";
import { StockLocalService } from "./shared/services/api/stock-local.service";
import { TarifariosService } from "./shared/services/api/tarifarios.service";
import { TiposPlataformaService } from "./shared/services/api/tipos-plataforma.service";
import { TrackingsService } from "./shared/services/api/trackings.service";
import { TracksService } from "./shared/services/api/tracks.service";
import { UsuariosService } from "./shared/services/api/usuarios.service";
import { WoocommerceService } from "./shared/services/api/woocommerce";
import { ZonasService } from "./shared/services/api/zonas.service";
import { ExcelWorkService } from "./shared/services/excel/excel-work.service";
import { ChatService } from "./shared/services/socket/chat.service";
import { NotificationService } from "./shared/services/socket/notification.service";
import { SocketService } from "./shared/services/socket/socket.service";
import { LocalStoreManager } from "./shared/services/storage/local-store-manager.service";
import { StorageService } from "./shared/services/storage/storage.service";
import { LayoutModule } from "./theme/layouts/layout.module";
import { ThemeRoutingModule } from "./theme/theme-routing.module";
import { ThemeComponent } from "./theme/theme.component";
import { ScriptLoaderService } from "./_services/script-loader.service";

registerLocaleData(localeES, "es-CU");

@NgModule({
  declarations: [
    ThemeComponent,
    AppComponent,
    PageLoaderComponent,
    PageLoaderComponent
  ],
  imports: [
    LayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeRoutingModule,
    AuthModule,
    ToastModule.forRoot(),
    PushNotificationsModule,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective
  ],
  providers: [
    { provide: ToastOptions, useClass: CustomToastrOption },
    { provide: LOCALE_ID, useValue: "es-CU" },
    ScriptLoaderService,
    AppService,
    ApiService,
    UsuariosService,
    RoleService,
    SitiosService,
    EstadisticasService,
    ProveedoresService,
    ItemsService,
    PaisesService,
    MonedasService,
    ZonasService,
    ProvinciasService,
    CiudadesService,
    PlantillasService,
    PlataformasService,
    PasarelasService,
    TiposPlataformaService,
    EmpresasEnvioService,
    CajasService,
    TarifariosService,
    DetallesTarifarioService,
    ArancelesService,
    AmazonService,
    BestbuyService,
    CategoriasAmazonService,
    CategoriasService,
    CategoriasBestbuyService,
    ClientesService,
    SkumastersService,
    ComparadorService,
    MediasService,
    ProductosService,
    CalculosImportacionService,
    CalculosPlataformaService,
    ReglasPublicacionService,
    MercadoLibreService,
    OrdenesService,
    ComprasService,
    TrackingsService,
    ProductoVentaService,
    WoocommerceService,
    NotasService,
    StorageService,
    CalculadoraService,
    AtributosService,
    AtributoSkumasterService,
    ErroresPublicacionService,
    LocalStoreManager,
    FirstAidService,
    FormBuilder,
    ExcelWorkService,
    PublicacionesService,
    BodegasService,
    LogisticasService,
    EnviosService,
    StockLocalService,
    ArticulosService,
    SocketService,
    ChatService,
    NotificacionesService,
    TracksService,
    MailService,
    PreguntasService,
    ExtrasService,
    NotificationService,
    NotificationsService,
    FacturacionesService,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

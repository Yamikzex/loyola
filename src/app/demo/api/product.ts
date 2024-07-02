export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    color?: string;
    image?: string;
    marca?: string;
    category?: string;
    fecha_adquisicion?: string;
    fecha_salidaInvertario?: string;
    direccion?: string;
    sede?: string;
    oficina?: string;
    idProveedor?: string;
    nombreProveedor?: string;
    telefonoProveedor?: string;
    direccionProveedor?: string;
    paisProveedor?: string;
    ciudadProveedor?: string;
    facturaCompra?: string;
    fecha_Compra?: string;
    valorIva?: string;
    garantiaProveedor?: string;
    fecha_InicioGarantia?: string;
    fecha_FinGarantia?: string;
    insuranceStatus?: string;
    estadoPresta?: string;
    cedulaPresta?: string;
    nombrePresta?: string;
    cargoPresta?: string;
    fecha_prestamo?: string;
    observacionesPresta?: string;
    fecha_devolucion?: string;
    observacionesDevolucion?: string;
    fechaDevolucion_final?: string;
    responsable?: string;
    ubicacion?: string;
    estado_actual?: string;
    estado?: string;
    price?: number;
    residual_value?: number;
    useful_life?: number;
    fecha_ultimo_cambio?: string;
    observacion?: string;
    revisado_por?: string;
    fecha_baja?: string;
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    nombrePoliza?: string;
    numeroPoliza?: string;
    rating?: number;
    fechaBaja?: string;
    cubierto?: boolean;
    autorizado_por?: string;
    justificacion?: string;
    selected?: boolean; // Nueva propiedad para la selección
}

interface InventoryStatus {
    label: string;
    value: string;
}

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    price?: number;
    residual_value?: number,
    useful_life?: number,
    quantity?: number;
    inventoryStatus?: InventoryStatus;
    category?: string;
    image?: string;
    rating?: number;
    estado?: string;
    fecha_adquisicion?: string;
    fecha_baja?: string;
    cubierto?: boolean; 
    fecha_ultimo_cambio?: string;
    estado_actual?: string;
    ubicacion?: string;
    responsable?: string;
    observacion?: string;
    revisado_por?: string;
}

interface InventoryStatus {
    label: string;
    value: string;
}

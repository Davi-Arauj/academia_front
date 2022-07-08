export interface Product{
    id?: number
    codigo_barras?: number
    nome?: string
    descricao?: string
    endereco_foto?: string
    valor_pago?: number
    valor_venda?: number
    quantidade?: number
    unidade_id?: number
    categoria_id?: number
    subcategoria_id?: number
    // data_criacao?: Date
    // data_atualizacao?: Date
}

export interface Total{
    quantidade?: number
}
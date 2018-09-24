export class ViaCepModel {
    constructor( 
        public bairro: string,
        public cep: string,
        public gia: string,
        public ibge: string,
        public localidade: string,
        public logradouro: string,
        public uf: string,
        public unidade: string,
        public complemento : string,
        public erro : boolean
    ){}
}
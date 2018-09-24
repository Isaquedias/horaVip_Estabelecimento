export class FormEnderecoModel {
    constructor(
        public rua : string,
        public cep : number,
        public cidade : string,
        public bairro : string,
        public estado : string,
        public numero : number,
        public complemento : string
    ){}
}
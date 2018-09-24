export class CadastroModel{
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public passwordConf: string
    ){}
}
export class DadosPerfilModel{

    constructor(
        public displayName : string,
        public email : string,
        public photoUrl : string,
        public emailVerified : boolean,
        public uid : string
    ){}
}
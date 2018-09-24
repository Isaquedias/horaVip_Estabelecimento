import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ViaCepModel } from '../../model/ViaCep.model'

/*
  Generated class for the ViacepProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ViacepProvider {

  constructor(public http: HttpClient) { }


  get(cep : string) : Promise<ViaCepModel>{
    return new Promise((res,err)=>{
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe((data : ViaCepModel)=>{
        res(data)
        err('cep não encontrado')
      })
    })
  }
}

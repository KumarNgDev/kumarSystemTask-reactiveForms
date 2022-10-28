import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegstirationService {

  constructor(private _http:HttpClient) { }

  postDetails(data:any){
    return this._http.post<any>("http://localhost:3000/posts",data);



  }
  getRegistrations(){
    return this._http.get<any>("http://localhost:3000/posts");

  }

  deleteDetails(id:number){
    return this._http.delete<any>("http://localhost:3000/posts/"+id);
  }

  updateRegDetails(data:any,id:number){
    return this._http.put<any>("http://localhost:3000/posts/"+id,data);
  }
}

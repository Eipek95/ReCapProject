import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Carimage } from '../models/carimage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root',
})
export class CarimageService {
  apiUrl = 'https://localhost:7199/api/CarImages'
  constructor(private httpClient: HttpClient) {}
  
  getImagePath(imagePath: string) {
    return "https://localhost:7199/" + imagePath
  }

  getCarsImage(): Observable<ListResponseModel<Carimage>> {
    let allImages=this.apiUrl+"/getall";
    return this.httpClient.get<ListResponseModel<Carimage>>(allImages);
  }

  
  getCarsByImageId(carId:number):Observable<ListResponseModel<Carimage>>{
    let newPath=this.apiUrl+"/getbycarid?carId="+carId
    return this.httpClient.get<ListResponseModel<Carimage>>(newPath);
  }

  uploadImage(image:File,carId:number):Observable<ResponseModel>{
    let newPath=this.apiUrl+'/addcarimage'
    const sendForm=new FormData()
    sendForm.append('carId',JSON.stringify(carId))
    sendForm.append('carImage',image,image.name)
    return this.httpClient.post<ResponseModel>(newPath,sendForm);
  }
  deleteImage(carImage: Carimage): Observable<ResponseModel> {
    let newPath = this.apiUrl + "api/carimages/delete";
    return this.httpClient.post<ResponseModel>(newPath, carImage);
  }

}

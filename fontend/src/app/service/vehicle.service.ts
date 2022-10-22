import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailLogin } from 'src/model/detail-login';
import { VehicleDetail } from 'src/model/vehicle-detail';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }
  checkInDb(userInfo: DetailLogin): Observable<any> {
    return this.http.post<DetailLogin>("http://13.213.33.138:2000/api/v1/vehicle/login", userInfo)
  }
  verifyToken(userToken: string): Observable<any> {
    return this.http.get<any>("http://13.213.33.138:2000/api/v1/vehicle/is-verify", {
      headers: new HttpHeaders({ 'token': `${userToken}` })
    })
  }
  signup(newUser: DetailLogin): Observable<any> {
    return this.http.post<DetailLogin>("http://13.213.33.138:2000/api/v1/vehicle/register", newUser)
  }
  addVehicle(newVehicle: VehicleDetail): Observable<VehicleDetail> {
    return this.http.post<VehicleDetail>('http://13.213.33.138:2000/api/v1/vehicle', newVehicle);
  }
  deleteVehicle(vehicleId: any): Observable<any> {
    return this.http.delete<any>('http://13.213.33.138:2000/api/v1/vehicle/' + vehicleId);
  }
  updatedVehicle(vehicleInfo: VehicleDetail): Observable<VehicleDetail> {
    return this.http.put<VehicleDetail>('http://13.213.33.138:2000/api/v1/vehicle/' + vehicleInfo.id, vehicleInfo)
  }
  viewAllVehicles(): Observable<VehicleDetail[]> {
    return this.http.get<VehicleDetail[]>('http://13.213.33.138:2000/api/v1/vehicle')
  }
  deleteAllVehicleRecords():Observable<any> {
    return this.http.delete('http://13.213.33.138:2000/api/v1/vehicle/delete/all')

  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpmethodsService {
  constructor(private http: HttpClient) {}

  private postapiUrl = 'http://localhost:6002/postdata';
  private putapiUrl = 'http://localhost:6002/updatedata';
  private getapiUrl = 'http://localhost:6002/getdata';
  private deleteapiUrl = `http://localhost:6002/deletedata`;
  private searchapiUrl = 'http://localhost:6002/searchbyname';

  putApi(id: any, data: any) {
    return this.http.put(`${this.putapiUrl}/${id}`, data);
  }

  postApi(data: any) {
    return this.http.post(this.postapiUrl, data);
  }
  getApi(data: any) {
    return this.http.post(this.getapiUrl,data);
  }
  deleteApi(id: any) {
    return this.http.delete(`${this.deleteapiUrl}/${id}`);
  }
  searchApi(search: any) {
    return this.http.post(this.searchapiUrl, search);
  }
}

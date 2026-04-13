import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'   // ✅ MUST BE PRESENT
})
export class NoticeService {

  constructor(private http: HttpClient) { }

  createNotice(data: any) {
    return this.http.post(`${environment.apiUrl}/api/admin/notices`, data);
  }

  getNotices() {
    return this.http.get(`${environment.apiUrl}/api/students/notices`);
  }
  updateNotice(id: number, data: any) {
    return this.http.put(`${environment.apiUrl}/api/admin/notices/${id}`, data);
  }

  deleteNotice(id: number) {
    return this.http.delete(`${environment.apiUrl}/api/admin/notices/${id}`);
  }

}
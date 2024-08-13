import http from "@/http-common";

/* eslint-disable */
class TutorialDataService {
  getAll(): Promise<any> {
    return http.get("/tutorials");
  }

  get(id: any): Promise<any> {
    return http.get(`/tutorials/${id}`);
  }

  create(data: any, userId: any): Promise<any> {
    return http.post(`/tutorials?userId=${userId}`, data);
  }

  update(id: any, data: any, userId: any) {
    return http.put(`/tutorials/${id}?userId=${userId}`, data);
  }

  delete(id: any): Promise<any> {
    return http.delete(`/tutorials/${id}`);
  }

  deleteAll(): Promise<any> {
    return http.delete(`/tutorials`);
  }

  findByTitle(title: string): Promise<any> {
    return http.get(`/tutorials?title=${title}`);
  }
}

export default new TutorialDataService();

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  // O endereço do servidor Java
  private apiUrl = 'http://localhost:8080/api/registros';

  // Injetando o telefone (HttpClient) dentro do Service
  constructor(private http: HttpClient) { }

  // O método que vai até o back-end buscar os dados
  listarRegistros(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  // Método POST (Substitui o Postman)
  salvarRegistro(registro: any): Observable<any> {
    return this.http.post(this.apiUrl, registro);
  }
// Método para deletar usando o ID na URL
  excluirRegistro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
// Método PUT para atualizar
  atualizarRegistro(id: number, registro: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, registro);
  }

  capturarLeadCnpj(cnpj: string): Observable<any> {
    // Mandamos um POST. O corpo {} vai vazio porque a informação 
    // principal (o CNPJ) já está viajando na própria URL.
    return this.http.post(`${this.apiUrl}/cnpj/${cnpj}`, {});
  }
}
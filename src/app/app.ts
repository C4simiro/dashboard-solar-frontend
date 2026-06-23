import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistroService } from './services/registro';
import { BaseChartDirective } from 'ng2-charts'; // <- O Import do Gráfico
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  
  clientesAtivos: any[] = [];
  leadsPotenciais: any[] = [];
  cnpjBusca: string = '';
  novoRegistro: any = { nomeUsina: '', numeroContato: '', energiaGeradaKwh: null, dataRegistro: '' };
  editandoId: number | null = null; 
  registroEmEdicao: any = {};

  // COnfigurando o gráfico
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [], // nomes das usinas
    datasets: [
      { data: [], label: 'Energia Gerada (kWh)', backgroundColor: '#28a745', borderRadius: 4 }
    ]
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { responsive: true };

  constructor(
    private registroService: RegistroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.carregarDados();
  }

carregarDados(): void {
 this.registroService.listarRegistros().subscribe((dados: any) => {
   // Filtra quem é cliente (ou quem já estava no banco antes de criar o status)
   this.clientesAtivos = dados.filter((r: any) => r.status === 'ATIVO' || !r.status);
   // Filtra quem veio do robô
   this.leadsPotenciais = dados.filter((r: any) => r.status === 'LEAD');
   
   this.atualizarGrafico(); 
   this.cdr.detectChanges();
 });
}

  // Extrai os dados da tabela e joga para o gráfico
  atualizarGrafico(): void {
  this.barChartData.labels = this.clientesAtivos.map(r => r.nomeUsina);
  this.barChartData.datasets[0].data = this.clientesAtivos.map(r => r.energiaGeradaKwh);
  this.barChartData = { ...this.barChartData };
}

  salvarNovaLeitura(): void {
    this.registroService.salvarRegistro(this.novoRegistro).subscribe(() => {
      this.novoRegistro = { nomeUsina: '', numeroContato: '', energiaGeradaKwh: null, dataRegistro: '' };
      this.carregarDados();
    });
  }

  iniciarEdicao(registro: any): void {
    this.editandoId = registro.id;
    this.registroEmEdicao = { ...registro };
  }

  cancelarEdicao(): void {
    this.editandoId = null;
    this.registroEmEdicao = {};
  }

  salvarEdicao(): void {
    if (this.editandoId) {
      this.registroService.atualizarRegistro(this.editandoId, this.registroEmEdicao).subscribe(() => {
        this.editandoId = null;
        this.registroEmEdicao = {};
        this.carregarDados();
      });
    }
  }

  excluir(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta leitura?')) {
      this.registroService.excluirRegistro(id).subscribe(() => {
        this.carregarDados();
      });
    }
  }

  buscarCnpj(): void {
    if (this.cnpjBusca) {
      const cnpjLimpo = this.cnpjBusca.replace(/\D/g, '');
      this.registroService.capturarLeadCnpj(cnpjLimpo).subscribe(() => {
        this.cnpjBusca = '';
        this.carregarDados();
      });
    }
  }

  converterParaCliente(lead: any): void {
    if (confirm(`A empresa ${lead.nomeUsina} fechou contrato?`)) {
      lead.status = 'ATIVO'; // Muda a etiqueta
      this.registroService.atualizarRegistro(lead.id, lead).subscribe(() => {
        this.carregarDados(); // Atualiza a tela, movendo ele pra tabela de cima
      });
    }
  }
}

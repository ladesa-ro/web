import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { Interceptors } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { AmbientesService } from './services.gen';
import { ArquivosService } from './services.gen';
import { AutenticacaoService } from './services.gen';
import { BlocosService } from './services.gen';
import { CalendarioService } from './services.gen';
import { CalendariosLetivosService } from './services.gen';
import { CampiService } from './services.gen';
import { CidadesService } from './services.gen';
import { CursosService } from './services.gen';
import { DiariosService } from './services.gen';
import { DisciplinasService } from './services.gen';
import { EmpresasService } from './services.gen';
import { EstadosService } from './services.gen';
import { EstagiariosService } from './services.gen';
import { EstagiosService } from './services.gen';
import { GerarHorarioService } from './services.gen';
import { HorariosService } from './services.gen';
import { HorariosAulaService } from './services.gen';
import { HorariosAulaConfiguracoesService } from './services.gen';
import { ModalidadesService } from './services.gen';
import { NiveisFormacoesService } from './services.gen';
import { NotificacoesService } from './services.gen';
import { OfertasFormacoesService } from './services.gen';
import { RelatoriosService } from './services.gen';
import { SistemaService } from './services.gen';
import { TurmasService } from './services.gen';
import { UsuariosService } from './services.gen';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class LadesaApiClient {
  public readonly ambientes: AmbientesService;
  public readonly arquivos: ArquivosService;
  public readonly autenticacao: AutenticacaoService;
  public readonly blocos: BlocosService;
  public readonly calendario: CalendarioService;
  public readonly calendariosLetivos: CalendariosLetivosService;
  public readonly campi: CampiService;
  public readonly cidades: CidadesService;
  public readonly cursos: CursosService;
  public readonly diarios: DiariosService;
  public readonly disciplinas: DisciplinasService;
  public readonly empresas: EmpresasService;
  public readonly estados: EstadosService;
  public readonly estagiarios: EstagiariosService;
  public readonly estagios: EstagiosService;
  public readonly gerarHorario: GerarHorarioService;
  public readonly horarios: HorariosService;
  public readonly horariosAula: HorariosAulaService;
  public readonly horariosAulaConfiguracoes: HorariosAulaConfiguracoesService;
  public readonly modalidades: ModalidadesService;
  public readonly niveisFormacoes: NiveisFormacoesService;
  public readonly notificacoes: NotificacoesService;
  public readonly ofertasFormacoes: OfertasFormacoesService;
  public readonly relatorios: RelatoriosService;
  public readonly sistema: SistemaService;
  public readonly turmas: TurmasService;
  public readonly usuarios: UsuariosService;

  public readonly request: BaseHttpRequest;

  public get etapas(): any {
    console.warn('LadesaApiClient.etapas: serviço não disponível na API atual');
    const noop = () =>
      Promise.reject(new Error('Serviço etapas não disponível'));
    return new Proxy({} as any, { get: () => noop });
  }

  public get eventos(): any {
    console.warn(
      'LadesaApiClient.eventos: serviço não disponível na API atual'
    );
    const noop = () =>
      Promise.reject(new Error('Serviço eventos não disponível'));
    return new Proxy({} as any, { get: () => noop });
  }

  public get diariosProfessores(): any {
    return {
      diarioProfessorFindAll: (data: any) =>
        this.diarios.diarioProfessorFindAll(data),
      diarioProfessorBulkReplace: (data: any) =>
        this.diarios.diarioProfessorBulkReplace(data),
    };
  }

  public get perfis() {
    return {
      perfilFindAll: (data: any) => {
        const usuarioId = data?.usuarioId ?? data?.filterUsuarioId?.[0] ?? '';
        return this.usuarios.perfilFindAll({ ...data, usuarioId });
      },
      perfilSetVinculos: (data: any) => {
        const usuarioId =
          data?.usuarioId ?? data?.requestBody?.usuario?.id ?? '';
        return this.usuarios.perfilSetVinculos({ ...data, usuarioId });
      },
      perfilFindById: (data: any) => this.usuarios.perfilFindById(data),
    };
  }

  constructor(
    config?: Partial<OpenAPIConfig>,
    HttpRequest: HttpRequestConstructor = FetchHttpRequest
  ) {
    this.request = new HttpRequest({
      BASE: config?.BASE ?? 'https://dev.ladesa.com.br/api/v1',
      VERSION: config?.VERSION ?? '1.0',
      WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
      CREDENTIALS: config?.CREDENTIALS ?? 'include',
      TOKEN: config?.TOKEN,
      USERNAME: config?.USERNAME,
      PASSWORD: config?.PASSWORD,
      HEADERS: config?.HEADERS,
      ENCODE_PATH: config?.ENCODE_PATH,
      interceptors: {
        request: config?.interceptors?.request ?? new Interceptors(),
        response: config?.interceptors?.response ?? new Interceptors(),
      },
    });

    this.ambientes = new AmbientesService(this.request);
    this.arquivos = new ArquivosService(this.request);
    this.autenticacao = new AutenticacaoService(this.request);
    this.blocos = new BlocosService(this.request);
    this.calendario = new CalendarioService(this.request);
    this.calendariosLetivos = new CalendariosLetivosService(this.request);
    this.campi = new CampiService(this.request);
    this.cidades = new CidadesService(this.request);
    this.cursos = new CursosService(this.request);
    this.diarios = new DiariosService(this.request);
    this.disciplinas = new DisciplinasService(this.request);
    this.empresas = new EmpresasService(this.request);
    this.estados = new EstadosService(this.request);
    this.estagiarios = new EstagiariosService(this.request);
    this.estagios = new EstagiosService(this.request);
    this.gerarHorario = new GerarHorarioService(this.request);
    this.horarios = new HorariosService(this.request);
    this.horariosAula = new HorariosAulaService(this.request);
    this.horariosAulaConfiguracoes = new HorariosAulaConfiguracoesService(
      this.request
    );
    this.modalidades = new ModalidadesService(this.request);
    this.niveisFormacoes = new NiveisFormacoesService(this.request);
    this.notificacoes = new NotificacoesService(this.request);
    this.ofertasFormacoes = new OfertasFormacoesService(this.request);
    this.relatorios = new RelatoriosService(this.request);
    this.sistema = new SistemaService(this.request);
    this.turmas = new TurmasService(this.request);
    this.usuarios = new UsuariosService(this.request);
  }
}

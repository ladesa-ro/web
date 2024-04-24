import { useQuery } from "@tanstack/vue-query";
import { DisciplinasService } from "../../../infrastructure/api/generated";

export const useApiDisciplinasFindAll = async (searchTerm: MaybeRef<string>) => {//busca no BD para uma consulta
  const query = useQuery({//Cache= Salvamento local de navegador --> Algo FIXO
    queryKey: ["disciplinas", searchTerm],//identifica a informação fixa cadastrada no sistema, e pode ser utilizada junto com um filtro

    queryFn: async () => {//função que realmente busca os dados cadastrados, e obtém uma função de busca recente em uma página.
      return DisciplinasService.disciplinaControllerDisciplinaFindAll(undefined, undefined, unref(searchTerm));
    },
  });

  const disciplinas = computed(() => unref(query.data)?.data ?? []);//query.data = Relacionado aos dados da requisição.
  //query.data é um ref(ref.values), o unref(query.data) é a mesma coisa que query.data.value 
//query.data = sempre muda
//? -> a primeira do sistema aberto (query.data.value == null), recebeu algo da api ele retorna um novo valor e deixa de ser null, em um determinado período
//findall = retorna uma listagem.
//?. --> Acessar o valor de uma propriedade nula, quando ainda n recebeu dados, da erro pq ta acessando um valor nulo, ? = caso seja != de nulo ele acessa a propriedade DATA, se não existir esse valor não acesse
//?? = caso o valor left da interrogação for null ele pega o rigth, e assim o contrário
//computed = cria um ref - de mudança, quando query.data mudar, ele cria um valor reativo.
  await query.suspense();//Entro na página e espera os primeiros dados para uma renderização. Ele espera receber uma resposta, recebeu? Sim ai ele renderiza todos os elementos

  return {
    query,
    disciplinas,
  };
};

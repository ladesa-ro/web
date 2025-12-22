import { useApiContext } from "../../../../components/API/Context/setup-context";

export async function useCampusUsuarioId(): Promise<string> {
    const { usuario } = useApiContext();

    try {
      const getUsers = await useApiClient().perfis.perfilList({
        filterUsuarioId: [usuario.value.id],
      });

      const user = getUsers.data?.[0];

      if(user) {
        if(user.campus) return user.campus!.id;
        else return "";
      } else return "";

    } catch (e) {
      console.error(`Erro: ${e}`);
      return "";
    }
  }
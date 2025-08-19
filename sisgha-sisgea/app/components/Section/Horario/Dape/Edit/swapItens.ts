import type { UseRefHistoryReturn } from "@vueuse/core";
import type { DiaComTurnosPrag, HorarioPrag } from "./ItemsList";

export const swap = (
  dia: Ref<DiaComTurnosPrag>,
  horariosHistory: UseRefHistoryReturn<DiaComTurnosPrag, DiaComTurnosPrag>
) => {
  const ativosIndex: number[] = [];
  const colunasIdx: number[] = [];
  const colunas: HorarioPrag[][] = [];

  //

  const ativos = getHorariosAtivos();

  ativos.value.forEach((horarioAtivoId) => {
    let ativoIndex;

    const coluna = Object.values(dia.value).find((coluna) => {
      const findActiveIndex = coluna.findIndex((horario, horIdx) => {
        if (horario.id === horarioAtivoId) {
          colunasIdx.push(horario.colunaId - 1);
          ativoIndex = horIdx;
          return true;
        }
      });

      if (findActiveIndex !== -1) {
        return true;
      }
    });
    if (coluna && ativoIndex !== undefined) {
      ativosIndex.push(ativoIndex);
      colunas.push(coluna);
    }
  });

  if (
    ativosIndex[0] !== undefined &&
    ativosIndex[1] !== undefined &&
    colunas[0] &&
    colunas[1]
  ) {
    const first = colunas[0][ativosIndex[0]];
    const second = colunas[1][ativosIndex[1]];

    if (first && second) {
      if (colunasIdx[0] !== colunasIdx[1]) {
        [first.colunaId, second.colunaId] = [second.colunaId, first.colunaId];
      }

      [colunas[0][ativosIndex[0]], colunas[1][ativosIndex[1]]] = [
        second,
        first,
      ];

      const diaKeys = Object.keys(dia.value);

      diaKeys.forEach((key, index) => {
        if (index === colunasIdx[0]) {
          dia.value[key] = colunas[0]!;
        }
        if (index === colunasIdx[1] && colunasIdx[0] !== colunasIdx[1]) {
          dia.value[key] = colunas[1]!;
        }
      });

      horariosHistory.commit();
      removeAllHorariosAtivos();
    } else {
      console.warn("first = ", first);
      console.warn("second = ", second);
      return;
    }
  }
};

export const canSwap = computed(() => getHorariosAtivos().value.size >= 2);

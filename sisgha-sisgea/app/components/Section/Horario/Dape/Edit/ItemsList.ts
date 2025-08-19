export type HorarioPrag = {
  id: number;
  atividade: "aula" | "intervalo" | "vago";
  horaInicio: string;
  horaTermino: string;
  colunaId: number;
};

export type DiaComTurnosPrag = {
  manha: HorarioPrag[];
  tarde: HorarioPrag[];
  noite: HorarioPrag[];
  [key: string]: HorarioPrag[];
};

export const dia: Ref<DiaComTurnosPrag> = ref({
  manha: [
    {
      id: 1,
      atividade: "aula",
      horaInicio: "07:30",
      horaTermino: "08:20",
      colunaId: 1,
    },
    {
      id: 2,
      atividade: "aula",
      horaInicio: "08:20",
      horaTermino: "09:10",
      colunaId: 1,
    },
    {
      id: 3,
      atividade: "aula",
      horaInicio: "09:10",
      horaTermino: "10:00",
      colunaId: 1,
    },
    {
      id: 4,
      atividade: "intervalo",
      horaInicio: "10:00",
      horaTermino: "10:20",
      colunaId: 1,
    },
    {
      id: 5,
      atividade: "vago",
      horaInicio: "10:20",
      horaTermino: "11:10",
      colunaId: 1,
    },
    {
      id: 6,
      atividade: "vago",
      horaInicio: "11:10",
      horaTermino: "12:00",
      colunaId: 1,
    },
  ],
  tarde: [
    {
      id: 7,
      atividade: "aula",
      horaInicio: "13:00",
      horaTermino: "13:50",
      colunaId: 2,
    },
    {
      id: 8,
      atividade: "aula",
      horaInicio: "13:50",
      horaTermino: "14:40",
      colunaId: 2,
    },
    {
      id: 9,
      atividade: "aula",
      horaInicio: "14:40",
      horaTermino: "15:30",
      colunaId: 2,
    },
    {
      id: 10,
      atividade: "intervalo",
      horaInicio: "15:30",
      horaTermino: "15:50",
      colunaId: 2,
    },
    {
      id: 11,
      atividade: "vago",
      horaInicio: "15:50",
      horaTermino: "16:40",
      colunaId: 2,
    },
    {
      id: 12,
      atividade: "vago",
      horaInicio: "16:40",
      horaTermino: "17:30",
      colunaId: 2,
    },
  ],
  noite: [
    {
      id: 13,
      atividade: "aula",
      horaInicio: "19:00",
      horaTermino: "19:50",
      colunaId: 3,
    },
    {
      id: 14,
      atividade: "aula",
      horaInicio: "19:50",
      horaTermino: "20:40",
      colunaId: 3,
    },
    {
      id: 15,
      atividade: "aula",
      horaInicio: "20:40",
      horaTermino: "21:30",
      colunaId: 3,
    },
    {
      id: 16,
      atividade: "intervalo",
      horaInicio: "21:30",
      horaTermino: "21:50",
      colunaId: 3,
    },
    {
      id: 17,
      atividade: "vago",
      horaInicio: "21:50",
      horaTermino: "22:40",
      colunaId: 3,
    },
    {
      id: 18,
      atividade: "vago",
      horaInicio: "22:40",
      horaTermino: "23:30",
      colunaId: 3,
    },
  ],
});

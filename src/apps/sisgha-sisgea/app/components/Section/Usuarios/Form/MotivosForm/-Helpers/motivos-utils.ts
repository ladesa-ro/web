export const dayShifts = [
  {
    title: 'matutino',
    times: ['07:30', '08:20', '09:10', '10:00', '10:20', '11:10'],
  },
  {
    title: 'vespertino',
    times: ['13:00', '13:50', '14:40', '15:30', '15:50', '16:40'],
  },
  {
    title: 'noturno',
    times: ['19:00', '19:50', '20:40', '21:30', '21:50', '22:40'],
  },
];

export const motivosDisponiveis = [
  'Licença médica',
  'Atividade externa',
  'Reunião',
  'Outro',
];

export function formatarDia(dia: string): string {
  const diasComFeira = [
    'segunda',
    'terca',
    'terça',
    'quarta',
    'quinta',
    'sexta',
  ];
  return diasComFeira.includes(dia.toLowerCase()) ? `${dia}-feira` : dia;
}

export function getProximoHorario(horario: string): string | null {
  const todos = dayShifts.flatMap(s => s.times);
  const idx = todos.indexOf(horario);
  return todos[idx + 1] || null;
}

export function agruparHorarios(horarios: string[]): string[] {
  const ordenados = [...horarios].sort();
  const blocos: string[] = [];

  for (let i = 0; i < ordenados.length; i++) {
    const inicio = ordenados[i];
    let fim = inicio;

    while (
      i + 1 < ordenados.length &&
      getProximoHorario(fim ?? '') === ordenados[i + 1]
    ) {
      fim = ordenados[++i];
    }

    blocos.push(
      inicio === fim ? (inicio ?? '') : `${inicio ?? ''}-${fim ?? ''}`
    );
  }

  return blocos;
}

export function normalizarChave(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

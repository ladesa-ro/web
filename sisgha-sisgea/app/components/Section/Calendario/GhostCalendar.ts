// # CODE
let calendario = await getApiClient().calendariosLetivos.calendarioLetivoList({
  filterCampusId: ['50987cbb-01a2-4345-8974-cae554ffca51'],
  filterOfertaFormacaoId: ['8c46ccce-4532-49e9-bb1b-1e1c656ecc0c'],
}).promise;

export const ghostCalendar = calendario.data[0];

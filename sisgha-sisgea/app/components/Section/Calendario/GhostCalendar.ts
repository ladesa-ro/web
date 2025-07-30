// # CODE
let calendario = await getApiClient().calendariosLetivos.calendarioLetivoList({
  filterCampusId: [''],
  filterOfertaFormacaoId: [''],
}).promise;

export const ghostCalendar = calendario.data[0];

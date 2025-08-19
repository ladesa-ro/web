const horariosAtivos = ref(new Set<number>());

export const addHorarioAtivo = (id: number) => {
  horariosAtivos.value.add(id);
};

export const removeHorarioAtivo = (id: number) =>
  horariosAtivos.value.delete(id);

export const getHorariosAtivos = () => horariosAtivos;

export const removeAllHorariosAtivos = () => {
  horariosAtivos.value.clear();
}
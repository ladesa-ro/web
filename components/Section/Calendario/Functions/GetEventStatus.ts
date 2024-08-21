// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Dayjs config
dayjs.locale('pt-br');

// Methods

// Calc time for start the event
export const eventStatus = {

  async startEvent(
    date1: dayjs.Dayjs,
    date2: dayjs.Dayjs
  ): Promise<string> {
    try {
      const diff = date1.diff(dayjs().toDate());
  
      // Verify if event on started
      if (diff <= 0) return await this.endEvent(date2);
      else {
        // Get times
        const time = {
          inSeconds: date1.diff(dayjs().toDate(), 'second'),
          inMinutes: date1.diff(dayjs().toDate(), 'minute'),
          inHours: date1.diff(dayjs().toDate(), 'hour'),
          inDays: date1.diff(dayjs().toDate(), 'day'),
        };
  
        // In seconds
        if (time.inSeconds < 60) return `Começa em ${time.inSeconds} segundos`;
        // In minutes
        else if (time.inMinutes < 60) {
          return time.inMinutes > 1
            ? `Começa em ${time.inMinutes} minutos`
            : `Começa em ${time.inMinutes} minuto`;
        }
  
        // In hours
        else if (time.inHours < 24) {
          return time.inHours > 1
            ? `Começa em ${time.inHours} horas`
            : `Começa em ${time.inHours} hora`;
        }
  
        // In days
        else {
          return time.inDays > 1
            ? `Começa em ${time.inDays} dias`
            : `Começa em ${time.inDays} dia`;
        }
      }
    } catch (error) {
      return '';
    }
  },
  
  //   Calc time for ending the event
  async endEvent(date: dayjs.Dayjs): Promise<string> {
    try {
      const diff = date.diff(dayjs().toDate());
  
      if (diff <= 0) return 'Encerrado';
      else {
        // Get times
        const time = {
          inSeconds: date.diff(dayjs().toDate(), 'second'),
          inMinutes: date.diff(dayjs().toDate(), 'minute'),
          inHours: date.diff(dayjs().toDate(), 'hour'),
          inDays: date.diff(dayjs().toDate(), 'day'),
        };
  
        // In seconds
        if (time.inSeconds < 60) return `Termina em ${time.inSeconds} segundos`;
        // In minutes
        else if (time.inMinutes < 60) {
          return time.inMinutes > 1
            ? `Termina em ${time.inMinutes} minutos`
            : `Termina em ${time.inMinutes} minuto`;
        }
  
        // In hours
        else if (time.inHours < 24) {
          return time.inHours > 1
            ? `Termina em ${time.inHours} horas`
            : `Termina em ${time.inHours} hora`;
        }
  
        // In days
        else {
          return time.inDays > 1
            ? `Termina em ${time.inDays} dias`
            : `Termina em ${time.inDays} dia`;
        }
      }
    } catch (error) {
      return '';
    }
  }
}


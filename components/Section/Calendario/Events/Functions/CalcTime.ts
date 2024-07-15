// Import
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

// Dayjs config
dayjs.locale('pt-br');

// Methods

export const calcTime = {
  // Calc time for start the event
  async startEvent(date1: dayjs.Dayjs, date2: dayjs.Dayjs): Promise<string> {
    try {
      const diff = date1.diff(dayjs().toDate());

      // Verify if event on started
      if (diff <= 0) return this.endEvent(date2);
      else {
        const timeBeforeEvent = dayjs.duration(diff);

        // Get times
        const time = {
          inSeconds: timeBeforeEvent.asSeconds(),
          inMinutes: timeBeforeEvent.asMinutes(),
          inHours: timeBeforeEvent.asHours(),
          inDays: timeBeforeEvent.asDays(),
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
        const timeDuringTheEvent = dayjs.duration(diff);

        const time = {
          inSeconds: timeDuringTheEvent.asSeconds(),
          inMinutes: timeDuringTheEvent.asMinutes(),
          inHours: timeDuringTheEvent.asHours(),
          inDays: timeDuringTheEvent.asDays(),
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
  },
};

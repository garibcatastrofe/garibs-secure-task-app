export const formatDate = (date: Date) => {
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const diaSemana = dias[date.getDay()];
  const diaMes = date.getDate();
  const mes = meses[date.getMonth()];
  const año = date.getFullYear();

  return `${diaSemana} ${diaMes} de ${mes} del ${año}`;
};

export const formatTime = (date: Date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0"); // Asegura dos dígitos
  const seconds = date.getSeconds().toString().padStart(2, "0"); // Asegura dos dígitos
  const amPm = hours >= 12 ? "p.m." : "a.m.";

  hours = hours % 12 || 12; // Convierte 0 en 12 para formato de 12 horas

  return `${hours}:${minutes}:${seconds} ${amPm}`;
};

export const getDate = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
};

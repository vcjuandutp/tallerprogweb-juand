function iniciarEncuesta() {
      let notas = [];
      let totalEstudiantes = 5;

      for (let i = 0; i < totalEstudiantes; i++) {
        let notaValida = false;

        while (!notaValida) {
          let entrada = prompt("Ingrese la nota del estudiante " + (i + 1) + " (0 - 20):");

          // si se presiona cancelar se interrumpe todo
          if (entrada === null) {
            alert("Operación cancelada.");
            return;
          }

          let nota = Number(entrada);

          // Validación de dato no vacío, número válido y rango 0-20
          if (entrada.trim() !== "" && Number.isFinite(nota) && nota >= 0 && nota <= 20) {
            notas.push(nota);
            notaValida = true;
          } else {
            alert("Nota inválida.");
          }
        }
      }

      // Paso 3: Cálculo de promedio y cantidad de aprobados (>= 12)
      let suma = 0;
      let aprobados = 0;

      for (let i = 0; i < notas.length; i++) {
        suma += notas[i];
        if (notas[i] >= 12) {
          aprobados++;
        }
      }

      let promedio = (suma / notas.length).toFixed(2);

      // Reporte final en un único alert
      alert("--- RESUMEN DE NOTAS ---\n" +
            "Notas registradas: " + notas.join(", ") + "\n" +
            "Promedio general: " + promedio + "\n" +
            "Estudiantes aprobados: " + aprobados);
}
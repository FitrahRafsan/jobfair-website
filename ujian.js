document.addEventListener("DOMContentLoaded", () => {
  fetch("soal.json")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("daftarSoal");
      data.forEach((soal, index) => {
        container.innerHTML += `
          <div>
            <p><strong>${index + 1}. ${soal.soal}</strong></p>
            <label><input type="radio" name="soal_${soal.id}" value="A"> ${soal.pilihan_a}</label><br>
            <label><input type="radio" name="soal_${soal.id}" value="B"> ${soal.pilihan_b}</label><br>
            <label><input type="radio" name="soal_${soal.id}" value="C"> ${soal.pilihan_c}</label><br>
            <label><input type="radio" name="soal_${soal.id}" value="D"> ${soal.pilihan_d}</label>
          </div><hr>
        `;
      });

      document.getElementById("formUjian").addEventListener("submit", function(e) {
        e.preventDefault();
        let skor = 0;
        data.forEach((soal) => {
          const jawaban = document.querySelector(`input[name="soal_${soal.id}"]:checked`);
          if (jawaban && jawaban.value === soal.jawaban_benar) {
            skor++;
          }
        });
        alert(`Tes selesai! Skor kamu: ${skor} dari ${data.length}`);
      });
    });
});

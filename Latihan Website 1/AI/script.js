let daftarTugas = [];

document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const input = document.getElementById("masukanTugas");
    const tugasBaru = input.value.trim();

    if (!tugasBaru) {
        alert("Tugas tidak boleh kosong!");
        return;
    }

    const sudahAda = daftarTugas.some(tugas => tugas.kegiatan.toLowerCase() === tugasBaru.toLowerCase());
    if (sudahAda) {
        alert("Tugas ini sudah ada dalam daftar!");
        return;
    }

    daftarTugas.push({ id: Date.now(), kegiatan: tugasBaru, selesai: false });
    input.value = "";
    tampilkanList();
});

function tampilkanList() {
    const ul = document.getElementById("listTugas");
    const tbody = document.querySelector("#tabelTugas tbody");

    ul.innerHTML = "";
    tbody.innerHTML = "";

    if (daftarTugas.length === 0) {
        ul.innerHTML = "<li>Belum ada tugas</li>";
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 3;
        cell.textContent = "Belum ada tugas";
        cell.style.textAlign = "center";
        return;
    }

    daftarTugas.forEach((tugas, index) => {
        const li = document.createElement("li");
        li.textContent = tugas.kegiatan;
        if (tugas.selesai) li.classList.add("selesai");

        const btnHapus = document.createElement("button");
        btnHapus.textContent = "Hapus";
        btnHapus.className = "hapus-item";
        btnHapus.onclick = function() {
            if (confirm(`Yakin ingin menghapus tugas \"${tugas.kegiatan}\"?`)) {
                daftarTugas = daftarTugas.filter(item => item.id !== tugas.id);
                tampilkanList();
            }
        };

        li.appendChild(btnHapus);
        ul.appendChild(li);

        const row = tbody.insertRow();
        row.insertCell(0).textContent = index + 1;
        row.insertCell(1).textContent = tugas.kegiatan;
        const cellStatus = row.insertCell(2);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tugas.selesai;
        checkbox.onchange = function() {
            tugas.selesai = this.checked;
            tampilkanList();
        };
        cellStatus.appendChild(checkbox);
        cellStatus.append(" Selesai");
    });
}

function hapusTugas(event) {
    event.preventDefault();
    const inputHapus = document.getElementById("hapusTugas");
    const namaTugas = inputHapus.value.trim().toLowerCase();
    if (!namaTugas) {
        alert("Masukkan nama tugas yang ingin dihapus!");
        return;
    }

    const index = daftarTugas.findIndex(t => t.kegiatan.toLowerCase() === namaTugas);
    if (index === -1) {
        alert(`Tugas \"${inputHapus.value}\" tidak ditemukan!`);
        return;
    }

    if (confirm(`Yakin ingin menghapus tugas \"${daftarTugas[index].kegiatan}\"?`)) {
        daftarTugas.splice(index, 1);
        tampilkanList();
        inputHapus.value = "";
        alert("Tugas berhasil dihapus.");
    }
}
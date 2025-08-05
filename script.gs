const API_URL = 'https://script.google.com/macros/s/AKfycbzKnebfaqptl2O5QDrZfakE6rUp39PdIw1GM3g4NSEfFu9dVXC1KnNEUiGXrMOziXmG/exec';

document.addEventListener('DOMContentLoaded', fetchData);

function fetchData() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      const table = document.getElementById('data-table');
      table.innerHTML = '';
      data.forEach(row => {
        table.innerHTML += `
          <tr>
            <td>${row.ID}</td>
            <td>${row.NAMA}</td>
            <td>${row.USERNAME}</td>
            <td>${row.LEVEL}</td>
            <td>
              <button class="edit" onclick='editData(${JSON.stringify(row)})'>Edit</button>
              <button class="delete" onclick="deleteData('${row.ID}')">Hapus</button>
            </td>
          </tr>
        `;
      });
    });
}

function createData() {
  const nama = document.getElementById('nama').value;
  const username = document.getElementById('username').value;
  const level = document.getElementById('level').value;

  if (!nama || !username || !level) {
    alert('Lengkapi data terlebih dahulu');
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'create',
      nama: nama,
      username: username,
      level: level
    })
  })
  .then(res => res.json())
  .then(response => {
    alert(response.message);
    fetchData();
    clearForm();
  });
}

function editData(row) {
  document.getElementById('id').value = row.ID;
  document.getElementById('nama').value = row.NAMA;
  document.getElementById('username').value = row.USERNAME;
  document.getElementById('level').value = row.LEVEL;
}

function updateData() {
  const id = document.getElementById('id').value;
  const nama = document.getElementById('nama').value;
  const username = document.getElementById('username').value;
  const level = document.getElementById('level').value;

  if (!id) {
    alert('Pilih data yang akan di-update');
    return;
  }

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'update',
      id: id,
      nama: nama,
      username: username,
      level: level
    })
  })
  .then(res => res.json())
  .then(response => {
    alert(response.message);
    fetchData();
    clearForm();
  });
}

function deleteData(id) {
  if (confirm('Yakin ingin menghapus data ini?')) {
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        id: id
      })
    })
    .then(res => res.json())
    .then(response => {
      alert(response.message);
      fetchData();
    });
  }
}

function clearForm() {
  document.getElementById('id').value = '';
  document.getElementById('nama').value = '';
  document.getElementById('username').value = '';
  document.getElementById('level').value = '';
}

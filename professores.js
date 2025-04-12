let profs = [];
let currentProfId = null;

// Altera a propriedade display para block, exibindo a modal que estava none
function openModal(modalId){
  document.getElementById(modalId).style.display = 'block';
}

// Altera a propriedade display para none, ocultando a modal
function closeModal(modalId){
  document.getElementById(modalId).style.display = 'none';
}

// Listener para o botão addProf, vai chamar a openModal()
const btAddProf = document.getElementById('addProf');
btAddProf.addEventListener('click', function() {
  currentProfId = null;
  document.getElementById('profForm').reset();
  openModal('profModal');
})

// Listener para fechar modais
document.querySelectorAll('.close').forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeModal('profModal');
  })
});

//carrega os professores como linhas da tabela

function renderProf() {
  const tbody = document.querySelector('#profTable tbody');
  tbody.innerHTML = '';
  profs.forEach((profs, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${profs.nomeProf}</td>
      <td>${profs.email}</td>
      <td>${profs.sala}</td>
      <td>
        <button onclick="editProf(${index})">Editar</button>
        <button onclick="deleteProf(${index})">Excluir</button>
      </td>
      ` ;
    tbody.appendChild(row);
  });
} 

function editProf(index){
  const prof = profs[index];
  document.getElementById('codigo').value = prof.codigo;
  document.getElementById('nomeProf').value = prof.nomeProf;
  document.getElementById('email').value = prof.email;
  document.getElementById('sala').value = prof.sala;
  currentProfId = index;
  openModal('profModal');
}

function deleteProf(index) {
  if(confirm('Tem certeza que deseja excluir este professor?')) {
    profs.splice(index, 1); 
    renderProf();
  }
}

function addProf(codigo, nomeProf, email, sala) {
  profs.push({ codigo, nomeProf, email, sala });
}

const profForm = document.getElementById('profForm');
profForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const codigo = document.getElementById('codigo');
  const nomeProf = document.getElementById('nomeProf').value;
  const email = document.getElementById('email').value;
  const sala = document.getElementById('sala').value;
  //inclusão ou alteração

  if (currentProfId !== null) {
    profs[currentProfId] = { codigo, nomeProf, email, sala };
  } else {
    addProf(codigo, nomeProf, email, sala);
  }

  closeModal('profModal');
  renderProf();
});

renderProf();
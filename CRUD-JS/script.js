const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const scpf = document.querySelector('#m-cpf')
const sTelefone = document.querySelector('#m-telefone')

const sSexo = document.querySelector('#m-sexo')
const sNacionalide = document.querySelector('#m-nacionalidade')

const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    scpf.value = itens[index].cpf
    sTelefone.value = itens[index].Telefone
    sSexo.value = itens[index].Sexo
    sNacionalide.value = itens[index].Nacionalidade
    
    id = index
  } else {
    sNome.value = ''
    scpf.value = ''
    sTelefone.value = ''
    sSexo.value = ''
    sNacionalide.value = ''
    
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.cpf}</td>
    <td>${item.Telefone}</td>
    <td>${item.Sexo}</td>
    <td>${item.Nacionalidade}</td>
    
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || scpf.value == '' || sTelefone.value == '' || sSexo.value == '' || sNacionalide.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].cpf = scpf.value
    itens[id].Telefone = sTelefone.value
    itens[id].Sexo = sSexo.value
    itens[id].Nacionalidade = sNacionalide.value
    
  } else {
    itens.push({'nome': sNome.value, 'cpf': scpf.value, 'Telefone': sTelefone.value, 'Sexo': sSexo.value, 'Nacionalidade': sNacionalide.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()

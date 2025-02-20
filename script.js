function gerarSenha() {
  const tamanho = parseInt(document.getElementById('tamanho').value);
  if (isNaN(tamanho) || tamanho < 6 || tamanho > 20) {
    alert('Por favor, insira um tamanho válido (entre 6 e 20).');
    return;
  }

  const incluirMaiusculas = document.getElementById('includeUppercase').checked;
  const incluirMinusculas = document.getElementById('includeLowercase').checked;
  const incluirNumeros = document.getElementById('includeNumbers').checked;
  const incluirEspeciais = document.getElementById('includeSpecial').checked;

  const caracteresMaiusculos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const caracteresMinusculos = 'abcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const caracteresEspeciais = '!@#$%^&*()_+[]{}|;:,.<>?';

  let caracteres = '';
  if (incluirMaiusculas) caracteres += caracteresMaiusculos;
  if (incluirMinusculas) caracteres += caracteresMinusculos;
  if (incluirNumeros) caracteres += numeros;
  if (incluirEspeciais) caracteres += caracteresEspeciais;

  if (caracteres === '') {
    alert('Por favor, selecione pelo menos um tipo de caractere.');
    return;
  }

  let senha = '';
  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    senha += caracteres.charAt(indiceAleatorio);
  }
  document.getElementById('senha').value = senha;
  avaliarForcaSenha(senha);
}

function gerarFrase() {
  const tamanho = parseInt(document.getElementById('tamanho').value);
  if (isNaN(tamanho) || tamanho < 6 || tamanho > 20) {
    alert('Por favor, insira um tamanho válido (entre 6 e 20). ');
    return;
  }
}

const incluirMaiusculas = document.getElementById('includeUppercase').cheked;
const incluirMinusculas = document.getElementById('includeLowercase').cheked;
const incluirNumeros = document.getElementById('incluirNumbers').cheked;
const includeSpeciais = document.getElementById('includeSpecial').checked;

const vogais = 'aeiou';
const consoantes = 'bcdfghjklmnpqrstvwxyz';
const caracteresMaiusculos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numeros = '0123456789';
const caracteresEspeciais = '!@#$%^&*()_+[]{}|;:,.<>?';

if (caracteres === ''){
    alert('Por favor, selecione pelo menos um tipo de caractere');
    return;
}



function copiarSenha() {
  const senha = document.getElementById('senha');
  senha.select();
  document.execCommand('copy');
  alert('Senha copiada para a área de transferência!');
}

function avaliarForcaSenha(senha) {
  const forcaSenha = document.getElementById('forcaSenha');
  let forca = 0;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[a-z]/.test(senha)) forca++;
  if (/[0-9]/.test(senha)) forca++;
  if (/[\W_]/.test(senha)) forca++;

  switch (forca) {
    case 0:
    case 1:
      forcaSenha.textContent = 'Fraca';
      forcaSenha.style.color = 'red';
      break;
    case 2:
      forcaSenha.textContent = 'Média';
      forcaSenha.style.color = 'yellow';
      break;
    case 3:
    case 4:
      forcaSenha.textContent = 'Forte';
      forcaSenha.style.color = 'blue';
      break;
  }
}

function toggleMode() {
  document.body.classList.toggle('dark-mode');
}

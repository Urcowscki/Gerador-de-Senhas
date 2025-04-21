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

async function gerarPalavraAleatoria() {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word');
    if (!response.ok) {
      throw new Error('Erro de requisição');
    }
    const palavra = await response.text();
    return palavra;
  } catch (error) {
    console.error('Erro ao buscar palavra aleatória:', error);
  }
}

async function gerarPalavra() {
  const tamanho = parseInt(document.getElementById('tamanho').value);
  if (isNaN(tamanho) || tamanho < 6 || tamanho > 20) {
    alert('Por favor, insira um tamanho válido (entre 6 e 20 char).');
    return;
  }

  const incluirMaiusculas = document.getElementById('includeUppercase').checked;
  const incluirMinusculas = document.getElementById('includeLowercase').checked;
  const incluirNumeros = document.getElementById('includeNumbers').checked;
  const incluirEspeciais = document.getElementById('includeSpecial').checked;

  const palavraBase = await gerarPalavraAleatoria();

  let palavra = '';
  for (let i = 0; i < tamanho; i++) {
    if (i < palavraBase.length) {
      palavra += palavraBase.charAt(i);
    } else {
      const aleatorio = Math.floor(Math.random() * 4);
      if (aleatorio === 0 && incluirMaiusculas) {
        palavra += palavraBase.charAt(i % palavraBase.length).toUpperCase();
      } else if (aleatorio === 1 && incluirMinusculas) {
        palavra += palavraBase.charAt(i % palavraBase.length).toLowerCase();
      } else if (aleatorio === 2 && incluirNumeros) {
        palavra += Math.floor(Math.random() * 10).toString();
      } else if (aleatorio === 3 && incluirEspeciais) {
        palavra += '!@#$%^&*()_+[]{}|;:,.<>?'[
          Math.floor(Math.random() * '!@#$%^&*()_+[]{}|;:,.<>?'.length)
        ];
      } else {
        i--;
      }
    }
  }
  document.getElementById('senha').value = palavra;
  avaliarForcaSenha(palavra);
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

function toggleMenu() {
  const menuOpcoes = document.querySelector('.menu-opcoes');
  if (menuOpcoes.style.display === 'block') {
    menuOpcoes.style.display = 'none';
  } else {
    menuOpcoes.style.display = 'block';
  }
}

function mudarTema(cor) {
  console.log(`Alterando para o tema: ${cor}`);
  const body = document.body;
  body.classList.remove('dark-mode');
  document.body.classList.remove('azul', 'roxo', 'vermelho', 'escuro', 'verde');
  document.body.classList.add(cor);
}

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

function gerarPalavra() {
  const tamanho = parseInt(document.getElementById('tamanho').value);
  if (isNaN(tamanho) || tamanho < 6 || tamanho > 20) {
    alert('Por favor, insira um tamanho válido (entre 6 e 20).');
    return;
  }

  const incluirMaiusculas = document.getElementById('includeUppercase').checked;
  const incluirMinusculas = document.getElementById('includeLowercase').checked;
  const incluirNumeros = document.getElementById('includeNumbers').checked;
  const incluirEspeciais = document.getElementById('includeSpecial').checked;

  const vogais = 'aeiou';
  const consoantes = 'bcdfghjklmnpqrstvwxyz';
  const caracteresMaiusculos = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const caracteresMinusculos = 'abcdefghijklmnopqrstuvwxyz'; // Adicionei esta linha
  const numeros = '0123456789';
  const caracteresEspeciais = '!@#$%^&*()_+[]{}|;:,.<>?';

  let caracteres = vogais + consoantes;
  if (incluirMaiusculas) caracteres += caracteresMaiusculos;
  if (incluirMinusculas) caracteres += caracteresMinusculos;
  if (incluirNumeros) caracteres += numeros;
  if (incluirEspeciais) caracteres += caracteresEspeciais;

  if (caracteres === '') {
    alert('Por favor, selecione pelo menos um tipo de caractere.');
    return;
  }

  let palavra = '';
  let useVogal = true;
  for (let i = 0; i < tamanho; i++) {
    if (useVogal) {
      const indiceAleatorio = Math.floor(Math.random() * vogais.length);
      palavra += vogais.charAt(indiceAleatorio);
      useVogal = false;
    } else {
      const indiceAleatorio = Math.floor(Math.random() * consoantes.length);
      palavra += consoantes.charAt(indiceAleatorio);
      useVogal = true;
    }
  }

  const caracteresExtras = [];
  if (incluirNumeros) caracteresExtras.push(...numeros.split(''));
  if (incluirEspeciais) caracteresExtras.push(...caracteresEspeciais.split(''));

  for (let i = 0; i < palavra.length; i++) {
    if (Math.random() < 0.2 && caracteresExtras.length > 0) {
      const indiceExtra = Math.floor(Math.random() * caracteresExtras.length);
      palavra =
        palavra.substring(0, i) +
        caracteresExtras[indiceExtra] +
        palavra.substring(i + 1);
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

function toggleMode() {
  document.body.classList.toggle('dark-mode');
}

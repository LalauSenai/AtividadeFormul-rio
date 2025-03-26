const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const celular = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const erro = document.getElementsByClassName("msgError");

const fetchDatas = (event) => {
  event.preventDefault();

  if (!checkNome()) {
    createDisplayErrorMessage(
      "O nome não pode conter números ou caracteres especiais!"
    );
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayErrorMessage("O email é invalido!");
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayErrorMessage("As senhas digitadas não coincidem!");
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayErrorMessage(senhaError);
    return;
  }

  if (celular.value && /[A-Za-zÀ-ÿ]/.test(celular.value)) {
    createDisplayErrorMessage("O telefone deve conter apenas números!");
    return;
  }

  const formData = {
    nome: nome.value,
    email: email.value,
    senha: senha.value,
    celular: celular.value,
    cpf: cpf.value,
    rg: rg.value,
  };

  console.log("Formulário Enviado:", JSON.stringify(formData, null, 2));
};

const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  return nomeRegex.test(nome.value);
};

function checkEmail(email) {
  const partes = email.split();

  if (
    (partes.length === 2 && partes[1].toLowercase() === "gmail.com") ||
    (partes.length === 2 && partes[1].toLowercase() === "outlook.com") ||
    (partes.length === 2 && partes[1].toLowercase() === "hotmail.com")
  ) {
    return true;
  } else {
    return false;
  }
}

function checkPasswordMatch() {
  return senha.value === confirmarSenha.value ? true : false;
}

function checkPasswordStrength(password) {
  if (!/[a-z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }

  if (!/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }

  if (!/[\W_]/.test(password)) {
    return "A senha deve ter pelo menos um caractere especial!";
  }

  if (!/\d/.test(password)) {
    return "A senha deve ter pelo menos um número!";
  }

  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }

  return null;
}

const maskPhoneNumber = (event) => {
  let celular = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celular)) {
    createDisplayErrorMessage("O telefone deve conter apenas números!");
  } else {
    createDisplayErrorMessage("");
  }

  celular = celular.replace(/\D/g, "");

  if (celular.length > 11) {
    celular = celular.substring(0, 11);
  }

  if (celular.length > 2) {
    celular = `(${celular.substring(0, 2)}) ${celular.substring(2)}`;
  } else if (celular.length > 0) {
    celular = `(${celular}`;
  }

  if (celular.length > 10) {
    celular = celular.replace(/(\(\d{2}\)) (\d{5})(\d{1,4})/, "$1 $2-$3");
  }

  event.target.value = celular;
};

const createDisplayErrorMessage = (mensagem) => {
  erro[0].textContent = mensagem;
};

const rainFunction = () => {
  let rain = document.createElement("span");
  let cont_rain = document.querySelector(".container_rain");
  let left = Math.floor(Math.random() * (310 - 65) + 65);
  let duration = Math.random() * 0.5;

  rain.classList.add("rain");
  cont_rain.appendChild(rain);
  rain.style.left = left + "px";
  rain.style.animationDuration = 1 + duration;

  setTimeout(() => {
    cont_rain.removeChild(rain);
  }, 1500);
};

setInterval(() => {
  rainFunction();
}, 250);

formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", () => {
  if (nome.value && !checkNome()) {
    createDisplayErrorMessage(
      "O nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayErrorMessage("");
  }
});

email.addEventListener("input", () => {
  if (email.value && !checkEmail(email.value)) {
    createDisplayErrorMessage("O e-mail é invalido!");
  } else {
    createDisplayErrorMessage("");
  }
});

senha.addEventListener("input", () => {
  if (senha.value && checkPasswordStrength(senha.value)) {
    createDisplayErrorMessage(checkPasswordStrength(senha.value));
  } else {
    createDisplayErrorMessage("");
  }
});

celular.addEventListener("input", maskPhoneNuber);

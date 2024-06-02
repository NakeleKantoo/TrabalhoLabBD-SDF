$(document).ready(function () {
    // Função para listar todos os usuários
    function listUsers() {
        $.ajax({
            type: 'GET',
            url: 'https://leonnaviegas.dev.br:5000/livro',
            success: function (users) {
                $('#userList').empty();
                users.forEach(function (user) {
                    var row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.nome}</td>
                        <td>${user.autor}</td>
                        <td>${user.ano}</td>
                        <td>${user.estoque}</td>
                        <td><button class="deleteBtn flat smallfont" data-id=${user.id}>Apagar</button><button class="updateBtn flat smallfont" data-id=${user.id}>Atualizar</button><button class="loanBtn flat smallfont" data-id=${user.id}>Fazer uma reserva</button></td>
                    </tr>`;
                    $('#userList').append(row);
                });
            },
            error: function (xhr, status, error) {
                var errorMessage = xhr.responseJSON.error;
                $('#message').text(errorMessage);
            }
        });
    }

    // Listar todos os usuários ao carregar a página
    listUsers();

    // Submissão do formulário de criação de usuário
    $('#createUserBtn').click(function () {
        var livronome = $('#livronome').val();
        var livroautor = $('#livroautor').val();
        var livroano = $('#livroano').val();
        var livroestoque = $('#livroestoque').val();
        fetch('https://leonnaviegas.dev.br:5000/livro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: livronome, autor: livroautor, ano: livroano, estoque: livroestoque})
        }).then(response => {
            if (!response.ok) {
              throw new Error('Network error');
            }
            return response.json();
          })
          .then(data => {
            console.log('Data received:', data);
            // Call your function here
            listUsers();
          })
          .catch(error => {
            console.error('Error:', error);
          });

    });

    // Deletar um usuário
    $(document).on('click', '.deleteBtn', function () {
        var userId = $(this).data('id');
        fetch(`https://leonnaviegas.dev.br:5000/livro/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response;
          })
          .then(data => {
            console.log('Data received:', data);
            listUsers();
          })
          .catch(error => {
            console.error('Error:', error);
          });
    });
    $(document).on('click', '.loanRealBtn', function () {
      var userId = $(this).data('id');
      var cpf = $('#cpf').val();
      var duracao = $('#duracao').val();
      fetch(`https://leonnaviegas.dev.br:5000/reserva/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({cpf: cpf, duracao: duracao, livroid: userId})
      }).then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response;
        })
        .then(data => {
          console.log('Data received:', data);
          fecharLoan();
          listUsers();
        })
        .catch(error => {
          console.error('Error:', error);
        });
  });
  $(document).on('click', '.updateRealBtn', function () {
    var userId = $(this).data('id');
    var livronome = $('#ulivronome').val();
    var livroautor = $('#ulivroautor').val();
    var livroano = $('#ulivroano').val();
    var livroestoque = $('#ulivroestoque').val();
    fetch(`https://leonnaviegas.dev.br:5000/livro/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: livronome, autor: livroautor, ano: livroano, estoque: livroestoque})
    }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(data => {
        console.log('Data received:', data);
        // Call your function here
        fecharUpdate();
        listUsers();
      })
      .catch(error => {
        console.error('Error:', error);
      });
});
$(document).on('click', '.updateBtn', function () {
  document.getElementById("updateForm").style.display="flex";
  document.getElementById("updateOverlay").style.display="grid";
  $('#updateButton').data('id',$(this).data('id'));
  clearUpdate();
});
$(document).on('click', '.loanBtn', function () {
  document.getElementById("loanForm").style.display="flex";
  document.getElementById("updateOverlay").style.display="grid";
  $('#loanButton').data('id',$(this).data('id'));
  clearLoan();
});
$(document).on('click', '.prompt-overlay', function () {
  document.getElementById("updateForm").style.display="none";
  document.getElementById("loanForm").style.display="none";
  document.getElementById("updateOverlay").style.display="none";
});
});


function mostrar() { 
  let form = document.getElementById("userFormSection");
  let btn = document.getElementById("cadastroMostrar");

  let inpnome = document.getElementById("livronome");
  let inpautor = document.getElementById("livroautor");
  let inpano = document.getElementById("livroano");
  let inpestoque = document.getElementById("livroestoque");

  let display = form.style.display;
  if (display=="none" || display=="") {
    form.style.display="flex";
    btn.style.display="none";
    inpnome.value="";
    inpautor.value="";
    inpano.value="";
    inpestoque.value="";
  } else {
    form.style.display="none";
    btn.style.display="flex";
  }
}

function reserva() {
  let url = window.location.href;
  url = url.split("/");
  url[url.length-2]="reservas"; //change to 1
  url = url.join("/");
  window.location.href = url;
}

function cliente() {
  let url = window.location.href;
  url = url.split("/");
  url[url.length-2]="cliente"; //change to 1
  url = url.join("/");
  window.location.href = url;
}

function fecharUpdate() {
  document.getElementById("updateForm").style.display="none";
  document.getElementById("updateOverlay").style.display="none";
}

function fecharLoan() {
  document.getElementById("loanForm").style.display="none";
  document.getElementById("updateOverlay").style.display="none";
}

function clearUpdate() {
  let inpnome = document.getElementById("ulivronome");
  let inpautor = document.getElementById("ulivroautor");
  let inpano = document.getElementById("ulivroano");
  let inpestoque = document.getElementById("ulivroestoque");
  inpnome.value="";
  inpautor.value="";
  inpano.value="";
  inpestoque.value="";
}

function clearLoan() {
  let inpnome = document.getElementById("cpf");
  let inpautor = document.getElementById("duracao");
  inpnome.value="";
  inpautor.value="";
}
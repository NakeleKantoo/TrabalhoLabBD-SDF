$(document).ready(function () {
    // Função para listar todos os usuários
    function listUsers() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/cliente',
            success: function (users) {
                $('#userList').empty();
                users.forEach(function (user) {
                    var row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.nome}</td>
                        <td>${user.email}</td>
                        <td>${user.cpf}</td>
                        <td>${user.celular}</td>
                        <td>${user.endereco}</td>
                        <td><button class="deleteBtn flat smallfont" data-id=${user.id}>Apagar cliente</button><button class="updateBtn flat smallfont" data-id=${user.id}>Atualizar dados</button></td>
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
        var clientenome = $('#clientenome').val();
        var clienteemail = $('#clienteemail').val();
        var clientecpf = $('#clientecpf').val();
        var clientecelular = $('#clientecelular').val();
        var clienteendereco = $('#clienteendereco').val();
        fetch('http://localhost:5000/cliente', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome: clientenome, email: clienteemail, cpf: clientecpf, celular: clientecelular, endereco: clienteendereco})
        }).then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Data received:', data);
            // Call your function here
            listUsers();
            clearForm();
          })
          .catch(error => {
            console.error('Error:', error);
          });

    });

    // Deletar um usuário
    $(document).on('click', '.deleteBtn', function () {
        var userId = $(this).data('id');
        fetch(`http://localhost:5000/cliente/${userId}`, {
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
            // Call your function here
            listUsers();
          })
          .catch(error => {
            console.error('Error:', error);
          });
    });
    $(document).on('click', '.updateBtn', function () {
      document.getElementById("updateForm").style.display="flex";
      document.getElementById("updateOverlay").style.display="grid";
      console.log($(this).data('id'));
      $('#updateButton').data('id',$(this).data('id'));
      console.log($('#updateButton').data('id'));
      clearUpdate();
    });
    $(document).on('click', '.updateRealBtn', function () {
      var userId = $(this).data('id');
      var clientenome = $('#uclientenome').val();
      var clienteemail = $('#uclienteemail').val();
      var clientecpf = $('#uclientecpf').val();
      var clientecelular = $('#uclientecelular').val();
      var clienteendereco = $('#uclienteendereco').val();
      fetch(`http://localhost:5000/cliente/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nome: clientenome, email: clienteemail, cpf: clientecpf, celular: clientecelular, endereco: clienteendereco})
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
  $(document).on('click', '.prompt-overlay', function () {
    document.getElementById("updateForm").style.display="none";
    document.getElementById("updateOverlay").style.display="none";
  });
});

function cadastro() {
  let url = window.location.href;
  url = url.split("/");
  url[url.length-2]="cadastro"; //change to 1
  url = url.join("/");
  window.location.href = url;
}

function reserva() {
  let url = window.location.href;
  url = url.split("/");
  url[url.length-2]="reservas"; //change to 1
  url = url.join("/");
  window.location.href = url;
}

function mostrar() { 
  let form = document.getElementById("userFormSection");
  let btn = document.getElementById("cadastroMostrar");

  let display = form.style.display;
  if (display=="none" || display=="") {
    form.style.display="flex";
    btn.style.display="none";
    clearForm();
  } else {
    form.style.display="none";
    btn.style.display="flex";
  }
}

function clearForm() {
  let inpnome = document.getElementById("clientenome");
  let inpautor = document.getElementById("clienteemail");
  let inpano = document.getElementById("clientecpf");
  let inpestoque = document.getElementById("clientecelular");
  let inpendereco = document.getElementById("clienteendereco");
  inpnome.value="";
  inpautor.value="";
  inpano.value="";
  inpestoque.value="";
  inpendereco.value="";
}

function fecharUpdate() {
  document.getElementById("updateForm").style.display="none";
  document.getElementById("updateOverlay").style.display="none";
}

function clearUpdate() {
  let inpnome = document.getElementById("uclientenome");
  let inpautor = document.getElementById("uclienteemail");
  let inpano = document.getElementById("uclientecpf");
  let inpestoque = document.getElementById("uclientecelular");
  let inpendereco = document.getElementById("uclienteendereco");
  inpnome.value="";
  inpautor.value="";
  inpano.value="";
  inpestoque.value="";
  inpendereco.value="";
}
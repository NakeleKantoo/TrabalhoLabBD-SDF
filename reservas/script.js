$(document).ready(function () {
    // Função para listar todos os usuários
    function listUsers() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:5000/reserva',
            success: function (users) {
                $('#userList').empty();
                users.forEach(function (user) {
                    var row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.cpf}</td>
                        <td>${user.duracao}</td>
                        <td>${user.livroid}</td>
                        <td>${user.nome}</td>
                        <td><button class="deleteBtn flat smallfont" data-id=${user.id}>Dar baixa</button><button class="moreBtn flat smallfont" data-id=${user.id}>Saber Mais</button></td>
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

    // Deletar um usuário
    $(document).on('click', '.deleteBtn', function () {
      var userId = $(this).data('id');
      fetch(`http://localhost:5000/reserva/${userId}`, {
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
  $(document).on('click', '.prompt-overlay', function () {
    document.getElementById("popup").style.display="none";
    document.getElementById("popupOverlay").style.display="none";
});
$(document).on('click', '.close', function () {
  document.getElementById("popup").style.display="none";
  document.getElementById("popupOverlay").style.display="none";
});
  $(document).on('click', '.moreBtn', function () {
    var userId = $(this).data('id');
    $.ajax({
      type: 'GET',
      url: `http://localhost:5000/reserva/${userId}`,
      success: function (users) {
        $('#popupList').empty();
          users.forEach(function (user) {
              var row = `<tr>
                  <td>${user.id}</td>
                  <td>${user.nome}</td>
                  <td>${user.cpf}</td>
                  <td>${user.email}</td>
                  <td>${user.celular}</td>
                  <td>${user.endereco}</td>
                  <td>${user.duracao}</td>
                  <td>${user.livronome}</td>
              </tr>`;
              $('#popupList').append(row);
              document.getElementById("popup").style.display="flex";
              document.getElementById("popupOverlay").style.display="flex";
          });
      },
      error: function (xhr, status, error) {
          var errorMessage = xhr.responseJSON.error;
          $('#message').text(errorMessage);
      }
  });
});
});

function cadastro() {
  let url = window.location.href;
  url = url.split("/");
  url[url.length-2]="cadastro"; //change to 1
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

function showPopup(args) {
  console.log(args);
}
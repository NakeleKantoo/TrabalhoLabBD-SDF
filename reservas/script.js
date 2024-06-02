$(document).ready(function () {
    // Função para listar todos os usuários
    function listUsers() {
        $.ajax({
            type: 'GET',
            url: 'https://leonnaviegas.dev.br:5000/reserva',
            success: function (users) {
                $('#userList').empty();
                users.forEach(function (user) {
                    var row = `<tr>
                        <td>${user.id}</td>
                        <td>${user.cpf}</td>
                        <td>${user.duracao}</td>
                        <td>${user.livroid}</td>
                        <td>${user.nome}</td>
                        <td><button class="deleteBtn flat smallfont" data-id=${user.id}>Dar baixa</button></td>
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
        fetch(`https://leonnaviegas.dev.br:5000/reserva/${userId}`, {
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
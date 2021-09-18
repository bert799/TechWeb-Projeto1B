function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Função para extrair o CRSFtoken copiado de: https://docs.djangoproject.com/en/3.2/ref/csrf/
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');

var noteCard = "note-";
var noteModifyCard = "note-modify-";

function openUpdateCard(id) {
  document.getElementById(noteCard.concat(String(id))).style.display = "none";
  document.getElementById(noteModifyCard.concat(String(id))).style.display = "flex";
}

function closeUpdateCard(id) {
  document.getElementById(noteCard.concat(String(id))).style.display = "flex";
  document.getElementById(noteModifyCard.concat(String(id))).style.display = "none";
}

function getData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     console.log(this.responseText);
    }
  };
  xhttp.open("GET", "", true);
  xhttp.send();
}

function UpdateDoc(modId) {
  var tituloOriginal = "title-";
  var textoOriginal = "details-";
  var tagOriginal = "tag-";
  var tituloModificado = "modify-card-title-";
  var textoModificado = "modify-card-text-";
  var tagModificado = "modify-card-tag-";
  var method = "method=";
  var id = "id=";
  var title = "title=";
  var details = "details=";
  var tag = "tag=";
  var xhttp = new XMLHttpRequest();
  var request = "";
  var spacedTitle;
  var spacedDetails;
  var stringId = String(modId);
  method = method.concat("UPDATE");
  id = id.concat(stringId)
  spacedTitle = String(document.getElementById(tituloModificado.concat(stringId)).value);
  spacedDetails = String(document.getElementById(textoModificado.concat(stringId)).value);
  spacedTag = String(document.getElementById(tagModificado.concat(stringId)).value);
  title = title.concat(spacedTitle.replace(/ /g, "+"));
  details = details.concat(spacedDetails.replace(/ /g, "+"));
  tag = tag.concat(spacedTag.replace(/ /g, "+"));
  request = request.concat(method, "&", id, "&", title, "&", details, "&", tag);
  console.log(title);
  console.log(details);
  console.log(tag)
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(tituloOriginal.concat(stringId)).innerHTML = spacedTitle;
      document.getElementById(textoOriginal.concat(stringId)).innerHTML = spacedDetails;
      document.getElementById(tagOriginal.concat(stringId)).innerHTML = spacedTag;
      closeUpdateCard(modId);
    }
  };
  console.log(request);
  xhttp.open("POST", "http://127.0.0.1:8000/update", true);
  xhttp.setRequestHeader('X-CSRFToken',csrftoken);
  xhttp.send(request);
}

function DeleteCard(modId) {
  var card = "card-";
  var method = "method=";
  var id = "id=";
  var xhttp = new XMLHttpRequest();
  var body = "";
  var stringId = String(modId);
  method = method.concat("DELETE");
  id = id.concat(stringId);
  body = body.concat(method, "&", id);
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(card.concat(stringId)).style.display = "none";
    }
  };
  console.log(body)
  xhttp.open("POST", "http://127.0.0.1:8000/delete", true);
  xhttp.setRequestHeader('X-CSRFToken',csrftoken);
  xhttp.send(body);
}

document.addEventListener("DOMContentLoaded", function () {
  // Faz textarea aumentar a altura automaticamente
  // Fonte: https://www.geeksforgeeks.org/how-to-create-auto-resize-textarea-using-javascript-jquery/#:~:text=It%20can%20be%20achieved%20by,height%20of%20an%20element%20automatically.
  let textareas = document.getElementsByClassName("autoresize");
  for (let i = 0; i < textareas.length; i++) {
    let textarea = textareas[i];
    function autoResize() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }

    textarea.addEventListener("input", autoResize, false);
  }

  // Sorteia classes de cores aleatoriamente para os cards
  let cards = document.getElementsByClassName("card");
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    card.className += ` card-color-${getRandomInt(
      1,
      5
    )} card-rotation-${getRandomInt(1, 11)}`;
  }
});

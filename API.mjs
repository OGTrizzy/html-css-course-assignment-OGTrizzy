export function API(){
    return fetch('https://api.noroff.dev/api/v1/square-eyes')
      .then(response => response.json())
      .then(data => console.log(data))
      .then(json => console.log(json));
}



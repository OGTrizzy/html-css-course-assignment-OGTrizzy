fetch('https://api.noroff.dev/api/v1/square-eyes')
      .then(response => response.json())
      .then(json => console.log(json))

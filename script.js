fetch('https://docs.noroff.dev/ecom-endpoints/square-eyes')
      .then(response => response.json())
      .then(json => console.log(json))

      function sumNumbers(numbers) {
        return numbers.reduce((total, number) => total + number, 0);
      }
      
  
      console.log(sumNumbers([1, 2, 3, 4])); 
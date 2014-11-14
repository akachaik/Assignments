var stdio = require('stdio');
var math = require('mathjs');

stdio.question('Enter a Number to find factorial  ', function(err, num)
{
	if (num != parseInt(num, 10)) 
	{
		console.log('Please enter an integer');
		return;
	}

	if (num < 0)
	{
		console.log('Please enter only a positive number');
		return;
	}

	console.log(math.factorial(parseInt(num)));
	
});



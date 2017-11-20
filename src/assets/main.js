let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == ''){
    	setHiddenFields();
    }

    if(!validateInput(input.value)){
    	return;
    } 
    attempt += 1;

    if(getResults(input.value)){
    	setMessage('You Win! :)');
    	showAnswer(true);
    	showReplay();
    } else if(attempt.value >= 10){
    		setMessage('You Lose! :(');
    		showAnswer(false);
			showReplay();
    } else
    	setMessage('Incorrect, try again.');
}

//implement new functions here
function showAnswer(success){
	let code = document.getElementById('code');
	if(success){
		code.className += ' success';
	}else{
		code.className += ' failure';
	}
	code.innerHTML = answer.value;
}

function showReplay(){
	document.getElementById('guessing-dev').style.display = "none";
	document.getElementById('replay-div').style.display = "block";
}

function setHiddenFields(){
	attempt.value = 0;
	answer.value = Math.floor(Math.random() * 10000).toString();
	
	while (answer.value.length <4){
		answer.value="0" + answer.value;
	}
}

function setMessage(message){
	document.getElementById('message').innerHTML = message;
}

function validateInput(input){
	if(input.length !=4){
		setMessage('Guesses must be exactly 4 characters long.');
		return false;
	}
	return true;
}

function getResults(input){
	let HTML = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';

	for(i=0;i<input.length;i++){
		if(input.charAt(i)==answer.value.charAt(i)){
			HTML += '<span class="glyphicon glyphicon-ok"></span>';
		}else if(answer.value.indexOf(input.charAt(i))>-1){
			HTML += '<span class="glyphicon glyphicon-transfer"></span>';
		}else {
			HTML += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}
	HTML += '</div></div>';

	document.getElementById('results').innerHTML = HTML

	if(input == answer.value){
		return true;
	}
	return false;
}
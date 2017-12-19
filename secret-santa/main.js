var familyMembers = [],
	nameInput = document.querySelector('#name-member-input'),
	isSingleCheckbox = document.querySelector('#member-is-single-checkbox'),
	partnerNameInput = document.querySelector('#partner-name-member-input'),
	nameDrawSelect = document.querySelector('#select-name-draw'),
	seeListButton = document.querySelector('#see-list-button'),
	resetListButton = document.querySelector('#reset-list-button'),
	pickedPersonText = document.querySelector('#picked-person-text'),

	checkContainer = document.querySelector('.check-container'),
	launchContainer = document.querySelector('.launch-container'),
	familyListContainer = document.querySelector('.family-list-container'),
	alertContainer = document.querySelector('#alert-header-container');


function showAlert(classes, message, timer) {
	alertContainer.className = classes.join(' ') + ' alert';
	alertContainer.innerHTML = message;
	alertContainer.classList.remove('hidden');

	setTimeout(function () {
		alertContainer.classList.add('hidden');
		alertContainer.innerHTML = '';
	}, timer || 2000)
}

function onTogglePartner() {
	partnerNameInput.classList.toggle("hidden");
}

function validateNewMember(name, isSingle, partnerName) {
	var isValid = true;

	if (name.toString().trim() === '' || (!isSingle && partnerName.toString().trim() === '')) {
		isValid = false;
	}

	familyMembers.map(function (member) {
		if (member.name === name) {
			isValid = false;
		}
	});

	return isValid;
}

function getPartner(member) {
	return ' in couple with ' + member.partner;
}

function updateList() {
	var familyList = [];
	familyMembers.map(function (member) {
		var partner = member.isSingle ? '' : getPartner(member);
		familyList.push('<li>' + member.name + partner + '</li>')
	});

	familyListContainer.innerHTML = familyList.join('');
}

function onSeeListClicked() {
	familyListContainer.classList.toggle("hidden");

	if (familyListContainer.classList.contains('hidden')) {
		seeListButton.innerHTML = 'See the list';
		return;
	}

	updateList();
	seeListButton.innerHTML = 'Hide the list';
}

function onResetListClicked() {
	familyMembers = [];
	seeListButton.classList.toggle("hidden");
	resetListButton.classList.toggle("hidden");
	launchContainer.classList.add("hidden");
	checkContainer.classList.add("hidden");
	pickedPersonText.innerHTML = '';
	nameDrawSelect.innerHTML = '';
	updateList();
}

function onAddMember() {
	var name = nameInput.value,
		isSingle = isSingleCheckbox.checked,
		partnerName = partnerNameInput.value,

		isValid = validateNewMember(name, isSingle, partnerName);

	if (isValid) {
		familyMembers.push({
			name: name,
			isSingle: isSingle,
			partner: isSingle ? '' : partnerName
		});

		nameInput.value = '';
		partnerNameInput.value = '';
	} else {
		var message = 'The name ' + name + ' is already registered or not valid';
		showAlert(['alert-warning'], message);
	}

	if (familyMembers.length > 0) {
		seeListButton.classList.remove("hidden");
		resetListButton.classList.remove("hidden");
		updateList();
	}

	if (familyMembers.length > 1) {
		launchContainer.classList.remove("hidden");
	}
}

function clearDraw() {
	familyMembers = familyMembers.map(function (member) {
		var newMember = member;
		newMember.isPicked = false;
		newMember.pickedMember = undefined;
		return newMember;
	});

	pickedPersonText.innerHTML = '';
	nameDrawSelect.innerHTML = '';
}

function getPickedMember(pickerMember) {
	//could have removed of a list instead of filter every time the whole list
	var nonPickedMembers = familyMembers.filter(function (member) {

		// check if it is not picked already, to not pick his own name, and the partner name.
		if (!member.isPicked && pickerMember.name.toLowerCase() !== member.name.toLowerCase()
			&& pickerMember.partner.toLowerCase() !== member.name.toLowerCase()) {
			// to keep the circle going, we need to not create pairs (only for lists of 2 persons)
			return !(familyMembers.length > 2 && member.pickedMember && pickerMember.name.toLowerCase() === member.pickedMember.name);
		}

		return false;
	});


	if (nonPickedMembers.length) {
		var randomNum = Math.floor(Math.random() * nonPickedMembers.length);
		nonPickedMembers[randomNum].isPicked = true;
		return nonPickedMembers[randomNum];
	} else {
		return null;
	}
}

function onLaunchDraw() {
	clearDraw();
	var selectList = [];

	for (var i = 0; i < familyMembers.length; i++) {
		var member = familyMembers[i],
			pickedMember = getPickedMember(member);
		if (pickedMember) {
			member.pickedMember = pickedMember;
		} else {
			member.pickedMember = {name: 'There was no possibility to pick someone... Sorry!'};
		}
	}

	familyMembers.map(function (member) {
		selectList.push('<option value="' + member.pickedMember.name + '">' + member.name + '</option>');
	});

	showAlert(['alert-success'], 'The draw was launched with success!', 4000);

	checkContainer.classList.remove("hidden");
	nameDrawSelect.innerHTML = selectList.join('');
}

function checkPickedPerson() {
	pickedPersonText.innerHTML = 'The person that you have picked is: <b>' + nameDrawSelect.value + '</b>';

	setTimeout(function () {
		pickedPersonText.innerHTML = '';
	}, 5000)
}

function onChangeNameSelected() {
	pickedPersonText.innerHTML = '';
}
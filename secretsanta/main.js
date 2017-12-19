function onLoad() {
	var familyMembers = [],
		alertTimeOut,
		resultTimeOut,
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

	var utilService = {
		validateNewMember: function (newMember, memberList) {
			var isValid = true,
				foundMember = memberList.find(function (member) {
					return member.name === newMember.name;
				});

			if (foundMember
				|| newMember.name === ''
				|| (!newMember.isSingle && (newMember.partner === '' || newMember.partner === undefined))) {
				isValid = false;
			}

			return isValid;
		},
		matchingPartner: function (newMember, memberList) {

			var newList = JSON.parse(JSON.stringify(memberList));

			var foundPartner = newList.find(function (member) {
				return member.name.toLowerCase() === newMember.partner.toLowerCase()
			});

			if (foundPartner) {
				newList.splice(newList.indexOf(foundPartner), 1)
			}

			newList.push({
				name: newMember.partner,
				isSingle: false,
				partner: newMember.name
			});

			return newList;
		},
		getUpdatedList: function (memberList) {
			var familyList = [];

			memberList.map(function (member) {
				var partner = member.isSingle ? '' : ' in a relationship with ' + member.partner;
				familyList.push('<li>' + member.name + partner + '</li>')
			});

			return familyList;
		},
		getDrawLists: function (memberList) {
			function getPickedMemberName(searchList, pickerMember) {
				var pickedName = '', counter = 0;

				while (pickedName === '') {
					if(counter === searchList.length) {
						pickedName =  'There was no possibility to pick someone... Sorry!';
					} else {
						var potentialMember = searchList[counter];

						if (pickerMember.name.toLowerCase() !== potentialMember.name.toLowerCase()
							&& pickerMember.partner.toLowerCase() !== potentialMember.name.toLowerCase()) {

							pickedName = potentialMember.name;
							searchList.splice(searchList.indexOf(potentialMember), 1);
						}
						counter++;
					}
				}

				return pickedName;
			}

			var htmlList = [],
				searchList = JSON.parse(JSON.stringify(memberList)).reverse();

			memberList.map(function (member) {
				member.pickedMember = getPickedMemberName(searchList, member);
				htmlList.push('<option value="' + member.pickedMember + '">' + member.name + '</option>');
			});

			return {
				drewList: memberList,
				htmlList: htmlList
			}
		}
	};

	function clearDraw() {
		pickedPersonText.innerHTML = '';
		nameDrawSelect.innerHTML = '';
	}

	function showAlert(classes, message, timer) {
		if(alertTimeOut) clearTimeout(alertTimeOut);

		alertContainer.className = classes.join(' ') + ' alert';
		alertContainer.innerHTML = message;
		alertContainer.classList.remove('hidden');

		alertTimeOut = setTimeout(function () {
			alertContainer.classList.add('hidden');
			alertContainer.innerHTML = '';
		}, timer || 2000)
	}

	function createNewMember() {
		var name = nameInput.value.toString().trim() || '',
			isSingle = isSingleCheckbox.checked,
			partner = isSingle ? '' : partnerNameInput.value.toString().trim() || '';

		return {
			name: name,
			isSingle: isSingle,
			partner: partner
		}
	}

	Object.assign(this, {
		onAddMember: function onAddMember() {
			var newMember = createNewMember(),
				isValid = utilService.validateNewMember(newMember, familyMembers);

			if (isValid) {
				familyMembers.push(newMember);

				if (!newMember.isSingle) {
					familyMembers = utilService.matchingPartner(newMember, familyMembers)
				}

				nameInput.value = '';
				partnerNameInput.value = '';
			} else {
				showAlert(['alert-warning'], 'The name ' + newMember.name + ' is already registered or not valid');
			}

			if (familyMembers.length > 0) {
				seeListButton.classList.remove("hidden");
				resetListButton.classList.remove("hidden");
				familyListContainer.innerHTML = utilService.getUpdatedList(familyMembers).join('');
			}

			if (familyMembers.length > 1) {
				launchContainer.classList.remove("hidden");
			}
		},
		onTogglePartner: function onTogglePartner() {
			partnerNameInput.classList.toggle("hidden");
		},
		onChangeNameSelected: function onChangeNameSelected() {
			pickedPersonText.innerHTML = '';
		},
		onCheckPickedPerson: function onCheckPickedPerson() {
			pickedPersonText.innerHTML = 'The person that you have picked is: <b>' + nameDrawSelect.value + '</b>';

			if(resultTimeOut) clearTimeout(resultTimeOut);

			resultTimeOut = setTimeout(function () {
				pickedPersonText.innerHTML = '';
			}, 5000)
		},
		onLaunchDraw: function onLaunchDraw() {
			clearDraw();

			var newList = JSON.parse(JSON.stringify(familyMembers)),
				drewLists = utilService.getDrawLists(newList);

			checkContainer.classList.remove("hidden");
			nameDrawSelect.innerHTML = drewLists.htmlList.join('');

			showAlert(['alert-success'], 'The draw was launched with success!', 4000);
		},
		onSeeList: function onSeeList() {
			familyListContainer.classList.toggle("hidden");

			if (familyListContainer.classList.contains('hidden')) {
				seeListButton.innerHTML = 'See the list';
				return;
			}

			seeListButton.innerHTML = 'Hide the list';
		},
		onResetList: function onResetList() {
			familyMembers = [];
			seeListButton.classList.toggle("hidden");
			resetListButton.classList.toggle("hidden");
			launchContainer.classList.add("hidden");
			checkContainer.classList.add("hidden");
			pickedPersonText.innerHTML = '';
			nameDrawSelect.innerHTML = '';
			familyListContainer.innerHTML = utilService.getUpdatedList(familyMembers).join('');
		},
		utilService: utilService
	});
}
$(document).ready(onLoad);



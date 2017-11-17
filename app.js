'use strict';

var PETS = [
	{
		id: 0,
		description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Plume',
		info: 'Siamois'
	},
	{
		id: 1,
		description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Smoosh',
		info: 'Abyssinian'
	},
	{
		id: 2,
		description : 'Lorem ipsum dolor sit amet, consectetur adipiscin ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Neige',
		info: 'Siamois'
	},
	{
		id: 3,
		description : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Glass',
		info: 'American Bobtail'
	},
	{
		id: 4,
		description : 'Lorem ipsum dolor sit amet, cons tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Plume',
		info: 'Arabian Mau'
	},
	{
		id: 5,
		description : 'Lorem ipsumor inclore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Zola',
		info: 'Chartreux'
	},
	{
		id: 6,
		image: 'pet0.jpg',
		description : 'Lorem ipsum dolor sietur ididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Prince',
		info: 'Bengal'
	},
	{
		id: 7,
		description : 'Lorem ipsum d adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Usher',
		info: 'Chartreux'
	},
	{
		id: 8,
		description : 'Lorem ipsum dtetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Snow',
		info: 'Bombay'
	},
	{
		id: 9,
		description : 'Lorem ipsum dod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Lilou',
		info: 'Birman'
	},
	{
		id: 10,
		description : 'Lorem ipsmpor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Rain',
		info: 'German Rex'
	},
	{
		id: 11,
		description : 'Lorem ipsum do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		name: 'Kick',
		info: 'Brazilian Shorthair'
	}
];


angular.module('myApp', []).controller('MainController', function () {
	var self = this;
	self.likedPets = [];
	self.isMenuOpen = false;
	self.isPetListOpen = false;

	self.toggleMenu = function () {
		self.isMenuOpen = !self.isMenuOpen;
	};

	self.toggleList = function () {
		self.isPetListOpen = !self.isPetListOpen;
	};

	self.backToHome = function () {
		self.isMenuOpen = false;
		self.isPetListOpen = false;
	};

	self.addLikedPet = function(pet) {
		self.likedPets.push(pet);
		console.log(self.likedPets)
	}
});

angular.module('myApp').component('home', {
	templateUrl: 'home.html',
	bindings: {
		toggleList: '&',
		onPetLike: '&'
	},
	controller: function () {
		var self = this;
		var index = 0;

		self.pets = PETS;
		self.pet = PETS[0];

		self.likePet = function (pet) {
			pet.isLiked = true;
			self.onPetLike({pet: pet});
			self.pets.splice(index, 1);
			self.pet = self.pets[index];
		};

		self.dislikePet = function (pet) {
			pet.isLiked = false;

			index++;
			self.pet = self.pets[index];
		};

		self.reloadSomePets = function () {
			index = 0;
			self.pet = self.pets[0];
		};

		self.togglePetList = function () {
			self.toggleList();
		};

		self.getImage = function() {
			return 'url(images/pet' + self.pet.id + '.jpg)';
		}

	}
});

angular.module('myApp').component('menu', {
	templateUrl: 'menu.html',
	controller: function () {
		var self = this;
	}
});

angular.module('myApp').component('petList', {
	templateUrl: 'pet-list.html',
	bindings: {
		pets: '<',
		onClose: '&'
	},
	controller: function () {
		var self = this;

		self.$onInit = function() {
			console.log(self.pets)
		};

		self.getImage = function($index) {
			return 'url(images/pet' + $index + '.jpg)';
		};

		self.closeSlider = function() {
			self.onClose();
		}
	}
});
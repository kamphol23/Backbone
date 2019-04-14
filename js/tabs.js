$(document).ready(function() {
const menuTabs = [
	{
		name: 'Körvar',
		content: `<p>Helspecial............... 50 kr</p>
		<br> <p> Halvspecial.............. 25 kr </p>
		 <br> <p> Vinerkorv................ 12 kr </p>`,
	},
	{
		name: 'Hambörgare',
		content: `<p> Enkel men gött 90g/ 120g/ 150g............... 65kr/ 75kr/ 90kr</p>
		<br><p>Dubbel börgan 120g/ 160g/ 200g............... 75kr/ 110kr/ 130kr</P>
		<br><p> Den får du när du är blir stor 1000g...............300kr</P>`,
	},
	{
		name: 'Smått gött',
		content: `<p>Kanel bulle...........10kr</p>
		<br> <p> Köffe......... 10kr </p>
		<br> <p> Neeeg Noooo Vinebröd vi kall them vinder bröd(kokosboll).......12kr</p>`,
	}
];


const CurrenTabModel = Backbone.Model.extend({
	defaults: {
		currenTab: 0,
	},
	setCurrenTab: function (tabSelected) {
		this.set({currenTab: tabSelected})
	},
	nextTab: function (oldTab) {
		if(oldTab+1 === menuTabs.length)
			this.set({currenTab: 0})
		else
			this.set({currenTab: oldTab+1})
	},
	previusTab: function (oldTab) {
		if(oldTab === 0)
			this.set({currenTab: menuTabs.length-1})
		else
			this.set({currenTab: oldTab-1})
	},
});


const ContentView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		this.$el.html('');
		let thisel = this.$el;
		let thismodel = this.model;
		menuTabs.forEach(function(e, i) {
			if(i === thismodel.get('currenTab'))
				thisel.append(`${e.content}<div class="center"><button id="previus">Backa</button><button id="next">Nästa</button></div>`);
		});
	},
	events: {
		"click #previus": 'previus',
		"click #next": 'next',
	},
	previus: function () {
		this.model.previusTab(this.model.get('currenTab'));
	},
	next: function () {
		this.model.nextTab(this.model.get('currenTab'));
	}
});

const currenTabModel = new CurrenTabModel();
const TabsView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	render: function() {
		this.$el.html('');
		let thisel = this.$el;
		let thismodel = this.model;
		menuTabs.forEach(function(e, i) {
			if(i === thismodel.get('currenTab'))
				thisel.append(`<li class="menuTab selectedTab" id="${i}">${e.name}</li>`);
			else
				thisel.append(`<li class="menuTab" id="${i}">${e.name}</li>`);
		});
	},
	events: {
		"click #0": 'tabnumber0',
		"click #1": 'tabnumber1',
		"click #2": 'tabnumber2'
	},
	tabnumber0: function () {
		this.model.setCurrenTab(0);
	},
	tabnumber1: function () {
		this.model.setCurrenTab(1);
	},
	tabnumber2: function () {
		this.model.setCurrenTab(2);
	}
});


	let tabsView = new TabsView({
		el: 'ul#menuList',
		model: currenTabModel
	});
	tabsView.render();

	let contentView = new ContentView({
		el: '#manuForTheFood',
		model: currenTabModel
	});
	contentView.render();
});

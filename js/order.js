const orderList = [
	{ order: 'Kanel bulle' },
	{ order: 'Det får du när du blir stor' },
	{ order: 'Hej alla barn nu är det barn program' },
	{ order: 'Kaffe'}

];

const FoodOrderModel = Backbone.Model.extend({
	defaults: {
		order: null, edit: false
	},
	edit: function() { this.set({ edit: true }); },
	cancel: function() { this.set({ edit: false }); },
	save: function() {
		this.set({
			edit: false
		});
	},
	updateorder: function(neworderName) {
		this.set({
			edit: false,
			order: neworderName
		});
	},
});

const FoodOrderCollection = Backbone.Collection.extend({ model: FoodOrderModel });

const foodOrderCollection = new FoodOrderCollection(orderList);

const FoodOrderView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
	},
	tagName: 'li',
	render: function() {
		let order = this.model.get('order');
		let id = this.model.cid;
		let singleorder;
		if (this.model.get('edit'))
			singleorder = `<input type="text" placeholder="${order}" class="editorder" /> <span class="save">✅</span> <span class="cancel">❌</span>`;
		else if (this.model.get('order') === 'bjas det funkar :DDDD')
			singleorder = `<input type="checkbox" id="${id}" class="remove" checked="checked"><span class="save">✅</span>  <label for="${id}">${order}</label> <span class="edit">🖊️</span>`;
		else
			singleorder = `<input type="checkbox" id="${id}" class="remove"> <label for="${id}">${order}</label> <span class="edit">🖊️</span>`;
		this.$el.html(singleorder);
	},
	events: {
		"click .edit": 'edit',
		"click .save": 'save',
		"click .cancel": 'cancel',
		"click .remove": 'remove',
		"change .editorder": 'editorder',
	},
	edit: function() { this.model.edit(); },
		remove: function() { foodOrderCollection.remove(this.model); },
	save: function() { this.model.save(); },
	cancel: function() { this.model.cancel(); },
	editorder: function(event) { this.model.updateorder(event.target.value); }
})

const FoodOrderListView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
		this.listenTo(this.collection, 'change', this.render);
	},
	render: function() {
		this.$el.html('<h1 class="center">Skriv in din beställning</h1>');
		let ul = $('<ul></ul>')
		this.$el.append(`<p class="center"><input type="text" id="addorderName" placeholder="order name">
		<button id="addorder">Add order</button></p>`);
		this.collection.forEach(function(currentFoodOrder) {
			let foodOrderView = new FoodOrderView({ model: currentFoodOrder });
			foodOrderView.render();
			ul.append(foodOrderView.$el);
		});
		this.$el.append(ul);
	},
	events: {
		"click #addorder": 'addorder',
		"change #addorderName": 'addorderName'
	},
	form: { order: '' },
	addorderName: function(event) { this.form.order = event.target.value; },
	addorder: function() { this.collection.add( new FoodOrderModel({ order: this.form.order }) ); }
})



$(document).ready(function() {
	let foodOrderListView = new FoodOrderListView({
		collection: foodOrderCollection,
		el: 'section#Beställning'
	});
	foodOrderListView.render();
});

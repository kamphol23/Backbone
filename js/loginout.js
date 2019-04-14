

const User = Backbone.Model.extend({
	defaults: {
		logStatus: false
	},

	loginout: function() {
		this.set({logStatus: !this.get('logStatus')});
	}
});

const InAndOutView = Backbone.View.extend({
	initialize: function() {
		this.listenTo(this.model, 'change', this.render)
	},
	render: function() {
		if( this.model.get('logStatus') )
			this.$el.html('Vill du ut eller')
		else
			this.$el.html('Logga in äna')
	},
	events: {
		"click": 'logOut'
	},
	logOut: function() {
		this.model.loginout();
	}
});

$(document).ready(function() {
	let newLogInmodel= new InAndOutView({
		el: '#logingButton',
		model: new User
	});
	newLogInmodel.render();
});

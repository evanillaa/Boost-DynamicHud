var hp = new ProgressBar.Circle('.hp', {
	color: '#FFEA82',
	trailColor: 'rgba(6,6,6,0.21332282913165268)',
	trailWidth: 12,
	text: {
		value: 'empty',
		style: {
			color: '#000'
		}
	},
	duration: 500,
	easing: 'bounce',
	strokeWidth: 12,
	from: {color: '#EF4444', a:0},
	to: {color: '#EF4444', a:1},
	// Set default step function for all animate calls
	step: function(state, circle) {
	  circle.path.setAttribute('stroke', state.color);
	}
});

var ar = new ProgressBar.Circle('.ar', {
	color: '#FFEA82',
	trailColor: 'rgba(6,6,6,0.21332282913165268)',
	trailWidth: 12,
	text: {
		value: 'empty',
		style: {
			color: '#000'
		}
	},
	duration: 500,
	easing: 'bounce',
	strokeWidth: 12,
	from: {color: '#6366F1', a:0},
	to: {color: '#6366F1', a:1},
	// Set default step function for all animate calls
	step: function(state, circle) {
	  circle.path.setAttribute('stroke', state.color);
	}
});
 
var th = new ProgressBar.Circle('.th', {
	color: '#FFEA82',
	trailColor: 'rgba(6,6,6,0.21332282913165268)',
	trailWidth: 12,
	text: {
		value: 'empty',
		style: {
			color: '#000'
		}
	},
	duration: 500,
	easing: 'bounce',
	strokeWidth: 12,
	from: {color: '#3B82F6', a:0},
	to: {color: '#3B82F6', a:1},
	// Set default step function for all animate calls
	step: function(state, circle) {
	  circle.path.setAttribute('stroke', state.color);
	}
});

var hg = new ProgressBar.Circle('.hg', {
	color: '#FFEA82',
	trailColor: 'rgba(6,6,6,0.21332282913165268)',
	trailWidth: 12,
	text: {
		value: 'empty',
		style: {
			color: '#000'
		}
	},
	duration: 500,
	easing: 'bounce',
	strokeWidth: 12,
	from: {color: '#F59E0B', a:0},
	to: {color: '#F59E0B', a:1},
	// Set default step function for all animate calls
	step: function(state, circle) {
	  circle.path.setAttribute('stroke', state.color);
	}
});

var mic = new ProgressBar.Circle('.mic', {
	color: '#FFEA82',
	trailColor: 'rgba(6,6,6,0.21332282913165268)',
	trailWidth: 12,
	text: {
		value: 'empty',
		style: {
			color: '#000'
		}
	},
	duration: 500,
	easing: 'bounce',
	strokeWidth: 12,
	from: {color: '#10B981', a:0},
	to: {color: '#10B981', a:1},
	// Set default step function for all animate calls
	step: function(state, circle) {
	  circle.path.setAttribute('stroke', state.color);
	}
});

var st = new ProgressBar.Circle('.st', {
	color: '#FFEA82',
	trailColor: 'rgba(6,6,6,0.21332282913165268)',
	trailWidth: 12,
	text: {
		value: 'empty',
		style: {
			color: '#000'
		}
	},
	duration: 800,
	easing: 'easeInOut',
	strokeWidth: 12,
	from: {color: '#8B5CF6', a:0},
	to: {color: '#8B5CF6', a:1},
	// Set default step function for all animate calls
	step: function(state, circle) {
	  circle.path.setAttribute('stroke', state.color);
	}
});


// Main
function main(){
    return {
		show: false,
		h_height: 813.4580727,
        h_side: 27.8000277,
		talking: false,
    	listen(){
			window.addEventListener('message', (event) => {
				let data = event.data
				switch(data.type){
					case 'setpos':
							const width  = window.innerWidth || document.documentElement.clientWidth || 
							document.body.clientWidth;
							const height = window.innerHeight|| document.documentElement.clientHeight|| 
							document.body.clientHeight;
							this.h_height = data.y * height - 60
							this.h_side = data.x * width - 271
						break;
					case 'status':
							th.animate(data.thirst / 100)
							hg.animate(data.hunger / 100)
							ar.animate(data.armor / 100)
							hp.animate(data.health / 100)
							st.animate(data.stress/ 100)
						break;
					case 'mic':
							this.talking = data.talking
							mic.animate(data.volume * 0.20)
						break;
					case 'toggle':
						this.show = data.show
						break;
				}
			})

        }
    }
}

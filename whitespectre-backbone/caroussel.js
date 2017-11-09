(function(){

	var data = [
		{
			"title": "First Block",
			"images": [
				"https://static.photocdn.pt/images/articles/2017/04/28/iStock-516651882.jpg", 
				"http://cdn.mos.cms.futurecdn.net/FUE7XiFApEqWZQ85wYcAfM.jpg",
				"https://static.pexels.com/photos/132037/pexels-photo-132037.jpeg"
			]
		},
		{
			"title": "Second Block",
			"images":[
				"https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg"
			]
		},
		{
			"title": "Third Block",
			"images":[
				"https://static.photocdn.pt/images/articles/2017_1/iStock-545347988.jpg",
				"https://petapixel.com/assets/uploads/2017/09/34917206910_b35ff8ee7f_b-800x534.jpg"
			]
		},
		{
			"title": "Fourth Block",
			"images":[
				"http://media1.santabanta.com/full1/Outdoors/Landscapes/landscapes-284a.jpg",
				"https://static.pexels.com/photos/66874/landscape-meadow-field-mountains-66874.jpeg",
				"http://www.ncl.ac.uk/media/wwwnclacuk/mccordcentre/images/gridbox-expertise-1.jpg"
			]
		}
	];

	var CarousselComp = Backbone.View.extend({
		events:{
			'click .btn-prev' : 'prev',
			'click .btn-next' : 'next'
		},
		initialize: function(option){
			this.element = option.el;
			this.data = data;
			$(this.element).hide();	

			this._checkButtons = function(){
				$(".btn-prev").attr("disabled",false);
				$(".btn-next").attr("disabled",false);
				if(this.currentBlock===0){
					$(".btn-prev").attr("disabled",true);
				}else{
					if(this.currentBlock===this.data.length-1){
						$(".btn-next").attr("disabled",true);
					}
				}
			},
			this._defineImage = function(){
				var img = $(".caroussel-image img");
				$(img).toggleClass("current");
				$(img).fadeOut(500,function(){
					$(img).remove();
				});
				var current= $("<img>");
				$(current).addClass("current");
				var block = this.data[this.currentBlock];
				$(current).attr("src",_.sample(block.images))
				$(current).hide();
				$(current).appendTo(".caroussel-image");
				$(current).fadeIn(500);
				$(".caroussel-title").html(block.title);
			}
		},
		render: function(){
			this.currentBlock = 0;
			this._checkButtons();
			this._defineImage();
			$(this.element).show();
			return this;
		},
		prev: function(){
			this.currentBlock--;
			this._checkButtons();
			this._defineImage();
		},
		next: function(){
			this.currentBlock++;
			this._checkButtons();
			this._defineImage();
		}
	});
	var component = new CarousselComp({el: ".caroussel",data:data}).render();
})();
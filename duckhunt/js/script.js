class Duck{
	posx = randomInteger(50, 750);
	posy = 450;
	napr = "";
	a = 0;
	i = 0;
	strr = "";
	massImg = ["0.png","1.png","2.png"];
	izm(){
		if(randomInteger(0,1) == 0) this.napr = "top-left"
		else this.napr = "top-right";
		this.posx = randomInteger(50, 750);
		this.posy = 450;
		$(".duck").css({"z-index": 6});
	}
	start(){
			this.i++;
			if(this.napr == "top-right"){
				this.posx += randomInteger(10, 30);
				this.posy -= randomInteger(10, 20);
			}
			if(this.posx >= 700){
				this.napr = "top-left"
			}
			if(this.napr == "top-left"){
				this.posx -= randomInteger(10, 30);
				this.posy -= randomInteger(10, 20);
			}
			if(this.posx <= 10){
				this.napr = "top-right"
			}
			if(this.posy <= 5){
				if(this.napr == "top-left"){
					this.napr = "left"
				}
				if(this.napr == "top-right"){
					this.napr = "right"
				}
			}
			if(this.posy >= 450){
				if(this.napr == "left"){
					this.napr = "top-left"
				}
				if(this.napr == "right"){
					this.napr = "top-right"
				}
			}
			if(this.napr == "left"){
				this.posx -= 20;
				this.posy += randomInteger(10, 30);
			}
			if(this.napr == "right"){
				this.posx += 20;
				this.posy += randomInteger(10, 30);
			}
			$(".duck").attr("src", "images/duck/black/"+this.napr+"/"+this.massImg[this.i%3]);
			$(".duck").css({"left": this.posx+"px", "top": this.posy+"px"});
		}
	end1(){
		this.posy += 20
		$(".duck").attr("src", "images/duck/black/dead/"+this.massImg[this.i%3]);
		$(".duck").css({"left": this.posx+"px", "top": this.posy+"px"});
		this.i++;
	}
	end2(){
		if(this.napr == "top-left"){
			this.posx -= randomInteger(10, 30);
			this.posy -= randomInteger(10, 20);
		}
		else if(this.napr == "top-right"){
			this.posx += randomInteger(10, 30);
			this.posy -= randomInteger(10, 20);
		}
		else{
			this.napr = "top-left"
		}
		$(".duck").attr("src", "images/duck/black/"+this.napr+"/"+this.massImg[this.i%3]);
		$(".duck").css({"left": this.posx+"px", "top": this.posy+"px"});
	}
}

class Dog{
	posy = 480;
	i = 0;
	single(posx){
		$(".dog").css({"left": posx+"px"});
		$(".dog").attr("src", "images/dog/single/0.png");
	}
	up(){
		this.posy -= 20;
		$(".dog").css({"top": this.posy+"px"});
	}
	down(){
		this.posy += 20;
		$(".dog").css({"top": this.posy+"px"});
	}
	upend(){
		this.i++;
		this.posy -= 20;
		$(".dog").attr("src", "images/dog/laugh/"+(this.i%2)+".png");
		$(".dog").css({"top": this.posy+"px", "left": "330px"});
	}
	downend(){
		this.i++;
		this.posy += 20;
		$(".dog").attr("src", "images/dog/laugh/"+(this.i%2)+".png");
		$(".dog").css({"top": this.posy+"px", "left": "330px"});
	}
}

class Game{
	duck = new Duck();
	dog = new Dog();
	qq = 0;
	rr = 0;
	ww = 0;
	upd = 0;
	downd = 0;
	points = 0;
	rungame(){
		this.duck.izm();
		game.qq = setInterval(function(){
			game.duck.start();
		}, 100);
		game.rr = setTimeout(function(){
			clearInterval(game.qq);
			$(".main__block").css({"background": "pink"});
			game.ww = setInterval(function(){
				game.duck.end2();
				if(game.duck.posy <= -80){
					clearInterval(game.ww);
					game.upd = setInterval(function(){
						game.dog.upend();
						if(game.dog.posy <= 380){
							clearInterval(game.upd)
							game.downd = setInterval(function(){
								game.dog.downend()
								if(game.dog.posy >= 480){
									clearInterval(game.downd);
									setTimeout(function(){
										$(".main__block").css({"background": "#64b0ff"});
										game.rungame();
									}, 300)
								}
							}, 100)
						}
					}, 100)
				}
			}, 100)
		}, 10000);
	}
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
var game = new Game();
game.rungame()

$(".duck").click(function(){
	clearInterval(game.qq);
	clearTimeout(game.rr);
	game.points += 100;
	$(".points").text(game.points);
	$(".duck").attr("src", "images/duck/black/shot/0.png");
	$(".duck").css({"z-index": 3});
	setTimeout(function(){
		var zz = setInterval(function(){
			game.duck.end1()
			if(game.duck.posy >= 470){
				clearInterval(zz);
				game.dog.single(game.duck.posx);
				var up = setInterval(function(){
					game.dog.up();
					if(game.dog.posy <= 380){
						clearInterval(up)
						var down = setInterval(function(){
							game.dog.down()
							if(game.dog.posy >= 480){
								clearInterval(down)
								setTimeout(function(){
									game.rungame()
								}, 500)
							}
						}, 100)
					}
				}, 100)
			}
		}, 100)
	},300)
})
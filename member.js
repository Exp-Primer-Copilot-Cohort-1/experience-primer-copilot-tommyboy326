function skillsMember(){
    this.name = 'member';
    this.age = 18;
    this.skills = ['html', 'css', 'js'];
    this.sayName = function(){
        console.log(this.name);
    }
}
Vue.component('chapter',{
    props:['link'],
    template: '<li><a :href="link.url">{{ link.title }}</a></li>'
})

class Link{
    constructor(id, url,title){
        this.id = id
        this.url = url
        this.title = title
    }
}

var links = [
    new Link(1,'1-hello-vue/index.html','はじめに〜Vueインスタンス'),
    new Link(2,'2-template/index.html','テンプレート構文')
]

var vm = new Vue({
    el: '#app',
    data: {
        links: links
    }
})

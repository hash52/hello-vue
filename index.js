Vue.component('chapter',{
    props:['link'],
    template: '<li><a :href="link.url">{{ link.title }}</a></li>'
})

class Link{
    constructor(url,title){
        this.id = null
        this.url = url
        this.title = title
    }
}

var links = [
    new Link('1-hello-vue/index.html','はじめに〜Vueインスタンス'),
    new Link('2-template/index.html','テンプレート構文'),
    new Link('3-computed-property&watcher/index.html','算出プロパティとウォッチャ')
]

for(var i=0; i<links.length; i++){
    links[i].id = i
}

var vm = new Vue({
    el: '#app',
    data: {
        links: links
    }
})

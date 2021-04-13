var app = new Vue({
    el: '#app',
    data:{
        rawHtml: '<span style="color: red">This should be red.</span>',
        dynamicId: 'hogeId',
        isButtonDisabled: true,
        seen: true,
        url: 'https://be.tech-boost.jp/',
        //n-DOMテンプレート(HTMLファイルに直接書かれるテンプレート)を使う場合ブラウザが強制的に属性名を小文字にするため、動的プロパティ名に大文字を使うのは避けるべき
        attributename: "href",
        event: 'click'
    },
    methods:{
        doSomething: function(){console.log("doSomething")},
        doHogeHoge: function(){console.log("doHogeHoge")}
    }
})
var obj = {message: "this message is fixed"}

//dataに渡してもリアクティブシステムが追跡できなくなる唯一の例外
Object.freeze(obj)

var app = new Vue({ 
    el: '#app',
    //dataに渡したオブジェクトの全てのプロパティをリアクティブシステムに追加
    data: {
        message: 'Hello hello!!',
        message2: 'Hello Vue2!!',
        message4: null, //app.message4はリアクティブ
        obj: obj
    },
    created: function(){
      console.log("createはライフサイクルフックの一種で、インスタンスが生成された後に実行する処理を記述できる")
      //thisはappインスタンスを返す
      console.log('app.message は ' + this.messsage)
      /* ライフサイクルフックは他にも、mounted、updated、destroyedなどがある */
    }
    /*(注意) コールバックでアロー関数を使用しないこと
    例　created: () => console.log(this.message)
    アロー関数は this をもたないため、this は他の変数と同様に見つかるまで親スコープをレキシカルに探索されエラー
    */
});

//インスタンス作成時に存在していたdataのみリアクティブシステムは有効
app.message3 = "not reactive"

/*Vueインスタンスは、いくつかの便利なプロパティとメソッドを持っており、
これらはユーザ定義のプロパティと区別するために、頭に $ が付けられている
https://jp.vuejs.org/v2/api/#インスタンスプロパティ */

app.$data //appのリアクティブなプロパティ一覧を取得
app.$el === document.getElementById('app') // => true

// $watch はインスタンスメソッド
app.$watch('message2', function (newValue, oldValue) {
  console.log('このコールバックは `app.message2` の値が変わる時に呼ばれます')
})

var app2 = new Vue({
    el: '#app-2',
    data: {
      message: 'You loaded this page on ' + new Date().toLocaleString()
    }
})

var app3 = new Vue({
    el: '#app-3',
    data: {
      seen: true
    }
})

var app4 = new Vue({
    el: '#app-4',
    data: {
      todos: [
        { text: 'Learn JavaScript'},
        { text: 'Learn Vue'},
        { text: 'Build something awesom'}
      ]
    }
})

var app5 = new Vue({
    el: '#app-5',
    data: {
      message: 'Hello Vue.js!'
    },
    methods: {
      reverseMessage: function () {
        //DOM操作を行っていないところがミソ
        this.message = this.message.split('').reverse().join('')
      }
    }
})

var app6 = new Vue({
    el: '#app-6',
    data: {
      message: 'Hello Vue!'
    }
})

// todo-item と呼ばれる新しいコンポーネントを定義
Vue.component('todo-item', {
    // todo-item コンポーネントはカスタム属性のような "プロパティ" で受け取ります。
    // このプロパティは todo と呼ばれます。
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
})

var app7 = new Vue({
    el: '#app-7',
    data: {
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ]
    }
})
    
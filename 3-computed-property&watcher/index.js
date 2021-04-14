var vm1 = new Vue({
    el: '#vm1',
    data: {
        message: "hello"
    },
    computed: {
        /*getter関数を定義すると、プロパティと同様に呼び出すことが可能になる
          vm1.messageが更新されると、vm1.reversedMessageに依存する全てのバインディングを更新する
          (reverseMessage内で参照されているプロパティが１つでも更新されたタイミングで更新される)*/
        reversedMessage: function(){
            console.log("computed property excused the function")
            return this.message.split('').reverse().join('')
        }
    },
    methods: {
        reverseMessage: function(){
            console.log("method excused the function")
            return this.message.split('').reverse().join('')
        }

    }
})

var vm2 = new Vue({
    el: '#vm2',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
    },
    //Angularに慣れ親しんでいるとやりがちな記述
    watch: {
        firstName: function(val){
            this.fullName = val + ' ' + this.lastName
        },
        lastName: function(val){
            this.fullName = this.firstName + ' ' + val
        }
    }
})

var vm3 = new Vue({
    el: '#vm3',
    data: {
        firstName: 'Foo',
        lastName: 'Bar',
    },
    computed: {
        //算出プロパティはデフォルトではgetterのみだが、setterを定義することも可能
        fullName: {
          // getter 関数
          get: function () {
            return this.firstName + ' ' + this.lastName
          },
          // setter 関数
          set: function (newValue) {
            var names = newValue.split(' ')
            this.firstName = names[0]
            this.lastName = names[names.length - 1]
          }
        }
      }
})

var vm4 = new Vue({
    el: '#watch-example',
    data: {
      question: '',
      question2: '',
      answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
      // この関数は question が変わるごとに実行されます。
      question: function (newQuestion, oldQuestion) {
        this.answer = 'Waiting for you to stop typing...'
        //questionが変更されてからthis.getAnswer()を実行するまで、500ミリ秒待つ
        this.debouncedGetAnswer()
        //this.getAnswer()
        //だと'Waiting for you to stop typing...'が表示されない 
        //& 一瞬でもquestionに'?'が入力されると、たとえ入力直後に削除しようが通信してしまう
        //& questionを'?'含んだ状態だと、１文字入力するたびに通信してしまう
      }
    },
    created: function () {
      // _.debounce は特にコストの高い処理の実行を制御するための
      // lodash の関数です。この場合は、どのくらい頻繁に yesno.wtf/api
      // へのアクセスすべきかを制限するために、ユーザーの入力が完全に
      // 終わるのを待ってから ajax リクエストを実行しています。
      // _.debounce (とその親戚である _.throttle )  についての詳細は
      // https://lodash.com/docs#debounce を見てください。
      this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
      getAnswer: function () {
        if (this.question.indexOf('?') === -1) {
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        // https://qiita.com/danishi/items/42d8adf6291515e62284#yes-no
        // yes or noを返すだけのAPI(1万回に1回、maybeが返ることもあるらしい)
        axios.get('https://yesno.wtf/api')
          .then(function (response) {
            vm.answer = _.capitalize(response.data.answer)
          })
          .catch(function (error) {
            vm.answer = 'Error! Could not reach the API. ' + error
          })
      }
    },
    computed: {
        //算出プロパティで非同期処理が本当に実現できないのかテスト
        test: function(){
            this.question2 //question2が編集したタイミングで更新されるようにしておく
            var result = "api is not returned result yet."
            axios.get('https://yesno.wtf/api')
            .then(function (response) {
                result= _.capitalize(response.data.answer)
                console.log('api returned result: '+ result)
                //代入はされているが、vm4.test、画面上の{{ test }}は共に上書きされない
                this.test = result
                console.log('done [this.test = result] , now this.test: '+ this.test)
            })
            .catch(function (error) {
                result = 'Error! Could not reach the API. ' + error
            })
            console.log('computed property returned: ' + result)
            return result
        }
    }
  })
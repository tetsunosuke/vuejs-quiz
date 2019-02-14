var app = new Vue({
  el: '#app',
  data: {
    question: "",
    displayQuestion: "",
    answer:"",
    query: "",
    result: ""
  },
  created: function() {
    var json = {};
    var question, answer;
    var j = axios.get("/test.json")
                 .then(function (res) {
                     question  = res.data.question;
                     answer    = res.data.answer;

                     var chars = "";
                     // すべての文字を伏せ字にする
                     for (var i=0; i < question.length; i++) {
                         chars += "■";
                     }
                     Vue.set(app, "displayQuestion", chars);
                     Vue.set(app, "question", question);
                     Vue.set(app, "answer", answer);
    });
  },
  methods: {
      // 解答比較
      checkAnswer: function() {
          if (this.query === this.answer) {
              this.result = "正解";
          } else {
              if (this.query.length > 0) {
                this.result = "不正解";
              }
          }
      },
      // 隠された文字列からボタンが押された文字をオープンする
      open: function (e) {
        var chars = "";
        for (var i=0; i < this.question.length; i++) {
            if (this.question[i] === e.target.value) {
                chars += e.target.value;
            } else {
                chars += this.displayQuestion[i];
            }
        }
        this.displayQuestion = chars;
      },
  }
});

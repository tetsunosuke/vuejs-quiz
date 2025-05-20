var app = new Vue({
  el: '#app',
  data: {
    questions: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    displayQuestion: "",
    query: "",
    result: "",
    availableChars: []
  },
  created: function() {
    axios.get("/test.json")
      .then((res) => {
        this.questions = res.data;
        this.loadQuestion();
      });
  },
  methods: {
    loadQuestion: function() {
      if (this.currentQuestionIndex < this.questions.length) {
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        var chars = "";
        for (var i = 0; i < this.currentQuestion.question.length; i++) {
          chars += "■";
        }
        this.displayQuestion = chars;
        this.query = "";
        this.result = "";
        if (this.currentQuestion && this.currentQuestion.question) {
          const qChars = this.currentQuestion.question.split('');
          this.availableChars = [...new Set(qChars)];
        } else {
          this.availableChars = [];
        }
      } else {
        this.displayQuestion = "クイズ完了！";
        this.currentQuestion = { question: '', answer: '' }; // Prevent template errors
        this.availableChars = [];
        this.query = "";
        this.result = "全問正解おめでとうございます！";
      }
    },
    // 解答比較
    checkAnswer: function() {
      if (!this.currentQuestion || typeof this.currentQuestion.answer === 'undefined') {
        this.result = "問題がロードされていません。";
        return;
      }

      if (this.query === this.currentQuestion.answer) {
        this.result = "正解！「次へ」ボタンで次の問題へ進んでください。";
      } else if (this.query.length === 0) {
        this.result = "答えを入力してください。";
      } else {
        this.result = "不正解です。もう一度試してください。";
      }
    },
    nextQuestion: function() {
      this.currentQuestionIndex++;
      this.loadQuestion();
    },
    // 隠された文字列からボタンが押された文字をオープンする
    open: function(e) {
      if (!this.currentQuestion || !this.currentQuestion.question) return;
      var chars = "";
      for (var i = 0; i < this.currentQuestion.question.length; i++) {
        if (this.currentQuestion.question[i] === e.target.value) {
          chars += e.target.value;
        } else {
          chars += this.displayQuestion[i];
        }
      }
      this.displayQuestion = chars;
    },
  }
});

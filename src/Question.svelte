<script>
	export let question
	export let nextQuestion
	export let increaseScore

	let isCorrect
	let isAnswered = false
	let incorrectAnswers = question.incorrect_answers.map((answer) => {
		return {
			answer,
			correct: false,
		}
	})
	let allAnswers = shuffle([
		...incorrectAnswers,
		{
			answer: question.correct_answer,
			correct: true,
		},
	])

	function shuffle(array) {
		return [...array].sort(() => Math.random() - 0.5)
	}

	function checkAnswer(correct) {
		isAnswered = true
		isCorrect = correct
		if (correct) increaseScore()
	}
</script>

<h3>{@html question.question}</h3>

{#each allAnswers as answer, key}
	<button
		on:click={(event) => checkAnswer(answer.correct)}
		data-answer_id={key}
		disabled={isAnswered}
		class={!isAnswered ? '' : answer.correct ? 'correct' : 'incorrect'}
	>
		{@html answer.answer}
	</button>
{/each}

{#if isAnswered}
	<h4>
		{#if isCorrect}
			You got it right!
		{:else}
			You got it wrong!
		{/if}
	</h4>
	<button on:click={nextQuestion}>Next Question</button>
{/if}

<style>
	.answered {
		font-weight: bold;
		text-decoration: underline;
	}
	.correct {
		color: white;
		background-color: forestgreen;
	}
	.incorrect {
		color: white;
		background-color: firebrick;
	}
</style>

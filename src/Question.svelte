<script lang="ts">
	import { score } from './store.ts'
	export let question: {
		question: string
		correct_answer: string
		incorrect_answers: string[]
	}
	export let nextQuestion: () => void

	let isCorrect: boolean
	let isAnswered: boolean = false
	let selectedKey: number

	const allAnswers = shuffle([
		...question.incorrect_answers.map((answer) => ({
			answer,
			correct: false,
		})),
		{
			answer: question.correct_answer,
			correct: true,
		},
	])

	function shuffle(array: any[]) {
		return [...array].sort(() => Math.random() - 0.5)
	}

	function checkAnswer(correct: boolean, key: number) {
		isAnswered = true
		selectedKey = key
		isCorrect = correct
		if (correct) score.update((value) => value + 1)
	}
</script>

<h3>{@html question.question}</h3>

<div class="wrapper">
	{#each allAnswers as answer, key}
		<button
			on:click={() => checkAnswer(answer.correct, key)}
			data-answer_id={key}
			disabled={isAnswered}
			class:correct={isAnswered && answer.correct}
			class:incorrect={isAnswered && !answer.correct}
			class:answered={isAnswered && key === selectedKey}
		>
			{@html answer.answer}
		</button>
	{/each}
</div>

{#if isAnswered}
	<h4 class:correct={isCorrect} class:incorrect={!isCorrect}>
		{#if isCorrect}
			You got it right!
		{:else}
			You got it wrong!
		{/if}
	</h4>
	<button on:click={nextQuestion}>Next Question</button>
{/if}

<style lang="scss">
	.wrapper {
		display: grid;
		// flex-wrap: wrap;
		gap: 1rem;
	}

	h4 {
		color: var(--clr);
	}

	button {
		min-width: 5ch;

		&:is(.correct, .incorrect) {
			color: white;
			background-color: var(--clr);
		}

		&.answered {
			font-weight: bold;
			text-decoration: underline;
		}
	}

	.correct {
		--clr: forestgreen;
	}
	.incorrect {
		--clr: firebrick;
	}
</style>

<script lang="ts">
	import { afterUpdate, beforeUpdate, onMount } from 'svelte'
	import { fly } from 'svelte/transition'
	import Modal from './Modal.svelte'
	import Question from './Question.svelte'
	import {
		QUESTION_CATEGORY,
		QUESTION_DIFFICULTY,
		QUESTION_NUM,
		QUESTION_TYPE,
		SCORE_TO_WIN,
	} from './quizConfig.ts'
	import { score } from './store.ts'

	let isModalOpen = false
	let activeQuestion = 0
	let quiz = getQuiz()

	onMount(() => {
		console.log(`I have mounted`)
	})
	beforeUpdate(() => {
		console.log(`I'm about to update`)
	})
	afterUpdate(() => {
		console.log(`I have updated`)
	})

	async function getQuiz() {
		const url = new URL(`https://opentdb.com/api.php`)

		if (QUESTION_NUM !== null)
			url.searchParams.append('amount', QUESTION_NUM.toString())
		if (QUESTION_CATEGORY !== null)
			url.searchParams.append('category', QUESTION_CATEGORY.toString())
		if (QUESTION_TYPE !== null)
			url.searchParams.append('type', QUESTION_TYPE.toString())
		if (QUESTION_DIFFICULTY !== null)
			url.searchParams.append('type', QUESTION_DIFFICULTY.toString())

		const response = await fetch(url)
		const quiz = await response.json()
		return quiz
	}

	function resetQuiz() {
		activeQuestion = 0
		score.update(() => 0)
		quiz = getQuiz()
		closeModal()
	}

	function openModal() {
		isModalOpen = true
	}
	function closeModal() {
		isModalOpen = false
	}

	function nextQuestion() {
		activeQuestion = activeQuestion + 1
	}

	$: questionNumber = activeQuestion + 1
	$: hasWon = $score >= SCORE_TO_WIN
	$: hasLost = !hasWon && questionNumber > QUESTION_NUM

	$: if (hasWon || hasLost) {
		openModal()
	}
</script>

<div>
	<button on:click={resetQuiz}>Start New Quiz</button>

	<h3>My Score: {$score}</h3>
	<h4>Question #{questionNumber}</h4>

	<div class="container">
		{#await quiz}
			<h5>Loading...</h5>
		{:then data}
			{#each data.results as question, index}
				{#if index === activeQuestion}
					<div in:fly={{ x: 100 }} out:fly={{ x: -200 }} class="fade-wrapper">
						<Question {question} {nextQuestion} />
					</div>
				{/if}
			{/each}
		{/await}
	</div>
</div>

{#if isModalOpen}
	<Modal on:close={closeModal}>
		{#if hasWon}
			<h2>You won!</h2>
			<p>Congratulations!</p>
		{/if}
		{#if hasLost}
			<h2>You lost!</h2>
			<p>Try again?</p>
		{/if}
		<button on:click={resetQuiz}>Start a new quiz</button>
	</Modal>
{/if}

<style>
	.container {
		position: relative;
		min-height: 500px;
	}

	.fade-wrapper {
		position: absolute;
	}
</style>

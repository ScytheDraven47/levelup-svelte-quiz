<script>
	import Question from './Question.svelte'

	let activeQuestion = 0
	let score = 0
	let quiz = getQuiz()

	async function getQuiz() {
		const categories = {
			MUSIC: 12,
			GAMING: 15,
		}
		const questionNum = 10
		const questionType = 'multiple'

		const url = new URL(`https://opentdb.com/api.php`)
		url.searchParams.append('amount', questionNum)
		url.searchParams.append('category', categories.GAMING)
		url.searchParams.append('type', questionType)

		const response = await fetch(url)
		const quiz = await response.json()
		return quiz
	}

	function resetQuiz() {
		activeQuestion = 0
		score = 0
		quiz = getQuiz()
	}

	function nextQuestion() {
		activeQuestion = activeQuestion + 1
	}

	function increaseScore() {
		score = score + 1
	}
</script>

<div>
	<button on:click={resetQuiz}>Start New Quiz</button>

	<h3>My Score: {score}</h3>
	<h4>Question #{activeQuestion + 1}</h4>

	{#await quiz}
		<h5>Loading...</h5>
	{:then data}
		{#each data.results as question, index}
			{#if index === activeQuestion}
				<Question {question} {nextQuestion} {increaseScore} />
			{/if}
		{/each}
	{/await}
</div>

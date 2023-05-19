<script>
	import Quiz from './Quiz.svelte'
</script>

<h1>Level Up Quiz</h1>
<div>
	<Quiz />
</div>

<style>
	:global(body) {
		background-color: #524763;
	}

	h1 {
		color: white;
		text-align: center;
	}

	div {
		background-color: white;
		border-radius: 15px;
		padding: 40px;
		width: clamp(20ch, 80%, 800px);
		margin-inline: auto;
	}
</style>

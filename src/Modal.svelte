<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { fade, fly } from 'svelte/transition'

	const dispatch = createEventDispatcher()
</script>

<div class="modal-wrapper" transition:fade>
	<div class="modal" transition:fly={{ y: -100 }}>
		<button
			on:click={() => {
				dispatch('close')
			}}
		>
			Close
		</button>
		<slot />
	</div>
</div>

<style lang="scss">
	.modal-wrapper {
		position: fixed;
		inset: 0;
		background-color: hsl(0 0% 0% / 0.6);

		.modal {
			position: relative;
			top: 3rem;
			color: black;
			background-color: white;
			padding: 20px;
			border-radius: 10px;
		}
	}
</style>

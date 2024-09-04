<script>
	import Reveal from 'reveal.js';
	import Markdown from 'reveal.js/plugin/markdown/markdown';
	import highlight from 'reveal.js/plugin/highlight/highlight';
	import 'reveal.js/dist/reveal.css';
	import 'reveal.js/plugin/highlight/monokai.css';
	import 'reveal.js/dist/theme/black-contrast.css';
	import { onMount } from 'svelte';
	export let mdFile = '';

	onMount(() => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const deck = new Reveal({ slideNumber: true, width, height });

		deck.initialize({
			plugins: [Markdown, highlight]
		});
	});
</script>

<div class="reveal">
	<div class="slides">
		<section
			data-charset="iso-8859-15"
			data-markdown="/sections/{mdFile}.md"
			data-separator="^\n\n\n"
			data-separator-vertical="^\n\n"
		/>
	</div>
</div>

<style>
	:global(.reveal section img) {
		width: 90vw;
		height: 85vh;
		object-fit: contain;
		object-position: center;
	}
	:global(.reveal section p) {
		font-size: var(--body);
	}
	:global(.reveal section a) {
		font-size: var(--body);
		color: var(--primary400);
	}
	:global(.reveal section li) {
		font-size: var(--body);
	}
	:global(.reveal section h1) {
		font-size: var(--h1);
		color: var(--primary800);
	}
	:global(.reveal section h2) {
		font-size: var(--h2);
		color: var(--primary800);
	}
	:global(.reveal section h3) {
		font-size: var(--h3);
		color: var(--primary800);
	}
	:global(.reveal section h4) {
		font-size: var(--h4);
		color: var(--primary800);
	}
</style>

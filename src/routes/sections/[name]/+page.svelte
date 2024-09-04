<script lang="ts">
	import { sections } from '$lib/index';
	import { page } from '$app/stores';
	import Reveal from '$lib/reveal.svelte';
	$: decodedLocation = '';
	$: neigbors = findNeigbors($page.url.pathname);
	function findNeigbors(pathname: string) {
		let location = pathname.split('/').at(-1)!;
		decodedLocation = decodeURIComponent(location);
		const currentIndex = sections.indexOf(decodedLocation);
		return [sections[currentIndex - 1], sections[currentIndex + 1]];
	}
</script>

<div class="section">
	<div>
		<a href="/">Emotet</a>
		<h4>{decodedLocation}</h4>
		<div>
			{#if neigbors[0]}
				<a href="/sections/{neigbors[0]}">Previous</a>
			{/if}
			{#if neigbors[1]}
				<a href="/sections/{neigbors[1]}">Next</a>
			{/if}
		</div>
	</div>
	{#key $page.url.pathname}
		<Reveal mdFile={decodedLocation} />
	{/key}
</div>

<style>
	.section {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
	.section div:first-child h4 {
		color: var(--primary800);
	}
	.section div:first-child {
		width: 100%;
		height: 80px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-inline: 5%;
	}

	.section > div > a {
		font-size: var(--h3);
	}
	.section > div > div > a {
		font-size: var(--h4);
		margin-left: 10px;
	}
	.section > div > div > a:hover {
		background-color: var(--primary100);
		color: var(--primary800);
		padding-inline: 6px;
		padding-block: 4px;
		border-radius: 8px;
	}

	@media screen and (width <768px) {
		.section div:first-child h4 {
			display: none;
		}
	}
</style>
